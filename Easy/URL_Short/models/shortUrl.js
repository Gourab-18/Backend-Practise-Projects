// This will contain the schema
const mongoose = require("mongoose");
const shortid = require("shortid");
const Schema = mongoose.Schema;
// In this schema we will use 3 schemas full URL, shortURL and number of times clicked
// In order to generate shortId we want to have a library called shortId..we will haver to import it
// Install a package npm i shortid
const shortURLSchema = new Schema({
  full: {
    type: String,
    required: true,
  },
  short: {
    type: String,
    required: true,
    default: shortid.generate(),
  },
  clicks: {
    type: Number,
    required: true,
    default: 0,
  },
});

module.exports = mongoose.model("API", shortURLSchema);
