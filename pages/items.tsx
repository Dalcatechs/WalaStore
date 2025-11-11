import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL as string,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string
);

type Item = { id: number; name: string; price_cents: number; qty: number };

export default function Items() {
  const [items, setItems] = useState<Item[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      const { data, error } = await supabase
        .from("items")
        .select("id, name, price_cents, qty")
        .eq("active", true)
        .order("name", { ascending: true });

      if (error) setError(error.message);
      else setItems((data as any) ?? []);
    })();
  }, []);

  if (error) return <pre style={{ padding: 24 }}>Error: {error}</pre>;

  return (
    <main style={{ padding: 24, maxWidth: 720, margin: "0 auto" }}>
      <h1>In Stock</h1>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {items.map((it) => (
          <li key={it.id} style={{ border: "1px solid #eee", borderRadius: 12, padding: 16, marginTop: 12 }}>
            <div style={{ fontWeight: 600 }}>{it.name}</div>
            <div>Price: ${(it.price_cents / 100).toFixed(2)}</div>
            <div>Qty: {Number(it.qty)}</div>
          </li>
        ))}
      </ul>
    </main>
  );
}
