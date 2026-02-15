import { z } from "zod";
import { categoryEnum } from "../db/schema.js";

const categoryValues = categoryEnum.enumValues;
export const createExpenseSchema = z.object({
	amount: z.coerce.number().int().positive(),
	category: z.enum(categoryValues),
	doneAt: z.coerce.date().optional(),
})

export const updateExpenseSchema = createExpenseSchema.partial();

export const filterExpenseSchema = z.object({
	startDate: z.coerce.date().optional(),
	endDate: z.coerce.date().optional(),
	category: z.enum(categoryValues).optional()
}).refine(
	(data) =>
		!data.startDate ||
		!data.endDate ||
		data.startDate <= data.endDate,
	{
		message: "startDate must be before endDate",
	}
);

export const deleteExpenseSchema = z.object({
	expenseId: z.string().uuid(),
})
