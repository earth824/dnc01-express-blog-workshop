import type { Response, Request } from 'express';
import { prisma } from '../db/prisma.js';
import z from 'zod';
import { PrismaClientKnownRequestError } from '../db/generated/prisma/internal/prismaNamespace.js';

const registerSchema = z.object({
  username: z
    .string('email is required')
    .trim()
    .min(3, 'username must have at least 3 characters'),
  password: z
    .string('password is required')
    .trim()
    .regex(
      /^[a-zA-Z0-9]{6,}$/,
      'password must have at least 6 characters and contain only alphabet and number'
    ),
  role: z
    .enum(
      ['admin', 'user'],
      'role must be one of the following value: admin, user'
    )
    .optional()
    .default('user')
});

async function register(req: Request, res: Response) {
  const data = registerSchema.parse(req.body);

  // find user in user table with provided username
  // if user exits (username already in use)
  // if not exist insert new user

  try {
    await prisma.user.create({
      data: {
        username: data.username,
        password: data.password,
        role: data.role
      }
    });
  } catch (err) {
    if (err instanceof PrismaClientKnownRequestError && err.code === 'P2002') {
      return res.status(409).json({ message: 'username already in use' });
    }
    throw err;
  }
  res.status(201).json({ message: 'user registered successfully' });
}

const loginSchema = z.object({
  username: z.string('username is required').min(1, 'username is required'),
  password: z.string('password is required').min(1, 'password is required')
});

async function login(req: Request, res: Response) {
  const { username, password } = loginSchema.parse(req.body);

  // const user = await prisma.user.findFirst({
  //   where: {
  //     username,
  //     password
  //   }
  // });

  const user = await prisma.user.findUnique({
    where: { username }
  });

  if (!user) {
    return res.status(401).json({ message: 'invalid username or password' });
  }

  if (user.password !== password) {
    return res.status(401).json({ message: 'invalid username or password' });
  }

  res.status(200).json({ message: 'user logged in successfully' });
}

export const authController = { register, login };
