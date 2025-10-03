/**
 * Art Jam Portrait
 * Jake Hayduk
 * 
 * HOW EMBARRASSING! I HAVE NO DESCRIPTION OF MY PROJECT!
 * PLEASE REMOVE A GRADE FROM MY WORK IF IT'S GRADED!
 */

"use strict";

const jake = {
  x: undefined, // will be mouseX
  y: undefined // will be mouseY
};

/**
 * Create the canvas
*/
function setup() {
    createCanvas(500, 500);
}


/**
 * OOPS I DIDN'T DESCRIBE WHAT MY DRAW DOES!
*/
function draw() {
    background(230, 230, 230);

    drawBody();
}

function drawBody() {

    // Neck
    push();
    noStroke();
    fill(245, 215, 205);
    rect(244, 145, 12, 30, 10);
    pop();

    // Head
    push();
    noStroke();
    fill(250, 220, 210);
    rect(230, 100, 40, 60, 30);
    pop();

    // Hair
    push();
    noStroke();
    fill(170, 120, 120);
    rect(230, 100, 40, 20, 20);
    pop();

    // Right eye
    push();
    noStroke();
    fill(255, 255, 255);
    ellipse(242, 130, 10);
    pop();

    // Left eye
    push();
    noStroke();
    fill(255, 255, 255);
    ellipse(258, 130, 10);
    pop();

    // Right pupil
    push();
    noStroke();
    fill(25, 5, 0);
    ellipse(242, 130, 6);
    pop();

    // Left pupil
    push();
    noStroke();
    fill(25, 5, 0);
    ellipse(258, 130, 6);
    pop();

    // Mouth
    push();
    noStroke();
    fill(40, 10, 10);
    rect(244, 145, 12, 3, 10);
    pop();

    // Right Leg
    push();
    noStroke();
    fill(120, 120, 120);
    rect(225, 250, 20, 120, 20);
    pop();

    // Left Leg
    push();
    noStroke();
    fill(120, 120, 120);
    rect(255, 250, 20, 120, 20);
    pop();

    // Torso
    push();
    noStroke();
    fill(30, 30, 30);
    rect(220, 170, 60, 100, 20);
    pop();

    // Right Foot
    push();
    noStroke();
    fill(30, 30, 30);
    rect(215, 350, 30, 20, 20);
    pop();

    // Left Foot
    push();
    noStroke();
    fill(30, 30, 30);
    rect(255, 350, 30, 20, 20);
    pop();

    // Right Arm
    push();
    noStroke();
    fill(30, 30, 30);
    angleMode(DEGREES);
    rotate(20);
    rect(260, 90, 20, 80, 20);
    pop();

    // Left Arm
    push();
    noStroke();
    fill(30, 30, 30);
    angleMode(DEGREES);
    rotate(-20);
    rect(190, 260, 20, 80, 20);
    pop();

    // Right eye
    push();
    noStroke();
    fill(250, 220, 210);
    ellipse(195, 250, 20);
    pop();

    // Left eye
    push();
    noStroke();
    fill(250, 220, 210);
    ellipse(305, 250, 20);
    pop();
}