const express = require("express");

const server = express();

// middleware
server.use(express.json());

server.get("/", (req, res) => {
  res.status(200).json({ api: "up and running" });
});

const port = 8001;
server.listen(port, () => console.log(`\n***api up on port ${port}***\n`));
