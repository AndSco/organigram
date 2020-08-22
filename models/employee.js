const mongoose = require("mongoose");
mongoose.set("debug", true);
mongoose.set("useFindAndModify", false);
mongoose.Promise = Promise; // allows us to do without CALLBACKS!
const { atlasUserName, atlasPword } = require("../config"); // config files gathers all env keys, so it can be imported wherever

mongoose.connect(
  `mongodb+srv://${atlasUserName}:${atlasPword}@ecrep-organigram.a8fdj.mongodb.net/ecrep-organigram?retryWrites=true&w=majority`,
  {
    keepAlive: true,
    useNewUrlParser: true
  },
  err => {
    if (err) {
      console.log(err);
    } else {
      console.log("connected!");
    }
  }
);

// mongoose.connect(`mongodb://${mlabUserName}:${mlabPword}@ds259367.mlab.com:59367/ecrep-organigram`, {
// 	keepAlive: true,
// 	useNewUrlParser: true
// }, (err) => {
// 	if (err) {
// 		console.log(err);
// 	}
// 	else {
// 		console.log("connected!");
// 	}
// });

const employeeSchema = new mongoose.Schema(
  {
    designation: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    officePhone: {
      type: String,
      required: true
    },
    mobile: {
      type: String
    },
    email: {
      type: String,
      required: true
    },
    team: {
      type: String,
      required: true
    },
    imageUrl: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
);

const Employee = mongoose.model("Employee", employeeSchema);

module.exports = Employee;
