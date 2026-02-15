import { z } from "zod";

/**
 * Common reusable validators
 */
const uuidSchema = z.string().uuid();

const refreshTokenSchema = z.string();


/**
 * Add token validator
 * Used when issuing refresh token
 */
export const addTokenSchema = z.object({
	token: refreshTokenSchema,
	userId: uuidSchema,
	expiresAt: z.coerce.date(),
});


/**
 * Lookup / Refresh validator
 */
export const lookupTokenSchema = z.object({
	token: refreshTokenSchema,
	userId: uuidSchema,
});


/**
 * Revoke single token validator
 */
export const revokeTokenSchema = z.object({
	token: refreshTokenSchema,
	userId: uuidSchema,
});


/**
 * Revoke all tokens for user
 */
export const revokeAllTokensSchema = z.object({
	userId: uuidSchema,
});

