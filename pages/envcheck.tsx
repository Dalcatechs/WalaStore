export default function EnvCheck() {
  return (
    <pre style={{ padding: 24 }}>
      {JSON.stringify(
        {
          URL: process.env.NEXT_PUBLIC_SUPABASE_URL ?? null,
          HAS_KEY: Boolean(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY),
        },
        null,
        2
      )}
    </pre>
  );
}
