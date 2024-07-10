import app from "./src/server";

Bun.serve({
  port: Bun.env.PORT,
  fetch: app.fetch,
});

console.log("Server running on port: " + Bun.env.PORT);
