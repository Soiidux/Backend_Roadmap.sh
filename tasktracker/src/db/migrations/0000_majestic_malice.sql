CREATE TYPE "public"."task_status" AS ENUM('todo', 'in-progress', 'done');--> statement-breakpoint
CREATE TABLE "tasks" (
	"id" serial PRIMARY KEY NOT NULL,
	"description" varchar(255) NOT NULL,
	"status" "task_status" DEFAULT 'todo' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
