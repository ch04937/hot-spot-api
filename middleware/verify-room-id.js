const rooms = require("../routes/room-model");

const verifyroomid = async (req, res, next) => {
	const { cal_id } = req.params;

	if (!cal_id) {
		res.status(400).json({
			message: "Missing room id in the request.",
		});
	}
	try {
		const room = await rooms.getByid(cal_id);
		if (!room) {
			res.status(200).json({ message: "Invalid room id." });
		}
		req.roomId = room.roomId;
		req.roomid = cal_id;

		next();
	} catch (err) {
		console.log("verify room id error", err);
		res.status(400).json({
			message: "error verifying room",
			error: `${err}`,
		});
	}
};

module.exports = verifyroomid;
