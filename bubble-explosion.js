let bubbles = []; // an empty array to store the bubbles

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(0);
  
  // display all bubbles in the array
  for (let i = 0; i < bubbles.length; i++) {
    bubbles[i].display();
    bubbles[i].update();
  }
}

function mousePressed() {
  // create a blast of 10 bubbles at the mouse position
  for (let i = 0; i < 10; i++) {
    let b = new Bubble(mouseX, mouseY, random(5, 30));
    bubbles.push(b); // add the bubble object to the array
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

// bubble class definition
class Bubble {
  constructor(x, y, size) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.color = lerpColor(color(255, 192, 203), color(135, 206, 235), random(1));
    this.fade = 5;
    this.speed = random(1, 5);
    this.life = 3;
    this.direction = p5.Vector.random2D();
  }
  
  display() {
    noStroke();
    fill(this.color);
    ellipse(this.x, this.y, this.size);
  }
  
  update() {
    this.x += this.direction.x * this.speed;
    this.y += this.direction.y * this.speed;
    this.life -= 1/60;
    if (this.life <= 0) {
      // remove the bubble object from the array if its life is over
      let index = bubbles.indexOf(this);
      bubbles.splice(index, 1);
    } else if (this.fade > 0) {
      this.fade -= 1/60;
      this.color.setAlpha(this.fade / 5 * 255);
    }
  }
}
