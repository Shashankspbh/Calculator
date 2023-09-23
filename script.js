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
let operator;

//Operate function which will take firstNum, secondNum and thrirdNum as input and call the add, subtract, multiple and divide functions

const operate = function (x, y, operator) {
  let result = 0;
  if (operator == "+") result = add(x, y);
  else if (operator == "-") result = subtract(x, y);
  else if (operator == "*") result = multiply(x, y);
  else if (operator == "/") result = divide(x, y);
  return result;
};
