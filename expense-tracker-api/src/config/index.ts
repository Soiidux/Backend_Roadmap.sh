process.loadEnvFile();

type apiConfig = {
	port: number
	JwtSecret: string
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
	JwtSecret: process.env.JWT_SECRET || "JWT secret not found"
}

const db: dbConfig = {
	dbURL: process.env.DB_URL || "no db url found",
}

const config: Config = {
	api,
	db,
}

export default config;



