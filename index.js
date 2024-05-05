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

function controller(playerturn) {

}

const Gameboard = (() => {
    const gameboardDOM = document.querySelector(".gameboard");
    const gameboardCellsDOM  = document.querySelectorAll(".gameboard div")
    const playerXName = document.querySelector("#nameX")
    const player0Name = document.querySelector("#name0")

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
        startButton
    }
})();

function game(player1, player2) {
    let turn = 1; // Move the turn variable outside turn function

    const again = () => {
        Gameboard.gameboard = [
            0,0,0,
            0,0,0,
            0,0,0
        ];
    };

    const checkEndMatch = (mark, score) => {
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
                    again();
                } else {
                    return;
                }
        });
    };

    const place = (e) => {
        const position = +e.target.getAttribute("data-cellnum");
        if (turn === 1) {
            if (Gameboard.gameboard[position] !== 0) {
                console.log("Position Taken");
            } else {
                Gameboard.gameboard[position] = player1.symbol;
                turn = 2;
                console.log(Gameboard.gameboard);
                checkEndMatch(player1.symbol, player1.score)
            }
        } else if (turn === 2) {
            if (Gameboard.gameboard[position] !== 0) {
                console.log("Position Taken");
            } else {
                Gameboard.gameboard[position] = player2.symbol;
                turn = 1;
                console.log(Gameboard.gameboard);
                checkEndMatch(player2.symbol, player1.score)
            }
        }
    };
    Gameboard.gameboardCellsDOM.forEach(cell => {
        cell.addEventListener("click", place);
      });;
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

    let name1 = Gameboard.playerXName.value;
    let name2 = Gameboard.player0Name.value;
    const player1 = Player("X", order1, name1)
    const player2 = Player("0", order2, name2)
    game(player1, player2);
}

Gameboard.startButton.onclick = start;