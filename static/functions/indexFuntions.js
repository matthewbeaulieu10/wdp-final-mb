function testing() {
    if (document.getElementById("urmom").style.color == "red") {
        document.getElementById("urmom").style.color = "white";
    } else {
        document.getElementById("urmom").style.color = "red";
    }
}

function loadEditRosterPage() {
    location.href=location.href + 'editRoster'
}

function loadSchedulePage() {
    location.href=location.href + 'schedule'
}

async function getGames() {
    try{
        const response = await fetch("/games")
        const data = await response.json()
        saveGames(data)
    } catch(e) {
        alert("this crap not working")
    }
    showGames()
}

var games; 

function saveGames(data) {
    try{
        games = Object.values(data.games)
        console.log(games)
    } catch (e) {
        alert("this crap not working")
    }
    
}

function showGames() {
    for(let i = 0; i < games.length; i++) {
        document.getElementById("schedule").innerHTML = 
        "GAME " + (i+1) + "<br/>" +
        "opponent: " + games[i].opponent + "<br/>" +
        "date: " + games[i].date + "<br/>" +
        "score: " + games[i].score + "<br/>" +
        "venue: " + games[i].venue;
    }
    
}