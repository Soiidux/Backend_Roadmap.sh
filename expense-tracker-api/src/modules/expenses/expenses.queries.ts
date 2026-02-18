import { db } from "../../db/index.js";
import { expenses, type NewExpense, categoryEnum } from "../../db/schema.js";
import { eq, gte, lte, and, desc, sum } from "drizzle-orm";
export type UpdateData = Partial<Omit<NewExpense, "id" | "userId" | "updatedAt">>;

export async function createExpense(expense: NewExpense) {
	const [result] = await db
		.insert(expenses)
		.values(expense)
		.onConflictDoNothing()
		.returning();
	return result;
}

export async function updateExpense(expenseId: string, userId: string, data: UpdateData) {
	const [result] = await db
		.update(expenses)
		.set(data)
		.where(
			and(
				eq(expenses.id, expenseId),
				eq(expenses.userId, userId)
			)
		)
		.returning();
	return result;
}

export async function deleteExpense(expenseId: string, userId: string) {
	const [result] = await db
		.delete(expenses)
		.where(
			and(
				eq(expenses.id, expenseId),
				eq(expenses.userId, userId)
			)
		)
		.returning()
	return result;
}

export async function filterExpense(userId: string, startDate?: Date, endDate?: Date, category?: typeof categoryEnum.enumValues[number]) {
	const conditions = [
		eq(expenses.userId, userId),
	];

	if (startDate) {
		conditions.push(
			gte(expenses.doneAt, startDate)
		)
	}
	if (endDate) {
		conditions.push(
			lte(expenses.doneAt, endDate)
		)
	}
	if (category) {
		conditions.push(eq(expenses.category, category));
	}

	const result = await db
		.select()
		.from(expenses)
		.where(and(...conditions))
		.orderBy(desc(expenses.doneAt));
	return result;
}

export async function filterAndSumExpense(userId: string, startDate?: Date, endDate?: Date) {
	const conditions = [
		eq(expenses.userId, userId),
	];

	if (startDate) {
		conditions.push(
			gte(expenses.doneAt, startDate)
		)
	}
	if (endDate) {
		conditions.push(
			lte(expenses.doneAt, endDate)
		)
	}

	const [result] = await db
		.select({
			total: sum(expenses.amount)
		})
		.from(expenses)
		.where(and(...conditions));
	return Number(result?.total ?? 0);
}
