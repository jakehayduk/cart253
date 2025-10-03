/**
 * Art Jam Portrait
 * Jake Hayduk
 * 
 * HOW EMBARRASSING! I HAVE NO DESCRIPTION OF MY PROJECT!
 * PLEASE REMOVE A GRADE FROM MY WORK IF IT'S GRADED!
 */

"use strict";

const jake = {
    // Displacement variables
    x: 250,
    y: 250,
    rotate: 0
};

/**
 * Create the canvas
*/
function setup() {
    createCanvas(1000, 1000);
}


/**
 * OOPS I DIDN'T DESCRIBE WHAT MY DRAW DOES!
*/
function draw() {
    background(230, 230, 230);

    jake.x = mouseX;
    jake.y = mouseY;
    
    // angleMode(DEGREES);

    if (keyIsDown(LEFT_ARROW)) {
        jake.rotate --;
    }

    if (keyIsDown(RIGHT_ARROW)) {
        jake.rotate ++;
    }
    translate(-250, -250);
    rotate(radians(jake.rotate));

    drawBody();
    
}

function drawBody() {

    // Neck
    push();
    noStroke();
    fill(245, 215, 205);
    rect(244 + jake.x, 145 + jake.y, 12, 30);
    pop();

    // Head
    push();
    noStroke();
    fill(250, 220, 210);
    rect(230 + jake.x, 100 + jake.y, 40, 60);
    pop();

    // Hair
    push();
    noStroke();
    fill(170, 120, 120);
    rect(230 + jake.x, 100 + jake.y, 40, 20);
    pop();

    // Right eye
    push();
    noStroke();
    fill(255, 255, 255);
    ellipse(242 + jake.x, 130 + jake.y, 10);
    pop();

    // Left eye
    push();
    noStroke();
    fill(255, 255, 255);
    ellipse(258 + jake.x, 130 + jake.y, 10);
    pop();

    // Right pupil
    push();
    noStroke();
    fill(25, 5, 0);
    ellipse(242 + jake.x, 130 + jake.y, 6);
    pop();

    // Left pupil
    push();
    noStroke();
    fill(25, 5, 0);
    ellipse(258 + jake.x, 130 + jake.y, 6);
    pop();

    // Mouth
    push();
    noStroke();
    fill(40, 10, 10);
    rect(244 + jake.x, 145 + jake.y, 12, 3);
    pop();

    // Right Leg
    push();
    noStroke();
    fill(120, 120, 120);
    rect(225 + jake.x, 250 + jake.y, 20, 120);
    pop();

    // Left Leg
    push();
    noStroke();
    fill(120, 120, 120);
    rect(255 + jake.x, 250 + jake.y, 20, 120);
    pop();

    // Torso
    push();
    noStroke();
    fill(30, 30, 30);
    rect(220 + jake.x, 170 + jake.y, 60, 100);
    pop();

    // Right Foot
    push();
    noStroke();
    fill(30, 30, 30);
    rect(215 + jake.x, 350 + jake.y, 30, 20);
    pop();

    // Left Foot
    push();
    noStroke();
    fill(30, 30, 30);
    rect(255 + jake.x, 350 + jake.y, 30, 20);
    pop();

    // Right Arm
    push();
    noStroke();
    fill(30, 30, 30);
    quad(210 + jake.x, 170 + jake.y, 230 + jake.x, 170 + jake.y, 210 + jake.x, 250 + jake.y, 190 + jake.x, 250 + jake.y);
    pop();

    // Left Arm
    push();
    noStroke();
    fill(30, 30, 30);
    quad(270 + jake.x, 170 + jake.y, 290 + jake.x, 170 + jake.y, 310 + jake.x, 250 + jake.y, 290 + jake.x, 250 + jake.y);
    pop();

    // Right hand
    push();
    noStroke();
    fill(250, 220, 210);
    ellipse(195 + jake.x, 250 + jake.y, 20);
    pop();

    // Left hand
    push();
    noStroke();
    fill(250, 220, 210);
    ellipse(305 + jake.x, 250 + jake.y, 20);
    pop();
}