/**
 * The Only Move Is Not To Play
 * Events Challenge F.W. C.L J.H.
 *
 * A game where your score increases so long as you do nothing.
 */

"use strict";

// Current score
let score = 0;

// Is the game over?
let gameOver = false;

/**
 * Create the canvas
 */
function setup() {
  createCanvas(400, 400);
}

/**
 * Update the score and display the UI
 */
function draw() {
  background(168, 94, 191);
  
  // Only increase the score if the game is not over
  if (!gameOver) {
    // Score increases relatively slowly
    score += 0.05;
  }
  displayUI();
  instructions();
}

/**
 * Show instructions
 */
function instructions() {
    push();
    textSize(18);
    textStyle(BOLD);
    textAlign(CENTER, CENTER);
    text("Click the Genie's favourite number to win!", width/2, height/3);
    pop();
}

/**
 * Show the game over message if needed, and the current score
 */
function displayUI() {
  if (gameOver) {
    push();
    textSize(48);
    textStyle(BOLD);
    textAlign(CENTER, BOTTOM);
    text("You lose!", width/2, height/1.25);
    pop();
  }
  displayScore();
}

/**
 * Display the score
 */
function displayScore() {
  push();
  textSize(48);
  textStyle(BOLD);
  textAlign(CENTER, CENTER);
  text(floor(score), width/2, height/2);
  pop();
}

function lose() {
    gameOver = true;
}

// if key pressed or mouse clicked, lose the game

function keyPressed() {
    lose();
}

function mousePressed() {
    lose();
}