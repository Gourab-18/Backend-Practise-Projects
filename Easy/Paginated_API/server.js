const express = require("express");
const app = express();

const mongoose = require("mongoose");
const User = require("./user");
const dbURI =
  "mongodb+srv://Gourab:devilsparadise@netninja-tutorial.hk6eb.mongodb.net/REST_API?retryWrites=true&w=majority";

mongoose
  .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => console.log("Database Connected"))
  .catch((err) => console.log(err));

const db = mongoose.connection;
// Putting data into database for 1st time
db.once("open", async () => {
  if ((await User.countDocuments().exec()) > 0) return;

  Promise.all([
    User.create({ name: "User 1" }),
    User.create({ name: "User 2" }),
    User.create({ name: "User 3" }),
    User.create({ name: "User 4" }),
    User.create({ name: "User 5" }),
    User.create({ name: "User 6" }),
    User.create({ name: "User 7" }),
    User.create({ name: "User 8" }),
    User.create({ name: "User 9" }),
    User.create({ name: "User 10" }),
    User.create({ name: "User 11" }),
    User.create({ name: "User 12" }),
  ]).then(() => console.log("Added Users"));
});

// We don't have to write all these users and posts here if we install mongodb
// For mongodb we want schema
// const users = [
//   {
//     id: "1",
//     name: "Gourab 1",
//   },
//   {
//     id: "2",
//     name: "Gourab 2",
//   },
//   {
//     id: "3",
//     name: "Gourab 3",
//   },
//   {
//     id: "1",
//     name: "Gourab 1",
//   },
//   {
//     id: "4",
//     name: "Gourab 4",
//   },
//   {
//     id: "5",
//     name: "Gourab 5",
//   },
//   {
//     id: "6",
//     name: "Gourab 6",
//   },
//   {
//     id: "7",
//     name: "Gourab 7",
//   },
//   {
//     id: "8",
//     name: "Gourab 8",
//   },
//   {
//     id: "9",
//     name: "Gourab 9",
//   },
//   {
//     id: "10",
//     name: "Gourab 10",
//   },
// ];
// const posts = [
//   {
//     id: "1",
//     name: "post 1",
//   },
//   {
//     id: "2",
//     name: "post 2",
//   },
//   {
//     id: "3",
//     name: "post 3",
//   },
//   {
//     id: "1",
//     name: "post 1",
//   },
//   {
//     id: "4",
//     name: "post 4",
//   },
//   {
//     id: "5",
//     name: "post 5",
//   },
//   {
//     id: "6",
//     name: "post 6",
//   },
//   {
//     id: "7",
//     name: "post 7",
//   },
//   {
//     id: "8",
//     name: "post 8",
//   },
//   {
//     id: "9",
//     name: "post 9",
//   },
//   {
//     id: "10",
//     name: "post 10",
//   },
// ];
app.get("/posts", paginatedResults(User), (req, res) => {
  res.json(res.paginatedResults);
  // To use it to get get requests use the normal http and then after that /users?page=1&limit=4(you can also change these values)
});
// Whenever we want data we don't want the complete data but only the first page or second page and we also want a limit on the content of our pae
// We will use query property for that
// slice() helps us to take out substring whnever we give it range of input
// for using slice we need start index as well as end index
// We must keep in mind that we should not show page=0 and page= length
app.get("/users", paginatedResults(User), (req, res) => {
  res.json(res.paginatedResults);
  // To use it to get get requests use the normal http and then after that /users?page=1&limit=4(you can also change these values)
});

// Middleware
function paginatedResults(model) {
  return async (req, res, next) => {
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    // We want users to know whether ther is a next page or not
    const results = {};
    // Here we will try to attach next page
    if (startIndex > 0) {
      results.next = {
        page: page + 1,
        limit: limit,
      };
    }
    if (endIndex < (await model.countDocuments().exec())) {
      results.previous = {
        page: page - 1,
        limit: limit,
      };
    }

    try {
      results.results = await model.find().limit(limit).skip(startIndex).exec();
      res.paginatedResults = results;
      next();
    } catch (e) {
      res.status(500).json({ message: e.message });
    }
  };
}

app.listen(3000);
// Suppose we create another route say /posts then we again have to copy all the same code..instead we will be using middleware
