const Users = require("../routes/user-model");

const verifyUser = async (req, res, next) => {
	const user = req.user;
	console.log(user);
	const registered = await Users.getById(user.id);

	if (!registered) {
		res.status(401).json({ message: "The user is not registered" });
	}
	req.user = registered;
	next();
};

module.exports = verifyUser;
