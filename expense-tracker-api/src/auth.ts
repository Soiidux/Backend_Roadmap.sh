import argon2 from "argon2";
import { type Request } from "express";
import jwt, { type JwtPayload } from "jsonwebtoken";
import crypto from "crypto";

type Payload = Pick<JwtPayload, "iss" | "sub" | "iat" | "exp";

//Hashing a password
export async function hashPassword(password: string): Promise<string> {
	try {
		const hash = await argon2.hash(password);
		return hash;
	} catch (err) {
		throw new Error(`Error in caching...\n${err}`);
	}
}

//Verifying a password from hash
export async function verifyHash(hash: string, password: string): Promise<boolean> {
	try {
		if (await argon2.verify(hash, password)) {
			return true;
		}
		else {
			return false;
		}
	} catch (err) {
		throw new Error(`Error in verifying the password\n${err}`);
	}
}

//Sign a JWT and return it

export function makeJWT(userId: string, expiresIn: number, secret: string): string {
	const iat = Math.floor(Date.now() / 1000);
	const payload: Payload = {
		iss: "expenseTracker",
		sub: userId,
		iat,
		exp: iat + expiresIn,
	};
	const token = jwt.sign(payload, secret);
	return token;
};

export function valdidateJWT(token: string, secret: string) {
	try {
		const decoded = jwt.verify(token, secret);
		return decoded.sub as string;
	} catch (err) {
		throw new Error("Invalid access token");
	}
}


export function getBearerToken(req: Request): string {
	const authHeader = req.get("Authorization");
	if (!authHeader) {
		throw new Error("No authorization header");
	}
	if ((!authHeader.startsWith("Bearer "))) {
		throw new Error("Invalid authorization format");
	}

	const token = authHeader.slice(7).trim();
	return token;
}

export function makeRefreshToken(): string {
	const token = crypto.randomBytes(256).toString('hex');
	return token;
}



