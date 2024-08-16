import {
  integer,
  pgEnum,
  pgTable,
  serial,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";

const seriesEnum = pgEnum("media_type", ["movie", "tv"]);

export const seriesTable = pgTable("series_table", {
  id: uuid("id").primaryKey().defaultRandom(),
  tmdb_id: text("tmdb_id").notNull(),
  name: text("title").notNull(),
  number_of_seasons: integer("number_of_seasons"),
  number_of_episodes: integer("number_of_episodes"),
  first_air_date: text("first_air_date"),
  genres: text("genres").array(),
  overview: text("overview"),
  created_by: text("created_by").array(),
  homepage: text("homepage"),
  poster_path: text("poster_path"),
  popularity: integer("popularity"),
  vote_average: integer("vote_average"),
  media_type: seriesEnum("media_type"),
  added_date: timestamp("added_date").notNull().defaultNow(),
  user_id: text("user_id").notNull(),
});

export const seasonsTable = pgTable("seasons_table", {
  id: serial("id").primaryKey(),
  series_id: uuid("series_id").references(() => seriesTable.id, {
    onDelete: "cascade",
  }),
  air_date: text("air_date"),
  episode_count: integer("episode_count"),
  name: text("name"),
  overview: text("overview"),
  poster_path: text("poster_path"),
  season_number: integer("season_number"),
  vote_average: integer("vote_average"),
});

export type InsertSeries = typeof seriesTable.$inferInsert;
export type SelectSeasons = typeof seasonsTable.$inferSelect;

export type InsertSeasons = typeof seasonsTable.$inferInsert;
export type SelectSeries = typeof seriesTable.$inferSelect;
