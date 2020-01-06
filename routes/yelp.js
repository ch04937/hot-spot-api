const router = require("express").Router();
const yelp = require("yelp-fusion");
const client = yelp.client(process.env.API_KEY, process.env.CLIENT_ID); //yelp key

// const Search = require("./yelp-model");

router.post("/yelp", async (req, res) => {
	try {
		const { location } = req.body;
		console.log(location);
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

module.exports = router;
