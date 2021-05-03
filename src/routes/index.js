import { Router } from 'express';
import characterRoutes from './character';
import movieRoutes from './movie';
import authRoutes from './auth';
import { verifyToken } from '../controllers/auth.controllers';

const router = Router();

router.use('/auth', authRoutes);
router.use(verifyToken);
router.use('/characters', characterRoutes);
router.use('/movies', movieRoutes);

export default router;