//Function for add
const add = (x, y) => x + y;
// function for subtract
const subtract = (x, y) => x - y;
// function for multiply
const multiply = (x, y) => x * y;
// function fordivide
const divide = (x, y) => x / y;

// Initializing Variables and operators
let firstNum = 0;
let secondNum = 0;
let operator; //+
let displayValue = ""; //5
let firstRun = 1;
let afterEquals = 0;

//Operate function which will take firstNum, secondNum and thrirdNum as input and call the add, subtract, multiple and divide functions

const operate = function (x, y, operator) {
  let result = 0;
  if (operator == "+") result = add(x, y);
  else if (operator == "-") result = subtract(x, y);
  else if (operator == "*") result = multiply(x, y);
  else if (operator == "/") result = divide(x, y);
  return result;
};

//Initialize the DOM
const numButtons = [...document.querySelectorAll(".num-button")];
const operatorButtons = [...document.querySelectorAll(".operator-button")];
const display = document.querySelector(".display");
const equalButton = document.querySelector('button[operator-key="="]');
const acButton = document.querySelector('button[operator-key="AC"]');
const negativeButton = document.querySelector('button[operator-key="+/-"]');
// console.log(operatorButtons);
//
function numClick(e) {
  if (afterEquals) {
    firstNum = 0;
    secondNum = 0;
    displayValue = "";
    display.textContent = "";
    firstRun = 1;
    afterEquals = 0;
  }
  buttonValue = e.target.textContent;
  if (buttonValue === "." && displayValue.includes(".")) return;
  else {
    displayValue = displayValue + buttonValue;
    display.textContent = displayValue;
  }
}
function operatorClick(e) {
  if (firstRun) {
    operator = e.target.getAttribute("operator-key");
    firstNum = Number(displayValue);
    displayValue = "";
    firstRun -= 1;
    afterEquals = 0;
  } else {
    secondNum = Number(displayValue);
    console.log(firstNum, secondNum, operator);
    displayValue = operate(firstNum, secondNum, operator);
    operator = e.target.getAttribute("operator-key");
    display.textContent = displayValue;
    firstNum = displayValue;
    displayValue = "";
    afterEquals = 0;
  }
}
/*Event Listener fro Number Buttons & Operator Buttons
 */
numButtons.forEach((button) => button.addEventListener("click", numClick));
operatorButtons.forEach((button) =>
  button.addEventListener("click", operatorClick)
);
/*Event Listener for Equal Button
 */
equalButton.addEventListener("click", function () {
  if (!afterEquals) {
    secondNum = Number(displayValue);
    console.log(firstNum, secondNum, operator);
    displayValue = operate(firstNum, secondNum, operator);
    display.textContent = displayValue;
    firstRun = 1;
    afterEquals = 1;
  }
});
/* Event Listener for AC Button
 */
acButton.addEventListener("click", function () {
  firstNum = 0;
  secondNum = 0;
  displayValue = "";
  display.textContent = "";
  firstRun = 1;
});

// Negative Button Add Event Listner

negativeButton.addEventListener("click", () => {
  displayValue = String(Number(displayValue) * -1);
  display.textContent = displayValue;
});
