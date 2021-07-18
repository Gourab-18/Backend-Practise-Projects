const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Here we will only have name as id is automatically generated
const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
});

// Inside we will write the name of the cluster we had created and next is the schema that corresponds to that model
module.exports = mongoose.model("API", userSchema);
