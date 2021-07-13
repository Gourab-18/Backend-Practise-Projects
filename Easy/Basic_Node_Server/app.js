// In this we will be creating a basic node server
// Solve everything via 1st principles
const http = require("http");
const fs = require("fs");
// This helps to create a server but in order to make it run we have to use something else
// This res returns some response to user
const server = http.createServer((req, res) => {
  // We can write normal instructions but our goal should be to write or transfer html files
  // Solve all problems with 1st principles thinking
  //   res.write("Hello all", );

  // We will add HTML...For that we have to read it and hence we will use fs module
  // 200 indicates safe
  //   Although most write content type..for me content is also working
  res.writeHead(200, { Content: "text/html" });
  //   We don't want to write everything inside we should import it from another file
  //   res.write("<h1>Hii Boys</h1>");
  //   Since we will be importing file from outside we have to read it so we will use fs
  fs.readFile("index.html", (err, data) => {
    if (err) res.write("Not found");
    else res.write(data);
    // Note:Earlier we were keeping res.end() after the brackets but whn callback used then iniside the brackets else it will crash

    res.end();
  });
  //   Note:We also have to end our response..If we don't end then page won't open
});

// Before we just created the server but now we have to make it listen..For that we will use listen()
// While listening there can be error

server.listen(3000, (err) => {
  if (err) console.log("Something went wrong", err);
  else {
    console.log("Listening to port 3000");
  }
});
