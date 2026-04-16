const app = require("./app");
const config = require("./config/config");
const connectDB = require("./db/db");

connectDB()
	.then(() => {
		app.listen(config.PORT, () => {
			console.log(`Server is running on port ${config.PORT}`);
		});
	})
	.catch((err) => {
		console.log("Database connection failed", err);
	});
