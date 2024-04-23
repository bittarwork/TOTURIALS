const tutorials = require("./app/controllers/tutorial.controller");
const express = require("express");
const cors = require("cors");

const app = express();

var corsOptions = {
  origin: ["http://127.0.0.1:5500", "http://localhost:8081"],
};

app.use(cors(corsOptions));

app.use((req, res, next) => {
  console.log(req.method);
  console.log(req.body);
  console.log(req.url)
  next();
});

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

const db = require("./app/models");
const Tutorial = db.tutorials;

db.mongoose
  .connect("mongodb://localhost:27017/mydatabase", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to the database!");
    // إنشاء عنصر جديد
    // const newTutorial = new Tutorial({
    //   title: "Example Tutorial",
    //   description: "This is an example tutorial",
    //   published: true,
    // });

    // حفظ العنصر في قاعدة البيانات
    // newTutorial.save();
  })
  .catch((err) => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });


// Create a new Tutorial
app.post("/", tutorials.create);

// Retrieve all Tutorials
app.get("/", tutorials.findAll);

// Retrieve all published Tutorials
app.get("/published", tutorials.findAllPublished);

// Retrieve a single Tutorial with id
app.get("/:id", tutorials.findOne);

// Update a Tutorial with id
app.put("/:id", tutorials.update);

// Delete a Tutorial with id
app.delete("/:id", tutorials.delete);

// Create a new Tutorial
app.delete("/", tutorials.deleteAll);


// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});



