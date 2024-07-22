import { Hono } from "hono";
import { fakeMovies, fakeSeries } from "../fakeContent";
import { type Movie } from "../models/movie.model";
import { type Series } from "../models/series.model";
import { searchByName } from "../utils/searchByName";

const router = new Hono()
  .get("/", (c) => {
    const allContent: (Movie | Series)[] = [...fakeMovies, ...fakeSeries].sort(
      (a, b) => b.added_date - a.added_date
    );

    return c.json(allContent);
  })
  .get("/id/:id{[a-zA-Z0-9-]+}", (c) => {
    const id = c.req.param("id");

    if (fakeMovies.some((c) => c.id === id)) {
      return c.redirect("/api/movie/id/" + id);
    }
    if (fakeSeries.some((c) => c.id === id)) {
      return c.redirect("/api/series/id/" + id);
    }

    return c.notFound();
  })
  .get("/name/:name{[a-zA-Z0-9-]+}", (c) => {
    const name = c.req.param("name");
    const content = searchByName(name);

    return c.json(content);
  });

export default router;

//TODO tests
