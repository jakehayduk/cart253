/**
 * Variation Jam
 * Jake Hayduk
 * 
 * Online multiplayer game that has basic features
 * 
 */

"use strict";

/**
 * Sets up the canvas and loads the background image
*/

let bg;
function setup() {
    createCanvas(800, 600);
    noSmooth();
    bg = loadImage('./assets/images/background.gif');
}

// Handles the background music
function backgroundMusic() {
    song[songNumber].setVolume(backgroundMusicVol);
    song[songNumber].play();
    song[songNumber].onended(nextSong);
}

// Goes to the next background song
function nextSong() {
    songNumber++;
    if (songNumber > 2) {
        songNumber = 0;
    }
    backgroundMusic();
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
let intoBattle = false;
let innactiveTimer = 0;
let songNumber = 0;
let backgroundMusicVol = 0.2;
let soundEffectVol = 0.1;
let death = false;

setInterval(function() {
    innactiveTimer++;
    if (innactiveTimer > 15) {
        dummyPlayer.direction = "S";
    }
}, 1000)

// Random function (Because p5 stopped me from calling the random function outside of setup or draw)
function randomGen(min, max) {
    return Math.floor(Math.random() * (Math.ceil(max) - Math.ceil(min) + 1)) + Math.ceil(min);
}

// Begin the initialization after logging in
function initGame() {
    backgroundMusic();
    const allPlayersRef = firebase.database().ref('players');
    const allMessagesRef = firebase.database().ref('messages');

    // Fires everytime something is changed in the database
    allPlayersRef.on('value', (snapshot) => {

        // Make an array out of the players
        const newPlayersArray = [];
        snapshot.forEach(playerSnapshot => {
            const player = playerSnapshot.val();
            player.id = playerSnapshot.key;
            newPlayersArray.push(player);
       })

       allPlayers = newPlayersArray;
    })

    // Handle messages when they're added
    allMessagesRef.on('child_added', (snapshot) => {
        addedMessage = snapshot.val();
        $('.bubble-modal p').html($('.bubble-modal p').html() + '<br>' + addedMessage.name + ': '+ addedMessage.message)
    })
}

// Database reference
const db = firebase.database();

// Making things easier by using a local dummy player controller
let dummyPlayer = {
    x: randomGen(200, 600),
    y: randomGen(150, 450),
    size: 64,
    direction: "F",
    moving: false,
    hat: 0,
    health: 100,
    battle: false,
    grace: false
}

// Create a new player (YOU!!) in Firebase
const newPlayerRef = db.ref('players').push({
    x: -1000, // Render them off the screen before the game initializes
    y: dummyPlayer.y,
    size: dummyPlayer.size,
    direction: "F",
    moving: false,
    hat: 0,
    health: dummyPlayer.health,
    battle: false,
    grace: false
})

// Get your unique id
playerID = newPlayerRef.key;

// Reference the stored player with the same id (YOU!!)
playerRef = db.ref('players/' + playerID);

// Remove player on disconnect
playerRef.onDisconnect().remove();

// Set the values as you join the game
function joinGame() {
    playerRef.set({
        name: myName,
        x: dummyPlayer.x,
        y: dummyPlayer.y,
        size: dummyPlayer.size,
        direction: "F",
        moving: false,
        hat: 0,
        health: dummyPlayer.health,
        battle: false,
        grace: false
    })
}

/**
 * Draws the images and objects on the screen (more in detail below)
*/
function draw() {
    background(bg);

    // If the game has started, use the keyboard to control the player
    if (gameInit == true) {
        // Left
        if (keyIsDown(65)) {
            if (dummyPlayer.x > 0) {
                dummyPlayer.x -= playerSpeed;
                dummyPlayer.direction = "L";
                dummyPlayer.moving = true;
            }
            innactiveTimer = 0;
        }

        // Right
        else if (keyIsDown(68)) {
            if (dummyPlayer.x < width) {
                dummyPlayer.x += playerSpeed;
                dummyPlayer.direction = "R";
                dummyPlayer.moving = true;
            }
            innactiveTimer = 0;
        }

        // Up
        else if (keyIsDown(87)) {
            if (dummyPlayer.y > 0) {
                dummyPlayer.y -= playerSpeed;
                dummyPlayer.direction = "B";
                dummyPlayer.moving = true;
            }
            innactiveTimer = 0;
        }

        // Down
        else if (keyIsDown(83)) {
            if (dummyPlayer.y < height) {
                dummyPlayer.y += playerSpeed;
                dummyPlayer.direction = "F";
                dummyPlayer.moving = true;
            }
            innactiveTimer = 0;
        }

        else {
            dummyPlayer.moving = false;
        }
        
        // Update the necessary values in Firebase in real time
        playerRef.update({
            x: dummyPlayer.x,
            y: dummyPlayer.y,
            direction: dummyPlayer.direction,
            moving: dummyPlayer.moving,
            health: dummyPlayer.health,
        })

        for (let i = 0; i < allPlayers.length; i++) {
            drawPlayer(allPlayers[i]);
            const battlePlayers = allPlayers.filter(player => player.battle == true);
            if (battlePlayers.length > 0) {
                battle(battlePlayers);
            }
        }

        if (dummyPlayer.health < 1 && death == false) {
            playerRef.remove();
            $('.death').show();
            death == true;
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
let img9;
let hat;

let font1;

let song;
let sound1;
let sound2;
let sound3;

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
    img9 = loadImage('./assets/images/sleep.gif');
    hat = ["NO HAT", loadImage('./assets/images/hat-1.gif'), loadImage('./assets/images/hat-2.gif'), loadImage('./assets/images/hat-3.gif'), loadImage('./assets/images/hat-4.gif'), loadImage('./assets/images/hat-5.gif'), loadImage('./assets/images/hat-6.gif'), loadImage('./assets/images/hat-7.gif'), loadImage('./assets/images/hat-8.gif')];

    // Load fonts
    font1 = loadFont('./assets/fonts/Micro-5.ttf');

    // Load sounds
    song = [loadSound('./assets/sounds/game-1.mp3'),loadSound('./assets/sounds/game-2.mp3'),loadSound('./assets/sounds/game-3.mp3')];
    sound1 = loadSound('./assets/sounds/game-4.mp3');
    sound2 = loadSound('./assets/sounds/game-5.mp3');
    sound3 = loadSound('./assets/sounds/game-6.mp3');
}

function drawPlayer(player) {

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
    if (player.direction == "S") {
        image(img9, player.x - player.size/2, player.y - player.size/2, player.size, player.size)
    }

    if (player.hat > 0 && player.direction != "S") {
        image(hat[player.hat], player.x - player.size/2, player.y - player.size, player.size, player.size * 1.5);
    }
    

    // Draw player name above
    push();
    textSize(30);
    fill(255, 255, 255, 200);
    strokeWeight(4);
    textFont(font1);
    textAlign(CENTER)
    text(player.name, player.x, (player.y - player.size * 1.4) + 3 * sin(frameCount * 0.02));
    pop();

    // Health bar
    push();
    fill(255, 0, 0, 100);
    noStroke();
    rect(player.x - player.size, player.y - player.size * 1.2, (player.size * 2) * (player.health/100), player.size/3);
    pop();

    // Health number
    push();
    textSize(25);
    fill(255, 255, 255, 150);
    textFont(font1);
    textAlign(CENTER);
    text(player.health, player.x, player.y - player.size/1.05)
    pop();
}

// Clicking on someone else
function mousePressed() {
    for (let i = 0; i < allPlayers.length; i++) {
        if (checkOverlap(allPlayers[i])) {
            if (allPlayers[i].id != playerID && allPlayers[i].direction != 'S' && allPlayers[i].grace == false) {
                playerRef.update({
                    battle: true
                })

                const chosenPlayer = firebase.database().ref('players/' + allPlayers[i].id)
                chosenPlayer.update({
                    battle: true
                })
            }
        }
    }
}

function checkOverlap(player) {
    return dist(mouseX, mouseY, player.x, player.y) < player.size;
}

function battle(battlePlayers) {
    if (intoBattle == false) {
        console.log(battlePlayers);
        intoBattle = true;

        $('.battle-modal').css('display', 'grid');
        $('.battle-modal').css('opacity', '1');
        console.log(battlePlayers[0].name + " VS " + battlePlayers[1].name)
        $('.battle-modal .left h2').text(battlePlayers[0].name);
        $('.battle-modal .right h2').text(battlePlayers[1].name);

        setTimeout(function() {
            const myInterval = setInterval(myTimer, 15);
            function myTimer() {
                $('.battle-modal').append("<div class='star' style='rotate:" + randomGen(0, 360) + "deg; scale:" + randomGen(0.5, 2) + "'></div>");
            }
            setTimeout(function() {
                clearInterval(myInterval);
                $('.star').remove();
                $('.battle-modal').css('opacity', '0');

                dummyPlayer.health = dummyPlayer.health - randomGen(0, 50);
                dummyPlayer.direction = "F";
                innactiveTimer = 0;

                playerRef.update({
                    battle: false,
                    grace: true
                })

                setTimeout(function() {
                    $('.battle-modal').hide();
                    intoBattle = false;
                }, 1000)

                setTimeout(function() {
                    playerRef.update({
                        grace: false
                    })
                }, 10000)
            }, 3000)
        }, 5000)
    }
}

// BUTTONS

let bubbleOpen = false;
let costumeOpen = false;
let settingsOpen = false;
let sendMessage;

$('button').on('click', function() {
    if (gameInit == false && $('.username').val().length > 2) {
        myName = $('.username').val();
        $('.menu').hide();
        joinGame();
        initGame();
        gameInit = true;
        sound1.setVolume(soundEffectVol);
        sound1.play();
    }
})

$(document).on('keypress',function(e) {
    if(e.which == 13) {
        if (gameInit == false && $('.username').val().length > 2 && $('.username').val().length < 32) {
            myName = $('.username').val();
            $('.menu').hide();
            joinGame();
            initGame();
            gameInit = true;
            sound1.setVolume(soundEffectVol);
            sound1.play();
        }
        if (bubbleOpen = true && $('.bubble-modal-input').val().length > 0 && $('.bubble-modal-input').val().length < 100) {
            sendMessage = $('.bubble-modal-input').val();
            const newMessageRef = db.ref('messages').push({
                name: myName,
                message: sendMessage
            })
            $('.bubble-modal-input').val('');
            sound2.setVolume(soundEffectVol);
            sound2.rate(-1);
            sound2.play();
        }
    }
});

$('.bubble-button').on('click', function() {
    if (bubbleOpen == false && costumeOpen == false && settingsOpen == false) {
        bubbleOpen = true;
        $('.bubble-modal').css('display', 'flex');
        sound2.setVolume(soundEffectVol);
        sound2.play();
    }
    else {
        bubbleOpen = false;
        $('.bubble-modal').hide();
        sound1.setVolume(soundEffectVol);
        sound1.play();
    }
})

$('.bubble-modal-close').on('click', function() {
    if (bubbleOpen == true) {
        bubbleOpen = false;
        $('.bubble-modal').hide();
        sound1.setVolume(soundEffectVol);
        sound1.play();
    }
})

$('.costume-button').on('click', function() {
    if (costumeOpen == false && bubbleOpen == false && settingsOpen == false) {
        costumeOpen = true;
        $('.costume-modal').css('display', 'flex');
        sound2.setVolume(soundEffectVol);
        sound2.play();
    }
    else {
        costumeOpen = false;
        $('.costume-modal').hide();
        sound1.setVolume(soundEffectVol);
        sound1.play();
    }
})

$('.costume-modal-close').on('click', function() {
    if (costumeOpen == true) {
        costumeOpen = false;
        $('.costume-modal').hide();
        sound1.setVolume(soundEffectVol);
        sound1.play();
    }
})

$('.costume').on('click', function() {
    const clickedCostume = ($(this).attr('id')).split('-');

    playerRef.update({
        hat: Number(clickedCostume[1])
    })
    sound2.setVolume(soundEffectVol);
    sound2.play();
})

$('.settings-button').on('click', function() {
    if (settingsOpen == false && bubbleOpen == false && costumeOpen == false) {
        settingsOpen = true;
        $('.settings-modal').css('display', 'flex');
        sound2.setVolume(soundEffectVol);
        sound2.play();
    }
    else {
        settingsOpen = false;
        $('.settings-modal').hide();
        sound1.setVolume(soundEffectVol);
        sound1.play();
    }
})

$('.settings-modal-close').on('click', function() {
    if (settingsOpen == true) {
        settingsOpen = false;
        $('.settings-modal').hide();
        sound1.setVolume(soundEffectVol);
        sound1.play();
    }
})

// Put the player to sleep when they switch tabs
document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "hidden") {
        dummyPlayer.direction = "S";
    }
});

$('#myRange').on('input', function() {
    backgroundMusicVol = ($(this).val()) / 100;
    song[songNumber].setVolume(backgroundMusicVol);
})

$('#myRange2').on('input', function() {
    soundEffectVol = ($(this).val()) / 100;
})