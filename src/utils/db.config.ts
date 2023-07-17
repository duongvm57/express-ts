import { PrismaClient } from '@prisma/client';

let db: PrismaClient;

declare global {
    // eslint-disable-next-line no-unused-vars
    var __db: PrismaClient | undefined;
}

if (!global.__db) {
  global.__db = new PrismaClient({
    errorFormat: 'minimal',
  });
  db = global.__db;
  db.$connect().catch((error) => {
    console.log(error);
  });
}

export { db };