// ============================================================================
// SHARED UTILITY FUNCTIONS
// ============================================================================

/**
 * Format a date string to a human-readable format in Portuguese
 * Returns 'Hoje', 'Ontem', or a formatted date
 */
export const formatDate = (dateStr: string, options?: { includeWeekday?: boolean }) => {
    const date = new Date(dateStr);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    const todayStr = today.toISOString().split('T')[0];
    const yesterdayStr = yesterday.toISOString().split('T')[0];

    if (dateStr === todayStr) return 'Hoje';
    if (dateStr === yesterdayStr) return 'Ontem';

    if (options?.includeWeekday) {
        return date.toLocaleDateString('pt-PT', {
            weekday: 'short',
            day: 'numeric',
            month: 'short'
        });
    }

    return date.toLocaleDateString('pt-PT', {
        day: 'numeric',
        month: 'short',
        year: date.getFullYear() !== today.getFullYear() ? 'numeric' : undefined
    });
};

/**
 * Get a date string for N days ago
 */
export const getDaysAgo = (days: number): string => {
    const date = new Date();
    date.setDate(date.getDate() - days);
    return date.toISOString().split('T')[0];
};
