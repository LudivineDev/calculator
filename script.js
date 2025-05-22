const add = (n1, n2) => n1 + n2;
const subtract = (n1, n2) => n1 - n2;
const multiply = numbers => numbers.reduce((acc, num) => acc * num, 1);
const divide = (n1, n2) => n2 === 0 ? "Error" : n1 / n2;
const changeSign = value => -value;
const percentage = value => value / 100;

  let currentInput ="";
  let previousInput ="";
  let operator="";
  let resetAfterResult = false;

  const display = document.querySelector(".display");

  function updateDisplay(value) {
	display.value = value;
  }

  function appendNumber(number) {
	if (resetAfterResult) {
	  currentInput = "";
	  resetAfterResult = false;
	}
	if (number === "." && currentInput.includes(".")) return;
	currentInput += number;
	updateDisplay(currentInput);
  }
  
  function clearAll() {
	currentInput = "";
	previousInput = "";
	operator = "";
	updateDisplay("0");
  }
  
  
  function chooseOperator(op) {
	if (currentInput === "") {
	  operator = op; // update operator only, don’t calculate
	  updateDisplay(`${previousInput} ${operator}`);
	  return;
	}
	if (previousInput !== "") {
	  calculate();
	}
	operator = op;
	previousInput = currentInput;
	currentInput = "";
	updateDisplay(`${previousInput} ${operator}`);
  }

  function operate(op, n1, n2) {
	switch (op) {
	  case "+":
		return add(n1, n2);
	  case "−":
	  case "-":
		return subtract(n1, n2);
	  case "×":
	  case "x":
		return multiply([n1, n2]);
	  case "÷":
		return divide(n1, n2);
	  default:
		return "Invalid";
	}
  }

function calculate() {
  const n1 = parseFloat(previousInput);
  const n2 = parseFloat(currentInput);
  const result = operate(operator, n1, n2);
  
  currentInput = result.toPrecision(8).replace(/\.?0+$/, ""); // trims trailing zeroes
  operator = "";
  updateDisplay(currentInput);
  resetAfterResult = true;
  

}
  
  // Hook up number buttons
  document.querySelectorAll(".number").forEach(button => {
	button.addEventListener("click", () => {
	  appendNumber(button.textContent);
	});
  });
  
  // Hook up operator buttons
  document.querySelectorAll(".operator").forEach(button => {
	button.addEventListener("click", () => {
	  const op = button.textContent;
	  if (op === "=") {
		calculate();
	  } else {
		chooseOperator(op);
	  }
	});
  });
  
  // AC button
  document.getElementById("AC").addEventListener("click", clearAll);
  
  // backspace
  document.getElementById("backspace").addEventListener("click", () => {
	currentInput = currentInput.slice(0, -1);
	updateDisplay(currentInput || "0");
  });

  // +/− button
  document.getElementById("+/-").addEventListener("click", () => {
	if (currentInput !== "") {
	  currentInput = changeSign(parseFloat(currentInput)).toString();
	  updateDisplay(currentInput);
	}
  });
  
  // % button
  document.getElementById("%").addEventListener("click", () => {
  if (previousInput !== "" && currentInput !== "" && ["+", "-", "×", "x", "−"].includes(operator)) {
    // Convert currentInput into a percentage of previousInput
    const base = parseFloat(previousInput);
    const percent = parseFloat(currentInput);
    const calculatedPercent = (base * percent) / 100;
    currentInput = calculatedPercent.toString();
    updateDisplay(`${previousInput} ${operator} ${currentInput}`);
  } else if (currentInput !== "") {
    // Default behavior: convert currentInput into a percentage (e.g. 20 → 0.2)
    currentInput = percentage(parseFloat(currentInput)).toString();
    updateDisplay(currentInput);
  }
});

document.addEventListener("keydown", (e) => {
	if (!isNaN(e.key) || e.key === ".") {
	  appendNumber(e.key);
	} else if (["+", "-", "*", "/", "Enter", "="].includes(e.key)) {
	  if (e.key === "Enter" || e.key === "=") {
		calculate();
	  } else {
		chooseOperator(e.key === "*" ? "×" : e.key === "/" ? "÷" : e.key);
	  }
	} else if (e.key === "Backspace") {
	  currentInput = currentInput.slice(0, -1);
	  updateDisplay(currentInput || "0");
	} else if (e.key.toLowerCase() === "c") {
	  clearAll();
	}
  });