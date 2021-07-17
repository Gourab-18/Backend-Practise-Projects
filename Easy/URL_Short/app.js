const express = require("express");
const app = express();
const mongoose = require("mongoose");
const ShortUrl = require("./models/shortUrl");
const dbURI =
  "mongodb+srv://Gourab:devilsparadise@netninja-tutorial.hk6eb.mongodb.net/REST_API?retryWrites=true&w=majority";

mongoose
  .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => console.log("Database Connected"))
  .catch((err) => console.log(err));
// It will automatically look inside views folder
// Setting up view engine
app.set("view engine", "ejs");
// To tell express that shortener is perfectly working with express we will use
app.use(express.urlencoded({ extended: false }));
//GET
app.get("/", async (req, res) => {
  // To get all shortUrls
  const shortUrls = await ShortUrl.find();
  //   For passing shortURLs to views
  res.render("index", { shortUrls: shortUrls });
  //   Then in index we can go through each of this shortURLs
});

//POST
app.post("/shortURLs", async (req, res) => {
  // This fullURL is there in forms of index.js
  // This is am asymnchronous and we need to wait till its executed
  //   Here name is set as fullUrl
  await ShortUrl.create({ full: req.body.fullUrl });
  res.redirect("/");
});

// Now our shoretened URL is not going to any site..To make it possible we will use another function
app.get("/:shortUrl", async (req, res) => {
  const shortUrl = await ShortUrl.findOne({ short: req.params.shortUrl });
  if (shortUrl == null) return res.sendStatus(404);

  shortUrl.clicks++;
  shortUrl.save();

  res.redirect(shortUrl.full);
});
app.listen(3000);
