import { Router } from 'express';
import { UserController } from './user.controller';
import { authMiddleware } from '../../middleware/auth';

const router = Router();

router.post('/register', UserController.register);
router.post('/login', UserController.login);
router.get('/', authMiddleware, UserController.getAll);

export default router;
