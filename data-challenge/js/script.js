/**
 * Terrible New Car
 * Jake Hayduk
 * 
 * A program to generate new car model names using dinosaurs.
 * 
 * Uses:
 * Darius Kazemi's corpora repository
 * https://github.com/dariusk/corpora/tree/master
 */

"use strict";

let carData = undefined;
let dinosaurData = undefined;
let langData = undefined;
let lang = "fr";

// Starts with the instruction
let carName = "Click to generate a car name.";
let dinoName = "Click to generate a dinosaur name.";

/**
 * Load the car and dinosaur data
 */
function preload() {
    carData = loadJSON('./assets/data/cars.json');
    dinosaurData = loadJSON('./assets/data/dinosaurs.json');
}

/**
 * Create the canvas
*/
function setup() {
    createCanvas(600, 400);
}

/**
 * Display the current main text (either instructions or a car)
*/
function draw() {
    background(0);

    // Car Name

    push();
    fill("pink");
    textAlign(CENTER, CENTER);
    textSize(32);
    text(carName, width / 2, height / 2 - 20);
    pop();

    // Dino Name

    push();
    fill("pink");
    textAlign(CENTER, CENTER);
    textSize(32);
    text(dinoName, width / 2, height / 2 + 20);
    pop();
}

/**
 * Generate a new car and dino name
 */
function mousePressed() {
    carName = carData.cars[Math.floor(Math.random() * carData.cars.length)];
    dinoName = dinosaurData.dinosaurs[Math.floor(Math.random() * dinosaurData.dinosaurs.length)];
}