import { Context } from 'hono';
import { getAuthFamilyId } from './auth.js';
import prisma from '../lib/prisma.js';

/**
 * Verify that the familyId parameter matches the authenticated family.
 * Use this for routes like /family/:familyId
 */
export function verifyFamilyParam(c: Context, paramFamilyId: string): boolean {
  const authFamilyId = getAuthFamilyId(c);
  return paramFamilyId === authFamilyId;
}

/**
 * Verify that a child belongs to the authenticated family.
 * Use this for routes like /children/:id or /child/:childId
 */
export async function verifyChildOwnership(c: Context, childId: string): Promise<boolean> {
  const authFamilyId = getAuthFamilyId(c);

  const child = await prisma.child.findFirst({
    where: { id: childId, familyId: authFamilyId },
    select: { id: true }
  });

  return !!child;
}

/**
 * Verify that a book (shared metadata) belongs to the authenticated family.
 * Use this for routes like /books/:id
 */
export async function verifyBookOwnership(c: Context, bookId: string): Promise<boolean> {
  const authFamilyId = getAuthFamilyId(c);

  const book = await prisma.book.findFirst({
    where: {
      id: bookId,
      familyId: authFamilyId
    },
    select: { id: true }
  });

  return !!book;
}

/**
 * Verify that a child_book (per-child reading state) belongs to the
 * authenticated family (through its child).
 * Use this for routes like /child-books/:id
 */
export async function verifyChildBookOwnership(c: Context, childBookId: string): Promise<boolean> {
  const authFamilyId = getAuthFamilyId(c);

  const childBook = await prisma.childBook.findFirst({
    where: {
      id: childBookId,
      child: { familyId: authFamilyId }
    },
    select: { id: true }
  });

  return !!childBook;
}

/**
 * Verify that a reading session belongs to the authenticated family.
 * Use this for routes like /reading-logs/:id
 */
export async function verifySessionOwnership(c: Context, sessionId: string): Promise<boolean> {
  const authFamilyId = getAuthFamilyId(c);

  const session = await prisma.readingSession.findFirst({
    where: {
      id: sessionId,
      child: { familyId: authFamilyId }
    },
    select: { id: true }
  });

  return !!session;
}
