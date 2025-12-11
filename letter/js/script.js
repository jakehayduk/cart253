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

function setup() {
    createCanvas(800, 600);
    noSmooth();
    music.loop();
}

// Handles the background music
// function backgroundMusic() {
//     song[songNumber].setVolume(backgroundMusicVol);
//     song[songNumber].play();
//     song[songNumber].onended(nextSong);
// }

// Goes to the next background song
// function nextSong() {
//     songNumber++;
//     if (songNumber > 2) {
//         songNumber = 0;
//     }
//     backgroundMusic();
// }

// Variable definitions
let playerSpeed = 5;
let innactiveTimer = 0;
let songNumber = 0;
let backgroundMusicVol = 0.2;
let soundEffectVol = 0.1;
let hearts = 0;
let hearts2 = 0;
let soundIsPlaying = false;

setInterval(function() {
    innactiveTimer++;
    if (innactiveTimer > 5) {
        player.direction = "S";
    }
}, 1000)

// Random function (Because p5 stopped me from calling the random function outside of setup or draw)
function randomGen(min, max) {
    return Math.floor(Math.random() * (Math.ceil(max) - Math.ceil(min) + 1)) + Math.ceil(min);
}

let player = {
    x: randomGen(200, 600),
    y: randomGen(150, 450),
    size: 64,
    direction: "F",
    moving: false,
    health: 100
}

let heart = {
    x: 150,
    y: 100,
    size: 64
}

/**
 * Draws the images and objects on the screen (more in detail below)
*/
function draw() {
    background(180, 150, 130);
        // Left
        if (keyIsDown(65) || keyIsDown(LEFT_ARROW)) {
            if (player.x > 0) {
                player.x -= playerSpeed;
                player.direction = "L";
                player.moving = true;

                if (!soundIsPlaying) {
                    sound3.rate(2);
                    sound3.loop();
                    soundIsPlaying = true;
                }
            }
            innactiveTimer = 0;
        }

        // Right
        else if (keyIsDown(68) || keyIsDown(RIGHT_ARROW)) {
            if (player.x < width) {
                player.x += playerSpeed;
                player.direction = "R";
                player.moving = true;
                
                if (!soundIsPlaying) {
                    sound3.rate(2);
                    sound3.loop();
                    soundIsPlaying = true;
                }
            }
            innactiveTimer = 0;
        }

        // Up
        else if (keyIsDown(87) || keyIsDown(UP_ARROW)) {
            if (player.y > 0) {
                player.y -= playerSpeed;
                player.direction = "B";
                player.moving = true;

                if (!soundIsPlaying) {
                    sound3.rate(2);
                    sound3.loop();
                    soundIsPlaying = true;
                }
            }
            innactiveTimer = 0;
        }

        // Down
        else if (keyIsDown(83) || keyIsDown(DOWN_ARROW)) {
            if (player.y < height) {
                player.y += playerSpeed;
                player.direction = "F";
                player.moving = true;

                if (!soundIsPlaying) {
                    sound3.rate(2);
                    sound3.loop();
                    soundIsPlaying = true;
                }
            }
            innactiveTimer = 0;
        }

        else {
            player.moving = false;
            sound3.stop();
            soundIsPlaying = false;
        }

        drawPlayer();
}

// Defining asset variables
let img1;
let img2;
let img3;
let img4;
let img5;
let img6;
let img7;
let img8;
let img9;
let img10;
let img11;

let font1;

let sound1;
let sound2;
let sound3;
let music;

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
    img10 = loadImage('./assets/images/heart.gif');
    img11 = loadImage('./assets/images/letter.gif');

    // Load fonts
    font1 = loadFont('./assets/fonts/Micro-5.ttf');

    // Load sounds
    sound1 = loadSound('./assets/sounds/sound-1.mp3');
    sound2 = loadSound('./assets/sounds/sound-2.mp3');
    sound3 = loadSound('./assets/sounds/sound-3.mp3');
    music = loadSound('./assets/sounds/sound-4.mp3');
}

// Draws each player on the screen using the gif images and some text
function drawPlayer() {

    push();
    textSize(35);
    fill(0, 0, 0, 50);
    textFont(font1);
    textAlign(CENTER);
    text("Collect hearts to heal the Jake!", 400, 300)
    pop();

    // Each of these if statements handles a different direction that is stored in each player object, changing the image depending on the direction and if it is moving or not
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
    // If the player is sleeping ("S")
    if (player.direction == "S") {
        image(img9, player.x - player.size/2, player.y - player.size/2, player.size, player.size)
    }

    // Add the whatever hat that the player is wearing (unless they're sleeping)
    if (player.hat > 0 && player.direction != "S") {
        image(hat[player.hat], player.x - player.size/2, player.y - player.size, player.size, player.size * 1.5);
    }

    // HEART
    if (hearts < 5) {
        image(img10, heart.x - heart.size/2, heart.y - heart.size/2, heart.size, heart.size);
    }
    else if (hearts >= 5 && hearts < 6){
        image(img11, heart.x - heart.size/2, heart.y - heart.size/2, heart.size, heart.size);
    }

    // Health Bar status
    hearts2 = lerp(hearts2, hearts, 0.05);
    // hearts = hearts;
    push();
    fill(220, 0, 40, 255);
    noStroke();
    if (hearts < 6) {
    rect(530, 20, hearts2 * (250/5), 40);
    }
    else {
        rect(530, 20, 250, 40);
    }
    pop();

    // Health Bar
    push();
    fill(255, 0, 0, 30);
    stroke(40, 0, 0);
    strokeWeight(4);
    rect(530, 20, 250, 40);
    pop();

    if(checkOverlap()) {  
        if (hearts < 6) {
            hearts++;
            sound2.play();
            heart.x = width - player.x + randomGen(0, 200) - randomGen(0, 200);
            heart.y = height - player.y + randomGen(0, 200) - randomGen(0, 200);

            if (heart.x > 780) {
                heart.x = 760;
            }

            if (heart.y > 580) {
                heart.y = 560;
            }

            if (heart.x < 20) {
                heart.x = 40;
            }

            if (heart.y < 20) {
                heart.y = 40;
            }
        }
    }

    if (hearts == 6) {
        hearts = 7;
        $('.letter').show();
        sound1.play();
    }
}

// Overlap check
function checkOverlap() {
    return dist(heart.x, heart.y, player.x, player.y) < player.size;
}

$('.close').on('click', function() {
    $('.letter').hide();
})
