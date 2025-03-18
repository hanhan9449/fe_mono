export async function getCount(
  key: string,
  customFetch?: typeof fetch,
): Promise<number> {
  try {
    const res = await (customFetch || fetch)(
      "https://get-count.w.hanhan9449.top",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          key,
        }),
      },
    );
    const json = await res.json();
    return json.data || 0;
  } catch (e) {
    console.error("getCount", e);
    return 0;
  }
}

export async function incCount(key: string): Promise<number> {
  const res = await fetch("https://inc-count.w.hanhan9449.top", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      key,
    }),
  });
  const json = await res.json();
  return json.data || 0;
}
