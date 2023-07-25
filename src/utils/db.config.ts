import { PrismaClient } from '@prisma/client';
import { createSoftDeleteMiddleware } from 'prisma-soft-delete-middleware';

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
  db.$use(createSoftDeleteMiddleware({
    models: {
      User: true,
      Company: true,
      Branch: true,
      Division: true
    },
    defaultConfig: {
      field: 'deletedAt',
      createValue: (deleted) => {
        if (deleted) return new Date();
        return null;
      },
    },
  }));
  db.$connect().catch((error) => {
    console.log(error);
  });
}

export { db };