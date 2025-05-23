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
        case "−":
            return substract(n1,n2);
        case "×":
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
    if (displayInput.value === "0") { // loop adding multiple number on display
        displayInput.value = value;
        currentNumber = value; // Store clicked number into currentNumber
    } else {
        displayInput.value += value;
        currentNumber += value;
    }
    }
// Step 5 show number appearing on display once clicked
const numberButtons = document.querySelectorAll(".number");
numberButtons.forEach(button => {
  button.addEventListener("click", () => {
    updateDisplay(button.textContent);
  });
})

// Step 5 show operator appearing on display once clicked
const operatorButtons = document.querySelectorAll(".operator");
operatorButtons.forEach(button => {
    
    button.addEventListener("click", () => {
    if (button.id === "equal") return;// Skip if this is the equal button
        previousNumber = displayInput.value; //store the current number once operator is clicked
        operator = button.textContent; //store the operator
        currentNumber = "" // reset the current number to be ready for the next click
        displayInput.value = previousNumber + "" + operator; //show operation on display
    })
})

// Step 6 Make the calculator work!
const equalButton = document.querySelector("#equal");

function calculate () {
    equalButton.addEventListener("click",() => {
        if (previousNumber !=="" && operator !=="" && currentNumber !=="") {
            const result = operate(operator,Number(previousNumber),  Number(currentNumber))
            displayInput.value=result;

             // reset for further calculations
             previousNumber = result;
             currentNumber = "";
             operator = "";
        }
    });
}
calculate();

// Step 7

// AC button
function clearAll() { 
    currentNumber = "";
    previousNumber = "";
    operator = "";
    displayInput.value = "0";
}

document.getElementById("AC").addEventListener("click", clearAll);
    
// +/- button
function changeSign() {
    if (displayInput.value === "0") return; // Do nothing if display is zero

    if (displayInput.value.startsWith("-")) {
        displayInput.value = displayInput.value.slice(1);
    } else {
        displayInput.value = "-" + displayInput.value;
    }

    // Update currentNumber too, so future calculations use the correct value
    currentNumber = displayInput.value;
}

document.getElementById("sign").addEventListener("click", changeSign);


    