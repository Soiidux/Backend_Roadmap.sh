import { z } from "zod";



export const updateUserSchema = z.object({
	email: z.string().email().optional(),
	password: z.string().min(8).optional(),
	name: z.string().optional(),
	phoneNumber: z.coerce.number().int().positive().optional()
});

export const deleteUserSchema = z.object({
	userId: z.string().uuid(),
});


