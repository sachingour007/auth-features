const errorMiddleware = (err, req, res, next) => {
	err.statusCode = err.statusCode || 500;
	err.message = err.message || "Internal Server Error";

	if (err.name === "ValidationError") {
		const messages = Object.values(err.errors).map((e) => e.message);
		return res.status(400).json({
			success: false,
			message: messages[0],
		});
	}

	// 2. Duplicate key
	if (err.code === 11000) {
		return res.status(400).json({
			success: false,
			message: "Email already exists",
		});
	}

	// 3. Cast Error
	if (err.name === "CastError") {
		return res.status(400).json({
			success: false,
			message: "Invalid ID format",
		});
	}

	return res.status(err.statusCode).json({
		success: false,
		message: err.message,
	});
};

module.exports = { errorMiddleware };
