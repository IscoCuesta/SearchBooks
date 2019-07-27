const express = require("express");
require('dotenv').config()
const mongoose = require("mongoose");
const routes = require("./routes");
const PORT = process.env.PORT || 3001;
const app = express();

// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// Define API routes here

app.use(routes);

// Send every other request to the React app
// Define any API routes before this runs


mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/searchBook-32");

// app.get("/api/books", (req, res) => {
//   //all saved books JSON
//   res.sendFile(path.join(__dirname, "./client/build/index.html"));
// });

// app.post("api/books", (req, res) => {
//   //new book to database
//   res.sendFile(path.join(__dirname, "./client/build/index.html"));
// });

// app.post("api/books/:id", (req, res) => {
//   //delete book to database
//   res.sendFile(path.join(__dirname, "./client/build/index.html"));
// });

// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "./client/build/index.html"));
// });

app.listen(PORT, () => {
  console.log(`🌎 ==> API server now on port ${PORT}!`);
});
