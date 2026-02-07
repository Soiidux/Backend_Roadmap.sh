import { serial, pgTable, varchar, timestamp, pgEnum } from "drizzle-orm/pg-core";

export const taskStatusEnum = pgEnum("task_status", [
	"todo",
	"in-progress",
	"done",
])

export const tasks = pgTable("tasks", {
	id: serial("id").primaryKey(),
	description: varchar("description", { length: 255 }).notNull(),
	status: taskStatusEnum("status").default("todo").notNull(),
	createdAt: timestamp("created_at").defaultNow().notNull(),
	updatedAt: timestamp("updated_at").notNull().defaultNow().$onUpdate(() => new Date()),
});

export type task = typeof tasks.$inferInsert;
