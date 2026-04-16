const express = require("express");
const authRouter = express.Router();

authRouter.post("/register", async (req, res, next) => {
	try {
		const { firstName, lastName, email, password } = req.body;

		if(!firstName || !lastName || !email || !password){
			return next(new Error("all fields required"))
		}
		console.log(user);
	} catch (error) {
		console.log(error);
	}
});

module.exports = { authRouter };
