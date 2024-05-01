import { RequestHandler } from 'express';

export const signup: RequestHandler = async (req, res) => {
	try {
		const { fullName, userName, password, confirmPassword, gender } = req.body;
	} catch (error) {}
};

export const login: RequestHandler = (req, res) => {
	console.log('Login');
};

export const logout: RequestHandler = (req, res) => {
	console.log('Logout');
};
