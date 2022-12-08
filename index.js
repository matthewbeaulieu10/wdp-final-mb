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

app.post("/createPlayer", function(req,res) {
  let newPlayer = new Player({
    name: req.body.name,
    number: req.body.number
  })

  newPlayer.save();
  res.redirect("/")
})

app.post("/updatePlayer", function(req, res) {
  Player.findByIdAndUpdate(
    req.body.id,
    {name:req.body.newName, number:req.body.newNumber},
    function (err, docs) {
      if (err) {
        console.log(err)
      } else {
        console.log("i hope this updated it!")
      }
    })
  res.redirect("/")
})

app.post("/deletePlayer", function(req, res) {
  Player.findByIdAndDelete(
    req.body.id,
    function(err, docs) {
      if (err) {
        console.log(err)
      } else {
        console.log("i hope this deleted it")
      }
    })
    res.redirect("/")
})

const renderPlayers = (playersArray) => {
  let text = "Lewis Mens Soccer Roster: <br/><br/>";
  playersArray.forEach((player)=>{
    text += "name: " + player.name + "<br/>";
    text += "number: " + player.number + "<br/>"; 
    text += "id: " + player.id + "<br/><br/>";
  })
  text += "total count: " + playersArray.length;
  return text
}

app.get("/readPlayers", function(request, response) {
  Player.find({}).then(players => {
    response.type('text/plain');
    response.send(renderPlayers(players));
  })
})

const gameSchema = {
  date: String,
  opponent: String,
  venue: String,
  score: String, 
  victor: String,
  pointGetters: String
}

const Game = mongoose.model("game", gameSchema);

app.post("/createGame", function(req,res) {
  let newGame = new Game({
    date: req.body.date,
    opponent: req.body.opponent,
    venue: req.body.venue,
    score: req.body.score,
    victor: req.body.victor,
    pointGetters: req.body.pointGetters
  })

  newGame.save();
  res.redirect("/")
})

const renderGames = (gamesArray) => {
  let text = "Lewis Mens Soccer Schedule: <br/><br/>";
  gamesArray.forEach((game)=>{
    text += "date: " + game.date + "<br/>";
    text += "opponent: " + game.opponent + "<br/>";
    text += "venue: " + game.venue + "<br/>";
    text += "score: " + game.score + "<br/>";
    text += "victor: " + game.victor + "<br/>";
    text += "point getters: " + game.pointGetters + "<br/>"; 
    text += "id: " + game.id + "<br/><br/>";
  })
  text += "total count: " + gamesArray.length;
  return text
}

app.get("/readGames", function(request, response) {
  Game.find({}).then(games => {
    response.type('text/plain');
    response.send(renderGames(games));
  })
})

app.post("/updateGame", function(req, res) {
  Game.findByIdAndUpdate(
    req.body.id,
    {date:req.body.newDate, opponent:req.body.newOpponent,
    venue:req.body.newVenue, score:req.body.newScore,
    victor:req.body.newVictor, pointGetters:req.body.newPointGetters},
    function (err, docs) {
      if (err) {
        console.log(err)
      } else {
        console.log("i hope this updated it!")
      }
    })
  res.redirect("/")
})

app.post("/deleteGame", function(req, res) {
  Game.findByIdAndDelete(
    req.body.id,
    function(err, docs) {
      if (err) {
        console.log(err)
      } else {
        console.log("i hope this deleted it")
      }
    })
    res.redirect("/")
})

app.get('/editRoster',function(req,res) {
	res.sendFile(__dirname + '/static/editRoster.html')
})

app.get('/readRoster', function(req,res) {
  res.sendFile(__dirname + '/static/readRoster.html')
})

app.get('/editSchedule',function(req,res) {
	res.sendFile(__dirname + '/static/editSchedule.html')
})

app.get('/readSchedule', function(req,res) {
  res.sendFile(__dirname + '/static/readSchedule.html')
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
