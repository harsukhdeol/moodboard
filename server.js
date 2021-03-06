const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
require("dotenv").config();

const items = require("./routes/api/items");
const users = require("./routes/api/users");
const auth = require("./routes/api/auth");

const app = express();

//Body parser middleware
app.use(express.json());

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
app.use("/api/users", users);
app.use("/api/auth", auth);

//serve static assets if in production
if (process.env.NODE_ENV === "production") {
  //set static folder
  app.use(express.static("client/build")); //- set build folder location
  app.get("*", (req, res) => {
    //load html
    res.sendFile(path.join(__dirname, "client", "build", "index.html")); //send link
    //res.sendFile(path.resolve(__dirname, "client", "build", "index.html")); //send link
  });
}
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
