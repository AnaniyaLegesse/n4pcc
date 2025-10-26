import { prisma } from '../../config/db';
import bcrypt from 'bcryptjs';
import { generateToken } from '../../utils/jwt';

export const userResolvers = {
  Query: {
    users: async () => await prisma.user.findMany(),
  },

  Mutation: {
    register: async (_: any, { name, email, password }: any) => {
      const hashed = await bcrypt.hash(password, 10);
      const user = await prisma.user.create({ data: { name, email, password: hashed } });
      const token = generateToken(user.id);
      return { user, token };
    },
    login: async (_: any, { email, password }: any) => {
      const user = await prisma.user.findUnique({ where: { email } });
      if (!user || !(await bcrypt.compare(password, user.password))) throw new Error('Invalid credentials');
      const token = generateToken(user.id);
      return { user, token };
    },
  },
};
