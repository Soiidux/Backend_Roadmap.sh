import { type Config } from "../config.js";
import { addCommand, updateCommand, deleteCommand, markCommand, listCommand, helpCommand } from "./command_callbacks.js";
export type Command = {
	name: string,
	description: string,
	usage: string,
	callback: (config: Config, ...args: string[]) => Promise<void>
}

export function getCommands(): Record<string, Command> {
	return {
		add: {
			name: "add",
			description: "Add task to database",
			usage: "add <task> <status?>",
			callback: addCommand,
		},
		update: {
			name: "update",
			description: "Update a task in database",
			usage: "update <id> <task>",
			callback: updateCommand,
		},
		delete: {
			name: "delete",
			description: "Delete a task from database",
			usage: "delete <id>",
			callback: deleteCommand
		},
		mark: {
			name: "mark",
			description: "Mark the status of a task in database",
			usage: "mark-<status> <id>",
			callback: markCommand
		},
		list: {
			name: "list",
			description: "List tasks",
			usage: "list <status?>",
			callback: listCommand
		},
		help: {
			name: "help",
			description: "List of all commands",
			usage: "help",
			callback: helpCommand
		}
	}
}





