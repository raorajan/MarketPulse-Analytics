CREATE TABLE "sales_data" (
	"id" serial PRIMARY KEY NOT NULL,
	"week" varchar(255) NOT NULL,
	"sales" numeric(15, 2) DEFAULT '0' NOT NULL,
	"branded_search_spend" numeric(15, 2) DEFAULT '0' NOT NULL,
	"nonbranded_search_spend" numeric(15, 2) DEFAULT '0' NOT NULL,
	"facebook_spend" numeric(15, 2) DEFAULT '0' NOT NULL,
	"print_spend" numeric(15, 2) DEFAULT '0' NOT NULL,
	"ooh_spend" numeric(15, 2) DEFAULT '0' NOT NULL,
	"tv_spend" numeric(15, 2) DEFAULT '0' NOT NULL,
	"radio_spend" numeric(15, 2) DEFAULT '0' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
