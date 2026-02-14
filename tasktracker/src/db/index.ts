import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

import * as schema from "./schema.js";
import { config } from "../config.js";

export function createDB(dbURL: string) {
	const connection = postgres(config.db.dbURL);
	return drizzle(connection, { schema });
}
