#!/usr/bin/env node

import { config } from "./config.js";
import { createDB } from "./db/index.js";

export const db = createDB(config.db.dbURL);
async function main() {
	const args = process.argv.slice(2);

	if (args.length === 0) {
		console.log("No command provided");
		process.exit(1);
	}

	const commandName = args[0];
	const commandArgs = args.slice(1);
	const commands = config.cli.commands;
	const command = commands[commandName!];

	if (!command) {
		console.log("Unknown command: ", commandName);
		process.exit(1);
	}

	try {
		await command.callback(config, ...commandArgs);
	} catch (err) {
		console.error("Error: ", err);
		process.exit(1);
	}
}

await main();
process.exit(0);
