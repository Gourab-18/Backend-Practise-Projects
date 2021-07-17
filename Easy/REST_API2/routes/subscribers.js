const express = require("express");
const router = express.Router();

const Subscriber = require("../models/subscriber");
//GET all
router.get("/", (req, res) => {
  Subscriber.find()
    .then((result) => {
      return res.json(subscribers);
    })
    .catch((err) => {
      console.log(err);
    });
});

// GET one
router.get("/:id", (req, res) => {});

// POST(to submit info)
router.post("/", (req, res) => {});

// PUT(to update)
router.put("/:id", (req, res) => {});

// Delete
router.delete("/:id", (req, res) => {});

module.exports = router;
