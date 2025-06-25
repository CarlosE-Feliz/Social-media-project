import { Router } from 'express';
import {UserController} from '../controllers/user.controller';
import { authenticate } from '../middleware/auth';

const router = Router();

router.post('/register', UserController.register);
router.post('/login', UserController.login);
router.get('/getUsers', UserController.getAllUsers);
// router.get('/:id', UserController.getUserDetails);

router.get('/me', authenticate, UserController.getMe);
// router.put('/:id', UserController.updateUser);
// router.delete('/:id', UserController.deleteUser);

export default router;