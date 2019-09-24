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

function protected(req, res, next) {
  // read a password from the request headers
  // if the password is mellon, let the request
  // continue, otherwise cancel the request
  // and send back a 401 status code

  const password = req.headers.password;
  if (password && password.toLowerCase() === "mellon") {
    next();
  } else {
    res
      .status(401)
      .json({ message: "just what exactly are you trying to do here my guy?" });
  }
}

// middleware
server.use(express.json());
server.use(helmet());
server.use(banana);
server.use(creepy);

server.get("/", banana, (req, res) => {
  res.status(200).json({ api: "up and running" });
});

server.get("/secret", protected, (req, res) => {
  res.status(200).json({ welcome: "secret agent" });
});

const port = 8001;
server.listen(port, () => console.log(`\n***api up on port ${port}***\n`));
