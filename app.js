const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const Employee = require("./models/employee");
const Image = require("./models/image");
const path = require("path"); // To serve both frontend and backend
const config = require("./config"); // Import process.env keys

// BODY PARSER
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


// To upload images
const multer = require("multer");
const cloudinary = require("cloudinary");
const cloudinaryStorage = require("multer-storage-cloudinary");
const { cloudName, cloudinaryKey, cloudinarySecret } = require("./config.js");

cloudinary.config({
cloud_name: cloudName,
api_key: cloudinaryKey,
api_secret: cloudinarySecret
});
const storage = cloudinaryStorage({
cloudinary: cloudinary,
folder: "organigram",
allowedFormats: ["jpg", "png"],
transformation: [{ width: 300, height: 300, crop: "limit" }]
});
const parser = multer({ storage: storage });




// ROUTES

// Login
app.post("/api/login", (req, res, next) => {
	try {
		if (req.body.password === config.adminLogin) {
			res.status(200).json("isAdmin");
		} 
		else if (req.body.password === config.readerLogin) { 
			res.status(200).json("isReader");
		}
		else {
			res.status(200).json("unauthorised");
		}
	}
	catch(err) { 
		return next(err);
	}
})



// images
app.post('/api/images', parser.single("image"), (req, res, next) => {
  try {
    console.log(req.file); // to see what is returned to you
    const image = {};
    image.url = req.file.url;
    image.id = req.file.public_id;
    Image.create(image) // save image information in database
      .then(newImage => res.json(newImage))
      .catch(err => {
        throw err;
      });
  } catch(err) {
    return next(err);
  }
});


// get employees
app.get("/api/employees", async function(req, res, next) {
	try {
		const allEmployees = await Employee.find();
		const lastUpdate = await Employee.findOne({}, {}, { sort: { 'updatedAt' : -1 } });
		console.log(lastUpdate.updatedAt);
		return res.status(200).json({employees: allEmployees, lastUpdate: lastUpdate.updatedAt});

	} catch(err) {
		return next(err);
	}	

})


// create employee
app.post("/api/employees/new", async function(req, res, next) {
	try {
		const employee = {
			designation: req.body.designation, 
			name: req.body.name, 
			officePhone: req.body.officePhone, 
			mobile: req.body.mobile, 
			email: req.body.email, 
			team: req.body.team, 
			imageUrl: req.body.imageUrl
		};
		const newEmployee = await Employee.create(employee);
		return res.status(200).json(newEmployee);
	} catch(err) {
		return next(err);
	}
});


// remove employee 
app.delete("/api/employees/:employeeId", async function(req, res, next){
	try {
		const employeeToDelete = await Employee.findById(req.params.employeeId);
		await employeeToDelete.remove();
		return res.status(200).json(employeeToDelete);
	} catch(err) {
		return next(err);
	}
})


// edit employee - TO RECHECK!
app.put("/api/employees/:employeeId", async function(req, res, next) {
	try {
		const editedEmployee = {
				designation: req.body.designation, 
				name: req.body.name, 
				officePhone: req.body.officePhone, 
				mobile: req.body.mobile, 
				email: req.body.email, 
				team: req.body.team, 
				imageUrl: req.body.imageUrl
		};
		await Employee.findByIdAndUpdate(req.params.employeeId, editedEmployee, {new: true});
		return res.status(200).json(editedEmployee);
	} catch(err){
		return next(err);
	}
})



// To serve both frontend and backend - catch ALL. Serve static assets only if in production. 
if (process.env.NODE_ENV === "production") {
	app.use(express.static(path.join(__dirname, "client", "build"))); 
	app.get("*", (req, res) => {
   		res.sendFile(path.join(__dirname, "client", "build", "index.html"));
	});
}


app.use((error, req, res, next) => {
  console.log("ERROR HANDLER", error.message);
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message || "Ooops, something went wrong!"
    }
  });
});




app.listen(process.env.PORT || 8081, () => console.log("Server started"));