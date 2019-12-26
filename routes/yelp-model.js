const yelp = require("yelp-fusion");
const client = yelp.client(process.env.API_KEY, process.env.CLIENT_ID); //yelp key

module.exports = {
	get,
};

function get(location, type) {
	client.search({
		location: location,
		term: type,
	});
}
