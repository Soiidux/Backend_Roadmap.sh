import { z } from "zod";


export const createUserSchema = z.object({
	email: z.string().email(),
	password: z.string().min(8),
	name: z.string(),
	phoneNumber: z.coerce.number().int().positive().optional()
});

export const updateUserSchema = createUserSchema.partial();

export const deleteUserSchema = z.object({
	userId: z.string().uuid(),
});

export const loginSchema = z.object({
	email: z.string().email(),
	password: z.string()
});
