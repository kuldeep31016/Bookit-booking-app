import { prisma } from '../config/database.js';

type ListQuery = {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  search?: string;
};

async function list(query: ListQuery) {
  const where: any = {};
  if (query.category) where.category = query.category;
  if (query.minPrice || query.maxPrice) {
    where.price = {};
    if (query.minPrice !== undefined) where.price.gte = query.minPrice;
    if (query.maxPrice !== undefined) where.price.lte = query.maxPrice;
  }
  if (query.search) {
    where.OR = [
      { title: { contains: query.search, mode: 'insensitive' } },
      { description: { contains: query.search, mode: 'insensitive' } },
      { location: { contains: query.search, mode: 'insensitive' } },
    ];
  }
  return prisma.experience.findMany({ where, orderBy: { createdAt: 'desc' } });
}

async function getById(id: string) {
  return prisma.experience.findUnique({
    where: { id },
    include: { slots: true },
  });
}

async function getSlots(experienceId: string, date?: string) {
  const where: any = { experienceId };
  if (date) {
    const d = new Date(date);
    const start = new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate(), 0, 0, 0));
    const end = new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate(), 23, 59, 59));
    where.date = { gte: start, lte: end };
  }
  return prisma.slot.findMany({ where, orderBy: { date: 'asc' } });
}

export const experienceService = { list, getById, getSlots };


