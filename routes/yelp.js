const router = require("express").Router();
const yelp = require("yelp-fusion");
const client = yelp.client(process.env.API_KEY, process.env.CLIENT_ID); //yelp key
const verifyUser = require("../auth/verify-user-middleware");
const Model = require("./yelp-model");

router.post("/yelp", async (req, res) => {
	try {
		const { location } = req.body;
		const spot = await client
			.search({
				location: location,
				limit: 2,
			})
			.then(res => res.jsonBody.businesses);
		res.status(200).json(spot);
	} catch (e) {
		console.log("error/ cannot get event", e);
		res.status(500).json({ message: "internal server error" });
	}
});

//favorite route
router.get("/favorites", async (req, res) => {
	try {
		const response = await Model.getAll();
		res.status(200).json(response);
	} catch (e) {
		console.log("error/ cannot get event", e);
		res.status(500).json({ message: "internal server error", e });
	}
});
router.post("/favorites", async (req, res) => {
	try {
		const { yelpId } = req.body;
		const response = await Model.addToFavorite({ yelpId });
		res.status(200).json(response);
	} catch (e) {
		console.log("error/ cannot get event", e);
		res.status(500).json({ message: "internal server error", e });
	}
});

module.exports = router;
