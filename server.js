const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");
require("dotenv").config();

const items = require("./routes/api/items");

const app = express();

//Body parser middleware
app.use(bodyParser.json());

//DB config
const db = require("./config/keys").mongoURI;

//Connect to Mongo
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("mongodb connected");
  })
  .catch((err) => {
    console.log(err);
  });

//Use routes
app.use("/api/items", items);

//serve static assets if in production
if (process.env.NODE_ENV === "production") {
  //set static folder
  app.use(express.static("client/build")); //- set build folder location
  app.get("*", (req, res) => {
    //load html
    res.sendFile(path.join(__dirname, "client", "build")); //send link
  });
}
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
