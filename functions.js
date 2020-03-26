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
    fetch(`http://localhost:3000/players/${id}`, configObj)
    .then(resp => resp.json())
    .then(json => console.log(json));
}

