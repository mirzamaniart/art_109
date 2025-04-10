let trail = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  noCursor();
}

function draw() {
  background(0, 0, 0, 10);

  let pos = createVector(mouseX, mouseY);
  trail.push(pos);

  if (trail.length > 50) {
    trail.splice(0, 1);
  }

  noStroke();
  fill(128, 0, 128);

  for (let i = 0; i < trail.length; i++) {
    let p = trail[i];
    ellipse(p.x, p.y, 20, 20);
  }
}
