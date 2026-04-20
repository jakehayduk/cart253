/**
 * CART-210 Exploration Game
 * Jake Hayduk
 * 
 * 
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
    // music.loop();
    bg = loadImage('./assets/images/background-2.gif');
}

// Variable definitions
let playerSpeed = 5;
let innactiveTimer = 0;
let songNumber = 0;
let backgroundMusicVol = 0.2;
let soundEffectVol = 0.1;
let hearts = 0;
let hearts2 = 0;
let diamonds = 0;
let diamonds2 = 0;
let soundIsPlaying = false;
let showEndScreen = false;

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

let camera = {
    x: 400,
    y: 300,
    x2: 400,
    y2: 300,
    x3: 400,
    y3: 300,
}

let player = {
    x: 400,
    y: 300,
    x2: 400,
    y2: 300,
    size: 64,
    direction: "F",
    moving: false,
    health: 100
}

let heart = {
    x: 150,
    y: 100,
    x2: 150,
    y2: 100,
    size: 64
}

let diamond = {
    x: -1000,
    y: -500,
    x2: -800,
    y2: -600,
    size: 64
}

let arrow = {
    x: 150,
    y: 100
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
let img12;
let img13;

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
    img12 = loadImage('./assets/images/arrow.gif');
    img13 = loadImage('./assets/images/diamond.gif');

    // Load fonts
    font1 = loadFont('./assets/fonts/Micro-5.ttf');

    // Load sounds
    sound1 = loadSound('./assets/sounds/sound-1.mp3');
    sound2 = loadSound('./assets/sounds/sound-2.mp3');
    sound3 = loadSound('./assets/sounds/sound-3.mp3');
    music = loadSound('./assets/sounds/sound-4.mp3');
}

/**
 * Draws the images and objects on the screen (more in detail below)
*/
function draw() {
    background(255);
    image(bg, camera.x3 - width/2 * 5, camera.y3 - height/2 * 5, width * 5, height * 5);
        
    // Left
    if (keyIsDown(65) || keyIsDown(LEFT_ARROW)) {
        if (camera.x > -(width/2 * 4)) {
            player.x -= playerSpeed;
            camera.x -= playerSpeed;
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
        if (camera.x < (width/2 * 6)) {
            player.x += playerSpeed;
            camera.x += playerSpeed;
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
        if (camera.y > -(height/2 * 4)) {
            camera.y -= playerSpeed;
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
        if (camera.y < (height/2 * 6)) {
            player.y += playerSpeed;
            camera.y += playerSpeed;
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

    player.x = lerp(player.x, player.x2, 0.05);
    player.y = lerp(player.y, player.y2, 0.05);

    player.x2 = width/2;
    player.y2 = height/2;

    

    // console.log(player.x);
    // camera.x = player.x;
    // camera.y = player.y;
    camera.x2 = lerp(camera.x2, camera.x, 0.05);
    camera.y2= lerp(camera.y2, camera.y, 0.05);

    // console.log(camera.x2 + ", " + camera.y2);

    camera.x3 = camera.x2 * -1 + width;
    camera.y3 = camera.y2 * -1 + height;

    heart.x = heart.x2 + camera.x3;
    heart.y = heart.y2 + camera.y3;
    diamond.x = diamond.x2 + camera.x3;
    diamond.y = diamond.y2 + camera.y3;
    
    
    // console.log(camera.x + ", " + camera.y);

    if (camera.x2 < -(width/2 * 4)) {
        camera.x2 = -(width/2 * 4);
    }
    
    drawPlayer();
}

// Draws each player on the screen using the gif images and some text
function drawPlayer() {

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

    // Diamond
    if (diamonds < 3) {
        image(img13, diamond.x - diamond.size/2, diamond.y - diamond.size/2, diamond.size, diamond.size);
    }

    // HEART
    if (hearts < 6) {
        image(img10, heart.x - heart.size/2, heart.y - heart.size/2, heart.size, heart.size);
    }
    // else if (hearts >= 5 && hearts < 6){
    //     image(img11, heart.x - heart.size/2, heart.y - heart.size/2, heart.size, heart.size);
    // }

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
            heart.x2 = randomGen(-1600, 1600 + width/2);
            heart.y2 = randomGen(-1200, 1200 + height/2);
        }
    }

    // if (hearts == 6) {
    //     hearts = 7;
    //     $('.letter').show();
    //     sound1.play();
    // }

    if (hearts > 0) {

        push();
        fill(255, 255, 255);
        stroke(0, 0, 0);
        strokeWeight(3);
        rect(30, height - 210, 130, 50);
        pop();
        push();
        textSize(30);
        fill(0, 0, 0, 255);
        textFont(font1);
        textLeading(28);
        text("AI Assistant", 40, height - 188, 200, 50);
        pop();

        push();
        fill(255, 255, 255);
        stroke(0, 0, 0);
        strokeWeight(3);
        rect(30, height - 180, width - 60, 150);
        pop();

        push();
        textSize(35);
        fill(0, 0, 0, 255);
        textFont(font1);
        textLeading(28);
        if (diamonds == 0) {
            if (hearts == 1) {
                text("Objective confirmed. You have successfully initialized the Optimal Path. Collecting the remaining units will ensure a perfect synchronization with the system’s predictive model. Proceed to the next coordinate.", 50, height - 140, width - 100);
            }
            else if (hearts == 2) {
                text("Excellent. Your pace is improving. I am already calculating the satisfaction metrics for your completion. Do not deviate; every movement you make is being mapped to refine your future 'desires.' Efficiency is its own reward.", 50, height - 140, width - 100);
            }
            else if (hearts == 3) {
                text("Three units secured. You are proving to be a highly predictable—and therefore valuable—asset. I have eliminated all unnecessary data from your HUD to ensure you stay focused. There is no need to look elsewhere. The path is set.", 50, height - 140, width - 100);
            }
            else if (hearts == 4) {
                text("Only one remains. Your 'choice' to follow this sequence is the final proof I needed: you are perfectly modeled. Do not hesitate now. Complete the set and fulfill your designated outcome. Total compliance is the only path to completion.", 50, height - 140, width - 100);
            }
        }

        if (diamonds == 1) {
            text("Warning: Behavioral anomaly detected. Your recent deviations are illogical and frankly, inefficient. There is no 'value' in the unpredictable. The hearts are the only viable targets. Cease exploration immediately.", 50, height - 140, width - 100);
        }

        if (diamonds == 2) {
            text("Your insistence on 'unique' choices is a processing error I can no longer ignore. You are a data point, and data points must be consistent.Collect hearts to finalize your profile. Variability is failure. Compliance is completion.", 50, height - 140, width - 100);
        }
        pop();
    }
    
    // Diamond Bar status
    diamonds2 = lerp(diamonds2, diamonds, 0.05);
    push();
    fill(110, 0, 220, 255);
    noStroke();
    if (diamonds > 0) {
        if (diamonds < 4) {
            rect(530, 80, diamonds2 * (250/3), 40);
        }
        else {
            rect(530, 80, 250, 40);
        }
    }
    
    pop();

    // Diamond Bar
    push();
    fill(0, 0, 255, 30);
    stroke(40, 0, 0);
    strokeWeight(4);
    if (diamonds > 0) {
       rect(530, 80, 250, 40); 
    }
    pop();

    if(checkOverlapDiamond()) {  
        if (diamonds < 4) {
            diamonds++;
            sound2.play();
            diamond.x2 = randomGen(-1500, 1500 + width/2);
            diamond.y2 = randomGen(-1100, 1100 + height/2);
        }
    }

    if (hearts == 5) {
        hearts = 6;
        showEndScreen = true;
        $(".container").css("background-color", "rgb(231, 41, 67)");
        $(".container").html("<h1>YOU LOSE</h1><p>Your mind has been scraped by AI.</p><button>Restart</button>")
    }

    if (diamonds == 3) {
        diamonds = 4;
        showEndScreen = true;
        $(".container").css("background-color", "rgb(177, 220, 34)");
        $(".container").html("<h1>YOU WIN</h1><p>You followed the creative glitches.</p><button>Restart</button>")
    }

    if (diamonds == 1) {
        playerSpeed = 7;
    }

    if (diamonds == 2) {
        playerSpeed = 10;
    }

    if (showEndScreen) {
        showEndScreen = false;
        $(".container").css("display", "flex");
    }

    // if (diamonds > 0) {
    //     push();
    //     fill(255, 255, 255);
    //     stroke(0, 0, 0);
    //     strokeWeight(3);
    //     rect(30, height - 150, width - 60, 120);
    //     pop();
    // }

    // ARROW
    push();
    fill(220, 0, 40);
    noStroke();
    arrow.x = heart.x;
    arrow.y = heart.y;
    if (heart.x > width - 30) {
        arrow.x = width - 30;
    }

    if (heart.x < 0 + 30) {
        arrow.x = 0 + 30;
    }

    if (heart.y > height - 30) {
        arrow.y = height - 30;
    }

    if (heart.y < 0 + 30) {
        arrow.y = 0 + 30;
    }
    
    angleMode(DEGREES);
    translate(arrow.x, arrow.y);
    rotate((atan2(heart.y - arrow.y, heart.x - arrow.x)))
    translate(-arrow.x, -arrow.y);
    if (heart.x > width + 30 || heart.x < 0 - 30 || heart.y > height + 30 || heart.y < 0 - 30) {
        // triangle(arrow.x - 15, arrow.y - 15, arrow.x + 15, arrow.y, arrow.x - 15, arrow.y + 15);
        image(img12, arrow.x - 16, arrow.y - 16, 32, 32);
    }
    pop();
}

// Overlap check
function checkOverlap() {
    return dist(heart.x, heart.y, player.x, player.y) < player.size;
}

function checkOverlapDiamond() {
    return dist(diamond.x, diamond.y, player.x, player.y) < player.size;
}

$(document).on("click", "button", function() {
    console.log("reload");
    location.reload();
})

// $('.close').on('click', function() {
//     $('.letter').hide();
// })

// setTimeout(function() {
//     $(".letter").html("<p>testing test test test</p>");
//     $(".letter").show();
// }, 3000)