const router = require("express").Router();

// const authenticate = require('../auth/authenticate-middleware.js');
const Users = require("./user-model.js");

router.get("/", (req, res) => {
	Users.getAll()
		.then((users) => {
			res.json({ users });
		})
		.catch((err) => {
			console.log(err);
			res.status(500).json({ message: "server error", err: err });
		});
});

//link room to user with user id
router.get("/:id/room", (req, res) => {
	const { id } = req.params;

	Users.getRoom(id)
		.then((room) => res.status(200).json({ room }))
		.catch((err) => {
			console.log(err);
			res.status(500).json({ message: "could not get room", err: err });
		});
});

module.exports = router;
