import { Router } from 'express';
import { signUp, login } from '../controllers/auth.controllers'; 

const router = Router();

router.post('/register', signUp);
router.post('/login', login);

export default router;