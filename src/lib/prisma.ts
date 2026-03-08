import { PrismaClient } from "@/generated/prisma";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

function createPrismaClient() {
  // Prisma 7 requires either an adapter or accelerateUrl.
  // We use accelerateUrl to keep the app buildable in environments where
  // driver adapter packages are unavailable at install time.
  const accelerateUrl =
    process.env.PRISMA_ACCELERATE_URL ??
    process.env.DATABASE_URL ??
    "prisma://local-placeholder";

  return new PrismaClient({ accelerateUrl });
}

export const prisma = globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
