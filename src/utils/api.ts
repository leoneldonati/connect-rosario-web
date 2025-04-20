export const res = (payload: object, s = 200) =>
  new Response(JSON.stringify(payload), {
    status: s,
    headers: { "Content-Type": "application/json" },
  });
