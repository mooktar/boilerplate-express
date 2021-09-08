var bodyParser = require('body-parser')
var express = require('express');
var app = express();

app.use("/public", express.static(__dirname + "/public"))

app.use(function(req, res, next) {
  console.log(req.method + " " + req.path + " - " + req.ip)
  next()
});

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
})

app.get("/json", function (req, res) {
  if (process.env.MESSAGE_STYLE == 'uppercase') {
    res.json({ "message": "HELLO JSON" })
  } else {
    res.json({ "message": "Hello json" })
  }
})

app.get(
  "/now",
  function (req, res, next) {
    req.time = new Date().toString()
    next()
  },
  function (req, res) {
    res.send({ time: req.time })
  }
)

app.get("/:word/echo", (req, res) => {
  const word = req.params.word
  res.json({ echo: word })
})

app.route("/name")
  .get((req, res) => {
    let qry = req.query
    res.json({
      name: `${qry.first} ${qry.last}`
    })
  })
  .post((req, res) => {
    let body = req.body
    res.json({
      name: `${body.first} ${body.last}`
    })
  });

module.exports = app;
