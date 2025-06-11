import { Router } from 'express';
import {UserController} from '../controllers/user.controller';

const router = Router();

router.post('/register', UserController.register);
router.post('/login', UserController.login);
router.get('/getUsers', UserController.getAllUsers);
router.get('/:id', UserController.getUserDetails);
// router.put('/:id', UserController.updateUser);
// router.delete('/:id', UserController.deleteUser);

export default router;