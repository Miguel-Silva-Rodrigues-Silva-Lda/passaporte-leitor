import { Hono } from 'hono';
import { z } from 'zod';
import { Prisma, Genre, BookStatus } from '@prisma/client';
import prisma from '../lib/prisma.js';
import { checkAndAwardAchievements } from '../services/achievements.js';
import { getAuthFamilyId } from '../middleware/auth.js';
import {
  verifyFamilyParam,
  verifyChildOwnership,
  verifyChildBookOwnership,
} from '../middleware/authorization.js';
import { serializeChildBook, serializeChildBooks } from '../lib/serializers.js';

export const childBookRoutes = new Hono();

// Per-child reading state (child_books). Metadata lives in /books.

const genreEnum = z.enum([
  'ADVENTURE', 'FANTASY', 'MYSTERY', 'SCIENCE', 'COMICS', 'ROMANCE',
  'HORROR', 'BIOGRAPHY', 'POETRY', 'HISTORY', 'ANIMALS', 'HUMOR',
]);

const statusMap: Record<string, BookStatus> = {
  'to-read': BookStatus.TO_READ,
  'reading': BookStatus.READING,
  'finished': BookStatus.FINISHED,
};

// Reading-state fields shared by create/update
const stateSchema = {
  status: z.enum(['to-read', 'reading', 'finished']).optional(),
  currentPage: z.number().int().nonnegative().optional(),
  startDate: z.string().datetime().optional(),
  finishDate: z.string().datetime().optional(),
  rating: z.number().int().min(1).max(5).optional().nullable(),
  notes: z.string().max(1000).optional().nullable(),
  favoriteCharacter: z.string().max(100).optional().nullable(),
};

// New-book metadata (when not adding from library)
const newBookSchema = z.object({
  title: z.string().min(1).max(200),
  author: z.string().max(100).optional(),
  isbn: z.string().max(20).optional(),
  genre: genreEnum,
  totalPages: z.number().int().positive().optional(),
});

// Create accepts EITHER an existing bookId (add from library) OR inline book metadata (new book)
const createChildBookSchema = z
  .object({
    childId: z.string().cuid(),
    bookId: z.string().cuid().optional(),
    book: newBookSchema.optional(),
    ...stateSchema,
  })
  .refine((d) => !!d.bookId !== !!d.book, {
    message: 'Forneça exatamente um de: bookId (da biblioteca) ou book (livro novo)',
  });

const updateChildBookSchema = z.object(stateSchema);

// Helper: build the state part of a Prisma create/update payload
function buildStateData(data: any) {
  const out: any = {};
  if (data.status) out.status = statusMap[data.status];
  if (data.currentPage !== undefined) out.currentPage = data.currentPage;
  if (data.startDate) out.startDate = new Date(data.startDate);
  if (data.finishDate) out.finishDate = new Date(data.finishDate);
  if (data.rating !== undefined) out.rating = data.rating;
  if (data.notes !== undefined) out.notes = data.notes;
  if (data.favoriteCharacter !== undefined) out.favoriteCharacter = data.favoriteCharacter;
  return out;
}

const childInclude = { child: { select: { id: true, name: true, avatar: true } } };

// ============================================================================
// GET /api/child-books/family/:familyId - All per-child book records of a family
// ============================================================================

childBookRoutes.get('/family/:familyId', async (c) => {
  const { familyId } = c.req.param();

  if (!verifyFamilyParam(c, familyId)) {
    return c.json({ error: 'Forbidden - Access denied' }, 403);
  }

  const status = c.req.query('status');
  const genre = c.req.query('genre');
  const childId = c.req.query('childId');
  const search = c.req.query('search');
  const sortBy = c.req.query('sortBy') || 'recent';
  const limit = c.req.query('limit');
  const offset = c.req.query('offset');

  // Base where (everything except status) — reused for counts
  const baseWhere: any = { child: { familyId } };
  if (childId) baseWhere.childId = childId;

  const bookFilter: any = {};
  if (genre) bookFilter.genre = genre;
  if (search) {
    bookFilter.OR = [
      { title: { contains: search, mode: 'insensitive' } },
      { author: { contains: search, mode: 'insensitive' } },
    ];
  }
  if (Object.keys(bookFilter).length > 0) baseWhere.book = bookFilter;

  const where: any = { ...baseWhere };
  if (status && ['to-read', 'reading', 'finished'].includes(status)) {
    where.status = statusMap[status];
  }

  let orderBy: any;
  switch (sortBy) {
    case 'title':
      orderBy = { book: { title: 'asc' } };
      break;
    case 'rating':
      orderBy = { rating: 'desc' };
      break;
    case 'progress':
      orderBy = { currentPage: 'desc' };
      break;
    case 'recent':
    default:
      orderBy = { updatedAt: 'desc' };
      break;
  }

  const queryOptions: any = {
    where,
    orderBy,
    include: { book: true, ...childInclude },
  };
  if (limit) queryOptions.take = parseInt(limit);
  if (offset) queryOptions.skip = parseInt(offset);

  const [childBooks, countReading, countToRead, countFinished] = await Promise.all([
    prisma.childBook.findMany(queryOptions),
    prisma.childBook.count({ where: { ...baseWhere, status: BookStatus.READING } }),
    prisma.childBook.count({ where: { ...baseWhere, status: BookStatus.TO_READ } }),
    prisma.childBook.count({ where: { ...baseWhere, status: BookStatus.FINISHED } }),
  ]);

  return c.json({
    childBooks: serializeChildBooks(childBooks),
    counts: {
      reading: countReading,
      'to-read': countToRead,
      finished: countFinished,
    },
  });
});

// ============================================================================
// GET /api/child-books/child/:childId - Per-child book records for one child
// ============================================================================

childBookRoutes.get('/child/:childId', async (c) => {
  const { childId } = c.req.param();

  if (!await verifyChildOwnership(c, childId)) {
    return c.json({ error: 'Forbidden - Access denied' }, 403);
  }

  const genre = c.req.query('genre');
  const limit = c.req.query('limit');
  const offset = c.req.query('offset');

  const where: any = { childId };
  if (genre) where.book = { genre };

  const queryOptions: any = {
    where,
    orderBy: { updatedAt: 'desc' },
    include: { book: true, ...childInclude },
  };
  if (limit) queryOptions.take = parseInt(limit);
  if (offset) queryOptions.skip = parseInt(offset);

  const [childBooks, total] = await Promise.all([
    prisma.childBook.findMany(queryOptions),
    prisma.childBook.count({ where }),
  ]);

  return c.json({ childBooks: serializeChildBooks(childBooks), total });
});

// ============================================================================
// GET /api/child-books/:id - Single per-child book record
// ============================================================================

childBookRoutes.get('/:id', async (c) => {
  const { id } = c.req.param();

  if (!await verifyChildBookOwnership(c, id)) {
    return c.json({ error: 'Forbidden - Access denied' }, 403);
  }

  const childBook = await prisma.childBook.findUnique({
    where: { id },
    include: { book: true, ...childInclude },
  });

  if (!childBook) {
    return c.json({ error: 'Registo não encontrado' }, 404);
  }

  return c.json(serializeChildBook(childBook));
});

// ============================================================================
// POST /api/child-books - Add a book to a child
// ============================================================================
// Either { childId, bookId, ...state } (from library) OR
// { childId, book: {...}, ...state } (new book, creates Book + ChildBook).

childBookRoutes.post('/', async (c) => {
  const body = await c.req.json();

  const validation = createChildBookSchema.safeParse(body);
  if (!validation.success) {
    return c.json({ error: 'Dados inválidos', details: validation.error.issues }, 400);
  }

  const data = validation.data;

  // Authorization: the target child must belong to the authenticated family
  if (!await verifyChildOwnership(c, data.childId)) {
    return c.json({ error: 'Forbidden - Access denied' }, 403);
  }

  const familyId = getAuthFamilyId(c);
  const stateData = buildStateData(data);

  try {
    let childBook;

    if (data.bookId) {
      // Add existing library book — verify it belongs to the family
      const book = await prisma.book.findFirst({
        where: { id: data.bookId, familyId },
        select: { id: true },
      });
      if (!book) {
        return c.json({ error: 'Livro não encontrado na biblioteca da família' }, 404);
      }

      childBook = await prisma.childBook.create({
        data: { bookId: data.bookId, childId: data.childId, ...stateData },
        include: { book: true, ...childInclude },
      });
    } else {
      // New book: create Book (family metadata) + ChildBook in one transaction
      childBook = await prisma.$transaction(async (tx) => {
        const book = await tx.book.create({
          data: {
            familyId,
            title: data.book!.title,
            author: data.book!.author || 'Desconhecido',
            isbn: data.book!.isbn,
            genre: data.book!.genre as Genre,
            totalPages: data.book!.totalPages,
          },
        });
        return tx.childBook.create({
          data: { bookId: book.id, childId: data.childId, ...stateData },
          include: { book: true, ...childInclude },
        });
      });
    }

    // Achievements only when the book is added as finished
    let newAchievements: any[] = [];
    if (data.status === 'finished') {
      newAchievements = await checkAndAwardAchievements(data.childId);
    }

    return c.json({ childBook: serializeChildBook(childBook), newAchievements }, 201);
  } catch (err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === 'P2002') {
      return c.json({ error: 'Esta criança já tem este livro' }, 409);
    }
    throw err;
  }
});

// ============================================================================
// PUT /api/child-books/:id - Update per-child reading state
// ============================================================================

childBookRoutes.put('/:id', async (c) => {
  const { id } = c.req.param();

  if (!await verifyChildBookOwnership(c, id)) {
    return c.json({ error: 'Forbidden - Access denied' }, 403);
  }

  const body = await c.req.json();

  const validation = updateChildBookSchema.safeParse(body);
  if (!validation.success) {
    return c.json({ error: 'Dados inválidos', details: validation.error.issues }, 400);
  }

  const childBook = await prisma.childBook.update({
    where: { id },
    data: buildStateData(validation.data),
    include: { book: true, ...childInclude },
  });

  return c.json(serializeChildBook(childBook));
});

// ============================================================================
// DELETE /api/child-books/:id - Remove a child's copy of a book
// ============================================================================
// Also removes that child's reading sessions for the book. The shared Book is
// left in place (still in the family library) unless it becomes fully orphaned.

childBookRoutes.delete('/:id', async (c) => {
  const { id } = c.req.param();

  if (!await verifyChildBookOwnership(c, id)) {
    return c.json({ error: 'Forbidden - Access denied' }, 403);
  }

  const childBook = await prisma.childBook.findUnique({
    where: { id },
    select: { childId: true, bookId: true },
  });
  if (!childBook) {
    return c.json({ error: 'Registo não encontrado' }, 404);
  }

  await prisma.$transaction(async (tx) => {
    // Remove this child's sessions for this book (RESTRICT FK on the book)
    await tx.readingSession.deleteMany({
      where: { childId: childBook.childId, bookId: childBook.bookId },
    });
    await tx.childBook.delete({ where: { id } });

    // Clean up the shared book if no child still has it and no sessions remain
    const [remainingChildBooks, remainingSessions] = await Promise.all([
      tx.childBook.count({ where: { bookId: childBook.bookId } }),
      tx.readingSession.count({ where: { bookId: childBook.bookId } }),
    ]);
    if (remainingChildBooks === 0 && remainingSessions === 0) {
      await tx.book.delete({ where: { id: childBook.bookId } });
    }
  });

  return c.json({ success: true });
});
