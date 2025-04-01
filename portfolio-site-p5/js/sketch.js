let trail = [];

function setup() {
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.id('canvas');
  canvas.position(0, 0);
  canvas.style('z-index', '2');
  canvas.style('pointer-events', 'none');
  noCursor();
}

function draw() {
  background(0, 0); //  background
  noStroke();

  // trailing mouse
  trail.push({ x: mouseX, y: mouseY, t: millis() });

  // trail
  trail = trail.filter(pt => millis() - pt.t < 800);

  for (let i = 0; i < trail.length; i++) {
    let alpha = map(millis() - trail[i].t, 0, 800, 255, 0);
    fill(160, 100, 255, alpha);
    ellipse(trail[i].x, trail[i].y, 15);
  }

  // purple mouse
  fill(160, 100, 255);
  ellipse(mouseX, mouseY, 20);
}
