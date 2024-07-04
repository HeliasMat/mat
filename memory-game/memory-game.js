const board = document.getElementById("game-board");
const cards = [
    "A", "A", "B", "B", "C", "C", "D", "D",
    "E", "E", "F", "F", "G", "G", "H", "H",
];

const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
    }
};

shuffleArray(cards);

cards.forEach((card) => {
    const cardElement = document.createElement("div");
    cardElement.classList.add("card");
    cardElement.dataset.value = card;
    board.appendChild(cardElement);
});

let firstCard = null;
let secondCard = null;
let preventClicks = false;

board.addEventListener("click", (event) => {
    if (preventClicks) return;
    const target = event.target;
    if (target.classList.contains("card")) {
    target.textContent = target.dataset.value;
    if (!firstCard) {
        firstCard = target;
    } else if (firstCard === target) {
        return;
    } else if (firstCard.dataset.value === target.dataset.value) {
        firstCard.classList.add("matched");
        target.classList.add("matched");
        firstCard = null;
        secondCard = null;
    } else {
        secondCard = target;
        preventClicks = true;
        setTimeout(() => {
        firstCard.textContent = "";
        secondCard.textContent = "";
        firstCard = null;
        secondCard = null;
        preventClicks = false;
        }, 1000);
    }
    }
});