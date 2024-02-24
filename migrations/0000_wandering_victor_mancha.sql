CREATE TABLE IF NOT EXISTS "email_verification" (
	"id" serial PRIMARY KEY NOT NULL,
	"email" text,
	"token" text,
	"expiry" bigint NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "email_verification_email_unique" UNIQUE("email"),
	CONSTRAINT "email_verification_token_unique" UNIQUE("token")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "password_reset_requests" (
	"id" serial PRIMARY KEY NOT NULL,
	"email" text,
	"token" text,
	"expiry" bigint NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "password_reset_requests_email_unique" UNIQUE("email"),
	CONSTRAINT "password_reset_requests_token_unique" UNIQUE("token")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "sessions" (
	"id" serial PRIMARY KEY NOT NULL,
	"token" text,
	"expiry" bigint NOT NULL,
	"user_id" integer,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "sessions_token_unique" UNIQUE("token")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"email" text,
	"password" text,
	"score" integer DEFAULT 0 NOT NULL,
	"country" varchar(2) NOT NULL,
	"email_verified" boolean DEFAULT false NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "sessions" ADD CONSTRAINT "sessions_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
