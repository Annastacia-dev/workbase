import { createClient } from "@supabase/supabase-js";
import { PrismaClient } from "@prisma/client";

const EMAIL = process.env.SUPERUSER_EMAIL ?? "admin@workplace.com";
const PASSWORD = process.env.SUPERUSER_PASSWORD;
const FULL_NAME = "Platform Admin";

async function main() {
  if (!PASSWORD) {
    throw new Error("SUPERUSER_PASSWORD is not set.");
  }

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const publishableKey =
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ??
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !publishableKey) {
    throw new Error("Missing Supabase URL or publishable key.");
  }

  const prisma = new PrismaClient({
    datasources: {
      db: { url: process.env.DIRECT_URL || process.env.DATABASE_URL },
    },
  });
  const supabase = createClient(url, publishableKey);

  const { data, error } = await supabase.auth.signUp({
    email: EMAIL,
    password: PASSWORD,
    options: { data: { full_name: FULL_NAME } },
  });

  if (error && !error.message.toLowerCase().includes("already")) {
    throw error;
  }

  await prisma.$executeRaw`
    UPDATE auth.users
    SET email_confirmed_at = COALESCE(email_confirmed_at, NOW())
    WHERE email = ${EMAIL}
  `;

  const rows = await prisma.$queryRaw<Array<{ id: string }>>`
    SELECT id::text AS id FROM auth.users WHERE email = ${EMAIL} LIMIT 1
  `;

  const authUserId = data.user?.id ?? rows[0]?.id;
  if (!authUserId) {
    throw new Error("Could not resolve the Auth user id for the superuser.");
  }

  await prisma.user.upsert({
    where: { email: EMAIL },
    create: {
      id: authUserId,
      email: EMAIL,
      fullName: FULL_NAME,
      isSuperuser: true,
    },
    update: {
      isSuperuser: true,
      fullName: FULL_NAME,
    },
  });

  console.log(`Superuser ready: ${EMAIL}`);
  await prisma.$disconnect();
}

main().catch(async (error) => {
  console.error(error);
  process.exit(1);
});
