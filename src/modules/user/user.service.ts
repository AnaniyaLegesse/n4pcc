import { prisma } from '../../config/db';
import bcrypt from 'bcryptjs';

export const UserService = {
  createUser: async (name: string, email: string, password: string) => {
    const hashed = await bcrypt.hash(password, 10);
    return prisma.user.create({ data: { name, email, password: hashed } });
  },

  findByEmail: async (email: string) => {
    return prisma.user.findUnique({ where: { email } });
  },

  getAllUsers: async () => {
    return prisma.user.findMany();
  },
};
