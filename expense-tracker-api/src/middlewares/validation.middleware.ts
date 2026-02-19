import type { Request, Response, NextFunction } from "express";
import type { z } from "zod";
import { AppError } from "../utils/error.js";

export function validate<T extends z.ZodType<any, any, any>>(schema: T) {
	return (req: Request, res: Response, next: NextFunction) => {
		const result = schema.safeParse({
			body: req.body,
			//query: req.query
			//params: req.params,
		});

		if (!result.success) {
			const formatted = result.error.flatten();
			return next(
				new AppError(
					JSON.stringify(formatted.fieldErrors),
					400
				)
			);
		}

		req.body = result.data;
		next();
	}
}
