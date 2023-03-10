let bubbles = [];
let connections = [];

function setup() {
  createCanvas(windowWidth, windowHeight);

  // Create 50 bubbles and add them to the array
  for (let i = 0; i < 50; i++) {
    let x = random(width);
    let y = random(height);
    let r = random(5, 15);
    let c = color(random(100, 150), random(250, 150), random(50, 80), 100);
    let b = new Bubble(x, y, r, c);
    bubbles.push(b);
  }

  // Create connections between bubbles that are close to each other
  for (let i = 0; i < bubbles.length; i++) {
    for (let j = i + 1; j < bubbles.length; j++) {
      let d = dist(bubbles[i].pos.x, bubbles[i].pos.y, bubbles[j].pos.x, bubbles[j].pos.y);
      if (d < 50) {
        connections.push([i, j]);
      }
    }
  }
}

function draw() {
  background(255);

  // Move and display each bubble
  for (let i = 0; i < bubbles.length; i++) {
    bubbles[i].move();
    bubbles[i].display();
  }

  // Update connections between bubbles
  connections = [];
  for (let i = 0; i < bubbles.length; i++) {
    for (let j = i + 1; j < bubbles.length; j++) {
      let d = dist(bubbles[i].pos.x, bubbles[i].pos.y, bubbles[j].pos.x, bubbles[j].pos.y);
      if (d < 50) {
        connections.push([i, j]);
      }
    }
  }

  // Draw connections between bubbles
  stroke(0, 50);
  strokeWeight(1);
  for (let i = 0; i < connections.length; i++) {
    let b1 = bubbles[connections[i][0]];
    let b2 = bubbles[connections[i][1]];
    let d = dist(b1.pos.x, b1.pos.y, b2.pos.x, b2.pos.y);
    if (d < 100) {
      line(b1.pos.x, b1.pos.y, b2.pos.x, b2.pos.y);
    }
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

class Bubble {
  constructor(x, y, r, c) {
    this.pos = createVector(x, y);
    this.vel = createVector(random(-0.1, 0.1), random(-0.1, 0.1));
    this.r = r;
    this.c = c;
  }

  move() {
    this.pos.add(this.vel);

    // Bounce off the walls
    if (this.pos.x < 0 || this.pos.x > width) {
      this.vel.x *= -1;
    }
    if (this.pos.y < 0 || this.pos.y > height) {
      this.vel.y *= -1;
    }
  }

  display() {
    noStroke();
    fill(this.c);
    ellipse(this.pos.x, this.pos.y, this.r * 2);
  }
}