import prisma from './prisma.js';

// ============================================================================
// HELPER: Calculate Streak
// ============================================================================

export async function calculateStreak(childId: string, existingSessions?: any[]): Promise<number> {
    // Use existing sessions if provided (optimization for batch operations)
    const sessions = existingSessions || await prisma.readingSession.findMany({
        where: { childId },
        select: { date: true },
        orderBy: { date: 'desc' },
    });

    if (sessions.length === 0) return 0;

    let streak = 0;
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    let currentDate = new Date(today);

    // Get unique dates first
    const uniqueDates = new Set<string>();
    sessions.forEach(s => {
        const d = new Date(s.date);
        d.setHours(0, 0, 0, 0);
        uniqueDates.add(d.toISOString().split('T')[0]);
    });

    const sortedDates = Array.from(uniqueDates).sort().reverse();

    // Count consecutive days from today
    for (const dateStr of sortedDates) {
        const sessionDate = new Date(dateStr);
        if (sessionDate.getTime() === currentDate.getTime()) {
            streak++;
            currentDate.setDate(currentDate.getDate() - 1);
        } else if (sessionDate.getTime() < currentDate.getTime()) {
            break;
        }
    }

    return streak;
}
