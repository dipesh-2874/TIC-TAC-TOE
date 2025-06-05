let currentPlayer = 'X';
let board = Array(10).fill(null); // Index 1-9 used
let gameActive = true;

const winCombos = [
  [1,2,3], [4,5,6], [7,8,9],
  [1,4,7], [2,5,8], [3,6,9],
  [1,5,9], [3,5,7]
];

const buttons = document.querySelectorAll(".btn");

buttons.forEach(btn => {
    btn.addEventListener("click", () => {
        const index = parseInt(btn.getAttribute("data-val"));
        if (!gameActive || board[index]) return;

        board[index] = currentPlayer;
        btn.textContent = currentPlayer;

        const result = check();
        if (result === "win") {
            alert(`🎉 Player ${currentPlayer} Wins!`);
            gameActive = false;
        } else if (result === "draw") {
            alert("🤝 It's a Draw!");
            gameActive = false;
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        }
    });
});

function check() {
    for (let combo of winCombos) {
        const [a, b, c] = combo;
        if (board[a] && board[a] === board[b] && board[b] === board[c]) {
            win(combo);
            return "win";
        }
    }

    if (board.slice(1).every(cell => cell)) {
        return "draw";
    }

    return null;
}

function win(combo) {
    combo.forEach(index => {
        document.querySelector(`.btn[data-val="${index}"]`).style.backgroundColor = "#90ee90";
    });
}
