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
let numberClicks = 0;
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

// console.log(operatorButtons);
//
function numClick(e) {
  buttonValue = e.target.textContent;
  displayValue = displayValue + buttonValue;
  display.textContent = displayValue;
}
function operatorClick(e) {
  if (firstRun) {
    operator = e.target.getAttribute("operator-key");
    firstNum = Number(displayValue);
    // console.log("FirstNumber Updated to: ", firstNum);
    displayValue = "";
    firstRun -= 1;
  } else {
    operator = e.target.getAttribute("operator-key");
    secondNum = Number(displayValue);
    // console.log(firstNum, secondNum, operator);
    displayValue = operate(firstNum, secondNum, operator);
    display.textContent = displayValue;
    firstNum = displayValue;
    displayValue = "";
  }
}
/*Event Listener fro Number Buttons
 */
numButtons.forEach((button) => button.addEventListener("click", numClick));
operatorButtons.forEach((button) =>
  button.addEventListener("click", operatorClick)
);
/*Event Listener for Equal Button
 */
equalButton.addEventListener("click", function () {
  secondNum = Number(displayValue);
  //   console.log(firstNum, secondNum, operator);
  displayValue = operate(firstNum, secondNum, operator);
  display.textContent = displayValue;
  firstRun = 1;
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
