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

let bg;
function setup() {
    createCanvas(800, 600);
    noSmooth();
    bg = loadImage('./assets/images/background.gif');
    // song[0].setVolume(0.2);
    // song[0].play();
}

// Variable definitions
let gameInit = false;
let allPlayers = [];
let players = [];
let myName;
let playerID;
let playerRef;
let playerSpeed = 4;
let addedMessage;

// Random function (Because p5 stopped me from calling the random function outside of setup or draw)
function randomGen(min, max) {
    return Math.floor(Math.random() * (Math.ceil(max) - Math.ceil(min) + 1)) + Math.ceil(min);
}

function initGame() {
    const allPlayersRef = firebase.database().ref('players');
    const allMessagesRef = firebase.database().ref('messages');

    allPlayersRef.on('value', (snapshot) => {

        const newPlayersArray = [];
        snapshot.forEach(playerSnapshot => {
            const player = playerSnapshot.val();
            player.id = playerSnapshot.key;
            newPlayersArray.push(player);
       })

       allPlayers = newPlayersArray;
    })
    allMessagesRef.on('child_added', (snapshot) => {
        addedMessage = snapshot.val();
        console.log(addedMessage.message);

        $('.bubble-modal p').html($('.bubble-modal p').html() + '<br>' + addedMessage.name + ': '+ addedMessage.message)

        // snapshot.forEach(messageSnapshot => {
        //     const message = messageSnapshot.val()

        // })
    })
}

// FIREBASE

// Database reference
const db = firebase.database();

let dummyPlayer = {
    x: randomGen(200, 600),
    y: randomGen(150, 450),
    size: 64,
    direction: "F",
    moving: false,
    hat: 0
}

// Create a new player (YOU!!)
const newPlayerRef = db.ref('players').push({
    x: dummyPlayer.x,
    y: dummyPlayer.y,
    size: dummyPlayer.size,
    direction: "F",
    moving: false,
    hat: 0
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
        x: dummyPlayer.x,
        y: dummyPlayer.y,
        size: dummyPlayer.size,
        direction: "F",
        moving: false,
        hat: 0
    })
}

// function createPlayer() {
//     console.log('creating player')
//     const newPlayer = {
//         x: 0,
//         y: 0,
//         size: 50
//     };
//     return newPlayer;
// }



// const player = {
//     x: 400,
//     y: 300,
//     size: 50
// }

/**
 * OOPS I DIDN'T DESCRIBE WHAT MY DRAW DOES!
*/
function draw() {
    background(bg);

    if (gameInit == true) {
        // Left
        if (keyIsDown(65)) {
            if (dummyPlayer.x > 0) {
                dummyPlayer.x -= playerSpeed;
                dummyPlayer.direction = "L";
                dummyPlayer.moving = true;
            }
        }

        // Right
        else if (keyIsDown(68)) {
            if (dummyPlayer.x < width) {
                dummyPlayer.x += playerSpeed;
                dummyPlayer.direction = "R";
                dummyPlayer.moving = true;
            }
        }

        // Up
        else if (keyIsDown(87)) {
            if (dummyPlayer.y > 0) {
                dummyPlayer.y -= playerSpeed;
                dummyPlayer.direction = "B";
                dummyPlayer.moving = true;
            }
        }

        // Down
        else if (keyIsDown(83)) {
            if (dummyPlayer.y < height) {
                dummyPlayer.y += playerSpeed;
                dummyPlayer.direction = "F";
                dummyPlayer.moving = true;
            }
        }

        else {
            dummyPlayer.moving = false;
        }

        playerRef.update({
            x: dummyPlayer.x,
            y: dummyPlayer.y,
            direction: dummyPlayer.direction,
            moving: dummyPlayer.moving
        })

        for (let i = 0; i < allPlayers.length; i++) {
            drawPlayer(allPlayers[i]);
        }
    }

    
}
let img1;
let img2;
let img3;
let img4;
let img5;
let img6;
let img7;
let img8;
let hat;

let font1;

let song;

function preload() {

    //Load images
    img1 = loadImage('./assets/images/walk-forwards.gif');
    img2 = loadImage('./assets/images/walk-backwards.gif');
    img3 = loadImage('./assets/images/walk-left.gif');
    img4 = loadImage('./assets/images/walk-right.gif');
    img5 = loadImage('./assets/images/static-forwards.gif');
    img6 = loadImage('./assets/images/static-backwards.gif');
    img7 = loadImage('./assets/images/static-left.gif');
    img8 = loadImage('./assets/images/static-right.gif');
    hat = ["NO HAT", loadImage('./assets/images/hat-1.gif'), loadImage('./assets/images/hat-2.gif'), loadImage('./assets/images/hat-3.gif'), loadImage('./assets/images/hat-4.gif'), loadImage('./assets/images/hat-5.gif'), loadImage('./assets/images/hat-6.gif'), loadImage('./assets/images/hat-7.gif'), loadImage('./assets/images/hat-8.gif')];

    // Load fonts
    font1 = loadFont('./assets/fonts/Micro-5.ttf');

    // Load sounds
    song = [loadSound('./assets/sounds/game-1.mp3'),loadSound('./assets/sounds/game-2.mp3'),loadSound('./assets/sounds/game-3.mp3')];
}

function drawPlayer(player) {

    // Torso
    // push();
    // noStroke();
    // fill("black");
    // rect(player.x - player.size/2/10, player.y - player.size/2, player.size/10, player.size);
    // pop();

    // Head
    // push();
    // noFill();
    // strokeWeight(5)
    // stroke("black");
    // circle(player.x, player.y - player.size, player.size);
    // pop();

    if (player.direction == "F") {
        if (player.moving == true) {
            image(img1, player.x - player.size/2, player.y - player.size/2, player.size, player.size);
        }
        else {
            image(img5, player.x - player.size/2, player.y - player.size/2, player.size, player.size);
        }
    }
    if (player.direction == "B") {
        if (player.moving == true) {
            image(img2, player.x - player.size/2, player.y - player.size/2, player.size, player.size);
        }
        else {
            image(img6, player.x - player.size/2, player.y - player.size/2, player.size, player.size);
        }
    }
    if (player.direction == "L") {
        if (player.moving == true) {
            image(img3, player.x - player.size/2, player.y - player.size/2, player.size, player.size);
        }
        else {
            image(img7, player.x - player.size/2, player.y - player.size/2, player.size, player.size);
        }
    }
    if (player.direction == "R") {
        if (player.moving == true) {
            image(img4, player.x - player.size/2, player.y - player.size/2, player.size, player.size);
        }
        else {
            image(img8, player.x - player.size/2, player.y - player.size/2, player.size, player.size);
        }
    }

    if (player.hat > 0) {
        image(hat[player.hat], player.x - player.size/2, player.y - player.size, player.size, player.size * 1.5);
    }
    

    // Draw player name above
    push();
    textSize(30);
    fill(255, 255, 255, 200);
    strokeWeight(4);
    textFont(font1);
    textAlign(CENTER)
    text(player.name, player.x, (player.y - player.size) + 3 * sin(frameCount * 0.02));
    pop();
}

// BUTTONS

let bubbleOpen = false;
let costumeOpen = false;
let sendMessage;

$('button').on('click', function() {
    if (gameInit == false && $('.username').val().length > 2) {
        myName = $('.username').val();
        $('.menu').hide();
        joinGame();
        initGame();
        gameInit = true;
    }
})

$(document).on('keypress',function(e) {
    if(e.which == 13) {
        if (gameInit == false && $('.username').val().length > 2) {
            myName = $('.username').val();
            $('.menu').hide();
            joinGame();
            initGame();
            gameInit = true;
        }
        if (bubbleOpen = true && $('.bubble-modal-input').val().length > 0) {
            sendMessage = $('.bubble-modal-input').val();
            const newMessageRef = db.ref('messages').push({
                name: myName,
                message: sendMessage
            })
            $('.bubble-modal-input').val('');
        }
    }
});

$('.bubble-button').on('click', function() {
    if (bubbleOpen == false && costumeOpen == false) {
        bubbleOpen = true;
        $('.bubble-modal').css('display', 'flex');
    }
    else {
        bubbleOpen = false;
        $('.bubble-modal').hide();
    }
})

$('.bubble-modal-close').on('click', function() {
    if (bubbleOpen == true) {
        bubbleOpen = false;
        $('.bubble-modal').hide();
    }
})

$('.costume-button').on('click', function() {
    if (costumeOpen == false && bubbleOpen == false) {
        costumeOpen = true;
        $('.costume-modal').css('display', 'flex');
    }
    else {
        costumeOpen = false;
        $('.costume-modal').hide();
    }
})

$('.costume-modal-close').on('click', function() {
    if (costumeOpen == true) {
        costumeOpen = false;
        $('.costume-modal').hide();
    }
})

$('.costume').on('click', function() {
    const clickedCostume = ($(this).attr('id')).split('-');

    playerRef.update({
        hat: Number(clickedCostume[1])
    })
})