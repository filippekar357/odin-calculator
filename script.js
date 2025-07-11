const digits = document.querySelectorAll(".digits");
const out = document.querySelector("output");
const operators = document.querySelectorAll(".operators");
let pressedDigit = "";
let dgt1, dgt2, op, isOp;
let startCalc = 0;

function checkOperator(op) {
    
}

digits.forEach(digit => {
    digit.addEventListener("click", (e) => {
        if (isOp) {
            out.value = "";
            isOp = false;
        }
        out.value += e.target.textContent;
        pressedDigit += e.target.textContent;
        console.log(op);
    });
});

operators.forEach(operator => {
    operator.addEventListener("click", (e) => {
        isOp = true;
        if (startCalc === 0) {
            if (pressedDigit === "") {
                return;
            }
            dgt1 = Number(pressedDigit);
            pressedDigit = "";
            op = e.target.textContent;
        }
        else {
            if (pressedDigit === "") {
                op = e.target.textContent;
                return;
            }
            dgt2 = Number(pressedDigit);
            pressedDigit = "";
            checkOperator(op);
            op = e.target.textContent;
        }
        startCalc++;
    });
});