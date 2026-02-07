import { addTask, updateTask, deleteTask, markTask, listAll, listDone, listInProgress, listNotDone, listTodo } from "../db/queries/tasks.js";
import { type Status, statusEnum } from "../db/queries/tasks.js";
import { type Config } from "../config.js";

function isValidStatus(value: string): value is statusEnum {
	return Object.values(statusEnum).includes(value as statusEnum);
}
export async function addCommand(config: Config, description: string, status?: string): Promise<void> {
	if (!description) {
		console.log("Correct usage: ", config.cli.commands.add);
		return;
	}
	if (status && !isValidStatus(status)) {
		console.log("Invalid status");
		return;
	}
	const taskRecord = await addTask(description, status as Status);
	if (!taskRecord) {
		console.log("Error creating record");
		return;
	}
	console.log(`Task added successfully (ID: ${taskRecord.id})`);
	return;
}

export async function updateCommand(config: Config, idRaw: string, description: string): Promise<void> {
	const id = Number(idRaw);
	if (!description || !id) {
		console.log("Correct usage: ", config.cli.commands.update);
		return;
	}
	const taskRecord = await updateTask(id, description);
	if (!taskRecord) {
		console.log("Error updating the task");
		return;
	}
	console.log("Task updated successfully");
	console.log("ID: ", taskRecord.id);
	console.log("New description: ", taskRecord.description);
}

export async function deleteCommand(config: Config, idRaw: string): Promise<void> {
	const id = Number(idRaw);
	if (!idRaw || Number.isNaN(id)) {
		console.log("Correct usage: ", config.cli.commands.delete);
		return;
	}
	const taskRecord = await deleteTask(id);
	if (!taskRecord) {
		console.log("Error deleting the task");
		return;
	}
	console.log("Task deleted ID: ", taskRecord.id);
}

export async function markCommand(config: Config, idRaw: string, status: string): Promise<void> {
	const id = Number(idRaw);
	if (!status || (status && !isValidStatus(status))) {
		console.log("Invalid status, correct usage:", config.cli.commands.mark);
		return;
	}
	const taskRecord = await markTask(id, status as Status);
	if (!taskRecord) {
		console.log("Error marking the task");
		return;
	}
	console.log("Task marked as ", status);
	console.log("ID: ", taskRecord.id);
	console.log("New Status: ", taskRecord.status);
}

export async function listCommand(config: Config, status?: string): Promise<void> {
	let taskRecord;
	if (!status) {
		taskRecord = await listAll();
	}
	if (status && !isValidStatus(status) && status !== "not-done") {
		console.log("Invalid status, correct usage:", config.cli.commands.list);
		return;
	}
	switch (status) {
		case "todo":
			taskRecord = await listTodo();
			break;
		case "done":
			taskRecord = await listDone();
			break;
		case "in-progress":
			taskRecord = await listInProgress();
			break;
		case "not-done":
			taskRecord = await listNotDone();
			break;
		default:
			taskRecord = await listAll();
	}

	if (!taskRecord) {
		console.log("Error fetching records");
		return;
	}
	console.log(taskRecord);
	return;
}

export async function helpCommand(config: Config) {
	console.log("Heres the list of commands");
	console.log(config.cli.commands);
}


