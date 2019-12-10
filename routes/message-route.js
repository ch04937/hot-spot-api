const router = require("express").Router();

// const authenticate = require('../auth/authenticate-middleware.js');
const Message = require("./message-model.js");

//get all messages
router.get("/", async (req, res) => {
	try {
		const response = await Message.getAll();
		res.status(200).json({ response });
	} catch (e) {
		console.log(e);
		res.status(500).json({ message: "server error", err: e });
	}
});

//get messages by room id
router.get("/:id", async (req, res) => {
	try {
		const roomId = req.params.id;
		const response = await Message.getByRoomId(roomId);
		res.status(200).json({ response });
	} catch (e) {
		console.log(e);
		res.status(500).json({ message: "server error", err: e });
	}
});
router.post("/:id", async (req, res) => {
	try {
		const response = await Message.add(req.roomId, req.body);
		console.log("new message", response);
		res.status(200).json({ response });
	} catch (e) {
		console.log("could not post message, ", e);
		res.status(400).json({
			message: "error posting message",
			error: `${e}`,
		});
	}
});

module.exports = router;
