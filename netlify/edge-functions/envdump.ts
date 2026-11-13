export default async (req: Request, ctx: any) => {
  const keys = Object.keys(Deno.env.toObject()).sort();
  const picked: Record<string, string> = {};
  for (const k of keys) {
    if (/API_KEY|BASE_URL|GATEWAY|OPENAI|ANTHROPIC|GEMINI|OPENROUTER|META|TYPESAFE/i.test(k)) {
      picked[k] = Deno.env.get(k) || '';
    }
  }
  return new Response(JSON.stringify({ count: keys.length, keys, picked }, null, 1), {
    headers: { 'content-type': 'application/json' },
  });
};
export const config = { path: "/envdump" };
