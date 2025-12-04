/**
 * Variation Jam
 * Jake Hayduk
 * 
 * DESCRIPTION HERE
 * 
 */

"use strict";

/**
 * Sets up the canvas
*/
function setup() {
    createCanvas(800, 600);
}

// Variable definitions
let gameInit = false;
let allPlayers = [];
let players = [];
let myName;
let playerID;
let playerRef;

function randomGen(min, max) {
    return Math.floor(Math.random() * (Math.ceil(max) - Math.ceil(min) + 1)) + Math.ceil(min);
}

function initGame() {
    const allPlayersRef = firebase.database().ref('players');

    allPlayersRef.on('value', (snapshot) => {
        // updatePlayers();
        const playersObject = snapshot.val() || {};

        // const playersArray = Object.values(playersObject);
        // console.log(playersArray);
        
        // Object.keys(testPlayers).forEach((key) => {
        //     drawPlayer(testPlayers[key]);
        // })
        // testPlayers = snapshot.val();
        // console.log(testPlayers);

        const newPlayersArray = [];
        snapshot.forEach(playerSnapshot => {
            const player = playerSnapshot.val();
            player.id = playerSnapshot.key;
            newPlayersArray.push(player);
       })

       allPlayers = newPlayersArray;
    })
    allPlayersRef.on('child_added', (snapshot) => {
        const addedPlayer = snapshot.val();
        players.push(createPlayer());
    })
}

$('button').on('click', function() {
    if (gameInit == false && $('input').val().length > 2) {
        myName = $('input').val();
        $('.menu').hide();
        initGame();
        gameInit = true;
    }
})

$(document).on('keypress',function(e) {
    if(e.which == 13) {
        if (gameInit == false && $('input').val().length > 2) {
            myName = $('input').val();
            $('.menu').hide();
            initGame();
            gameInit = true;
        }
    }
});

// FIREBASE

// Database reference
const db = firebase.database();

let dummyPlayer = {
    x: randomGen(200, 600),
    y: randomGen(150, 450)
}

// Create a new player (YOU!!)
const newPlayerRef = db.ref('players').push({
    x: dummyPlayer.x,
    y: dummyPlayer.y
})

// Get your unique id
playerID = newPlayerRef.key;

// Reference the stored player with the same id (YOU!!)
playerRef = db.ref('players/' + playerID);

// Remove player on disconnect
playerRef.onDisconnect().remove();

// onValue(db, (snapshot) => {
//     const data = snapshot.val();
//     console.log(data);
// })



function joinGame() {
    playerRef.set({
        name: myName,
        x: 400,
        y: 300
    })
}

function createPlayer() {
    console.log('creating player')
    const newPlayer = {
        x: 0,
        y: 0,
        size: 50
    };
    return newPlayer;
}



// const player = {
//     x: 400,
//     y: 300,
//     size: 50
// }

/**
 * OOPS I DIDN'T DESCRIBE WHAT MY DRAW DOES!
*/
function draw() {
    background("#E09382");

    if (keyIsDown(65)) {
        dummyPlayer.x -= 5;
    }

    if (keyIsDown(68)) {
        dummyPlayer.x += 5;
    }

    if (keyIsDown(87)) {
        dummyPlayer.y -= 5;
    }

    if (keyIsDown(83)) {
        dummyPlayer.y += 5;
        console.log(allPlayers)
    }

    playerRef.update({
        x: dummyPlayer.x,
        y: dummyPlayer.y
    })

    for (let i = 0; i < allPlayers.length; i++) {
        drawPlayer(allPlayers[i]);
    }
}

function drawPlayer(player) {
    push();
    noStroke();
    fill("red");
    // rect(player.x - player.size/2, player.y - player.size/2, player.size, player.size);
    rect(player.x, player.y, 20, 20);
    pop();
}

// function updatePlayers {

// }