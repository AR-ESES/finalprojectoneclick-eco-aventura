
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Flappy raposa Game</title>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.4.0/p5.js"></script>
</head>
<body>
</body>
</html>
<script>


let birdImg, pipeTopImg, pipeBottomImg, backgroundImg;
let bird;
let pipes = [];

function preload() {
  birdImg = loadImage('raposa.png'); // Substitua pelo caminho da sua imagem do boneco
  pipeTopImg = loadImage('folhas1.png'); // Substitua pelo caminho da sua imagem do cano superior
  pipeBottomImg = loadImage('folhas2.png'); // Substitua pelo caminho da sua imagem do cano inferior
  backgroundImg = loadImage('fundodojogo1.png'); // Substitua pelo caminho da sua imagem de fundo
}

class Bird {
  constructor() {
    this.y = height / 2;
    this.x = 64;
    this.gravity = 0.6;
    this.lift = -10; // Ajuste o valor aqui para controlar a altura do salto
    this.velocity = 0;
  }

  show() {
    image(birdImg, this.x, this.y, 40, 40);
  }

  up() {
    this.velocity = this.lift;
  }

  update() {
    this.velocity += this.gravity;
    this.y += this.velocity;

    if (this.y > height) {
      this.y = height;
      this.velocity = 0;
    }

    if (this.y < 0) {
      this.y = 0;
      this.velocity = 0;
    }
  }
}

class Pipe {
  constructor() {
    this.spacing = 125;
    this.top = random(height / 6, (3 / 4) * height);
    this.bottom = height - (this.top + this.spacing);
    this.x = width;
    this.w = 80;
    this.speed = 6;
  }

  hits(bird) {
    if (bird.y < this.top || bird.y > height - this.bottom) {
      if (bird.x > this.x && bird.x < this.x + this.w) {
        return true;
      }
    }
    return false;
  }

  show() {
    image(pipeTopImg, this.x, 0, this.w, this.top);
    image(pipeBottomImg, this.x, height - this.bottom, this.w, this.bottom);
  }

  update() {
    this.x -= this.speed;
  }

  offscreen() {
    return (this.x < -this.w);
  }
}

function setup() {
  createCanvas(800, 600);
  bird = new Bird();
  pipes.push(new Pipe());
}

function draw() {
  background(backgroundImg);

  for (let i = pipes.length - 1; i >= 0; i--) {
    pipes[i].show();
    pipes[i].update();

    if (pipes[i].hits(bird)) {
      console.log("HIT");
      noLoop(); // Para o jogo
    }

    if (pipes[i].offscreen()) {
      pipes.splice(i, 1);
    }
  }

  bird.update();
  bird.show();

  if (frameCount % 75 == 0) {
    pipes.push(new Pipe());
  }
}

function keyPressed() {
  if (key === ' ' || keyCode === UP_ARROW) {
    bird.up();
  }
}

function mousePressed() {
  bird.up();
}
</script>