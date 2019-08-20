const mongoose = require("mongoose");


const imageSchema = new mongoose.Schema({
	url: {
		type: String
	}, 
	id: {
		type: String
	}
})


const Image = mongoose.model("Image", imageSchema);

module.exports = Image;