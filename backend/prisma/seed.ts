// Passaporte do Leitor - Seed de Conquistas
//
// Idempotente: usa upsert por `code`, pode correr-se várias vezes.
// Correr com: npm run db:seed
//
// Tipos de requirements suportados por src/services/achievements.ts:
//   book_count     - livros terminados
//   genre_count    - géneros diferentes explorados
//   genre_books    - livros de um género específico (chave do enum Genre)
//   rated_books    - livros avaliados (com rating)
//   monthly_books  - livros terminados no mês corrente
//   streak_days    - dias seguidos com leitura
//   total_minutes  - minutos totais de leitura
//   session_count  - sessões de leitura registadas
//   reading_days   - dias diferentes com leitura

import { PrismaClient, AchievementCategory } from '@prisma/client';

const prisma = new PrismaClient();

interface SeedAchievement {
    code: string;
    name: string;
    description: string;
    icon: string;
    category: AchievementCategory;
    requirements: { type: string; value: number; genre?: string };
}

const achievements: SeedAchievement[] = [
    // ========================================================================
    // READING - Livros lidos
    // ========================================================================
    {
        code: 'primeiro_livro',
        name: 'Primeira Página',
        description: 'Terminaste o teu primeiro livro!',
        icon: '📖',
        category: 'READING',
        requirements: { type: 'book_count', value: 1 },
    },
    {
        code: 'livros_3',
        name: 'Trio de Histórias',
        description: 'Leste 3 livros até ao fim.',
        icon: '📚',
        category: 'READING',
        requirements: { type: 'book_count', value: 3 },
    },
    {
        code: 'livros_5',
        name: 'Estante Crescente',
        description: 'Já leste 5 livros. A tua estante está a crescer!',
        icon: '🌱',
        category: 'READING',
        requirements: { type: 'book_count', value: 5 },
    },
    {
        code: 'livros_10',
        name: 'Rato de Biblioteca',
        description: '10 livros lidos! És um verdadeiro rato de biblioteca.',
        icon: '🐭',
        category: 'READING',
        requirements: { type: 'book_count', value: 10 },
    },
    {
        code: 'livros_15',
        name: 'Caçador de Aventuras',
        description: '15 livros terminados. Nada te pára!',
        icon: '🏹',
        category: 'READING',
        requirements: { type: 'book_count', value: 15 },
    },
    {
        code: 'livros_25',
        name: 'Guardião das Histórias',
        description: '25 livros lidos! Já conheces mundos e mundos.',
        icon: '🛡️',
        category: 'READING',
        requirements: { type: 'book_count', value: 25 },
    },
    {
        code: 'livros_50',
        name: 'Lenda Viva dos Livros',
        description: '50 livros! És uma verdadeira lenda da leitura.',
        icon: '🏆',
        category: 'READING',
        requirements: { type: 'book_count', value: 50 },
    },

    // ========================================================================
    // READING - Tempo de leitura
    // ========================================================================
    {
        code: 'minutos_60',
        name: 'Primeira Hora Mágica',
        description: 'Leste durante 1 hora no total.',
        icon: '⏰',
        category: 'READING',
        requirements: { type: 'total_minutes', value: 60 },
    },
    {
        code: 'minutos_300',
        name: 'Cinco Horas de Viagem',
        description: '5 horas de leitura! Quantos mundos já visitaste?',
        icon: '🎈',
        category: 'READING',
        requirements: { type: 'total_minutes', value: 300 },
    },
    {
        code: 'minutos_600',
        name: 'Dez Horas de Magia',
        description: '10 horas a ler. O tempo voa com um bom livro!',
        icon: '🪄',
        category: 'READING',
        requirements: { type: 'total_minutes', value: 600 },
    },
    {
        code: 'minutos_1500',
        name: 'Maratona de Leitura',
        description: '25 horas de leitura! És incansável.',
        icon: '🏅',
        category: 'READING',
        requirements: { type: 'total_minutes', value: 1500 },
    },

    // ========================================================================
    // READING - Sessões
    // ========================================================================
    {
        code: 'sessoes_10',
        name: 'Dez Momentos de Leitura',
        description: 'Registaste 10 sessões de leitura.',
        icon: '🔟',
        category: 'READING',
        requirements: { type: 'session_count', value: 10 },
    },
    {
        code: 'sessoes_50',
        name: 'Leitor Dedicado',
        description: '50 sessões de leitura registadas!',
        icon: '💪',
        category: 'READING',
        requirements: { type: 'session_count', value: 50 },
    },
    {
        code: 'sessoes_100',
        name: 'Cem Capítulos de Vida',
        description: '100 sessões de leitura. Que dedicação incrível!',
        icon: '💯',
        category: 'READING',
        requirements: { type: 'session_count', value: 100 },
    },

    // ========================================================================
    // STREAK - Dias seguidos
    // ========================================================================
    {
        code: 'streak_2',
        name: 'Dois Dias a Ler',
        description: 'Leste 2 dias seguidos. Bom começo!',
        icon: '✨',
        category: 'STREAK',
        requirements: { type: 'streak_days', value: 2 },
    },
    {
        code: 'streak_3',
        name: 'Três Dias de Magia',
        description: '3 dias seguidos de leitura. Estás a ganhar o hábito!',
        icon: '🌟',
        category: 'STREAK',
        requirements: { type: 'streak_days', value: 3 },
    },
    {
        code: 'streak_7',
        name: 'Uma Semana em Chamas',
        description: '7 dias seguidos a ler! Uma semana inteira!',
        icon: '🔥',
        category: 'STREAK',
        requirements: { type: 'streak_days', value: 7 },
    },
    {
        code: 'streak_14',
        name: 'Duas Semanas de Ouro',
        description: '14 dias seguidos de leitura. Imparável!',
        icon: '⚡',
        category: 'STREAK',
        requirements: { type: 'streak_days', value: 14 },
    },
    {
        code: 'streak_30',
        name: 'Um Mês Imparável',
        description: '30 dias seguidos a ler! És um campeão da leitura!',
        icon: '🚀',
        category: 'STREAK',
        requirements: { type: 'streak_days', value: 30 },
    },

    // ========================================================================
    // GENRE - Explorar géneros
    // ========================================================================
    {
        code: 'generos_3',
        name: 'Explorador de Histórias',
        description: 'Leste livros de 3 géneros diferentes.',
        icon: '🧭',
        category: 'GENRE',
        requirements: { type: 'genre_count', value: 3 },
    },
    {
        code: 'generos_6',
        name: 'Viajante de Mundos',
        description: '6 géneros diferentes explorados!',
        icon: '🌍',
        category: 'GENRE',
        requirements: { type: 'genre_count', value: 6 },
    },
    {
        code: 'generos_12',
        name: 'Mestre dos Géneros',
        description: 'Exploraste todos os 12 géneros! Nada te escapa.',
        icon: '👑',
        category: 'GENRE',
        requirements: { type: 'genre_count', value: 12 },
    },
    {
        code: 'fantasia_3',
        name: 'Aprendiz de Feiticeiro',
        description: 'Leste 3 livros de fantasia.',
        icon: '🧙',
        category: 'GENRE',
        requirements: { type: 'genre_books', value: 3, genre: 'FANTASY' },
    },
    {
        code: 'aventura_3',
        name: 'Espírito Aventureiro',
        description: 'Leste 3 livros de aventura.',
        icon: '🗺️',
        category: 'GENRE',
        requirements: { type: 'genre_books', value: 3, genre: 'ADVENTURE' },
    },
    {
        code: 'ciencia_3',
        name: 'Pequeno Cientista',
        description: 'Leste 3 livros de ciência.',
        icon: '🔬',
        category: 'GENRE',
        requirements: { type: 'genre_books', value: 3, genre: 'SCIENCE' },
    },
    {
        code: 'animais_3',
        name: 'Amigo dos Animais',
        description: 'Leste 3 livros sobre animais.',
        icon: '🐾',
        category: 'GENRE',
        requirements: { type: 'genre_books', value: 3, genre: 'ANIMALS' },
    },
    {
        code: 'misterio_3',
        name: 'Detetive Júnior',
        description: 'Leste 3 livros de mistério.',
        icon: '🔍',
        category: 'GENRE',
        requirements: { type: 'genre_books', value: 3, genre: 'MYSTERY' },
    },

    // ========================================================================
    // SPECIAL - Conquistas especiais
    // ========================================================================
    {
        code: 'critico_junior',
        name: 'Crítico Júnior',
        description: 'Avaliaste 5 livros com estrelas.',
        icon: '⭐',
        category: 'SPECIAL',
        requirements: { type: 'rated_books', value: 5 },
    },
    {
        code: 'devorador_livros',
        name: 'Devorador de Livros',
        description: 'Terminaste 5 livros num só mês!',
        icon: '🍽️',
        category: 'SPECIAL',
        requirements: { type: 'monthly_books', value: 5 },
    },
    {
        code: 'dias_leitura_50',
        name: 'Cinquenta Dias de Histórias',
        description: 'Leste em 50 dias diferentes. Que hábito fantástico!',
        icon: '🌈',
        category: 'SPECIAL',
        requirements: { type: 'reading_days', value: 50 },
    },
];

async function main() {
    console.log(`🌱 A semear ${achievements.length} conquistas...`);

    for (const achievement of achievements) {
        const { code, requirements, ...data } = achievement;
        await prisma.achievement.upsert({
            where: { code },
            update: { ...data, requirements },
            create: { code, ...data, requirements },
        });
    }

    const total = await prisma.achievement.count();
    console.log(`✅ Seed concluída. Total de conquistas na base de dados: ${total}`);
}

main()
    .catch((e) => {
        console.error('❌ Erro ao correr a seed:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
