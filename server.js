
let express = require('express');
let app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so the API is remotely testable by FCC 
let cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204
app.use(express.static('public'));

app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

app.get("/api/timestamp/:date", (req, res) => {
  const dateParam = req.params.date;
  let date;
  if (dateParam.includes('-')) {
    date = new Date(dateParam);
  } else {
    date = new Date(parseInt(dateParam));
  }
  if (!isNaN(date.getTime())) {
    res.send({ unix: date.getTime(), UTC: date.toUTCString() });
  } else {
    res.send({error: "Invalid Date"});
  }
});

app.get("/api/timestamp", (req, res) => {
  const date = new Date();
  res.send({ date: date, unix: date.getTime(), UTC: date.toUTCString() });
});

// listen for requests
let listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});