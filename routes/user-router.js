const router = require("express").Router();

const authenticateUser = require("../auth/authenticate-middleware.js");
const verifyUser = require("../auth/verify-user-middleware");

const Users = require("./user-model.js");

router.get("/", (req, res) => {
	Users.getAll()
		.then(users => {
			res.json({ users });
		})
		.catch(err => {
			console.log(err);
			res.status(500).json({ message: "server error", err: err });
		});
});

//link room to user with user id
router.get("/room", [authenticateUser], async (req, res) => {
	const { id } = req.user;
	try {
		const rooms = await Users.getRooms(id);
		res.status(200).json({ rooms });
	} catch (err) {
		console.log(err);
		res.status(500).json({ message: "could not get room", err: err });
	}
});

module.exports = router;
