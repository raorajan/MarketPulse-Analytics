const {
  pgTable,
  serial,
  varchar,
  numeric,
  timestamp,
} = require("drizzle-orm/pg-core");

const salesData = pgTable("sales_data", {
  id: serial("id").primaryKey(),

  week: varchar("week", { length: 50 }).notNull(),

  sales: numeric("sales", {
    precision: 15,
    scale: 2,
  }).notNull(),

  branded_search_spend: numeric("branded_search_spend", {
    precision: 15,
    scale: 2,
  }).notNull(),

  nonbranded_search_spend: numeric("nonbranded_search_spend", {
    precision: 15,
    scale: 2,
  }).notNull(),

  facebook_spend: numeric("facebook_spend", {
    precision: 15,
    scale: 2,
  }).notNull(),

  print_spend: numeric("print_spend", {
    precision: 15,
    scale: 2,
  }).notNull(),

  ooh_spend: numeric("ooh_spend", {
    precision: 15,
    scale: 2,
  }).notNull(),

  tv_spend: numeric("tv_spend", {
    precision: 15,
    scale: 2,
  }).notNull(),

  radio_spend: numeric("radio_spend", {
    precision: 15,
    scale: 2,
  }).notNull(),

  createdAt: timestamp("created_at").defaultNow().notNull(),

  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

module.exports = { salesData };