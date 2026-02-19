import { type Request, type Response, type NextFunction } from "express";
import { AppError } from "../utils/error.js";
export function errorMiddleware(err: Error, req: Request, res: Response, next: NextFunction) {
	if (err instanceof AppError) {
		return res.status(err.statusCode).json({
			message: err.message,
		});
	}

	console.error(err);

	return res.status(500).json({
		message: "Internal server error",
	});
}
