/**
 * Lines
 * Jake Hayduk
 * 
 * A series of lines across the canvas
 */

"use strict";

/**
 * Creates the canvas
 */
function setup() {
    createCanvas(500, 500);
}

/**
 * Draws lines across the canvas with increasing thickness and
 * gradually lightening colour
 */
function draw() {

    // background gradiant

    colorMode(HSB)

    for(let b = 0; b < width; b++) {
        stroke(b/1.5, 100, 100);
        line(b, 0, b, height);
    }

    // vertical lines

    let i = 0;

    while (i < 10) {
        stroke(i * 50);
        line(i * 50, 0, i * 50, height);
        i++;
    }

    // horizontal lines

    let a = 0;

    while (a < 10) {
        stroke(a * 50);
        line(0, a * 50, width, a * 50);
        a++;
    }
}