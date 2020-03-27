let PLAYER = {
  id: 0,
  username: "",
  highest_score: 0,
  total_score: 0
}


const  PLAYERS_URL = "http://localhost:3000/players";
const  LEADERBOARD_URL = "http://localhost:3000/leaderboards/1";

// let canvas = document.getElementById("gameScreen");
// let ctx = canvas.getContext("2d");

let canvas = create('canvas');
let ctx = canvas.getContext("2d");

const GAME_WIDTH = 800;
const GAME_HEIGHT = 600;
let SCORE = 0;
let LIVES = 5;

const logIn = el('log_in');

document.addEventListener("DOMContentLoaded", () => {
    console.log("DOM Loaded");
    // fetchPlayers(PLAYERS_URL);
    renderCreateAccount();
});

function renderCreateAccount() {
    const formDiv = el('form');
    formDiv.innerHTML = "";
    const h1 = create('h1');
    h1.innerText = "Create Account";
    formDiv.appendChild(h1);

    // BUG
    logIn.innerText = "Log In";
    logIn.addEventListener("click", renderLogIn);

    const form = create('form');
    form.innerHTML = `
    <label for="username">Username:</label><br>
    <input type="text" id="username" name="username"><br>
    <label for="email">Email:</label><br>
    <input type="text" id="email" name="email">
    <input type="submit" id="create-account-button">
    `;
    formDiv.appendChild(form);

    const userInput = el('username')
    const emailInput = el('email');
    
    const submit = el('create-account-button');
    submit.addEventListener("click", (e) => {
        e.preventDefault();
        createUser(userInput.value, emailInput.value);
        renderLogIn(e);
    });
};

function renderLogIn(event) {
    

    const formDiv = el('form');
    formDiv.innerHTML = "";
    const h1 = create('h1');
    h1.innerText = "Log In";
    formDiv.appendChild(h1);

    
    logIn.innerText = "Create Account";
    logIn.addEventListener("click", renderCreateAccount);

    const form = create('form');
    form.innerHTML = `
    <label for="username">Username:</label><br>
    <input type="text" id="username" name="username"><br>
    <label for="email">Email:</label><br>
    <input type="text" id="email" name="email">
    <input type="submit" id="log-in-button">
    `;
    formDiv.appendChild(form);

    const userInput = el('username');
    const emailInput = el('email');

    const submit = el('log-in-button');
    
    submit.addEventListener("click", (e) => {
        e.preventDefault();
        
        log_in(userInput.value);
        
    });
}

function fetchPlayers() {
    fetch(PLAYERS_URL)
    .then(resp => resp.json())
    .then(json => LeaderBoardHTML(json));
}

function LeaderBoardHTML(players) {
    const formDiv = el('form');
    formDiv.remove();
    const mainDIv = el('main');
    const leaderboardDiv = create('div');
    leaderboardDiv.id = "leaderboard";

    const h2 = create('h2');
    h2.innerText = "Leaderboard:"
    leaderboardDiv.appendChild(h2);
    
    const ul = create('ul');

    for(const player in players) {
        const username = players[player].username;
        const id = players[player].id;

        const li = create('li');
        li.dataset.playerId = id;
        li.innerText = username;
        const liButton = create('button');
        liButton.innerText = "view";
        liButton.dataset.playerId = id;
        liButton.addEventListener("click", fetchPlayerIndividual);
        li.appendChild(liButton);

        // li.addEventListener("click", fetchPlayerIndividual);
        // li.addEventListener("mouseout", removePlayer);
        ul.appendChild(li);
    }
    leaderboardDiv.appendChild(ul);

    
    mainDIv.appendChild(leaderboardDiv);
    const play = create('button');
    play.innerText = 'Play';
    
    play.addEventListener("click", (e) => {
        e.preventDefault();
        // console.log(e.target)
        // log_in(userInput.value);
        renderGame();
    });
    mainDIv.appendChild(play);
}

function renderGame(){
    // const canvas = create('canvas');
    canvas.setAttribute('id', 'gameScreen');
    canvas.setAttribute('height', GAME_HEIGHT);
    canvas.setAttribute('width', GAME_WIDTH);
    main = el('main');
    main.appendChild(canvas);
    drawInfo();
    game.start();
    
requestAnimationFrame(play);
}

function removePlayer(event) {
    const hideButton = event.target;
    const leaderboard = el('leaderboard');
    let id = event.target.dataset.playerId;
    const div = document.querySelector(`div[data-id="${id}"]`);
    div.remove();
    hideButton.remove();
    leaderboard.style.width = 100 + "px";
}

function fetchPlayerIndividual(event) {
    const id = event.target.dataset.playerId;
    fetch(`${PLAYERS_URL}/${id}`)
    .then(resp => resp.json())
    .then(json => showStats(json, id));
}

function showStats(player, id) {
    // console.log("click");
    // console.log(player);
    // console.log(id);

    const li = document.querySelector(`li[data-player-id="${id}"]`)
    const main = el('main');
    const leaderboard = el('leaderboard');
    // main.innerHTML = "";
    const div = create('div');
    div.dataset.id = id;
    div.className = "playerStats";
    div.innerHTML = `<ul>
        <li>username: ${player.username}</li>
        <li>email: ${player.email}</li>
        <li>highest score: ${player.highest_score}</li>
        <li>total score: ${player.total_score}</li>
    </ul>`;

    hideButton = create('button');
    hideButton.innerText = "Hide";
    hideButton.dataset.playerId = id;
    hideButton.addEventListener("click", removePlayer);
    li.appendChild(hideButton);

    leaderboard.style.width = 300 + "px";
    li.appendChild(div);
};

function create(element) {
    return document.createElement(element);
}

function el(id) {
    return document.getElementById(id);
}

//=========================================

function updateHighScore(id, score) {
    console.log("updateHigh Score");
    const body = {score: score};

    const configObj = {
        method: "PATCH",
        headers: {
            "Content-Type":"application/json",
            "Accept":"application/json"
        },
        body: JSON.stringify(body)
    }
    fetch(`http://localhost:3000/players/${id}/highscore`, configObj)
    .then(resp => resp.json())
    .then(json => console.log(json));
}

//updateHighScore(1, 300);

function updateTotalScore(id, score) {
    console.log("update total score");
    const body = {score: score};

    const configObj = {
        method: "PATCH",
        headers: {
            "Content-Type":"application/json",
            "Accept":"application/json"
        },
        body: JSON.stringify(body)
    }
    fetch(`http://localhost:3000/players/${id}/increase-score`, configObj)
    .then(resp => resp.json())
    .then(json => console.log(json));
}

// updateTotalScore(1, 100);

function createUser(username, email) {
    const body = {
        username: username,
        email: email
    }
    

    const configObj = {
        method: "POST",
        headers: {
            "Content-Type":"application/json",
            "Accept":"application/json"
        },
        body: JSON.stringify(body)
    }

    console.log(configObj);

    fetch(`http://localhost:3000/players`, configObj)
    .then(resp => resp.json())
    .then(json => console.log(json));
}

function editUsername(id, username) {
    const body = {username: username};

    const configObj = {
        method: "PATCH",
        headers: {
            "Content-Type":"application/json",
            "Accept":"application/json"
        },
        body: JSON.stringify(body)
    }
    fetch(`http://localhost:3000/players/${id}/edit`, configObj)
    .then(resp => resp.json())
    .then(json => console.log(json));

}

function log_in(username) {
    const body = {username: username};

    const configObj = {
        method: "POST",
        headers: {
            "Content-Type":"application/json",
            "Accept":"application/json"
        },
        body: JSON.stringify(body)
    }

    fetch(`http://localhost:3000/players/log_in`, configObj)
    .then(resp => resp.json())
    .then(json => {

        console.log(json);
        if(json.id == undefined) {
          console.log('undef');
          renderLogIn();
        } else {
          PLAYER = {
            id: json.id,
            username: json.username,
            highest_score: json.highest_score,
            total_score: json.total_score
          }
          fetchPlayers();
          console.log(PLAYER);
          renderUser(PLAYER.id);
        }

    });
};

function renderUser(id) {
    console.log("render user info");
    fetch(`http://localhost:3000/players/${id}`)
    .then(resp => resp.json())
    .then(json => {
        const div = document.querySelector('div[class="userDiv"]');

        if(!div) {
          const userDiv = create('div');
          userDiv.className = "userDiv";
          
          const main = el('main');
          userDiv.innerHTML = `
          <h2>Your Info:</h2>
          <ul>
          <li id="username-li">username: ${json.username}</li><button id="edit-button">Edit</button>
          <li>email: ${json.email}</li>
          <li id="highScore">highest score: ${json.highest_score}</li>
          <li id="totalScore">total score: ${json.total_score}</li>
          </ul>`;
          main.appendChild(userDiv);
          const editButton = document.querySelector('button[id="edit-button"]');
          
          editButton.addEventListener("click", editUsername);
          
        } else {
          let highScoreLi = el('highScore');
          console.log(highScoreLi);
          let totalScoreLi = el('totalScore');
          
          highScoreLi.innerText = `highest score: ${json.highest_score}`;
          totalScoreLi.innerText = `total score: ${json.total_score}`;
        }
    })
};

function editUsername() {
  console.log("edit");
  const form = create('form');
  const li = el('username-li');

  form.innerHTML = `
  <input type="text" name="username"><br>
  <input type="submit">
  `;
  li.appendChild(form);

  const submitButton = document.querySelector('input[type="submit"]');
  submitButton.addEventListener("click", (e) => {
    e.preventDefault();
    const input = document.querySelector('input[type="text"]');
    const newUsername = input.value;
    fetchEditUsername(newUsername);
  })
}

function fetchEditUsername(newUsername) {
  console.log('save');

  const body = {
    id: PLAYER.id,
    username: newUsername
  };

  const configObj = {
    method: "PATCH",
    headers: {
      "Content-Type":"application/json",
            "Accept":"application/json"
    },
    body: JSON.stringify(body)
  }
  fetch(`${PLAYERS_URL}/${PLAYER.id}/edit`, configObj)
  
  setTimeout(() => {
    fetch(`${PLAYERS_URL}/${PLAYER.id}`)
    .then(resp => resp.json())
    .then(json => {
    console.log(json)
    deleteEditForm(json)
    });

  }, 1000);
  
}

function deleteEditForm(json) {
  const form = document.querySelector('form');
  form.remove();

  let usernameLi = document.querySelector('li[id="username-li"]');
  console.log(usernameLi);
  console.log(json.username);
  console.log("edit!!!!!")
  usernameLi.innerHTML = json.username;
  
}

function create(element) {
  return document.createElement(element);
}

function el(id) {
  return document.getElementById(id);
}

function fetchPlayer(){
  fetch(`${PLAYERS_URL}/${PLAYER.id}`)
  .then(resp => resp.json())
  .then(json => drawPlayer(json))
}

function getPlayer(player){
  return player;
}

function drawPlayer(player){
  // console.log(player)
  const main = el('main');
  const infoDiv = el('info');
  const h1 = create('h1');
  h1.id = 'player';
  h1.innerText = `Player: ${player.username}`;
  infoDiv.appendChild(h1);
  main.appendChild(infoDiv);
  return h1;
}

function drawInfo(){
  const infoDiv = el('info');
  infoDiv.innerHTML = "";
  const h2 = create('h2');
  h2.id = 'score';
  h2.innerText = `Score: ${SCORE}`;
  const h3 = create('h3');
  h3.id = 'lives';
  h3.innerText = `Lives: ${LIVES}`;
  infoDiv.appendChild(h2);
  infoDiv.appendChild(h3);
  fetchPlayer();
}

function updateInfo(){
  currentScore = el('score');
  currentScore.innerText = `Score: ${SCORE}`;  
  currentLives = el('lives');
  currentLives.innerText = `Lives: ${LIVES}`;
}
/*           GAME          */


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
    ctx.arc(this.position.x, this.position.y, this.radius, 0, 2 * Math.PI);
    ctx.stroke();
  }

  update(deltaTime) {
    this.position.x += this.speed.x;
    this.position.y += this.speed.y;

    // walls
    if (
      this.position.x + this.radius > this.gameWidth ||
      this.position.x - this.radius < 0
    ) {
      this.speed.x = -this.speed.x;
    }

    // ceiling
    if (this.position.y - this.radius < 0) {
      this.speed.y = -this.speed.y;
    }

    // floor
    if (this.position.y + this.radius > this.gameHeight) {
      // this.game.lives--;
      if (LIVES > 0){
        LIVES -= 1;
        this.reset();
      } 
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
      SCORE += 1;
    } else if (hitY(this.game.ball, this)) {
      this.game.ball.speed.y = -this.game.ball.speed.y;
      this.gotHit = true;
      SCORE += 1;
    }
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.fillStyle = "black";
    ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
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
      x: game.gameWidth / 2 - this.width / 2,
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
    SCORE = 0;
    LIVES = 2;
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
        case "ArrowLeft":
          paddle.moveLeft();
          break;

        case "ArrowRight":
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
        case "ArrowLeft":
          if (paddle.speed < 0) paddle.stop();
          break;

        case "ArrowRight":
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
  }
  if (
    // right side check
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
  if(LIVES > 0) {
    updateInfo();
    game.update(deltaTime);
    game.draw(ctx);
    requestAnimationFrame(play);
  } else {
    updateTotalScore(PLAYER.id, SCORE);
    setTimeout(() => {
      updateHighScore(PLAYER.id, SCORE);
      renderUser(PLAYER.id);
    }, 1000);
    // updateHighScore(PLAYER.id, SCORE);
    // renderUser(PLAYER.id);
  }
}

// create game object
let game = new Game(GAME_WIDTH, GAME_HEIGHT);
let prevTime = 0;

// create bricks in an array
let bricks = [];
for (let i = 0; i < 10; i++) {
  for (let j = 1; j < 6; j++) {
    bricks.push(new Brick(game, { x: i * 80 + 10, y: 40 * j }));
  }
}

//create game objects and start game
// drawInfo();
// game.start();

// requestAnimationFrame(play);
