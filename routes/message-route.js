const router = require("express").Router();

// const authenticate = require('../auth/authenticate-middleware.js');
const Message = require("./message-model.js");

router.get("/", (req, res) => {
	Message.find()
		.then((Message) => {
			res.json({ Message });
		})
		.catch((err) => {
			console.log(err);
			res.status(500).json({ message: "server error", err: err });
		});
});

module.exports = router;
