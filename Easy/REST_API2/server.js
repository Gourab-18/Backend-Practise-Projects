const express = require("express");
const app = express();
const mongoose = require("mongoose");

const subscriberRouter = require("./routes/subscribers");
const dbURI =
  "mongodb+srv://Gourab:devilsparadise@netninja-tutorial.hk6eb.mongodb.net/REST_API?retryWrites=true&w=majority";

mongoose
  .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => console.log("Database Connected"))
  .catch((err) => console.log(err));
app.use;

app.use("/subscribers", subscriberRouter);

app.listen(3000);
