import { BookStatus } from '@prisma/client';

// ============================================================================
// STATUS SERIALIZATION
// ============================================================================

export type SerializedBookStatus = 'to-read' | 'reading' | 'finished';

/**
 * Serialize BookStatus enum to API-friendly lowercase format
 * Converts: TO_READ -> 'to-read', READING -> 'reading', FINISHED -> 'finished'
 */
export const serializeBookStatus = (status: BookStatus): SerializedBookStatus => {
    return status.toLowerCase().replace(/_/g, '-') as SerializedBookStatus;
};

/**
 * Serialize a child_book (per-child reading state), converting its status to
 * API format. Any included `book` metadata / `child` relation is passed through
 * untouched, so callers get the separated { ...state, status, book, child } shape.
 */
export const serializeChildBook = <T extends { status: BookStatus }>(childBook: T): Omit<T, 'status'> & { status: SerializedBookStatus } => ({
    ...childBook,
    status: serializeBookStatus(childBook.status),
});

/**
 * Serialize an array of child_books
 */
export const serializeChildBooks = <T extends { status: BookStatus }>(childBooks: T[]): (Omit<T, 'status'> & { status: SerializedBookStatus })[] => {
    return childBooks.map(serializeChildBook);
};
