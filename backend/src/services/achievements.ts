import prisma from '../lib/prisma.js';
import { Genre } from '@prisma/client';
import { calculateStreak } from '../lib/streak.js';

interface AchievementRequirement {
  type: string;
  value: number;
  genre?: string;
}

/**
 * Verifica e atribui conquistas para uma criança
 * Retorna as novas conquistas atribuídas
 */
export async function checkAndAwardAchievements(childId: string) {
  // Obter todos os livros da criança
  const books = await prisma.book.findMany({
    where: { childId },
  });

  // Obter sessões de leitura (para conquistas de streak/tempo/sessões)
  const sessions = await prisma.readingSession.findMany({
    where: { childId },
    select: { date: true, minutes: true },
    orderBy: { date: 'desc' },
  });

  const finishedBooks = books.filter((b: any) => b.status === 'FINISHED');

  // Obter conquistas já obtidas
  const existingAchievements = await prisma.childAchievement.findMany({
    where: { childId },
    select: { achievementId: true },
  });
  const existingIds = new Set(existingAchievements.map((a) => a.achievementId));

  // Obter todas as conquistas disponíveis
  const allAchievements = await prisma.achievement.findMany();

  // Verificar quais conquistas foram desbloqueadas
  const newAchievements = [];

  for (const achievement of allAchievements) {
    // Saltar se já foi obtida
    if (existingIds.has(achievement.id)) continue;

    const requirements = achievement.requirements as unknown as AchievementRequirement;
    let earned = false;

    switch (requirements.type) {
      case 'book_count':
        earned = finishedBooks.length >= requirements.value;
        break;

      case 'genre_count':
        const uniqueGenres = new Set(books.map((b: any) => b.genre));
        earned = uniqueGenres.size >= requirements.value;
        break;

      case 'genre_books':
        const genreBooks = books.filter((b: any) => b.genre === requirements.genre);
        earned = genreBooks.length >= requirements.value;
        break;

      case 'rated_books':
        const ratedBooks = books.filter((b: any) => b.rating !== null);
        earned = ratedBooks.length >= requirements.value;
        break;

      case 'monthly_books':
        const now = new Date();
        const thisMonthBooks = books.filter((b: any) => {
          if (!b.finishDate) return false;
          const d = new Date(b.finishDate);
          return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
        });
        earned = thisMonthBooks.length >= requirements.value;
        break;

      case 'streak_days':
        const streak = await calculateStreak(childId, sessions);
        earned = streak >= requirements.value;
        break;

      case 'total_minutes':
        const totalMinutes = sessions.reduce((sum, s) => sum + s.minutes, 0);
        earned = totalMinutes >= requirements.value;
        break;

      case 'session_count':
        earned = sessions.length >= requirements.value;
        break;

      case 'reading_days':
        const uniqueDays = new Set(
          sessions.map((s) => {
            const d = new Date(s.date);
            d.setHours(0, 0, 0, 0);
            return d.toISOString().split('T')[0];
          })
        );
        earned = uniqueDays.size >= requirements.value;
        break;
    }

    if (earned) {
      await prisma.childAchievement.create({
        data: {
          childId,
          achievementId: achievement.id,
        },
      });

      newAchievements.push({
        id: achievement.id,
        code: achievement.code,
        name: achievement.name,
        description: achievement.description,
        icon: achievement.icon,
      });
    }
  }

  return newAchievements;
}

/**
 * Obtém estatísticas de géneros para uma criança
 */
export async function getGenreStats(childId: string) {
  const books = await prisma.book.findMany({
    where: { childId },
    select: { genre: true },
  });

  const genreCount: Record<string, number> = {};
  for (const book of books) {
    genreCount[book.genre] = (genreCount[book.genre] || 0) + 1;
  }

  const genreInfo: Record<string, { name: string; icon: string; theme: string; color: string }> = {
    FANTASIA: { name: 'Fantasia', icon: '🏰', theme: 'Reino Mágico', color: '#9B59B6' },
    AVENTURA: { name: 'Aventura', icon: '🗺️', theme: 'Terras Selvagens', color: '#E67E22' },
    ESPACO: { name: 'Espaço', icon: '🚀', theme: 'Galáxia Infinita', color: '#2C3E50' },
    NATUREZA: { name: 'Natureza', icon: '🌲', theme: 'Floresta Encantada', color: '#27AE60' },
    MISTERIO: { name: 'Mistério', icon: '🔍', theme: 'Vale das Sombras', color: '#34495E' },
    OCEANO: { name: 'Oceano', icon: '🌊', theme: 'Mar dos Piratas', color: '#3498DB' },
    CIENCIA: { name: 'Ciência', icon: '🔬', theme: 'Laboratório Secreto', color: '#1ABC9C' },
    HISTORIA: { name: 'História', icon: '📜', theme: 'Ruínas Antigas', color: '#795548' },
  };

  return Object.entries(genreInfo).map(([key, info]) => ({
    genre: key,
    ...info,
    count: genreCount[key] || 0,
    discovered: (genreCount[key] || 0) > 0,
  }));
}
