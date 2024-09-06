import { Request, Response } from 'express';
import UserService from './user-service';

class UserController {
  private userService: UserService;

  constructor(userService: UserService) {
    this.userService = userService;
  }

  async createUser(req: Request, res: Response) {
    try {
      const user = await this.userService.createUser(req.body);
      res.status(201).json({ id: user._id, email: user.email, username: user.username });
    } catch (error) {
      res.status(400).json({ error: 'Failed to create user' });
    }
  }

  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const token = await this.userService.login(email, password);
      if (token) {
        res.json({ token });
      } else {
        res.status(401).json({ error: 'Invalid credentials' });
      }
    } catch (error) {
      res.status(400).json({ error: 'Login failed' });
    }
  }
}

export default UserController;