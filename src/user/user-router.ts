import express from 'express';
import UserController from './user-controller';
import UserService from './user-service';

const router = express.Router();
const userService = new UserService();
const userController = new UserController(userService);

router.post('/register', (req, res) => userController.createUser(req, res));
router.post('/login', (req, res) => userController.login(req, res));

export default router;