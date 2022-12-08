const { response } = require("express");

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

function loadReadRosterPage() {
    location.href=location.href + 'readRoster'
}

function loadEditSchedulePage() {
    location.href=location.href + 'editSchedule'
}

function loadReadSchedulePage() {
    location.href=location.href + 'readSchedule'
}

async function readPlayers() {
    try{
        const roster = await fetch("/readPlayers")
        const datas = await roster.text()
        document.getElementById("rosterList").innerHTML = datas
    } catch(e) {
        alert("uh oh")
    }
    

}

async function readGames() {
    try{
        const schedule = await fetch("/readGames")
        const data = await schedule.text()
        document.getElementById("scheduleList").innerHTML = data
    } catch (e) {
        alert("schedule uh oh")
    }
}

// async function getGames() {
//     try{
//         const response = await fetch("/games")
//         const data = await response.json()
//         saveGames(data)
//     } catch(e) {
//         alert("this crap not working")
//     }
//     showGames()
// }

// var games; 

// function saveGames(data) {
//     try{
//         games = Object.values(data.games)
//         console.log(games)
//     } catch (e) {
//         alert("this crap not working")
//     }
    
// }

// function showGames() {
//     for(let i = 0; i < games.length; i++) {
//         document.getElementById("schedule").innerHTML = 
//         "GAME " + (i+1) + "<br/>" +
//         "opponent: " + games[i].opponent + "<br/>" +
//         "date: " + games[i].date + "<br/>" +
//         "score: " + games[i].score + "<br/>" +
//         "venue: " + games[i].venue;
//     }
    
// }