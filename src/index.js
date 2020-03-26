let canvas = document.getElementById("gameScreen");
let ctx = canvas.getContext("2d");

const GAME_WIDTH = 800;
const GAME_HEIGHT = 600;

class Ball {
  constructor(game) {
    this.game = game;
    this.gameWidth = game.gameWidth;
    this.gameHeight = game.gameHeight;
    this.speed = { x: 3, y: 3 };
    this.position = { x: 250, y: 400 };
    this.radius = 6;
  }

  reset() {
    this.position = { x: 10, y: 400 };
    this.speed = { x: 4, y: -2 };
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.arc(
      this.position.x,
      this.position.y,
      this.radius,
      0,
      2 * Math.PI
    );
    ctx.stroke();
  }

  update(deltaTime) {
    this.position.x += this.speed.x;
    this.position.y += this.speed.y;
    
    // walls
    if (this.position.x + this.radius > this.gameWidth || this.position.x - this.radius < 0) {
      this.speed.x = -this.speed.x;
    }

    // ceiling
    if (this.position.y - this.radius < 0) {
      this.speed.y = -this.speed.y;
    }

    // floor
    if (this.position.y + this.radius > this.gameHeight) {
      this.game.lives--;
      this.reset();
    }

    //paddle
    if (hitY(this, this.game.paddle)) {
      this.speed.y = -this.speed.y;
      this.position.y = this.game.paddle.position.y - this.radius;
    }
  }
}


class Brick {
  constructor(game, position) {
    this.game = game;
    this.position = position;
    this.width = 50;
    this.height = 24;
    this.gotHit = false;
  }

  //ball collisions
  update() { 
    if (hitX(this.game.ball, this)) {
      this.game.ball.speed.x = -this.game.ball.speed.x;
      this.gotHit = true;
    } else if (hitY(this.game.ball, this)) {
      this.game.ball.speed.y = -this.game.ball.speed.y;
      this.gotHit = true;
    }
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.fillStyle = 'black';
    ctx.fillRect(
      this.position.x,
      this.position.y,
      this.width,
      this.height
    );
    ctx.stroke();
  }
}


class Paddle {
  constructor(game) {
    this.gameWidth = game.gameWidth;
    this.gameHeight = game.gameHeight;
    this.width = 150;
    this.height = 20;
    this.speed = 0;
    this.maxSpeed = 7;
    this.position = {
      x: game.gameWidth / 2 - (this.width / 2),
      y: game.gameHeight - this.height - 10
    };
  }

  stop() {
    this.speed = 0;
  }

  moveLeft() {
    this.speed = -this.maxSpeed;
  }

  moveRight() {
    this.speed = this.maxSpeed;
  }
  draw(ctx) {
    ctx.fillStyle = "#0ff";
    ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
  }

  //wall collisions
  update(deltaTime) {
    this.position.x += this.speed;
    if (this.position.x < 0) this.position.x = 0;
    if (this.position.x + this.width > this.gameWidth)
      this.position.x = this.gameWidth - this.width;
  }
}

class Game {
  constructor(gameWidth, gameHeight) {
    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;
    this.ball = new Ball(this);
    this.paddle = new Paddle(this);
    this.gameObjects = [];
  }

  start() {
    this.gameObjects = [this.ball, this.paddle];
    new InputHandler(this.paddle, this);
  }

  update(deltaTime) {
    this.gameObjects.forEach(object => object.update(deltaTime));
    bricks.forEach(object => object.update(deltaTime));
    bricks = bricks.filter(brick => !brick.gotHit);
  }

  draw(ctx) {
    this.gameObjects.forEach(object => object.draw(ctx));
    bricks.forEach(brick => brick.draw(ctx));
  }
}

class InputHandler {
  constructor(paddle, game) {
    document.addEventListener("keydown", event => {
      switch (event.key) {
        case 'ArrowLeft':
          paddle.moveLeft();
          break;

        case 'ArrowRight':
          paddle.moveRight();
          break;

        // case 27:
        //   game.togglePause();
        //   break;

        // case 32:
        //   game.start();
        //   break;
      }
    });

    document.addEventListener("keyup", event => {
      switch (event.key) {
        case 'ArrowLeft':
          if (paddle.speed < 0) paddle.stop();
          break;

        case 'ArrowRight':
          if (paddle.speed > 0) paddle.stop();
          break;
      }
    });
  }
}

function hitY(ball, obj) {
  let ballBottom = ball.position.y + ball.radius;
  let ballTop = ball.position.y - ball.radius;
  let ballLeft = ball.position.x - ball.radius;
  let ballRight = ball.position.x + ball.radius;

  let objectTop = obj.position.y;
  let objectLeft = obj.position.x;
  let objectRight = obj.position.x + obj.width;
  let objectBottom = obj.position.y + obj.height;

  if (
    ballBottom >= objectTop &&
    ballTop <= objectBottom &&
    ballRight >= objectLeft &&
    ballLeft <= objectRight
  ) {
    return true;
  } else {
    return false;
  }
}

function hitX(ball, obj) {
  let ballBottom = ball.position.y + ball.radius;
  let ballTop = ball.position.y - ball.radius;
  let ballLeft = ball.position.x - ball.radius;
  let ballRight = ball.position.x + ball.radius;

  let objectTop = obj.position.y;
  let objectLeft = obj.position.x;
  let objectRight = obj.position.x + obj.width;
  let objectBottom = obj.position.y + obj.height;

  // left side check
  if (
    ballBottom >= objectTop &&
    ballTop <= objectBottom &&
    ballRight >= objectLeft + 1 &&
    ballLeft <= objectLeft - 1
  ) {  
    return true;
  } if ( // right side check
    ballBottom >= objectTop &&
    ballTop <= objectBottom &&
    ballRight >= objectRight + 1 &&
    ballLeft <= objectRight - 1
  ) {
    return true; 
  } else {
    return false;
  }
}

//loop thru game
function play(timestamp) {
    let deltaTime = timestamp - prevTime;
    prevTime = timestamp;
    ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
    
    game.update(deltaTime);
    game.draw(ctx);
  
    requestAnimationFrame(play);
  }

// create game object
let game = new Game(GAME_WIDTH, GAME_HEIGHT);

// create bricks in an array
let bricks = [];  
for (let i = 0; i < 10; i++) {
  for (let j = 1; j < 6; j++) {
    bricks.push(new Brick(game, { x: i * 80 + 10, y: 40 * j }));
  }
}

//create game objects and start game
game.start();

let prevTime = 0;



requestAnimationFrame(play);
