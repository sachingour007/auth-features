const express = require("express");
const authRouter = express.Router();
const asyncHandler = require("../utills/asyncHandler");

authRouter.post(
	"/register",
	asyncHandler(async (req, res) => {
		 throw new Error("Test error");
	}),
);

module.exports = { authRouter };
