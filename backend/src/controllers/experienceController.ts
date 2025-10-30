import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { experienceService } from '../services/experienceService.js';

const listQuerySchema = z.object({
  category: z.string().optional(),
  minPrice: z.string().transform((v) => Number(v)).optional(),
  maxPrice: z.string().transform((v) => Number(v)).optional(),
  search: z.string().optional(),
});

export async function getExperiences(req: Request, res: Response, next: NextFunction) {
  try {
    const parsed = listQuerySchema.safeParse(req.query);
    if (!parsed.success) return res.status(400).json({ error: 'Invalid query params' });
    const experiences = await experienceService.list(parsed.data);
    res.json(experiences);
  } catch (err) {
    next(err);
  }
}

export async function getExperienceById(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;
    const experience = await experienceService.getById(id);
    if (!experience) return res.status(404).json({ error: 'Experience not found' });
    res.json(experience);
  } catch (err) {
    next(err);
  }
}

export async function getSlotsForExperience(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;
    const date = req.query.date as string | undefined;
    const slots = await experienceService.getSlots(id, date);
    res.json(slots);
  } catch (err) {
    next(err);
  }
}


