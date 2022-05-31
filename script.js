function changeStyleSheet() {
  if (document.getElementById('checkbox').checked == true) {
    document.getElementById('pageStyle').setAttribute('href', 'styleDark.css');
  } else {
    document.getElementById('pageStyle').setAttribute('href', 'styleLight.css');
  }
}

const numButtons = document.querySelectorAll('[data-num]');
const operatorButtons = document.querySelectorAll(`[data-operator]`);
const currentOperand = document.querySelector('[data-current-operand]');
const previousOperand = document.querySelector(`[data-previous-operand]`);
const decimalButton = document.getElementById('decimal');
const clearButton = document.querySelector('[data-clear-entry]');
const clearAllButton = document.querySelector(`[data-clear-all]`);
const backspaceButton = document.querySelector(`[data-backspace]`);
const equalsButton = document.querySelector(`[data-equals]`);



const add = (operand1, operand2) => {
  return operand1 + operand2;
};

const subtract = (operand1, operand2) => {
  return operand1 - operand2;
};

const multiply = (operand1, operand2) => {
  return operand1 * operand2;
};

const divide = (operand1, operand2) => {
  return operand1 / operand2;
};

const operate = (operand1, operand2, operator) => {
  switch (operator) {
    case '+':
      return add(operand1, operand2);
    case '-':
      return subtract(operand1, operand2);
    case '*':
      return multiply(operand1, operand2);
    case '/':
      return divide(operand1, operand2);
  }
};

let currentNum = '';
let lastNum = '';
let lastCalculation = '';
let currentOperator = '';

let calculationResult = '';

numButtons.forEach((num) => {
  num.addEventListener('click', () => {
    currentNum += num.textContent;
    currentOperand.textContent = currentNum;
  });
});

decimalButton.addEventListener("click", () => {
	if (currentNum.includes('.')) return; // only allow one decimal point
	currentNum += ".";
	currentOperand.textContent = currentNum;
});

clearAllButton.addEventListener('click', () => {
  currentOperand.textContent = 0;
  previousOperand.textContent = '';
  currentNum = '';
  lastNum = '';
  lastCalculation = '';
  currentOperator = '';
  calculationResult = 0;
});

clearButton.addEventListener('click', () => {
  currentNum = '';
  currentOperand.textContent = 0;
});

backspaceButton.addEventListener('click', () => {
  if (currentOperand.textContent = '') {
    return currentOperand.textContent = '0';
  }
  currentNum = currentNum.substring(0, currentNum.length - 1);
  currentOperand.textContent = currentNum;
});

operatorButtons.forEach((operator) => {
	operator.addEventListener("click", () => {
		lastNum = Number(currentNum);
		currentOperator = operator.textContent;
		lastOperation = `${lastNum} ${currentOperator}`;
		previousOperand.textContent = lastOperation;
		currentNum = "";
	});
});

equalsButton.addEventListener("click", () => {
	lastOperation = `${lastNum} ${currentOperator} ${currentNum}`;
	currentNum = Number(currentNum);
	calculationResult = operate(currentNum, lastNum, currentOperator);
	lastNum = calculationResult;
	currentOperand.textContent = calculationResult;
	previousOperand.textContent = lastOperation;
	currentNum = lastNum;
});

