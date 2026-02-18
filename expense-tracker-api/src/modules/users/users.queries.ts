import { db } from "../../db/index.js";
import { type NewUser, users } from "../../db/schema.js";
import { eq } from "drizzle-orm";

type UpdateData = Partial<Omit<NewUser, "id" | "createdAt" | "updatedAt">>;

export async function createUser(user: NewUser) {
	const [result] = await db
		.insert(users)
		.values(user)
		.onConflictDoNothing()
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

export async function updateUser(userId: string, data: UpdateData) {
	const [result] = await db
		.update(users)
		.set(data)
		.where(
			eq(users.id, userId)
		)
		.returning({
			id: users.id,
			email: users.email,
			name: users.name,
			phoneNumber: users.phoneNumber,
		});
	return result;
}

export async function deleteUser(userId: string) {
	const [result] = await db
		.delete(users)
		.where(
			eq(users.id, userId)
		)
		.returning({
			id: users.id,
			email: users.email,
			name: users.name,
			phoneNumber: users.phoneNumber,
		});
	return result;
}




