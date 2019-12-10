const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const Users = require("../routes/user-model.js");
const secrets = require("../config/secrets.js");
const {
	validateRegistration,
	validateLogin,
} = require("./auth-router-middleware");

//post register
router.post("/register", validateRegistration, async (req, res) => {
	// implement registration
	const { firstName, lastName, username, email, password } = req.body;
	const hashPassword = bcrypt.hashSync(user.password, 10);
	const newUser = {
		firstName,
		lastName,
		username,
		email,
		password,
	};
	try {
		const user = await Users.add(newUser);
		const token = generateToken({
			username: user.username,
		});
		await Users.add(user.userId);
		res.status(201).json({
			profile: {
				firstName: user.firstName,
				lastName: user.lastName,
				email: user.email,
			},
		});
	} catch (e) {
		console.log(err);
		res.status(500).json(err);
	}
});

//post login
router.post("/login", validateLogin, (req, res) => {
	// implement login
	let { username, password } = req.body;
	Users.findBy({ username })
		.then(user => {
			if (user && bcrypt.compareSync(password, user.password)) {
				const token = generateToken({ username: user.username });
				res.status(200).json({
					profile: {
						firstName: user.firstName,
						lastName: user.lastName,
						email: user.email,
					},
				});
			} else {
				res.status(401).json({ message: "invalid credentials" });
			}
		})
		.catch(err => {
			console.log(err);
			res.status(500).json({ message: `server 500 error ${err}` });
		});
});

//generate token @login
function generateToken(user) {
	const payload = {
		username: user.username,
	};
	const options = {
		expiresIn: "30d",
	};
	return jwt.sign(payload, secrets.jwtSecrets, options);
}

module.exports = router;
