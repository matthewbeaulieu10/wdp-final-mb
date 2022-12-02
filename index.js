const express = require('express')
app = express()

var url = require('url');

const port = process.env.PORT || 3000
const majorVersion = 1
const minorVersion = 2

// Use Express to publish static HTML, CSS, and JavaScript files that run in the browser. 
app.use(express.static(__dirname + '/static'))

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended:true}));

const mongoose = require("mongoose");

//password: FPXHV1aJWRzGdCRz
const mongooseURI = "mongodb+srv://mthwbeaulieu:FPXHV1aJWRzGdCRz@playercluster.jey2g5j.mongodb.net/playerDatabase"
mongoose.connect(mongooseURI, {useNewUrlParser: true}, {useUnifiedTopology: true})
const playerSchema = {
  name: String,
  number: String
}

const Player = mongoose.model("player", playerSchema);

app.post("/create", function(req,res) {
  let newPlayer = new Player({
    name: req.body.name,
    number: req.body.number
  })

  newPlayer.save();
  res.redirect("/")
})

app.get('/editRoster',function(req,res) {
	res.sendFile(__dirname + '/static/editRoster.html')
})

app.get('/schedule',function(req,res) {
	res.sendFile(__dirname + '/static/schedule.html')
})

var games = { 
      "games": [
        {"date":"08/25/22","opponent":"Purdue Northwest University","venue":"home","score":"2-0 Lewis","point-getters":["Zimmerman (G)", "Shevchenko (G)", "Darlage (A)", "Beaulieu (A)" ]}
      ]
}

app.get('/games', (request, response) => {
  response.type('application/json')
  response.send(JSON.stringify(games, null, 4))
})

// Custom 404 page.
app.use((request, response) => {
  response.type('text/plain')
  response.status(404)
  response.send('404 - Not Found')
})

// Custom 500 page.
app.use((err, request, response, next) => {
  console.error(err.message)
  response.type('text/plain')
  response.status(500)
  response.send('500 - Server Error')
})

app.listen(port, () => console.log(
  `Express started at \"http://localhost:${port}\"\n` +
  `press Ctrl-C to terminate.`)
)
