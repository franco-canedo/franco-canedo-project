const  PLAYERS_URL = "http://localhost:3000/players";
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
    console.log(event.target);

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
        console.log(e.target)
        // log_in(userInput.value);
        fetchPlayers();
    });
}

function fetchPlayers() {
    fetch(PLAYERS_URL)
    .then(resp => resp.json())
    .then(json => LeaderBoardHTML(json));
}

function LeaderBoardHTML(players) {
    console.log(players);
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
        li.addEventListener("click", fetchPlayer);
        li.addEventListener("mouseout", removePlayer);
        ul.appendChild(li);
    }
    leaderboardDiv.appendChild(ul);
    mainDIv.appendChild(leaderboardDiv);
}

function removePlayer(event) {
    const leaderboard = el('leaderboard');
    let id = event.target.dataset.playerId;
    const div = document.querySelector(`div[data-id="${id}"]`);
    div.remove();
    leaderboard.style.width = 100 + "px";
}

function fetchPlayer(event) {
    const id = event.target.dataset.playerId;

    fetch(`${PLAYERS_URL}/${id}`)
    .then(resp => resp.json())
    .then(json => showStats(json, id));
}

function showStats(player, id) {
    console.log("mouseover");
    console.log(player);
    console.log(id);

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
        fetchPlayers();
        renderUser(1);
    });
};

function renderUser(id) {
    fetch(`http://localhost:3000/players/${id}`)
    .then(resp => resp.json())
    .then(json => {
        const userDiv = create('div');
        const main = el('main');
        userDiv.innerHTML = `
        <ul>
        <li>username: ${json.username}</li>
        <li>email: ${json.email}</li>
        <li>highest score: ${json.highest_score}</li>
        <li>total score: ${json.total_score}</li>
        </ul>`;

        main.appendChild(userDiv);
        

    });
}

