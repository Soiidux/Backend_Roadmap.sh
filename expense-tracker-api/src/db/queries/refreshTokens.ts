import { refreshTokens, type refreshToken } from "../schema.js";
import { eq, and, gt, isNull } from "drizzle-orm";
import { db } from "../index.js";

export async function addToken(token: refreshToken) {
	const [result] = await db
		.insert(refreshTokens)
		.values(token)
		.onConflictDoNothing()
		.returning();
	return result;
}

export async function lookupToken(token: string, userId: string) {
	const [result] = await db
		.select()
		.from(refreshTokens)
		.where(and(
			eq(refreshTokens.token, token),
			eq(refreshTokens.userId, userId),
			isNull(refreshTokens.revoked_at),
			gt(refreshTokens.expiresAt, new Date())
		));
	return result;
}

export async function revokeToken(token: string, userId: string) {
	const [result] = await db
		.update(refreshTokens)
		.set({ revoked_at: new Date() })
		.where(and(
			eq(refreshTokens.token, token),
			eq(refreshTokens.userId, userId)
		))
		.returning();
	return result;
}

export async function revokeAllUserTokens(userId: string) {
	await db
		.update(refreshTokens)
		.set({ revoked_at: new Date() })
		.where(eq(refreshTokens.userId, userId));
}

