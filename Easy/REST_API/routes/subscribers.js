// Here we will use express for using Router
const express = require("express");
const router = express.Router();
const Subscriber = require("../models/subscriber");

// We will now create different routes for different things like Getting all...Getting one...Creating..updating..deleting
// For getting posting deleting and all we have different functions get(),put(),delete()
// To take single elements lets say we want to delete a specific element we will use id
// Whenever asynchronous try using try catch
//GET ALL
// Here we will be getting all the elements so we will use app.get() without id..Here not app.get..here router.get()
// Create a file route.rest for checking your APIs
// we will use async and then try catch
// Inially in route we will get back an empty array
router.get("/", async (req, res) => {
  try {
    // This helps us to get the info of all Subscribers
    const subscribers = await Subscriber.find();
    //  After finding info we have to return in the form of JSON
    // All info of subscribers sent in JSON format
    res.json(subscribers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
// We don't have a frontend to interact with so we will have to test services like postman to test all that
// In VS code we have REST client as an extension
// GET One
// Separate checking by  ###
// Now we will add new subscriber
router.get("/:id", getSubscriber, (req, res) => {
  // To find by id we will use
  // We can now find by subscriber name
  // res.send(res.subscriber.name);
  res.json(res.subscriber);
});
// We will create a models folder that will contain our schema
//Create one
// Creating helps us to count the number of subscribers
router.post("/", async (req, res) => {
  // For updating Subscriber
  console.log(req.body);
  const subscriber = new Subscriber({
    // It will get the name part
    // The body here is whatever the user sends to us that is JSON
    name: req.body.name,
    subscribedToChannel: req.body.subscribedToChannel,
  });
  try {
    const newSubscriber = await subscriber.save();
    res.status(201).json(newSubscriber);
  } catch (err) {
    // 400 error when something wrong with user input 201 when something wrong with our server
    res.status(400).json({ message: err.message });
  }
});
//Updating one
router.patch("/:id", getSubscriber, async (req, res) => {
  // We must only update the part we are required to update
  if (req.body.name != null) {
    res.subscriber.name = res.body.name;
  }
  if (req.body.subscribedToChannel != null) {
    res.subscriber.subscribedToChannel = res.body.subscribedToChannel;
  }
  try {
    const updatedSubscriber = await res.subscriber.save();
    res.json(updatedSubscriber);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});
// Deleting one
// req.params.id
router.delete("/:id", getSubscriber, async (req, res) => {
  try {
    await res.subscriber.remove();
    res.json({ message: "Deleted Subscriber" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Common code for the one with id
// next since it is a middleware
async function getSubscriber(req, res, next) {
  let subscriber;
  try {
    subscriber = await Subscriber.findById(req.params.id);
    // We have to check whether subscriber actually exists
    if (subscriber == null) {
      return res.status(404).json({ message: "Can't find Subscriber" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  res.subscriber = subscriber;
  next();
}

// For calling by id we will have to use the same code again and again so we will use middleware
module.exports = router;
