import * as authQuery from "./auth.queries.js";
import { hashPassword, verifyHash } from "../../utils/hashing.js";
import { AppError, BadRequestError, UnauthorizedError, NotFoundError, ConflictError } from "../../utils/error.js";
import { makeJWT, validateJWT } from "../../utils/jwt.js";
import { makeRefreshToken } from "../../utils/token.js";
import config from "../../config/index.js";

export async function signUpUser(email: string, password: string, name: string, phoneNumber: number) {
	try {
		const hashedPassword = await hashPassword(password);
		const newUser = await authQuery.createUser({
			email,
			hashedPassword,
			name,
			phoneNumber,
		})
		return newUser;
	} catch (err: any) {
		if (err.code === "23505") {
			throw new BadRequestError("Email already exists");
		}
		throw new AppError("Database error while creating user", 500);
	}

}


export async function loginUser(email: string, password: string) {
	try {
		const userRecord = await authQuery.lookupUser(email);
		if (!userRecord) {
			throw new UnauthorizedError("Invalid credentials");
		}
		if (await verifyHash(userRecord.hashedPassword, password)) {
			const accessToken = makeJWT(userRecord.id, 900, config.api.JwtSecret);
			const refreshToken = makeRefreshToken();
			await authQuery.addToken({
				token: refreshToken,
				userId: userRecord.id,
			})
			return {
				accessToken,
				refreshToken
			};
		} else {
			throw new UnauthorizedError("Invalid credentials");
		}

	} catch (err: any) {
		throw err;
	}
}

export async function refresh(refreshToken: string) {
	const tokenRecord = await authQuery.lookupToken(refreshToken);

	if (!tokenRecord) {
		throw new UnauthorizedError("Invalid refresh token");
	}

	const accessToken = makeJWT(tokenRecord.userId, 900, config.api.JwtSecret);

	return {
		accessToken,
		refreshToken
	}
}

export async function logout(refreshToken: string) {
	const tokenRecord = await authQuery.lookupToken(refreshToken);
	if (!tokenRecord) {
		throw new UnauthorizedError("Invalid refresh token");
	}
	await authQuery.revokeToken(refreshToken, tokenRecord.userId);
}
