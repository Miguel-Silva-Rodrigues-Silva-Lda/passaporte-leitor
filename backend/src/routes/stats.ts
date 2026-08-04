import { Hono } from 'hono';
import prisma from '../lib/prisma.js';
import { getGenreStats } from '../services/achievements.js';
import { getCurrentLevel, getNextLevel, getLevelProgress, getBooksToNextLevel } from '../lib/levels-config.js';
import { verifyFamilyParam, verifyChildOwnership } from '../middleware/authorization.js';
import { serializeChildBooks } from '../lib/serializers.js';

export const statsRoutes = new Hono();

// ============================================================================
// GET /api/stats/child/:childId - Estatísticas de uma criança
// ============================================================================

statsRoutes.get('/child/:childId', async (c) => {
  const { childId } = c.req.param();

  // Authorization check: verify child belongs to authenticated family
  if (!await verifyChildOwnership(c, childId)) {
    return c.json({ error: 'Forbidden - Access denied' }, 403);
  }

  // Obter criança
  const child = await prisma.child.findUnique({
    where: { id: childId },
    include: {
      childBooks: { include: { book: true } },
      achievements: {
        include: {
          achievement: true,
        },
      },
    },
  });

  if (!child) {
    return c.json({ error: 'Criança não encontrada' }, 404);
  }

  // Serialize per-child book status to lowercase (metadata stays nested under .book)
  const serializedBooks = serializeChildBooks(child.childBooks);

  const bookCount = serializedBooks.length;
  const finishedBooksCount = serializedBooks.filter((b: any) => b.status === 'finished').length;
  const levelCategory = child.levelCategory || 'EXPLORERS';

  const currentLevel = getCurrentLevel(finishedBooksCount, levelCategory);
  const nextLevel = getNextLevel(finishedBooksCount, levelCategory);
  const progress = getLevelProgress(finishedBooksCount, levelCategory);
  const booksToNext = getBooksToNextLevel(finishedBooksCount, levelCategory);

  const level = {
    current: currentLevel,
    next: nextLevel,
    progress,
    booksToNextLevel: booksToNext
  };
  const genreStats = await getGenreStats(childId);

  // Estatísticas de leitura
  const now = new Date();
  const thisMonth = serializedBooks.filter((b: any) => {
    if (!b.finishDate) return false;
    const d = new Date(b.finishDate);
    return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
  }).length;

  const thisYear = serializedBooks.filter((b: any) => {
    if (!b.finishDate) return false;
    const d = new Date(b.finishDate);
    return d.getFullYear() === now.getFullYear();
  }).length;

  // Média de avaliação
  const ratedBooks = serializedBooks.filter((b) => b.rating !== null);
  const averageRating =
    ratedBooks.length > 0
      ? ratedBooks.reduce((sum, b) => sum + (b.rating || 0), 0) / ratedBooks.length
      : null;

  // Género favorito (metadados vêm de .book)
  const genreCounts: Record<string, number> = {};
  for (const cb of serializedBooks) {
    genreCounts[cb.book.genre] = (genreCounts[cb.book.genre] || 0) + 1;
  }
  const favoriteGenre =
    Object.entries(genreCounts).length > 0
      ? Object.entries(genreCounts).sort((a, b) => b[1] - a[1])[0][0]
      : null;

  return c.json({
    child: {
      id: child.id,
      name: child.name,
      avatar: child.avatar,
    },
    level,
    books: {
      total: bookCount,
      read: finishedBooksCount, // Add this for certificate
      thisMonth,
      thisYear,
      averageRating,
    },
    genres: {
      stats: genreStats,
      discovered: genreStats.filter((g) => g.discovered).length,
      total: genreStats.length,
      favorite: favoriteGenre,
    },
    achievements: {
      earned: child.achievements.length,
      total: await prisma.achievement.count(),
      recent: child.achievements
        .sort((a, b) => new Date(b.earnedAt).getTime() - new Date(a.earnedAt).getTime())
        .slice(0, 3)
        .map((a) => ({
          ...a.achievement,
          earnedAt: a.earnedAt,
        })),
    },
  });
});

// ============================================================================
// GET /api/stats/family/:familyId - Estatísticas de uma família
// ============================================================================

statsRoutes.get('/family/:familyId', async (c) => {
  const { familyId } = c.req.param();

  // Authorization check: verify family belongs to authenticated user
  if (!verifyFamilyParam(c, familyId)) {
    return c.json({ error: 'Forbidden - Access denied' }, 403);
  }

  // Obter família com filhos e livros
  const family = await prisma.family.findUnique({
    where: { id: familyId },
    include: {
      children: {
        include: {
          childBooks: { include: { book: true } },
          achievements: true,
        },
      },
    },
  });

  if (!family) {
    return c.json({ error: 'Família não encontrada' }, 404);
  }

  const allBooks = family.children.flatMap((c) => serializeChildBooks(c.childBooks));
  const totalBooks = allBooks.length;

  // Count unique genres discovered (metadata under .book)
  const uniqueGenres = new Set(allBooks.map((cb) => cb.book.genre));

  // Estatísticas por criança
  const childStats = family.children.map((child) => {
    const serializedChildBooks = serializeChildBooks(child.childBooks);
    const finishedCount = serializedChildBooks.filter((b) => b.status === 'finished').length;
    const childLevelCategory = child.levelCategory || 'EXPLORERS';
    const childCurrentLevel = getCurrentLevel(finishedCount, childLevelCategory);
    const childNextLevel = getNextLevel(finishedCount, childLevelCategory);
    const childProgress = getLevelProgress(finishedCount, childLevelCategory);
    const childBooksToNext = getBooksToNextLevel(finishedCount, childLevelCategory);

    return {
      id: child.id,
      name: child.name,
      avatar: child.avatar,
      bookCount: finishedCount,
      achievementCount: child.achievements.length,
      level: {
        current: childCurrentLevel,
        next: childNextLevel,
        progress: childProgress,
        booksToNextLevel: childBooksToNext
      }
    };
  });

  return c.json({
    family: {
      id: family.id,
      name: family.name,
    },
    totals: {
      children: family.children.length,
      books: totalBooks,
      achievements: family.children.reduce((sum, c) => sum + c.achievements.length, 0),
      genresDiscovered: uniqueGenres.size,
    },
    childStats,
  });
});

// ============================================================================
// GET /api/stats/leaderboard/:familyId - Leaderboard familiar
// ============================================================================

statsRoutes.get('/leaderboard/:familyId', async (c) => {
  const { familyId } = c.req.param();

  // Authorization check: verify family belongs to authenticated user
  if (!verifyFamilyParam(c, familyId)) {
    return c.json({ error: 'Forbidden - Access denied' }, 403);
  }

  const { period } = c.req.query(); // 'week', 'month', 'year', 'all'

  const children = await prisma.child.findMany({
    where: { familyId },
    include: {
      childBooks: { include: { book: true } },
    },
  });

  let filterDate: Date | null = null;
  if (period === 'week') {
    filterDate = new Date();
    filterDate.setDate(filterDate.getDate() - 7);
  } else if (period === 'month') {
    filterDate = new Date();
    filterDate.setMonth(filterDate.getMonth() - 1);
  } else if (period === 'year') {
    filterDate = new Date();
    filterDate.setFullYear(filterDate.getFullYear() - 1);
  }

  const leaderboard = children
    .map((child) => {
      const filteredBooks = filterDate
        ? child.childBooks.filter((b: any) => b.finishDate && new Date(b.finishDate) >= filterDate!)
        : child.childBooks;

      const serializedChildBooks = serializeChildBooks(child.childBooks);
      const childFinished = serializedChildBooks.filter((b) => b.status === 'finished').length;
      const childCategory = child.levelCategory || 'EXPLORERS';
      const childCurLevel = getCurrentLevel(childFinished, childCategory);
      const childNxtLevel = getNextLevel(childFinished, childCategory);
      const childProg = getLevelProgress(childFinished, childCategory);
      const childBksToNxt = getBooksToNextLevel(childFinished, childCategory);

      return {
        id: child.id,
        name: child.name,
        avatar: child.avatar,
        bookCount: filteredBooks.length, // Keep bookCount for sorting
        level: {
          current: childCurLevel,
          next: childNxtLevel,
          progress: childProg,
          booksToNextLevel: childBksToNxt
        }
      };
    })
    .sort((a, b) => b.bookCount - a.bookCount);

  return c.json({
    period: period || 'all',
    leaderboard,
  });
});
