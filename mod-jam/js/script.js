/**
 * Frogfrogfrog
 * Pippin Barr
 * 
 * A game of catching flies with your frog-tongue
 * 
 * Instructions:
 * - Move the frog with your mouse
 * - Click to launch the tongue
 * - Catch flies
 * 
 * Made with p5
 * https://p5js.org/
 */

// "use strict";

/**
 * Creates the canvas and initializes the fly
 */
function setup() {
    createCanvas(640, 480);

    // Give the fly its first random position
    // resetFly();

    flies = [];

    flies.push(createFly());

    
}

let flyScore = 0;

// Our frog
const frog = {
    // The frog's body has a position and size
    body: {
        x: 320,
        y: 520,
        size: 150
    },
    // The frog's tongue has a position, size, speed, and state
    tongue: {
        x: undefined,
        y: 480,
        size: 20,
        speed: 40,
        // Determines how the tongue moves each frame
        state: "idle" // State can be: idle, outbound, inbound
    }
};

// Our fly
// Has a position, size, and speed of horizontal movement
function createFly() {
    const newFly = {
        x: 320,
        y: 240, 
        size: random(5, 9),
        speedX: 0,
        speedY: 0,
        noise: random(1000, 20000),
        noiseSeed: random(0, 1000),
        ghost: false,
        fallRate: 4
    };
    return newFly;
}

function draw() {
    background("#87ceeb");
    moveFrog();
    moveTongue();
    drawFrog();
    drawScore();

    for (let i = 0; i < flies.length; i++) {
        moveFly(flies[i]);
        drawFly(flies[i], i);
        checkTongueFlyOverlap(flies[i], i);
    }
}

/**
 * Moves the fly according to its speed
 * Resets the fly if it gets all the way to the right
 */
function moveFly(fly) {
    // Move the fly
    // fly.speedX = 1 * noise(0.1 * frameCount);
    // fly.x += fly.speedX;
    // fly.y += fly.speedY;
    if (fly.ghost == false) {
        noiseSeed(fly.noiseSeed);
        fly.x = width * noise(0.005 * frameCount);
        fly.y = height * noise(0.005 * frameCount + fly.noise);
    }
    else {
        if (fly.fallRate < 50) {
            fly.fallRate = fly.fallRate + fly.fallRate / 9.807;
        }
        fly.y = fly.y + fly.fallRate / 5;
    }
    // FLY IS NOT MOVING WHEN EATEN BECAUSE IT CAN'T BE RESET BUT JUST MAKE IT DISAPPEAR INSTEAD

    // console.log('x: ' + fly.x + '\ny: ' + fly.y)
    // Handle the fly going off the canvas
    // if (fly.x > width) {
    //     resetFly();
    // }

    // console.log(fly.x + "\n" + fly.y)
}

/**
 * Draws the fly as a black circle
 */
function drawFly(fly, flyNum) {
    text(flyNum, fly.x - 4, fly.y + -15);
    // Body
    push();
    noStroke();
    if (fly.ghost == false) {
        fill("#000000");
    }
    else {
        fill("#FFEFBF00")
    }
    ellipse(fly.x, fly.y, fly.size);
    pop();
    // Wings flapping
    push();
    noStroke();
    if (fly.ghost == false) {
        fill("#00000055");
    }
    else {
        fill("#FFEFBF00")
    }
    ellipse(fly.x, fly.y + 3 * sin(frameCount * 0.8) + 2, fly.size - 2);
    pop();
    push();
    noStroke();
    if (fly.ghost == false) {
        fill("#00000055");
    }
    else {
        fill("#FFEFBF00")
    }
    ellipse(fly.x, fly.y - 3 * sin(frameCount * 0.8) - 2, fly.size - 2);
    pop();
}

/**
 * Resets the fly to the left with a random y
 */
function removeFly() {
    // fly.x = 0;
    // fly.y = random(0, 300);
}

/**
 * Moves the frog to the mouse position on x
 */
function moveFrog() {
    frog.body.x = mouseX;
}

/**
 * Handles moving the tongue based on its state
 */
function moveTongue() {
    // Tongue matches the frog's x
    frog.tongue.x = frog.body.x;
    // If the tongue is idle, it doesn't do anything
    if (frog.tongue.state === "idle") {
        // Do nothing
    }
    // If the tongue is outbound, it moves up
    else if (frog.tongue.state === "outbound") {
        frog.tongue.y += -frog.tongue.speed;
        // The tongue bounces back if it hits the top
        if (frog.tongue.y <= 0) {
            frog.tongue.state = "inbound";
        }
    }
    // If the tongue is inbound, it moves down
    else if (frog.tongue.state === "inbound") {
        frog.tongue.y += frog.tongue.speed;
        // The tongue stops if it hits the bottom
        if (frog.tongue.y >= height) {
            frog.tongue.state = "idle";
        }
    }
}

/**
 * Displays the tongue (tip and line connection) and the frog (body)
 */
function drawFrog() {
    // Draw the tongue tip
    push();
    fill("#ff0000");
    noStroke();
    ellipse(frog.tongue.x, frog.tongue.y, frog.tongue.size);
    pop();

    // Draw the rest of the tongue
    push();
    stroke("#ff0000");
    strokeWeight(frog.tongue.size);
    line(frog.tongue.x, frog.tongue.y, frog.body.x, frog.body.y);
    pop();

    // Draw the frog's body
    push();
    fill("#00ff00");
    noStroke();
    ellipse(frog.body.x, frog.body.y, frog.body.size);
    pop();
}

function drawScore() {
    push();
    textSize(20);
    text('FLY SCORE: ' + flyScore, 30, 40); 
    pop();
}

/**
 * Handles the tongue overlapping the fly
 */
function checkTongueFlyOverlap(fly, flyNum) {
    if (fly.ghost == false) {
        // Get distance from tongue to fly
        const d = dist(frog.tongue.x, frog.tongue.y, fly.x, fly.y);
        // Check if it's an overlap
        // console.log(d);
        const eaten = (d < frog.tongue.size/2 + fly.size/2);
        if (eaten) {
            // Reset the fly
            removeFly();
            // flies.splice(flyNum, flyNum + 1);
            fly.ghost = true;
            console.log(flyNum);
            flyScore++;
            // Bring back the tongue
            frog.tongue.state = "inbound";
        }
    }
    
}

/**
 * Launch the tongue on click (if it's not launched yet)
 */
function mousePressed() {
    if (frog.tongue.state === "idle") {
        frog.tongue.state = "outbound";
    }
}

setInterval(function() {
    if (flies.length < 5)
    flies.push(createFly());
}, 2000)