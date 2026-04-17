const express = require("express");
const authRouter = express.Router();
const asyncHandler = require("../utills/asyncHandler");
const { ApiError } = require("../utills/ApiError");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const { ApiResponse } = require("../utills/ApiResponse");

authRouter.post(
	"/register",
	asyncHandler(async (req, res, next) => {
		const { firstName, lastName, email, password } = req.body;

		if (!firstName || !lastName || !email || !password) {
			return next(new ApiError(400, "All Details Required"));
		}

		const userDetails = await User.findOne({ email });

		if (userDetails) {
			return next(new ApiError(400, "Email Already Registered!!"));
		}

		const hashPassword = await bcrypt.hash(password, 10);

		const user = new User({
			firstName,
			lastName,
			email,
			password: hashPassword,
		});

		await user.save();
		const token = await user.getJWT();

		res.cookie("token", token, {
			httpOnly: true,
			// secure: true,
			sameSite: "strict",
			maxAge: 60 * 60 * 1000,
		});

		const safeUser = {
			_id: user._id,
			firstName: user.firstName,
			lastName: user.lastName,
			email: user.email,
		};

		return res
			.status(200)
			.json(new ApiResponse(200, safeUser, "User registered successfully"));
	}),
);

module.exports = { authRouter };
