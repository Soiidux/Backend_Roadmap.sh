import crypto from "crypto";

export function makeRefreshToken(): string {
	const token = crypto.randomBytes(256).toString('hex');
	return token;
}
