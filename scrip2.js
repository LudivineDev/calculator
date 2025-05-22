// Step 1 Math function\
const add = (n1,n2) => n1 + n2;
const substract = (n1, n2) => n1 - n2;
const multiply = (n1, n2) => n2 === 0 ? "Error": n1 * n2;
const divide = (n1, n2) =>  n2 === 0 ? "Well...": n1 / n2

// Step 2 Operations\ For example, 3 + 5. Create three variables
let previousNumber = "";
let currentNumber = "";
let operator = "";

// Step 3 operate takes an operator and two numbers and then calls one of the above functions on the numbers.
function operate (op, n1, n2) {
    switch (op) {
        case "+":
            return add(n1, n2);
        case "-":
            return substract(n1,n2);
        case "x":
            return multiply(n1, n2);
        case "÷":
            return divide (n1, n2);
        default:
            return null;
    }
}
// Step 5 Display Function
const displayInput = document.querySelector(".display");

function updateDisplay (value) {
    displayInput.value = value;
}

const numberButtons = document.querySelectorAll(".number");
numberButtons.forEach(button => {
  button.addEventListener("click", () => {
    updateDisplay(button.textContent);
  });
});