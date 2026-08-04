import { Hono } from 'hono';
import { z } from 'zod';
import { Genre } from '@prisma/client';
import prisma from '../lib/prisma.js';
import { verifyFamilyParam, verifyBookOwnership } from '../middleware/authorization.js';

export const bookRoutes = new Hono();

// Shared book metadata (family library). Per-child reading state lives in
// /child-books. A single Book can be shared by several children of the family.

const genreEnum = z.enum([
  'ADVENTURE',
  'FANTASY',
  'MYSTERY',
  'SCIENCE',
  'COMICS',
  'ROMANCE',
  'HORROR',
  'BIOGRAPHY',
  'POETRY',
  'HISTORY',
  'ANIMALS',
  'HUMOR',
]);

const updateBookSchema = z.object({
  title: z.string().min(1).max(200).optional(),
  author: z.string().min(1).max(100).optional(),
  isbn: z.string().max(20).optional().nullable(),
  genre: genreEnum.optional(),
  totalPages: z.number().int().positive().optional().nullable(),
});

// ============================================================================
// GET /api/books/library/:familyId - Biblioteca da família (metadados)
// ============================================================================
// Lista os livros da família para o picker "adicionar da biblioteca".
// Inclui quais crianças já têm cada livro.

bookRoutes.get('/library/:familyId', async (c) => {
  const { familyId } = c.req.param();

  if (!verifyFamilyParam(c, familyId)) {
    return c.json({ error: 'Forbidden - Access denied' }, 403);
  }

  const genre = c.req.query('genre');
  const search = c.req.query('search');

  const where: any = { familyId };
  if (genre) where.genre = genre;
  if (search) {
    where.OR = [
      { title: { contains: search, mode: 'insensitive' } },
      { author: { contains: search, mode: 'insensitive' } },
    ];
  }

  const books = await prisma.book.findMany({
    where,
    orderBy: { title: 'asc' },
    include: {
      childBooks: { select: { childId: true } },
    },
  });

  return c.json({
    books: books.map((b) => ({
      id: b.id,
      familyId: b.familyId,
      title: b.title,
      author: b.author,
      isbn: b.isbn,
      genre: b.genre,
      totalPages: b.totalPages,
      createdAt: b.createdAt,
      updatedAt: b.updatedAt,
      childIds: b.childBooks.map((cb) => cb.childId),
    })),
  });
});

// ============================================================================
// PUT /api/books/:id - Atualizar metadados partilhados
// ============================================================================
// Afeta todas as crianças da família que partilham este livro.

bookRoutes.put('/:id', async (c) => {
  const { id } = c.req.param();

  if (!await verifyBookOwnership(c, id)) {
    return c.json({ error: 'Forbidden - Access denied' }, 403);
  }

  const body = await c.req.json();

  const validation = updateBookSchema.safeParse(body);
  if (!validation.success) {
    return c.json({ error: 'Dados inválidos', details: validation.error.issues }, 400);
  }

  const data: any = { ...validation.data };
  if (data.genre) data.genre = data.genre as Genre;

  const book = await prisma.book.update({
    where: { id },
    data,
  });

  return c.json(book);
});

// ============================================================================
// DELETE /api/books/:id - Eliminar livro partilhado
// ============================================================================
// Remove o livro, todos os child_books (cascade) e as sessões associadas.

bookRoutes.delete('/:id', async (c) => {
  const { id } = c.req.param();

  if (!await verifyBookOwnership(c, id)) {
    return c.json({ error: 'Forbidden - Access denied' }, 403);
  }

  // reading_sessions.bookId is ON DELETE RESTRICT, so remove sessions first,
  // then the book (child_books cascade with the book).
  await prisma.$transaction([
    prisma.readingSession.deleteMany({ where: { bookId: id } }),
    prisma.book.delete({ where: { id } }),
  ]);

  return c.json({ success: true });
});
