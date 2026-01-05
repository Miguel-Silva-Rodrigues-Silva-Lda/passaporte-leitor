import { Context, Next } from 'hono';
import jwt from 'jsonwebtoken';

if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET environment variable is required');
}

const JWT_SECRET: string = process.env.JWT_SECRET;

export interface AuthContext {
    familyId: string;
}

export async function authMiddleware(c: Context, next: Next) {
    const authHeader = c.req.header('Authorization');

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return c.json({ error: 'Unauthorized - No token provided' }, 401);
    }

    const token = authHeader.substring(7); // Remove 'Bearer ' prefix

    try {
        const decoded = jwt.verify(token, JWT_SECRET) as { familyId: string };
        c.set('auth', { familyId: decoded.familyId } as AuthContext);
        await next();
    } catch (error) {
        return c.json({ error: 'Unauthorized - Invalid token' }, 401);
    }
}

// Helper to get authenticated family ID from context
export function getAuthFamilyId(c: Context): string {
    const auth = c.get('auth') as AuthContext;
    if (!auth || !auth.familyId) {
        throw new Error('Not authenticated');
    }
    return auth.familyId;
}
