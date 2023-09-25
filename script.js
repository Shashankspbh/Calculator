//Function for add
const add = (x, y) => x + y;
// function for subtract
const subtract = (x, y) => x - y;
// function for multiply
const multiply = (x, y) => x * y;
// function fordivide
const divide = (x, y) => (x / y).toFixed(3);

const modulus = (x, y) => x % y;

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
  else if (operator == "%") result = modulus(x, y);
  return result;
};

//Initialize the DOM
const numButtons = [...document.querySelectorAll(".num-button")];
const operatorButtons = [...document.querySelectorAll(".operator-button")];
const allButtons = [...document.querySelectorAll("button")];
const display = document.querySelector(".display");
const equalButton = document.querySelector('button[key="="]');
const acButton = document.querySelector('button[key="AC"]');
const negativeButton = document.querySelector('button[key="+/-"]');
const calculation = document.querySelector(".calculation");
// console.log(operatorButtons);
//
function addTransition(buttonValue) {
  const key = document.querySelector(`button[key="${buttonValue.trim()}"]`);
  key.classList.add("selected");
}
function removeTransition(e) {
  e.target.classList.remove("selected");
}

//
function numClick(e) {
  if (afterEquals) {
    firstNum = 0;
    secondNum = 0;
    displayValue = "";
    display.textContent = "";
    afterEquals = 0;
    firstRun = 1;
  }
  const buttonValue = e.key || e.target.textContent;
  addTransition(buttonValue);
  if (buttonValue === "." && displayValue.includes(".")) return;
  else {
    displayValue = displayValue + buttonValue;
    display.textContent = displayValue;
  }
}
//
//
function operatorClick(e) {
  addTransition(e.key || e.target.textContent);
  if (firstRun) {
    operator = e.key || e.target.getAttribute("key");
    firstNum = Number(displayValue);
    displayValue = "";
    firstRun -= 1;
    afterEquals = 0;
  } else {
    if (displayValue != "") {
      secondNum = Number(displayValue);
      // console.log(firstNum, secondNum, operator);
      calculation.textContent = firstNum + " " + operator + " " + secondNum;
      displayValue = operate(firstNum, secondNum, operator);
      operator = e.key || e.target.getAttribute("key");
      display.textContent = displayValue;
      firstNum = displayValue;
      displayValue = "";
      afterEquals = 0;
    }
  }
}
/*Event Listener fro Number Buttons & Operator Buttons
 */
numButtons.forEach((button) => button.addEventListener("click", numClick));
// prettier-ignore
allButtons.forEach((button) => button.addEventListener("transitionend", removeTransition));
// prettier-ignore
operatorButtons.forEach((button) => button.addEventListener("click", operatorClick));

/*Event Listener for Equal Button
 */
function equalButtonEvent(e) {
  addTransition("=");
  if (!afterEquals && !firstRun) {
    secondNum = Number(displayValue);
    console.log(firstNum, secondNum, operator);
    calculation.textContent = firstNum + " " + operator + " " + secondNum;
    displayValue = operate(firstNum, secondNum, operator);
    display.textContent = displayValue;
    firstRun = 1;
    afterEquals = 1;
  }
}
equalButton.addEventListener("click", equalButtonEvent);
/* Event Listener for AC Button
 */
function acButtonEvent(e) {
  addTransition("AC");
  firstNum = 0;
  secondNum = 0;
  displayValue = "";
  display.textContent = "";
  firstRun = 1;
  calculation.textContent = "";
}
acButton.addEventListener("click", acButtonEvent);

// Negative Button Add Event Listner

negativeButton.addEventListener("click", (e) => {
  addTransition(e.key || e.target.textContent);
  if (displayValue == "") {
    displayValue = "-";
    display.textContent = "-";
  } else if (displayValue == "-") {
    displayValue = "";
    display.textContent = "";
  } else {
    displayValue = String(Number(displayValue) * -1);
    display.textContent = displayValue;
  }
});
//
// Adding Keyboard Input
//

const numKeyCodes = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "."];

function keyInput(e) {
  if (numKeyCodes.includes(e.key)) numClick(e);
}
document.addEventListener("keydown", keyInput);
//
//
const operatorKeyCodes = ["*", "/", "-", "+", "%"];
function operatorInput(e) {
  if (operatorKeyCodes.includes(e.key)) operatorClick(e);
}
document.addEventListener("keydown", operatorInput);
//
//
document.addEventListener("keydown", (e) => {
  if (e.key == "=" || e.key == "Enter") equalButtonEvent();
});
//
//
document.addEventListener("keydown", (e) => {
  if (e.key == "Escape") acButtonEvent();
});
