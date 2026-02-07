process.loadEnvFile();

type DBConfig = {
	dbURL: string
}

type APIConfig = {
	port: number,
}

type Config = {
	api: APIConfig,
	db: DBConfig,
}

const api: APIConfig = {
	port: Number(process.env.PORT) || 8080,
}
const db: DBConfig = {
	dbURL: process.env.DB_URL || "Enter db url",
}

export const config: Config = {
	api,
	db,
}
