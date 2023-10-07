CREATE TABLE IF NOT EXISTS "products" (
	"id" text NOT NULL,
	"title" text,
	"description" text,
	"price" double precision,
	"discountPercentage" double precision NOT NULL,
	"rating" double precision,
	"stock" double precision,
	"brand" text,
	"category" text,
	"prompt" text,
	"thumbnail" text,
	"image" text[],
	"created_at" timestamp DEFAULT now()
);
