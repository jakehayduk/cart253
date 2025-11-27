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


/**
 * OOPS I DIDN'T DESCRIBE WHAT MY DRAW DOES!
*/
function draw() {
    background("#E09382");

    if (keyIsDown(65)) {
        console.log('left');
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
}

// FIREBASE

const db = firebase.database();
console.log(db);

db.ref('testTree').push({
    name: 'Jake',
    price: '$20'
})

// let blocksRef;
    
// blocksRef = db.collection('blocks');