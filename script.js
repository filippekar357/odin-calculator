const digits = document.querySelectorAll(".digits");
const out = document.querySelector("output");
const operators = document.querySelectorAll(".operators");
let pressedDigit = "";
let num1, num2, op, isOp;
let startCalc = 0;

digits.forEach(digit => {
    digit.addEventListener("click", (e) => {
        if (isOp) {
            out.value = "";
            isOp = false;
        }
        out.value += e.target.textContent;
        pressedDigit += e.target.textContent;
    });
});

operators.forEach(operator => {
    operator.addEventListener("click", (e) => {
        isOp = true;
        if (startCalc === 0) {
            if (pressedDigit === "") {
                return;
            }
            num1 = Number(pressedDigit);
            pressedDigit = "";
            op = e.target.textContent;
        }
        else {
            if (pressedDigit === "") {
                op = e.target.textContent;
                return;
            }
            num2 = Number(pressedDigit);
            pressedDigit = "";
            num1 = checkOperator(num1, num2, op);
            op = e.target.textContent;
        }
        startCalc++;
    });
});

function checkOperator(num1, num2, op) {
    switch (op) {
        case "+":
            out.value = addNumbers(num1, num2);
            break;
        case "-":
            out.value = subNumbers(num1, num2);
            break;
        case "x":
            out.value = mulNumbers(num1, num2);
            break;
        case "/":
            out.value = divNumbers(num1, num2);
            break;
        case "%":
            out.value = remNumbers(num1, num2);
            break;
    }
    return Number(out.value);
}

function addNumbers(num1, num2) {
    console.log(num1, num2);
    return num1 + num2;
}

function subNumbers(num1, num2) {
    console.log(num1, num2);
    return num1 - num2;
}

function mulNumbers(num1, num2) {
    return num1 * num2;
}

function divNumbers(num1, num2) {
    return num1 / num2;
}

function remNumbers(num1, num2) {
    return num1 % num2;
}