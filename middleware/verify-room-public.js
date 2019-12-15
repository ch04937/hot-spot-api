const rooms = require("../routes/room-model");

const verifyroomIsPublic = async (req, res, next) => {
	const roomId = req.roomId;

	const room = await rooms.getByroomId(roomId);

	if (room.isPrivate) {
		res.status(400).json({
			message: "rooms/the action cannot be performed on a private room",
		});
	} else {
		next();
	}
};

module.exports = verifyroomIsPublic;
