process.loadEnvFile();
import { type Command, getCommands } from "./commands/command.js"
type DBConfig = {
	dbURL: string
}

type CLIConfig = {
	commands: Record<string, Command>
}

export type Config = {
	cli: CLIConfig,
	db: DBConfig,
}

const cli: CLIConfig = {
	commands: getCommands(),
}
const db: DBConfig = {
	dbURL: process.env.DB_URL || "Enter db url",
}

export const config: Config = {
	cli,
	db,
}
