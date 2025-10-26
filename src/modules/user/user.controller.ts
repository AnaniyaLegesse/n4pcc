import type { Request, Response } from 'express';
import { UserService } from './user.service';
import { generateToken } from '../../utils/jwt';
import bcrypt from 'bcryptjs';

export const UserController = {
  register: async (req: Request, res: Response) => {
    try {
      const { name, email, password } = req.body;
      const existing = await UserService.findByEmail(email);
      if (existing) return res.status(400).json({ message: 'Email already exists' });

      const user = await UserService.createUser(name, email, password);
      const token = generateToken(user.id);
      res.status(201).json({ user, token });
    } catch (err) {
      res.status(500).json({ message: 'Registration failed', error: err });
    }
  },

  login: async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;
      const user = await UserService.findByEmail(email);
      if (!user) return res.status(404).json({ message: 'User not found' });

      const valid = await bcrypt.compare(password, user.password);
      if (!valid) return res.status(401).json({ message: 'Invalid credentials' });

      const token = generateToken(user.id);
      res.json({ user, token });
    } catch (err) {
      res.status(500).json({ message: 'Login failed', error: err });
    }
  },

  getAll: async (_: Request, res: Response) => {
    const users = await UserService.getAllUsers();
    res.json(users);
  },
};
