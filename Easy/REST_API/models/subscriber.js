// Here we will be using schema to define the way we write
// Mongoose will be using this schema
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const subscriberSchema = new Schema({
  name: {
    type: String,
    required: "true",
  },
  subscribedToChannel: {
    type: String,
    required: true,
  },
  subscribeDate: {
    type: Date,
    required: true,
    default: Date.now(),
  },
});

// Inside we will write the name of the cluster we had created and next is the schema that corresponds to that model
module.exports = mongoose.model("API", subscriberSchema);
