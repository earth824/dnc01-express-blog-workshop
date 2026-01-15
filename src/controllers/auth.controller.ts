import type { Response, Request } from 'express';
import { prisma } from '../db/prisma.js';
import z from 'zod';
import { PrismaClientKnownRequestError } from '../db/generated/prisma/internal/prismaNamespace.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { HttpException } from '../exceptions/http.exception.js';
import { InvalidCredentialsException } from '../exceptions/invalid-credentials.exception.js';
import { UsernameExistException } from '../exceptions/username-exist.exception.js';
import { env } from '../config/env.config.js';

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
  data.password = await bcrypt.hash(data.password, 12);
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
      // return res.status(409).json({ message: 'username already in use' });
      throw new UsernameExistException();
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
  }); // { id, username, password, role }

  if (!user) {
    // return res.status(401).json({ message: 'invalid username or password' });
    throw new InvalidCredentialsException();
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    // return res.status(401).json({ message: 'invalid username or password' });
    // throw new HttpException('invalid username or password', 401);
    throw new InvalidCredentialsException();
  }

  // SIGN TOKEN// PAYLOAD: { sub: user id, username, role  } // EXPIRED 24 hour // SECRET(random) ==> PUT IN .env
  const payload = { sub: user.id, username: user.username, role: user.role };
  const secretKey = env.JWT_SECRET;
  const token = jwt.sign(payload, secretKey, { expiresIn: 24 * 60 * 60 });

  res.status(200).json({ token });
}

export const authController = { register, login };
