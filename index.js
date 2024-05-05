function Player(mark, order) {
    let score = 0;
    let position = order;
    const symbol = mark;

    return {
        score,
        position,
        symbol
    }
}

function Gameboard() {
    let gameboard = [
        0,0,0,
        0,0,0,
        0,0,0
    ] 


    return {
        gameboard,
    }
}

const game = (function() {
    const gameboard = Gameboard();
    let turn = 1; // Move the turn variable outside turn function

    const player1 = Player("X", 1);
    const player2 = Player("0", 2);

    const reset = () => {
        gameboard.gameboard = [
            0,0,0,
            0,0,0,
            0,0,0
        ];
    };

    const checkMatch = (mark, score) => {
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
            if (gameboard.gameboard[element[0]] === mark &&
                gameboard.gameboard[element[1]] === mark &&
                gameboard.gameboard[element[2]] === mark) {
                    console.log(mark + " wins");
                    score+=1;
                    reset();
                } else {
                    return;
                }
        });
    };

    const place = (position) => {
        console.log("asdf");
        if (turn === 1) {
            if (gameboard.gameboard[position] !== 0) {
                console.log("Position Taken");
            } else {
                gameboard.gameboard[position] = player1.symbol;
                turn = 2;
                console.log(gameboard.gameboard);
                checkMatch(player1.symbol, player1.score)
            }
        } else if (turn === 2) {
            if (gameboard.gameboard[position] !== 0) {
                console.log("Position Taken");
            } else {
                gameboard.gameboard[position] = player2.symbol;
                turn = 1;
                console.log(gameboard.gameboard);
                checkMatch(player2.symbol, player1.score)
            }
        }
    };

    return {
        place,
        gameboard
    };
})();