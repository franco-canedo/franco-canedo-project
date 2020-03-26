const  PLAYERS_URL = "http://localhost:3000/players";

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

    const logIn = el('log_in');
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

    const submit = el('create-account-button');
    submit.addEventListener("click", renderLogIn);
};

function renderLogIn(event) {
    console.log(event.target);

    const formDiv = el('form');
    formDiv.innerHTML = "";
    const h1 = create('h1');
    h1.innerText = "Log In";
    formDiv.appendChild(h1);

    const logIn = el('log_in');
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
    const submit = el('log-in-button');
    submit.addEventListener("click", fetchPlayers);
}

function fetchPlayers(event) {
    event.preventDefault();
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
    
    const ul = create('ul');

    for(const player in players) {
        const username = players[player].username;
        const id = players[player].id;
        const wins  = players[player].wins;
        const losses  = players[player].losses;

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
        <li>Wins: ${player.wins}</li>
        <li>Losses: ${player.losses}</li>
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