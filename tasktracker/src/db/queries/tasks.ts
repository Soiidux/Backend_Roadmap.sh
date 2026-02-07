import { db } from "../index.js";
import { tasks, type task } from "../schema.js";
import { eq, ne } from "drizzle-orm";
type Status = "todo" | "in-progress" | "done";
enum statusEnum {
	todo = "todo",
	in_progress = "in-progress",
	done = "done",
}
export async function addTask(description: string, status?: Status) {
	const [result] = await db
		.insert(tasks)
		.values({
			description: description,
			status: status ?? statusEnum.todo,
		})
		.returning();
	return result;
}

export async function updateTask(id: string, description?: string, status?: Status) {
	const updateData: Partial<{
		description: string,
		status: Status,
	}> = {};

	if (description !== undefined) {
		updateData.description = description;
	}

	if (status !== undefined) {
		updateData.status = status;
	}

	const [result] = await db
		.update(tasks)
		.set(updateData)
		.where(eq(tasks.id, id))
		.returning();

	return result;
}

export async function deleteTask(id: string) {
	const [result] = await db
		.delete(tasks)
		.where(eq(tasks.id, id))
		.returning()
	return result;
}


export async function listAll() {
	const result = await db
		.select()
		.from(tasks)
	return result;
}

export async function listTodo() {
	const result = await db
		.select()
		.from(tasks)
		.where(eq(tasks.status, statusEnum.todo));
	return result;
}

export async function listInProgress() {
	const result = await db
		.select()
		.from(tasks)
		.where(eq(tasks.status, statusEnum.in_progress));
	return result;
}

export async function listDone() {
	const result = await db
		.select()
		.from(tasks)
		.where(eq(tasks.status, statusEnum.done));
	return result;
}

export async function listNotDone() {
	const result = await db
		.select()
		.from(tasks)
		.where(ne(tasks.status, statusEnum.done));
	return result;
}


