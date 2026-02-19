import type { Request, Response, NextFunction } from "express";
import * as authService from "./auth.services.js";

/**
 * POST /auth/signup
 */
export async function signup(
	req: Request,
	res: Response,
	next: NextFunction
) {
	try {
		const { email, password, name, phoneNumber } = req.body;

		const user = await authService.signUpUser(
			email,
			password,
			name,
			phoneNumber
		);

		res.status(201).json(user);
	} catch (err) {
		next(err);
	}
}

/**
 * POST /auth/login
 */
export async function login(
	req: Request,
	res: Response,
	next: NextFunction
) {
	try {
		const { email, password } = req.body;

		const tokens = await authService.loginUser(
			email,
			password
		);

		res.status(200).json(tokens);
	} catch (err) {
		next(err);
	}
}

/**
 * POST /auth/refresh
 */
export async function refresh(
	req: Request,
	res: Response,
	next: NextFunction
) {
	try {
		const { refreshToken } = req.body;

		const tokens = await authService.refresh(
			refreshToken
		);

		res.status(200).json(tokens);
	} catch (err) {
		next(err);
	}
}

/**
 * POST /auth/logout
 */
export async function logout(
	req: Request,
	res: Response,
	next: NextFunction
) {
	try {
		const { refreshToken } = req.body;

		await authService.logout(refreshToken);

		res.status(204).send();
	} catch (err) {
		next(err);
	}
}

