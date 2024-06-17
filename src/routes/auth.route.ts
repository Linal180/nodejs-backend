import { Router } from 'express';
import { UserController } from '../controllers/auth.controller';

const router = Router();
const { login, signup } = new UserController()

router.post('/signup', signup)
router.post('/login', login)

export default router;
