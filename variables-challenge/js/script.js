/**
 * Mr. Furious
 * Pippin Barr
 *
 * A guy who becomes visibly furious!
 */

"use strict";

// Our friend Mr. Furious
let mrFurious = {
  // Position and size
  x: 200,
  y: 200,
  size: 100,
  // Colour
  fill: {
    r: 255,
    g: 225,
    b: 225
  }
};

let sky = {
    fill: {
        r: 160,
        g: 180,
        b: 200,
    }
}

let bird = {
    x: -10,
    y: 200,
}

/**
 * Create the canvas
 */
function setup() {
  createCanvas(400, 400);
}

/**
 * Draw (and update) Mr. Furious
 */
function draw() {
    sky.fill.r --;
    sky.fill.g --;
    sky.fill.b --;
    background(sky.fill.r, sky.fill.g, sky.fill.b);

    // Make Mr. Furious turn a little more red every frame (with a constraint)

    if (mrFurious.fill.g > 20) {
        mrFurious.fill.g --;
        mrFurious.fill.b --;
    }

    // Draw Mr. Furious as a coloured circle
    push();
    noStroke();
    fill(mrFurious.fill.r, mrFurious.fill.g, mrFurious.fill.b);
    ellipse(mrFurious.x, mrFurious.y, mrFurious.size);
    pop();

    // Move the bird

    bird.x = bird.x + 3;

    // Draw the bird as a triangle

    push();
    noStroke();
    triangle(bird.x, bird.y - 10, bird.x, bird.y + 10, bird.x + 10, bird.y);
    fill(100, 230, 100);
    pop();
}