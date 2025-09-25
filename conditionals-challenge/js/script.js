/**
 * Circle Master
 * Pippin Barr
 * Jake Hayduk
 *
 * This will be a program in which the user can push a circle
 * on the canvas using their own circle.
 */

const puck = {
  x: 200,
  y: 200,
  x2: 200,
  y2: 200,
  size: 100,
  fill: "#ff0000"
};

const user = {
  x: undefined, // will be mouseX
  y: undefined, // will be mouseY
  x2: undefined,
  y2: undefined,
  vx: 0, // x velocity
  vy: 0, // y velocity
  size: 75,
  fill: "#000000"
};

/**
 * Create the canvas
 */
function setup() {
  createCanvas(1000, 1000);
}

/**
 * Move the user circle, check for overlap, draw the two circles
 */
function draw() {
  background("#aaaaaa");
  
  // Move user circle
  moveUser();
  
  // Draw the user and puck
  drawUser();
  drawPuck();
  movePuck();
}

/**
 * Sets the user position to the mouse position
 */
function moveUser() {
  user.x = mouseX;
  user.y = mouseY;
  // the absolute difference between the current and last mouse position to find the x and y velocities
  user.vx = Math.abs(user.x - user.x2);
  user.vy = Math.abs(user.y - user.y2);
  // update the last position to the current one
  user.x2 = mouseX;
  user.y2 = mouseY;
}

/**
 * Displays the user circle
 */
function drawUser() {
  push();
  noStroke();
  fill(user.fill);
  ellipse(user.x, user.y, user.size);
  pop();
}

/**
 * Displays the puck circle
 */
function drawPuck() {
  push();
  noStroke();
  fill(puck.fill);
  // lerp the puck between the bumped positions for smooth motion
  puck.x2 = lerp(puck.x2, puck.x, 0.1);
  puck.y2 = lerp(puck.y2, puck.y, 0.1);
  ellipse(puck.x2, puck.y2, puck.size);
  pop();
}

function movePuck() {
  // Calculate distance to check for overlap
  let d = dist(user.x, user.y, puck.x, puck.y);
  let overlap = (d < user.size/2 + puck.size/2);
  if (overlap) {
    bump();
  }

}

// Bumps the puck to the new location based on the user's mouse position relative to the puck and multiplies the displacement by the mouse velocities
function bump() {
  puck.x = puck.x + ((user.x - puck.x) * -1) * (user.vx / 7);
  puck.y = puck.y + ((user.y - puck.y) * -1) * (user.vy / 7);
}