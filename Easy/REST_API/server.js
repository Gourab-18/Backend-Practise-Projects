// npm init
// .env files help us to store our database passwords and all..Must be secure
// in dburi we were storing a lot of info includin our database password..here we will be removing those
// We also need to create a route so that we can use as less / and all as possible
// REST..fancy way of saying a server listens to Read Create Update and Delete
// REST tries to u se all URL's as access points in server

// req message..the message sent by client(phone or laptop)to server is called req message
// res message...the output given by server(server of facebook) to client is called res message
const express = require("express");
const app = express();
const mongoose = require("mongoose");
// This help in routing
const subscriberRouter = require("./routes/subscribers");
const dbURI =
  "mongodb+srv://Gourab:devilsparadise@netninja-tutorial.hk6eb.mongodb.net/REST_API?retryWrites=true&w=majority";

mongoose
  .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => console.log("Database Connected"))
  .catch((err) => console.log(err));
// Now we have connected to database

// Whatever url with localhost:3000/subscribers will go to routes folder
// In order to make the below code work we will store info in subscribers file of routes folder

// Here it means this will be the route
app.use(express.json());
app.use("/subscribers", subscriberRouter);
// app.use(express.json);

app.listen(3000);
