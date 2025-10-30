import { Router } from 'express';
import { getExperiences, getExperienceById, getSlotsForExperience } from '../controllers/experienceController.js';

const router = Router();

router.get('/', getExperiences);
router.get('/:id', getExperienceById);
router.get('/:id/slots', getSlotsForExperience);

export default router;


