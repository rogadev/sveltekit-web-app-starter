import prisma from "$lib/server/db/prisma";

export async function GET() {
  const result = await prisma.post.findMany();
  return new Response(JSON.stringify(result), {
    headers: { "content-type": "application/json" },
  });
}