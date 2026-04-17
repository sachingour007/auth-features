const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const { errorMiddleware } = require("./middleware/errorMiddleware");

app.use(express.json({ limit: "16kb" }));
app.use(cookieParser());

const { authRouter } = require("./router/authRouter");

app.use("/auth", authRouter);

app.use(errorMiddleware);

module.exports = app;
