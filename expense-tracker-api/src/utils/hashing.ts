import argon2 from "argon2";
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

