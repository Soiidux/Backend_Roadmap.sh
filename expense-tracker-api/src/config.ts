process.loadEnvFile();

type apiConfig = {
	port: number
}

type dbConfig = {
	dbURL: string
}

type Config = {
	api: apiConfig,
	db: dbConfig,
}

const api: apiConfig = {
	port: Number(process.env.PORT) || 8080,
}

const db: dbConfig = {
	dbURL: process.env.DB_URL || "no db url found",
}

export const config: Config = {
	api,
	db,
}



