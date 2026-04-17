const mongoose = require("mongoose");
const jwtLib = require("jsonwebtoken");
const config = require("../config/config");
const validator = require("validator");
const { default: isEmail } = require("validator/lib/isEmail");

const userSchema = new mongoose.Schema(
	{
		firstName: {
			type: String,
			required: true,
			trim: true,
			lowercase: true,
		},
		lastName: {
			type: String,
			required: true,
			trim: true,
			lowercase: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
			trim: true,
			lowercase: true,
			validate: {
				validator: (val) => isEmail(val),
				message: "Invalid email format",
			},
		},
		password: {
			type: String,
			required: true,
			trim: true,
		},
	},
	{ timestamps: true },
);

userSchema.methods.getJWT = async function () {
	const user = this;

	const token = jwtLib.sign({ id: user._id }, config.JWT_SECRET, {
		expiresIn: "1h",
		algorithm: "HS256",
	});

	return token;
};

const User = mongoose.model("User", userSchema);

module.exports = User;
