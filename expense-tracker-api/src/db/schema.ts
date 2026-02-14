import { uuid, integer, pgTable, varchar, timestamp, text } from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";

export const users = pgTable("users", {
	id: uuid("id").primaryKey().notNull().defaultRandom(),
	createdAt: timestamp("created_at").notNull().defaultNow(),
	updatedAt: timestamp("updated_at").notNull().defaultNow().$onUpdate(() => new Date()),
	email: varchar("email", { length: 256 }).unique().notNull(),
	hashedPassword: varchar("hashed_password", { length: 256 }).notNull().default("unset"),
	phoneNumber: integer("phone_number"),
})


export const refreshTokens = pgTable("refresh_tokens", {
	token: text("token").primaryKey(),
	createdAt: timestamp("created_at").notNull().defaultNow(),
	updatedAt: timestamp("updated_at").notNull().defaultNow().$onUpdate(() => new Date()),
	userId: uuid("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
	expiresAt: timestamp("expires_at").notNull().default(sql`NOW() + INTERVAL '60 DAYS'`),
	revoked_at: timestamp("revoked_at"),
});

export const expenses = pgTable("expenses", {
	id: uuid("id").notNull().primaryKey().defaultRandom(),
	userId: uuid("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
	doneAt: timestamp("done_at").notNull().defaultNow(),
	updatedAt: timestamp("updated_at").notNull().defaultNow().$onUpdate(() => new Date()),
	amount: integer("amount").notNull(),
	category: varchar("category", { length: 50 }).notNull().default("Other"),
})
