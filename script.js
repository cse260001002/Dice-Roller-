const diceContainer = document.getElementById("diceContainer");
const diceCount = document.getElementById("diceCount");
const rollButton = document.getElementById("rollButton");
const clearButton = document.getElementById("clearButton");
const result = document.getElementById("result");
const history = document.getElementById("history");

let rolls = [];

function createDice(number) {
    const dice = document.createElement("div");
    dice.className = "dice";

    for (let i = 0; i < 9; i++) {
        const dot = document.createElement("span");
        dot.className = "dot";
        dice.appendChild(dot);
    }

    showDots(dice, number);
    return dice;
}

function showDots(dice, number) {
    const patterns = {
        1: [4],
        2: [0, 8],
        3: [0, 4, 8],
        4: [0, 2, 6, 8],
        5: [0, 2, 4, 6, 8],
        6: [0, 2, 3, 5, 6, 8]
    };

    const dots = dice.querySelectorAll(".dot");

    dots.forEach(function (dot, index) {
        if (patterns[number].includes(index)) {
            dot.classList.add("show");
        } else {
            dot.classList.remove("show");
        }
    });
}

function makeDice() {
    diceContainer.innerHTML = "";

    const count = Number(diceCount.value);

    for (let i = 0; i < count; i++) {
        diceContainer.appendChild(createDice(1));
    }

    result.textContent = "Result will appear here";
}

diceCount.addEventListener("change", makeDice);

rollButton.addEventListener("click", function () {
    rollButton.disabled = true;

    const dice = diceContainer.querySelectorAll(".dice");

    dice.forEach(function (die) {
        die.classList.add("rolling");
    });

    result.textContent = "Rolling...";

    setTimeout(function () {
        let total = 0;
        let numbers = [];

        dice.forEach(function (die) {
            const number = Math.floor(Math.random() * 6) + 1;

            showDots(die, number);
            die.classList.remove("rolling");

            numbers.push(number);
            total += number;
        });

        result.textContent =
            "Result: " + numbers.join(" + ") + " = " + total;

        rolls.unshift(numbers.join(" + ") + " = " + total);

        if (rolls.length > 8) {
            rolls.pop();
        }

        showHistory();
        rollButton.disabled = false;
    }, 650);
});

clearButton.addEventListener("click", function () {
    rolls = [];
    showHistory();
});

function showHistory() {
    history.innerHTML = "";

    if (rolls.length === 0) {
        history.innerHTML = "<li>No rolls yet.</li>";
        return;
    }

    rolls.forEach(function (roll) {
        const item = document.createElement("li");
        item.textContent = roll;
        history.appendChild(item);
    });
}

makeDice();