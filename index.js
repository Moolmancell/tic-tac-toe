function Player(mark, order, name) {
    let score = 0;
    let position = order;
    const symbol = mark;
    const playerName = name;

    return {
        score,
        position,
        symbol,
        playerName
    }
}

const Gameboard = (() => {
    const gameboardDOM = document.querySelector(".gameboard");
    const gameboardCellsDOM  = document.querySelectorAll(".gameboard div")
    const playerXName = document.querySelector("#nameX")
    const player0Name = document.querySelector("#name0")
    const options = document.querySelector(".options")
    const title = document.querySelector("h1")
    const currentPlayer = document.querySelector(".turn p")

    const dim = document.querySelector(".dim");
    const gameover = document.querySelector(".gameover");
    const startButton = document.querySelector(".startButton")

    let gameboard = [
        0,0,0,
        0,0,0,
        0,0,0
    ] 


    return {
        gameboard,
        gameboardDOM,
        gameboardCellsDOM,
        playerXName,
        player0Name,
        options,
        title,
        turn: currentPlayer,
        dim,
        gameover,
        startButton
    }
})();

function game(player1, player2) {
    let currentPlayer = 1; // Move the turn variable outside turn function

    function reset_menu() {
        document.querySelector(".gameover .mainMenu").removeEventListener("click",  generateMainMenu);
        document.querySelector(".gameover .oneMoreRounds").removeEventListener("click", again);
    }

    Gameboard.turn.textContent = `Its ${player1.playerName}'s turn`

    Gameboard.gameboard = [
        0,0,0,
        0,0,0,
        0,0,0
    ];

    Gameboard.gameboardCellsDOM.forEach(element => {
        element.innerHTML = "";
    });

    function generateMainMenu() {
        Gameboard.gameover.classList.add("hidden");
        Gameboard.dim.classList.add("hidden");
        Gameboard.gameboardDOM.classList.add("hidden");
        Gameboard.turn.classList.add("hidden");
        Gameboard.options.classList.remove("hidden");
        Gameboard.title.classList.remove("fade");

        Gameboard.gameboardCellsDOM.forEach(cell => {
            cell.removeEventListener("click", place, {once: true,});
        
        
        reset_menu();
          });
}

    function gameover(word) {
        Gameboard.gameover.classList.toggle("hidden");
        Gameboard.dim.classList.toggle("hidden");

        document.querySelector(".gameover .announcement").textContent = `${word}`
    }

    const again = () => {
        Gameboard.turn.textContent = `${player1.playerName} turn`;
        Gameboard.gameover.classList.add("hidden");
        Gameboard.dim.classList.add("hidden");
        Gameboard.gameboard = [
            0,0,0,
            0,0,0,
            0,0,0
        ];

        currentPlayer = 1;

        Gameboard.gameboardCellsDOM.forEach(element => {
            element.innerHTML = "";
        });

        Gameboard.gameboardCellsDOM.forEach(cell => {
            cell.addEventListener("click", place, {once: true,});
          });
    };

    const checkEndMatch = (mark, score, name) => {
        let word;
        let over = false;
        const point = [
            [0,1,2],
            [3,4,5],
            [6,7,8],
            [0,3,6],
            [1,4,7],
            [2,5,8],
            [2,4,6],
            [0,4,8]
        ];

        point.forEach(element => {
            if (Gameboard.gameboard[element[0]] === mark &&
                Gameboard.gameboard[element[1]] === mark &&
                Gameboard.gameboard[element[2]] === mark) {
                    console.log(mark + " wins");
                    score+=1;
                    gameover(`${name} wins`);
                    over = true;

                    return;
                }
        });

        if (!Gameboard.gameboard.includes(0) && over === false){
            console.log("tie")
            gameover("Tie");
            return;
        }
    };

    const place = (e) => {
        console.log(e.target)
        const position = +e.target.getAttribute("data-cellnum");
        if (currentPlayer === 1) {
            if (Gameboard.gameboard[position] !== 0) {
                console.log("Position Taken");
                Gameboard.turn.textContent = `Taken`
            } else {
                Gameboard.gameboard[position] = player1.symbol;
                e.target.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" id="x"><g fill="none" fill-rule="evenodd" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path d="M13 1 1 13M1 1l12 12"></path></g></svg>'
                currentPlayer = 2;
                Gameboard.turn.textContent = `Its ${player2.playerName}'s turn`
                console.log(Gameboard.gameboard);
                checkEndMatch(player1.symbol, player1.score, player1.playerName)
            }
        } else if (currentPlayer === 2) {
            if (Gameboard.gameboard[position] !== 0) {
                console.log("Position Taken");
                Gameboard.turn.textContent = `Taken`
            } else {
                Gameboard.gameboard[position] = player2.symbol;
                e.target.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" id="circle"><path d="M16 4C9.372 4 4 9.372 4 16s5.372 12 12 12 12-5.372 12-12S22.628 4 16 4zm0 22c-5.514 0-10-4.486-10-10S10.486 6 16 6s10 4.486 10 10-4.486 10-10 10z"></path></svg>'
                currentPlayer = 1;
                Gameboard.turn.textContent = `Its ${player1.playerName}'s turn`
                console.log(Gameboard.gameboard);
                checkEndMatch(player2.symbol, player2.score, player2.playerName)
            }
        }
    };
    Gameboard.gameboardCellsDOM.forEach(cell => {
        cell.addEventListener("click", place, {once: true,});
      });

    Gameboard.title.removeEventListener("transitionend", () => {
        Gameboard.gameboardDOM.classList.toggle("hidden")
        game(player1, player2);
    }, {once: true,})

    Gameboard.turn.classList.remove("hidden")

    document.querySelector(".gameover .mainMenu").addEventListener("click",  generateMainMenu);
    document.querySelector(".gameover .oneMoreRounds").addEventListener("click", again);
};

function start() {
    const orderTemp = Math.floor(Math.random() * 2) + 1;
    let order1;
    let order2;

    if (orderTemp === 1) {
        order1 = 1;
        order2 = 2;
    } else {
        order1 = 2;
        order2 = 1;
    }

    if (Gameboard.playerXName.value === "" ||
        Gameboard.player0Name.value === ""
    ) {
        return
    }

    let name1 = Gameboard.playerXName.value;
    let name2 = Gameboard.player0Name.value;

    Gameboard.title.classList.toggle("fade")

    const player1 = Player("X", order1, name1)
    const player2 = Player("0", order2, name2)
    Gameboard.options.classList.toggle("hidden")

    Gameboard.title.addEventListener("transitionend", () => {
        Gameboard.gameboardDOM.classList.toggle("hidden")
        game(player1, player2);
    }, {once: true,})
}

Gameboard.startButton.onclick = start;