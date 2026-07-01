const SUPABASE_URL = "https://vpysqshhafthuxvokwqj.supabase.co";
const ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZweXNxc2hoYWZ0aHV4dm9rd3FqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTAzNTY3ODcsImV4cCI6MjA2NTkzMjc4N30.fza16gc2qHpGzzMFa1H3O6W-YIsVTsCLH9uYy9pR31I";
const KEY_RE = /^[a-f0-9]{32}$/i;
export const dynamic = "force-dynamic";
export async function GET(req: Request) {
  const url = new URL(req.url);
  const key = (url.searchParams.get("key") ?? "").toLowerCase();
  if (!KEY_RE.test(key)) return new Response("Not Found", { status: 404 });
  const res = await fetch(
    `${SUPABASE_URL}/functions/v1/serve-indexnow-key?key=${key}&host=${encodeURIComponent(url.host)}`,
    { headers: { Authorization: `Bearer ${ANON_KEY}`, apikey: ANON_KEY } },
  );
  if (!res.ok) return new Response("Not Found", { status: 404 });
  return new Response(await res.text(), {
    status: 200,
    headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "public, max-age=86400" },
  });
}
