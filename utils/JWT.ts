import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

interface Payload {
	id: string;
}

interface PayloadVerified extends jwt.JwtPayload {
	id: string;
	email: string;
}

export const generateJWT = (payload: Payload) => {
	return jwt.sign(payload, process.env.JWT_SECRET!, { expiresIn: "1d" });
};

export const validateJWT = (token: string): PayloadVerified => {
	return <PayloadVerified>jwt.verify(token, process.env.JWT_SECRET!);
};
