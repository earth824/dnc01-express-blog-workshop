import 'dotenv/config';
import z from 'zod';

const envSchema = z.object({
  PORT: z.coerce.number().min(0).max(65535),
  DATABASE_URL: z.url(),
  JWT_SECRET: z.string().min(32)
});

const { success, data, error } = envSchema.safeParse(process.env);
if (!success) {
  console.log(
    'environment variable validation failed:\n',
    z.prettifyError(error)
  );
  throw error;
}

export const env = data;
