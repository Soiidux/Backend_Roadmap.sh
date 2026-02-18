import jwt, { type JwtPayload } from "jsonwebtoken";
import { type Request } from "express";
type Payload = Pick<JwtPayload, "iss" | "sub" | "iat" | "exp">;

export function makeJWT(userId: string, expiresIn: number, secret: string): string {
	const iat = Math.floor(Date.now() / 1000);
	const payload: Payload = {
		iss: "expenseTracker",
		sub: userId,
		iat,
		exp: iat + expiresIn
	}
	const token = jwt.sign(payload, secret);
	return token;
}


export function validateJWT(token: string, secret: string) {
	try {
		const decoded = jwt.verify(token, secret);
		if (!decoded || typeof decoded == "string") {
			throw new Error("Error in decoding the jwt");
		}
		return decoded.sub;
	}
	catch (err) {
		console.log("Error in validating JWT");
		console.log(err);
	}
}


export function getJwtToken(req: Request): string {
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

