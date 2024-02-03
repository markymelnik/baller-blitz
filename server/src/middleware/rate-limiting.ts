import rateLimit from "express-rate-limit";

export const loginLimiter = rateLimit({
	windowMs: 5 * 60 * 1000,
	max: 10,
	standardHeaders: true,
	legacyHeaders: false,
	message: `Too many login attempts, try again after 5 minutes`,
})

export const signupLimiter = rateLimit({
	windowMs: 60 * 60 * 1000,
	max: 3,
	message: `Too many account creations, try again after 1 hour`,
})