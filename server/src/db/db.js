const mongoose = require("mongoose");
const config = require("../config/config");

const connectDB = async () => {
	try {
		const instance = await mongoose.connect(config.MONGO_URI);
		console.log("MONGODB connected !! DB HOST:", instance.connection.host);
	} catch (error) {
		console.log("MONGODB Connect Failed", error);
		process.exit(1);
	}
};

module.exports = connectDB;
