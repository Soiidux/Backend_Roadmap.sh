import type { Request, Response, NextFunction } from "express";
import { getJwtToken } from "../utils/jwt.js";      // adjust path if needed
import { validateJWT } from "../utils/jwt.js";      // adjust path if needed
import config from "../config/index.js";
import { AppError } from "../utils/error.js";      // adjust path if needed

export function authMiddleware(
	req: Request,
	_res: Response,
	next: NextFunction
) {
	try {
		const token = getJwtToken(req);

		if (!token) {
			throw new AppError("Authorization token missing", 401);
		}

		const decoded = validateJWT(token, config.api.JwtSecret);

		req.user = { userId: decoded! };

		next();
	} catch (err) {
		next(err);
	}
}

