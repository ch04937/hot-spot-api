// const Events = require("../routes/event-model");

// const verifyEventid = async (req, res, next) => {
// 	const { event_id } = req.params;

// 	if (!event_id) {
// 		res.status(400).json({
// 			message: "verify/missing event id in the request.",
// 		});
// 	}
// 	try {
// 		const event = await Events.getByid(event_id);
// 		if (!event) {
// 			res.status(200).json({ message: "verify/invalid event id." });
// 		}

// 		req.eventId = event.eventId;

// 		next();
// 	} catch (err) {
// 		console.log("verify/verify event id error", err);
// 		res.status(400).json({
// 			message: "verify/verify event id error",
// 			error: `${err}`,
// 		});
// 	}
// };

// module.exports = verifyEventid;
