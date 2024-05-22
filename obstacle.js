//This is an obstacle template.... duplicate for more.

function Obstacle() {
  this.x = width;
  this.y = random(height);
  this.w = random(30, 80);
  this.topMin = 50;
  this.botMin = height - 50;
  this.gapStart = random(this.topMin, this.botMin);
  this.gapLength = 200;
  this.speed = 10;
  this.img2 = loadImage("asteroid.png");

  this.show = function () {
    fill(0);
    if (this.highlight) {
      //desenha duas circunferencias com o impacto...
      noFill();
      stroke(255);
      strokeWeight(3);
      ellipse(
        this.x + this.w / 2,
        this.y + this.w / 2,
        this.w * 1.2,
        this.w * 1.2
      );
      ellipse(
        this.x + this.w / 2,
        this.y + this.w / 2,
        this.w * 1.5,
        this.w * 1.5
      );
    }
    image(this.img2, this.x, this.y, this.w, this.w);
  };
  this.update = function () {
    this.x -= this.speed;
  };
  this.offscreen = function () {
    return this.x < -this.w;
  };

  this.hits = function (obstacle) {
    if (obstacle.y > this.y - this.w / 2 && obstacle.y < this.y + this.w / 2) {
      if (
        obstacle.x > this.x - this.w / 2 &&
        obstacle.x < this.x + this.w / 2
      ) {
        this.highlight = true;
        return true;
      }
    }
    this.highlight = false;
    return false;
  };
}
