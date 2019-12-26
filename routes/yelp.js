const router = require("express").Router();

const Search = require("./yelp-model");

router.get("/yelp", async (req, res) => {
	try {
		const { location, type } = req.body;
		const event = await Search.get(location, type);

		res.status(200).json(event);
	} catch (e) {
		console.log("error/ cannot get event", e);
		res.status(500).json({ message: "internal server error" });
	}
});

module.exports = router;
