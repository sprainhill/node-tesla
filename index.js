const express = require("express");
const helmet = require("helmet");

const server = express();

// functions - custom middleware
function creepy(req, res, next) {
  const method = req.method;
  const url = req.url;
  console.log(`you made a ${method} request to ${url}`);
  next();
}

function banana(req, res, next) {
  console.log("***banana***");
  next();
}

// middleware
server.use(express.json());
server.use(helmet());
server.use(banana);
server.use(creepy);

server.get("/", banana, (req, res) => {
  res.status(200).json({ api: "up and running" });
});

server.get("/secret", (req, res) => {
  res.status(200).json({ welcome: "secret agent" });
});

const port = 8001;
server.listen(port, () => console.log(`\n***api up on port ${port}***\n`));
