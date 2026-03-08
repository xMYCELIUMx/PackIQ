import { PrismaClient } from "@/generated/prisma";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

function createPrismaClient() {
  const accelerateUrl =
    process.env.PRISMA_ACCELERATE_URL ??
    process.env.DATABASE_URL ??
    "prisma://local-placeholder";

  return new PrismaClient({ accelerateUrl });
}

function getPrismaClient() {
  if (globalForPrisma.prisma) {
    return globalForPrisma.prisma;
  }

  const client = createPrismaClient();

  if (process.env.NODE_ENV !== "production") {
    globalForPrisma.prisma = client;
  }

  return client;
}

// Lazy proxy prevents Prisma client construction at module-import/build-analysis time.
// The real client is instantiated on first actual usage.
export const prisma = new Proxy({} as PrismaClient, {
  get(_target, prop, receiver) {
    const client = getPrismaClient();
    return Reflect.get(client, prop, receiver);
  },
});
