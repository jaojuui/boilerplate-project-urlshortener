const bodyParser = require("body-parser");
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const dns = require("dns");

// Basic Configuration
const port = process.env.PORT || 3000;

app.use(cors());

app.use("/public", express.static(`${process.cwd()}/public`));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
  res.sendFile(process.cwd() + "/views/index.html");
});
app.post("/api/shorturl", (req, res) => {
  try {
    const host = new URL(req.body.url_input);
    const hostName = host.hostname;
    dns.lookup(hostName, (err, address) => {
      if (err) return console.log(err);
      res.json({ original_url: req.body.url_input, short_url: address });
    });
  } catch (error) {
    res.json({ error: "invalid url" });
  }
});

// Your first API endpoint
app.get("/api/hello", function (req, res) {
  res.json({ greeting: "hello API" });
});

app.listen(port, function () {
  console.log(`Listening on port ${port}`);
});
app.post("/name", (req, res) => {
  res.json({ name: `${req.query.first} ${req.query.last}` });
});
