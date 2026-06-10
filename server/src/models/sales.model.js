import { pgTable, serial, varchar, numeric, timestamp } from "drizzle-orm/pg-core";

export const salesData = pgTable("sales_data", {
  id: serial("id").primaryKey(),
  week: varchar("week", { length: 255 }).notNull(),
  sales: numeric("sales", { precision: 15, scale: 2 }).notNull().default('0'),
  branded_search_spend: numeric("branded_search_spend", { precision: 15, scale: 2 }).notNull().default('0'),
  nonbranded_search_spend: numeric("nonbranded_search_spend", { precision: 15, scale: 2 }).notNull().default('0'),
  facebook_spend: numeric("facebook_spend", { precision: 15, scale: 2 }).notNull().default('0'),
  print_spend: numeric("print_spend", { precision: 15, scale: 2 }).notNull().default('0'),
  ooh_spend: numeric("ooh_spend", { precision: 15, scale: 2 }).notNull().default('0'),
  tv_spend: numeric("tv_spend", { precision: 15, scale: 2 }).notNull().default('0'),
  radio_spend: numeric("radio_spend", { precision: 15, scale: 2 }).notNull().default('0'),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});