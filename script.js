function changeStyleSheet() {
  if (document.getElementById('checkbox').checked == true) {
    document.getElementById('pageStyle').setAttribute('href', 'styleDark.css');
  } else {
    document.getElementById('pageStyle').setAttribute('href', 'styleLight.css');
  }
}

const numButtons = document.querySelectorAll('[data-num]');
const currentOperand = document.querySelector('[data-current-operand]');
const clearButton = document.querySelector('[data-clear-entry]');

clearButton.addEventListener('click', () => {
  currentOperand.textContent = 0;
});

numButtons.forEach((button) => {
  button.addEventListener('click', () => {
    currentOperand.appendNumber(currentOperand.textContent = button.innerText);
  })
})

