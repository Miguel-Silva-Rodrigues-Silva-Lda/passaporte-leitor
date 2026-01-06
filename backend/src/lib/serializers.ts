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
 * Serialize a book object, converting its status to API format
 */
export const serializeBook = <T extends { status: BookStatus }>(book: T): Omit<T, 'status'> & { status: SerializedBookStatus } => ({
    ...book,
    status: serializeBookStatus(book.status),
});

/**
 * Serialize an array of books
 */
export const serializeBooks = <T extends { status: BookStatus }>(books: T[]): (Omit<T, 'status'> & { status: SerializedBookStatus })[] => {
    return books.map(serializeBook);
};
