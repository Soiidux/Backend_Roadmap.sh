import { z } from "zod";



export const loginSchema = z.object({
	email: z.string().email(),
	password: z.string()
});

export const signUpSchema = z.object({
	email: z.string().email(),
	password: z.string().min(8),
	name: z.string(),
	phoneNumber: z.coerce.number().int().positive().optional()
});

export const refreshSchema = z.object({
	refreshToken: z.string(),
})


export const logoutSchema = z.object({
	refreshToken: z.string(),
})
