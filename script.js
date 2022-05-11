function changeStyleSheet() {
  if (document.getElementById('checkbox').checked == true) {
    document.getElementById('pageStyle').setAttribute('href', 'styleDark.css');
  } else {
    document.getElementById('pageStyle').setAttribute('href', 'styleLight.css');
  }
}

let firstNumber = '';
let secondNumber = '';
let operation = '';

let add = (a, b) => a + b;
let subtract = (a, b) => a - b;
let multiply = (a, b) => a * b;
let divide = (a, b) => a / b;


function calculate(operand1, operator, operand2) {
  if (operator === '+') {
    return add(operand1, operand2);
  }
  if (operator === '-') {
    return subtract(operand1, operand2);
  }
  if (operator === '*') {
    return multiply(operand1, operand2);
  }
  if (operator === '/') {
    let divideResult = divide(operand1, operand2);
    let divideResultMax = divideResult.toString().length;
    if (divideResult % 1 === divideResult) return divideResult;
    if (divideResultMax > 6) return divideResult.toFixed(6);
    return divideResult;
  }
}

function operator(e) {
  secondNumber = Number(firstNumber);
  firstNumber = '';
  if (e.target) {
    operation = e.target.getAttribute('data-value');
    return;
  }
  operation = e.getAttribute('data-value');
}

function onDisplay(e) {
  let firstNumberCount = firstNumber.toString().length;
  if (firstNumberCount > 13) return;
  if (e.target) {
    firstNumber += e.target.getAttribute('data-value');
   return display.textContent = firstNumber;
  }
  firstNumber += e.getAttribute('data-value');
  display.textContent = firstNumber;
}

function reset() {
  secondNumber = '';
  operation = '';
}

// computes the whole arithmethic operation and other '=' behaviours of calculator
function equals() {
  if (firstNumber === '' || operation === '') {
    reset();
    return (display.textContent = `${Number(firstNumber)}`);
  }
  firstNumber = Number(firstNumber);
  // divison by zero
  if (firstNumber === 0 && secondNumber !== 0) {
    return (display.textContent = 'DIV BY ZERO');
  }
  let output = calculate(secondNumber, operation, firstNumber);
  let outputCount = output.toString().length;
  if (outputCount > 13) {
    output = Number(output.toString().slice(0, 13));
  }
  display.textContent = output;
  firstNumber = output;
  reset();
}

// default
let display = document.getElementById('displayContent');
display.textContent = '0';

let clearEverything = document.querySelector(`button[data-value='AC']`);
clearEverything.addEventListener('click', () => {
  display.textContent = '0';
  firstNumber = '';
});

// backspace funtionality
function removeLast() {
  firstNumberCount = firstNumber.toString().length;
  if (firstNumberCount === 1 || firstNumber === '') {
    firstNumber = '';
    return (display.textContent = Number(firstNumber));
  }
  firstNumber = firstNumber.toString().slice(0, -1);
  display.textContent = firstNumber;
}

function clear() {
  firstNumber = 0;
  display.textContent = firstNumber;
}

let clearButton = document.querySelector(`button[data-value='C']`);
clearButton.addEventListener('click', clear);

let backSpaceButton = document.querySelector(`button[data-value='Backspace']`);
backSpaceButton.addEventListener('click', removeLast);

let negativeButton = document.querySelector(`button[data-value='negative']`);
negativeButton.addEventListener('click', (e) => {
  firstNumber -= firstNumber * 2;
  display.textContent = firstNumber;
});

function decimalFunction() {
  ifDecimal = firstNumber.toString().includes('.');
  if (ifDecimal) return;
  firstNumber += '.';
  display.textContent = firstNumber;
}

let decimalButton = document.querySelector(`button[data-value='.']`);
decimalButton.addEventListener('click', decimalFunction);

// equals button
let equalsButton = document.querySelector(`button[data-value='Enter']`);
equalsButton.addEventListener('click', equals);

// All operator buttons 
let operatorButtons = document.querySelectorAll(`button[data-type='operator']`);
operatorButtons.forEach((operatorButton) => {
  operatorButton.addEventListener('click', operator);
});

// All number buttons
let numbers = document.querySelectorAll(`button[data-type='number']`);
numbers.forEach((number) => {
  number.addEventListener('click', onDisplay);
});

// keyboard event listeners 
function keyboardDigits(e) {
  let key = document.querySelector(`button[data-value='${e.key}']`);
  if (e.key === '/') e.preventDefault();
  if (e.key === '+' || e.key === '/' || e.key === '-' || e.key === '*') return operator(key);
  if (e.key === 'Enter') return equals();
  if (e.key === 'Backspace') return removeLast();
  if (e.key >= 0 || e.key <= 9) return onDisplay(key);
  if (e.key === 'Shift') return;
  return onDisplay(key);
}
window.addEventListener('keydown', keyboardDigits);