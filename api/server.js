const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

const userRouter = require("../routes/user-router.js");
const authRouter = require("../auth/auth-router.js");

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

//routes
server.use("/users", userRouter);
server.use("/auth", authRouter);

//tesing server
server.get("/", (req, res) => {
	res.send("api is running");
});

module.exports = server;
