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
  let index = 1; // ตัวนับ short URL (เช่น 1, 2, 3, ...)
  let url_all = [];
  try {
    const host = new URL(req.body.url_input);
    const hostName = host.hostname;
    dns.lookup(hostName, (err, address) => {
      if (err) return console.log(err);
      url_all[index++] = hostName;
      res.json({ original_url: req.body.url_input, short_url: index });
    });
  } catch (error) {
    res.json({ error: "invalid url" });
  }
});
app.get("/api/shorturl/:short_url", (req, res) => {
  try {
    const short_url = Number(req.params.short_url);
    res.json({ currentURL: `${short_url}` });
  } catch (error) {
    res.json({ error: error });
  }
  // res.redirect(url);
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
