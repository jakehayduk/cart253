/**
 * Variation Jam
 * Jake Hayduk
 * 
 * DESCRIPTION HERE
 * 
 */

"use strict";

/**
 * Sets up the canvas
*/
function setup() {
    createCanvas(800, 600);
}

// FIREBASE

// Database reference
const db = firebase.database();

// Create a new player (YOU!!)
const newPlayerRef = db.ref('players').push({
    x: 400,
    y: 300
})

// Get your unique id
const playerID = newPlayerRef.key;

// Reference the stored player with the same id (YOU!!)
const playerRef = db.ref('players/' + playerID);

playerRef.set({
    x: 1,
    y: 1
})

const player = {
    x: 400,
    y: 300,
    size: 50
}

/**
 * OOPS I DIDN'T DESCRIBE WHAT MY DRAW DOES!
*/
function draw() {
    background("#E09382");

    if (keyIsDown(65)) {
        console.log('left');
        playerRef.set({
            x: 0,
        })
    }

    if (keyIsDown(68)) {
        console.log('left');
    }

    if (keyIsDown(87)) {
        console.log('up');
    }

    if (keyIsDown(83)) {
        console.log('down');
    }

    drawPlayer();
}

function drawPlayer() {
    push();
    noStroke();
    fill("red")
    rect(player.x - player.size/2, player.y - player.size/2, player.size, player.size);
    pop();
}