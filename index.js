const bodyParser = require("body-parser");
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const dns = require("dns");

// Basic Configuration
const port = process.env.PORT || 3000;

let index = 1; // ตัวนับ short URL (เช่น 1, 2, 3, ...)
let url_all = [];
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
    url_all[index] = req.body.url;
    dns.lookup(hostName, (err, address) => {
      if (err) return console.log(err);
      res.json({ original_url: host, short_url: index });
      index++;
    });
  } catch (error) {
    res.json({ error: "invalid url" });
  }
});
app.get("/api/shorturl/:short_url", (req, res) => {
  try {
    const short_url = Number(req.params.short_url);
    const url = url_all[short_url];
    // res.json({ currentURL: `${url}` });
    res.redirect(url);
  } catch (error) {
    res.json({ error: error });
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
