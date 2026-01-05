import { Hono } from 'hono';
import { z } from 'zod';
import bcrypt from 'bcryptjs';
import prisma from '../lib/prisma.js';

export const familyRoutes = new Hono();

// Schemas de validação
const createFamilySchema = z.object({
  name: z.string().min(1).max(100),
  email: z.string().email().optional(),
});

const updateFamilySchema = z.object({
  name: z.string().min(1).max(100).optional(),
  currentPassword: z.string().optional(),
  password: z.string().min(6).optional(),
});

// ============================================================================
// GET /api/family/:id - Obter família por ID
// ============================================================================

familyRoutes.get('/:id', async (c) => {
  const { id } = c.req.param();

  const family = await prisma.family.findUnique({
    where: { id },
    include: {
      children: {
        include: {
          _count: {
            select: { books: true },
          },
        },
      },
      settings: true,
    },
  });

  if (!family) {
    return c.json({ error: 'Família não encontrada' }, 404);
  }

  return c.json(family);
});

// ============================================================================
// POST /api/family - Criar nova família
// ============================================================================

familyRoutes.post('/', async (c) => {
  const body = await c.req.json();

  const validation = createFamilySchema.safeParse(body);
  if (!validation.success) {
    return c.json({ error: 'Dados inválidos', details: validation.error.issues }, 400);
  }

  const { name, email } = validation.data;

  // Verificar email único se fornecido
  if (email) {
    const existing = await prisma.family.findUnique({ where: { email } });
    if (existing) {
      return c.json({ error: 'Email já registado' }, 409);
    }
  }

  const family = await prisma.family.create({
    data: {
      name,
      email,
      settings: {
        create: {}, // Cria com defaults
      },
    },
    include: {
      settings: true,
    },
  });

  return c.json(family, 201);
});

// ============================================================================
// PUT /api/family/:id - Atualizar família
// ============================================================================

familyRoutes.put('/:id', async (c) => {
  const { id } = c.req.param();
  const body = await c.req.json();

  const validation = updateFamilySchema.safeParse(body);
  if (!validation.success) {
    return c.json({ error: 'Dados inválidos', details: validation.error.issues }, 400);
  }

  const { currentPassword, password, ...updateData } = validation.data;

  // Se está a tentar alterar a password, validar a password atual
  if (password) {
    if (!currentPassword) {
      return c.json({ error: 'Palavra-passe atual é obrigatória' }, 400);
    }

    const existingFamily = await prisma.family.findUnique({
      where: { id },
      select: { password: true },
    });

    if (!existingFamily || !existingFamily.password) {
      return c.json({ error: 'Família não encontrada' }, 404);
    }

    const isPasswordValid = await bcrypt.compare(currentPassword, existingFamily.password);
    if (!isPasswordValid) {
      return c.json({ error: 'Palavra-passe atual incorreta' }, 401);
    }

    // Hash da nova password
    (updateData as any).password = await bcrypt.hash(password, 10);
  }

  const family = await prisma.family.update({
    where: { id },
    data: updateData,
    include: {
      children: true,
      settings: true,
    },
  });

  return c.json(family);
});

// ============================================================================
// DELETE /api/family/:id - Eliminar família
// ============================================================================

familyRoutes.delete('/:id', async (c) => {
  const { id } = c.req.param();

  await prisma.family.delete({
    where: { id },
  });

  return c.json({ success: true });
});

// ============================================================================
// GET /api/family/:id/full - Obter família com todos os dados
// ============================================================================

familyRoutes.get('/:id/full', async (c) => {
  const { id } = c.req.param();

  const family = await prisma.family.findUnique({
    where: { id },
    include: {
      children: {
        include: {
          books: {
            orderBy: { updatedAt: 'desc' },
          },
          achievements: {
            include: {
              achievement: true,
            },
          },
        },
      },
      settings: true,
    },
  });

  if (!family) {
    return c.json({ error: 'Família não encontrada' }, 404);
  }

  return c.json(family);
});
