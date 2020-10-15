class Calculator {
  constructor(previousOperandTextElement, currentOperandTextElement) {
    this.previousOperandTextElement = previousOperandTextElement;
    this.currentOperandTextElement = currentOperandTextElement;
    this.reset = false;
    this.clear();
  }
  clear() {
    this.currentOperand = "";
    this.previousOperand = "";
    this.operation = undefined;
  }
  appendNumber(number) {
    if (number === "." && this.currentOperand.includes(".")) return;
    this.currentOperand = this.currentOperand.toString() + number.toString();
  }
  updateDisplay() {
    this.currentOperandTextElement.innerText = this.currentOperand;
    if (this.operation != null) {
      this.previousOperandTextElement.innerText = `${this.previousOperand} ${this.operation}`;
    } else {
      this.previousOperandTextElement.innerText = "";
    }
  }
  choiceOperation(operation) {
    if (this.currentOperand === "") return;
    if (this.currentOperand !== "" && this.previousOperand !== "") {
      this.compute();
    }
    this.operation = operation;
    this.previousOperand = this.currentOperand;
    this.currentOperand = "";
  }

  compute() {
    let computation;
    const current = parseFloat(this.currentOperand);
    const prev = parseFloat(this.previousOperand);
    if (isNaN(current) || isNaN(prev)) return;
    switch (this.operation) {
      case "+":
        computation = prev + current;
        break;
      case "-":
        computation = prev - current;
        break;
      case "*":
        computation = prev * current;
        break;
      case "÷":
        computation = prev / current;
        break;
      case "√":
        computation = Math.pow(prev, 1/current);
        break;
      case "^":
        computation = prev ** current;
        break;
    }
    this.currentOperand = computation;
    this.previousOperand = "";
    this.reset = true;
    this.operation = undefined;
  }
  delete() {
    this.currentOperand = this.currentOperand.toString().slice(0, -1);
  }
  otr(){
    if(this.currentOperand != '') this.currentOperand = this.currentOperand*(-1);
  }
}

const numberButtons = document.querySelectorAll("[data-number]");
const operationButtons = document.querySelectorAll("[data-operation]");
const equalsButton = document.querySelector("[data-equals]");
const deleteButton = document.querySelector("[data-delete]");
const allClearButton = document.querySelector("[data-all-clear]");
const otrButton = document.querySelector("[data-otr]");

const previousOperandTextElement = document.querySelector(
  "[data-previous-operand]"
);
const currentOperandTextElement = document.querySelector(
  "[data-current-operand]"
);

const calculator = new Calculator(
  previousOperandTextElement,
  currentOperandTextElement
);

numberButtons.forEach((button) => {
  button.addEventListener("click", () => {
    if (
      calculator.previousOperand === "" &&
      calculator.currentOperand != "" &&
      calculator.reset
    ) {
      calculator.reset = false;
      calculator.currentOperand = "";
    }
    calculator.appendNumber(button.innerText);
    calculator.updateDisplay();
  });
});

operationButtons.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.choiceOperation(button.innerText);
    calculator.updateDisplay();
  });
});

equalsButton.addEventListener("click", () => {
  calculator.compute();
  calculator.updateDisplay();
});

deleteButton.addEventListener("click", () => {
  calculator.delete();
  calculator.updateDisplay();
});

allClearButton.addEventListener("click", () => {
  calculator.clear();
  calculator.updateDisplay();
});

otrButton.addEventListener('click', ()=>{
  calculator.otr();
  calculator.updateDisplay();
})
