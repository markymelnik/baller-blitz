import rateLimit from "express-rate-limit";

export const loginLimiter = rateLimit({
	windowMs: 5 * 60 * 1000,
	max: 5,
	standardHeaders: true,
	legacyHeaders: false,
	message: `Too many login attempts, try again after 5 minutes`,
})

export const signupLimiter = rateLimit({
	windowMs: 60 * 60 * 1000,
	max: 5,
	message: `Too many signup attempts, try again after 60 minutes`,
})

export const resendVerifyEmailLimiter = rateLimit({
	windowMs: 1 * 60 * 1000,
	max: 2,
	message: `Too many attempts, try again after 1 minute`,
})