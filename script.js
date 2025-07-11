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

digits.forEach(digit => {
    digit.addEventListener("click", (e) => {
        if (isOp) {
            out.textContent = "";
            if (op === "=") {
                outTotal.textContent = "";
            }
            dot.disabled = false;
            dot.removeAttribute("style");
            isOp = false;
        }
        if (pressedDigit === "") {
            out.textContent = "";
            out.textContent += e.target.textContent;
            outTotal.textContent += e.target.textContent;
            pressedDigit += e.target.textContent;
            if (outTotal.textContent === "0") {
                outTotal.textContent = "";
            }
        }
        else {
            if (pressedDigit === "0" && op != "") {
                return;
            }
            else if (pressedDigit == "0" && e.target.textContent != "0") {
                pressedDigit = "";
                out.textContent = e.target.textContent;
                outTotal.textContent = e.target.textContent;
                pressedDigit += e.target.textContent;
            }
            else if (pressedDigit == "0") {
                pressedDigit = "";
            }
            else {
                out.textContent += e.target.textContent;
                outTotal.textContent += e.target.textContent;
                pressedDigit += e.target.textContent;
            }
        }
        
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
            if (op !== "=") {
                outTotal.textContent += " " + op + " ";
            }
        }
        else {
            if (pressedDigit === "") {
                let tempOp = e.target.textContent;
                if (tempOp !== "=") {
                    op = e.target.textContent;
                    outTotal.textContent = num1 + " " + op + " ";
                }
                return op;
            }
            num2 = Number(pressedDigit);
            pressedDigit = "";
            num1 = checkOperator(num1, num2, op);
            if (isNaN(num1)) {
                all.forEach(btn => {
                    btn.disabled = true;
                    btn.style.opacity = "0.5";
                });
            }
            op = e.target.textContent;
            if (op !== "=") {
                outTotal.textContent = num1 + " " + op + " ";
            }
        }
        startCalc++;
    });
});

clear.addEventListener("click", () => {
    pressedDigit = "";
    num1 = 0;
    num2 = 0;
    op = "";
    isOp = false;
    startCalc = 0;
    out.textContent = "0";
    outTotal.textContent = "";
    all.forEach(btn => {
        btn.disabled = false;
        btn.removeAttribute("style");
    });
});

del.addEventListener("click", () => {
    if (pressedDigit !== "") {
        outTotal.textContent = outTotal.textContent.slice(0, outTotal.textContent.length - 1);
    }
    if (!isOp) {
        pressedDigit = pressedDigit.slice(0, pressedDigit.length - 1);
        out.textContent = pressedDigit;
        if (out.textContent === "") {
            out.textContent = "0";
        }
        if (!out.textContent.includes(".")) {
            dot.removeAttribute("style");
            dot.disabled = false;
        }
    }
});

dot.addEventListener("click", (e) => {
    if (pressedDigit !== "" || pressedDigit === "0" || op === "") {
        pressedDigit += e.target.textContent;
        dot.disabled = true;
        dot.style.opacity = 0.5;
        out.textContent += e.target.textContent;
        outTotal.textContent += e.target.textContent;
    }
    if (pressedDigit.at(0) === ".") {
        pressedDigit = "0" + pressedDigit;
        outTotal.textContent = "0" + outTotal.textContent;
    }
});

function checkOperator(num1, num2, op) {
    switch (op) {
        case "+":
            out.textContent = addNumbers(num1, num2);
            outTotal.textContent = out.textContent;
            break;
        case "-":
            out.textContent = subNumbers(num1, num2);
            outTotal.textContent = out.textContent;
            break;
        case "x":
            out.textContent = mulNumbers(num1, num2);
            outTotal.textContent = out.textContent;
            break;
        case "/":
            out.textContent = divNumbers(num1, num2);
            outTotal.textContent = out.textContent;
            break;
        case "%":
            out.textContent = remNumbers(num1, num2);
            outTotal.textContent = out.textContent;
            break;
        default:
            out.textContent - "ERROR";
    }
    
    return Number(out.textContent);
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