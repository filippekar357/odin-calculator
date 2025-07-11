const all = document.querySelectorAll(".digits, .operators, #dot, #del-btn");
const digits = document.querySelectorAll(".digits");
const out = document.querySelector("#current");
const outTotal = document.querySelector("#total-disp");
const operators = document.querySelectorAll(".operators");
const clear = document.querySelector("#clear-btn");
const del = document.querySelector("#del-btn");
const dot = document.querySelector("#dot");
let pressedDigit = "";
let num1, num2, isOp;
let op = "";
let startCalc = 0;
let currentDisplay = "";
let totalDisplay = ""; 

digits.forEach(digit => {
    digit.addEventListener("click", (e) => handleDigits(e.target.textContent));
});

document.addEventListener("keydown", (e) => {
    if (e.key >= "0" && e.key <= "9") {
        handleDigits(e.key);
    }
});

operators.forEach(operator => {
    operator.addEventListener("click", (e) => handleOperator(e.target.textContent));
});

document.addEventListener("keydown", (e) => {
    if (e.key === "+" || e.key === "-" || e.key === "*" || e.key === "/" || e.key === "=" || e.key === "Enter") {
        handleOperator(e.key);
    }
});

clear.addEventListener("click", resetCalc);

del.addEventListener("click", deleteDigit);

document.addEventListener("keydown", (e) => {
    if (e.key === "Backspace") {
        deleteDigit();
    }
});

dot.addEventListener("click", (e) => handleDot(e.target.textContent));

document.addEventListener("keydown", (e) => {
    if (e.key === ".") {
        handleDot(e.key);
    }
});

function handleDigits(digit) {
    if (isOp) {
        currentDisplay = "";
        if (op === "=") {
            totalDisplay = "";
        }
        switchButtons(false, "dot");
        isOp = false;
    }
    if (pressedDigit === "") {
        currentDisplay = "";
        currentDisplay += digit;
        totalDisplay += digit;
        pressedDigit += digit;
        if (totalDisplay === "0") {
            totalDisplay = "";
        }
    }
    else {
        if (pressedDigit === "0" && op != "") {
            return;
        }
        else if (pressedDigit == "0" && digit != "0") {
            pressedDigit = "";
            currentDisplay = digit;
            totalDisplay = digit;
            pressedDigit += digit;
        }
        else if (pressedDigit == "0") {
            pressedDigit = "";
        }
        else {
            currentDisplay += digit;
            totalDisplay += digit;
            pressedDigit += digit;
        }
    }
    render();
}

function handleOperator(digit) {
    isOp = true;
    if (startCalc === 0) {
        if (pressedDigit === "") {
            return;
        }
        num1 = Number(pressedDigit);
        pressedDigit = "";
        op = digit;
        if (op !== "=" && op !== "Enter") {
            totalDisplay += " " + op + " ";
        }
    }
    else {
        if (pressedDigit === "") {
            let tempOp = digit;
            if (tempOp !== "=" && tempOp !== "Enter") {
                op = digit;
                totalDisplay = num1 + " " + op + " ";
            }
            render();
            return op;
        }
        num2 = Number(pressedDigit);
        pressedDigit = "";
        num1 = checkOperator(num1, num2, op);
        if (isNaN(num1)) {
            all.forEach(btn => {
                btn.style.opacity = "0.5";
            });
        }
        op = digit;
        if (op !== "=" && op !== "Enter") {
            totalDisplay = num1 + " " + op + " ";
        }
    }
    startCalc++;
    render();
}

function handleDot(digit) {
    if (pressedDigit !== "" || pressedDigit === "0" || op === "") {
        pressedDigit += digit;
        switchButtons(true, "dot");
        currentDisplay += digit;
        if (totalDisplay.at(-1) === "0") {
            totalDisplay += digit;
            render();
            return;
        }
        if (pressedDigit === "." || pressedDigit === "0.") {
            totalDisplay += "0" + digit;
        }
        else {
            totalDisplay += digit;
        }
    }
    if (pressedDigit.at(0) === ".") {
        pressedDigit = "0" + pressedDigit;
        if (totalDisplay.at(0) !== "0" && totalDisplay.at(0) !== "") {
            totalDisplay = "0" + totalDisplay;
        }
        if (currentDisplay.at(0) !== "0") {
            currentDisplay = "0" + currentDisplay;
        }
        
    }
    render();
}

function deleteDigit() {
    if (pressedDigit !== "") {
        totalDisplay = totalDisplay.slice(0, totalDisplay.length - 1);
    }
    if (!isOp) {
        pressedDigit = pressedDigit.slice(0, pressedDigit.length - 1);
        currentDisplay = pressedDigit;
        if (currentDisplay === "") {
            currentDisplay = "0";
        }
        if (!currentDisplay.includes(".")) {
            switchButtons(false, "dot");
        }
    }
    render();
}

function checkOperator(num1, num2, op) {
    switch (op) {
        case "+":
            currentDisplay = addNumbers(num1, num2);
            totalDisplay = currentDisplay;
            break;
        case "-":
            currentDisplay = subNumbers(num1, num2);
            totalDisplay = currentDisplay;
            break;
        case "x":
            currentDisplay = mulNumbers(num1, num2);
            totalDisplay = currentDisplay;
            break;
        case "/":
            currentDisplay = divNumbers(num1, num2);
            totalDisplay = currentDisplay;
            break;
        case "%":
            currentDisplay = remNumbers(num1, num2);
            totalDisplay = currentDisplay;
            break;
        default:
            currentDisplay - "ERROR";
    }
    render();
    return Number(currentDisplay);
}

function resetCalc() {
    pressedDigit = "";
    num1 = 0;
    num2 = 0;
    op = "";
    isOp = false;
    startCalc = 0;
    currentDisplay = "0";
    totalDisplay = "";
    all.forEach(btn => {
        switchButtons(false, btn);
    });
    render();
}

function render() {
    out.textContent = currentDisplay;
    outTotal.textContent = totalDisplay;
}


function switchButtons(nextState, el) {
    if (nextState && el === "dot") {
        dot.disabled = true;
        dot.style.opacity = 0.5;
        return;
    }
    else if (!nextState && el === "dot") {
        dot.disabled = false;
        dot.removeAttribute("style");
        return;
    }
    else if (nextState) {
        el.disabled = true;
        el.style.opacity = 0.5;
        return;
    }
    else {
        el.disabled = false;
        el.removeAttribute("style");
    }
}

function addNumbers(num1, num2) {
    return num1 + num2;
}

function subNumbers(num1, num2) {
    return num1 - num2;
}

function mulNumbers(num1, num2) {
    return num1 * num2;
}

function divNumbers(num1, num2) {
    if (num1 / num2 == Infinity) {
        return "Math Error";
    }
    else {
        return num1 / num2;
    }
}

function remNumbers(num1, num2) {
    return num1 % num2;
}