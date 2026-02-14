import { db } from "../index.js";
import { type NewUser, users } from "../schema.js";
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
