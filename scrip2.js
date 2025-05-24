// Step 1 Math function\
const add = (n1,n2) => n1 + n2;
const substract = (n1, n2) => n1 - n2;
const multiply = (n1, n2) => n1 * n2;
const divide = (n1, n2) =>  n2 === 0 ? "Well...": n1 / n2

// Step 2 Operations\ For example, 3 + 5. Create three variables
let previousNumber = "";
let currentNumber = "";
let operator = "";
let resultJustDisplayed = false;

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
const displayInput = document.querySelector(".current-display");

function updateDisplay (value) {
    if (value === "." && currentNumber.includes(".")) return; //prevent multiple dots like 7.3.4
    if (displayInput.value === "0" || resultJustDisplayed) { // loop adding multiple number on display
        displayInput.value = value;
        currentNumber = value; // Store clicked number into currentNumber
        
        // Only clear previousDisplay if a result was just displayed
        if (resultJustDisplayed) {
            previousDisplay.textContent = "";
            resultJustDisplayed = false;
        }
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
    if (displayInput.value === "0" || displayInput.value === "") return;// Prevent clicking operator if display is still at "0" or empty
    if (button.id === "equal") return;// Skip if this is the equal button

    if (resultJustDisplayed) resultJustDisplayed = false;  // reset after a chain 
        
// If there's a full operation pending, calculate it first
if (previousNumber !== "" && operator !== "" && currentNumber !== "") {
    let result = operate(operator, Number(previousNumber), Number(currentNumber));
    if (typeof result === "number") result = Math.round(result * 1000) / 1000;

    previousNumber = result.toString();
    currentNumber = "";
    displayInput.value = ""; // Clear for next number
    resultJustDisplayed = false;
  } else {
    previousNumber = displayInput.value;
  }

  //  Save new operator (don't display it in current display)
  operator = button.textContent;
  previousDisplay.textContent = `${previousNumber} ${operator}`;
  displayInput.value = ""; // Clear for next input
});
});

// Step 6 Make the calculator work!
const equalButton = document.querySelector("#equal");

function calculate () {
    equalButton.addEventListener("click",() => {
        if (previousNumber !=="" && operator !=="" && currentNumber !=="") {
            let result = operate(operator,Number(previousNumber),  Number(currentNumber))
            if (typeof result === "number") {
                result = Math.round(result * 1000)/1000; //round to 3 decimals
            }
            previousDisplay.textContent = `${previousNumber} ${operator} ${currentNumber} =`; // full expression
            displayInput.value=result;

             // reset for further calculations
             previousNumber = result;
             currentNumber = "";
             operator = "";
             resultJustDisplayed = true;
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
    previousDisplay.textContent="";
}

document.getElementById("AC").addEventListener("click", clearAll);
    
// +/- button
function changeSign() {
    if (displayInput.value === "0") return; // Do nothing if display is zero

    if (displayInput.value.startsWith("-")) {
        displayInput.value = displayInput.value.slice(1); //removes the first character
    } else {
        displayInput.value = "-" + displayInput.value;
    }

    // Update currentNumber too, so future calculations use the correct value
    currentNumber = displayInput.value;
}

document.getElementById("sign").addEventListener("click", changeSign);

// Creating a second display for the operation
const previousDisplay = document.getElementById("previousDisplay");


 // % button   
 document.getElementById("percent").addEventListener("click", () => {
    if (previousNumber !== "" && operator !== "" && currentNumber !== "") {
        // Convert currentNumber to percentage of previousNumber
        currentNumber = (Number(currentNumber) / 100) * Number(previousNumber);
        displayInput.value = currentNumber;
    } else if (currentNumber !== "") {
        // Just get the percentage of the current number (e.g. "50%" becomes "0.5")
        currentNumber = Number(currentNumber) / 100;
        displayInput.value = currentNumber;
    }
});

 // ⌫ button  
 document.getElementById("backSpace").addEventListener("click", () => {
    if (resultJustDisplayed) return;   // Prevent editing the result with backspace
    // Handle case when operator was just entered and display is empty
    if (displayInput.value === "" && previousDisplay.textContent && operator !== "") {
        displayInput.value = previousNumber;
        currentNumber = previousNumber;
        previousNumber = "";
        operator = "";
        previousDisplay.textContent = "";
        return;
    }

    if (displayInput.value.length > 1) {
        displayInput.value = displayInput.value.slice(0, -1);
        currentNumber = displayInput.value; // sync currentNumber with display
    } else {
        displayInput.value = "0";
        currentNumber = "";
    }
});