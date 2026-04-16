const errorMiddleware = (err, req, res, next) => {
	((err.statusCode = err.statusCode || 500),
		(err.message = err.message || "Internal Server Error"));

	return res.statusCode(err.statusCode).json({
		success: false,
		message: err.message,
	});
};

module.exports = { errorMiddleware };
