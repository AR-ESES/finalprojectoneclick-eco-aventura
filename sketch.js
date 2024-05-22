let spaceship;
let meteorites1 = []; //obstacle Type 1 List, duplicate with different name if you want more
let obstaclesCleared;
let obstaclesHit;

let frameCountBettwenObstaclesType1 = 20;
let nivelDeDificuldade = 1;

function setup() {
  var canvas = createCanvas(800, 600);
  spaceship = new Character();

  obstaclesCleared = 0;
  obstaclesHit = 0;

  meteorites1.push(new Obstacle());
}

function draw() {
  clear();
  background(0, 20, 50);

  spaceship.show();
  spaceship.update();

  if (frameCount % frameCountBettwenObstaclesType1 == 0) {
    meteorites1.push(new Obstacle());
  }

  for (var i = meteorites1.length - 1; i >= 0; i--) {
    meteorites1[i].show();
    meteorites1[i].update();

    if (meteorites1[i].hits(spaceship)) {
      obstaclesHit++;
    }

    if (meteorites1[i].offscreen()) {
      meteorites1.splice(i, 1);
      obstaclesCleared++;
    }
  }
}

function keyPressed() {
  if (key === " ") {
    spaceship.goUp();
  }
}
