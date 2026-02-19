import { refreshTokens, type refreshToken, users, NewUser } from "../../db/schema.js";
import { eq, and, gt, isNull } from "drizzle-orm";
import { db } from "../../db/index.js";


export async function createUser(user: NewUser) {
	const [result] = await db
		.insert(users)
		.values(user)
		.returning({
			id: users.id,
			createdAt: users.createdAt,
			updatedAt: users.updatedAt,
			email: users.email,
			name: users.name,
			phoneNumber: users.phoneNumber
		})
	return result;
}

export async function lookupUser(email: string) {
	const [result] = await db
		.select()
		.from(users)
		.where(eq(users.email, email))
	return result;
}

export async function addToken(token: refreshToken) {
	const [result] = await db
		.insert(refreshTokens)
		.values(token)
		.onConflictDoNothing()
		.returning();
	return result;
}

export async function lookupToken(token: string) {
	const [result] = await db
		.select()
		.from(refreshTokens)
		.where(and(
			eq(refreshTokens.token, token),
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

