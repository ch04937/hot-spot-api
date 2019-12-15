const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const Users = require("../routes/user-model.js");

const secrets = require("../config/secrets.js");
const {
	validateRegistration,
	validateLogin,
} = require("../auth/auth-router-middleware");
router.post("/register", validateRegistration, async (req, res) => {
	// implement registration
	const {
		firstName,
		lastName,
		username,
		email,
		password,
		city,
		state,
		country,
	} = req.body;

	const hashedPassword = bcrypt.hashSync(password, 10);
	const newUser = {
		firstName,
		lastName,
		username,
		email,
		city,
		state,
		country,
		password: hashedPassword,
	};

	try {
		const user = await Users.add(newUser);
		const token = generateToken({
			username: user.username,
			id: user.id,
		});
		res.status(201).json({
			profile: {
				firstName: user.firstName,
				lastName: user.lastName,
				email: user.email,
				city: user.city,
				state: user.state,
				country: user.country,
			},
			accessToken: token,
		});
	} catch (err) {
		console.log(err);
		res.status(500).json({
			message: "users/cannot create new user at this time",
		});
	}
});

//post login
router.post("/login", [validateLogin], (req, res) => {
	// implement login
	const { userId, password } = req.body;
	Users.find(userId)
		.then(user => {
			if (user && bcrypt.compareSync(password, user.password)) {
				const token = generateToken({
					username: user.username,
					id: user.id,
				});
				res.status(200).json({
					profile: {
						firstName: user.firstName,
						lastName: user.lastName,
						username: user.username,
						email: user.email,
						city: user.city,
						state: user.state,
						country: user.country,
					},
					accessToken: token,
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

//get logout
router.get("/logout", (req, res) => {
	req.session.destroy(err => {
		console.log(err);
		res.status(200).json({ message: "goodbye" });
	});
});

//generate token @login
function generateToken(user) {
	const payload = {
		username: user.username,
	};
	const options = {
		expiresIn: "3d",
	};
	return jwt.sign(payload, secrets.jwtSecrets, options);
}

module.exports = router;
