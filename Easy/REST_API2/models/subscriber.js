// Schema
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const subscriberSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  subscribedToChannel: {
    type: "String",
    required: "true",
  },
  Date: {
    type: "String",
    required: "true",
    default: Date.now(),
  },
});

// Exporting schema to routes
module.exports = mongoose.model("API", subscriberSchema);
