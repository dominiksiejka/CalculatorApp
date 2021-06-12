class Calculator {
  constructor({ previousOperandTextContent, currentOperandTextContent }) {
    this.previousOperandTextContent = previousOperandTextContent;
    this.currentOperandTextContent = currentOperandTextContent;
    this.handleClearCalculator();
  }

  handleClearCalculator = () => {
    this.currentOperand = "";
    this.previousOperand = "";
    this.operation = null;
  };
  handleDeleteNumber = () => {
    if (this.currentOperand === "") return;
    this.currentOperand = this.currentOperand.slice(0, -1);
    this.handleUpdateDisplay();
  };
  handleRighDisplayNumbers = (number) => {
    const numberToString = number.toString();
    const paresedIntegerDigits = parseFloat(numberToString.split(".")[0]);
    const parsedDecimalDigits = numberToString.split(".")[1];
    let parsedIntegerDisplay;
    if (isNaN(paresedIntegerDigits)) {
      parsedIntegerDisplay = "";
    } else {
      parsedIntegerDisplay = paresedIntegerDigits.toLocaleString("en", {
        maximumFractionDigits: 0,
      });
    }
    if (parsedDecimalDigits != null) {
      return `${parsedIntegerDisplay}.${parsedDecimalDigits} `;
    } else {
      return parsedIntegerDisplay;
    }
  };
  handleAppendNumber = (number) => {
    if (this.isEqualClicked) {
      this.handleClearCalculator();
      this.isEqualClicked = false;
    }
    if (number === "." && this.currentOperand.includes(".")) return;
    if (this.currentOperand.length >= 9) return;

    this.currentOperand += number.toString();
  };
  handleMantainOperation = (operation) => {
    if (this.currentOperand === "") return;
    if (this.previousOperand != "") {
      this.handleComputeScore();
    }
    this.operation = operation;
    this.previousOperand = this.currentOperand;
    this.currentOperand = "";
  };
  handleComputeScore = (isEqualClicked) => {
    this.isEqualClicked = isEqualClicked;
    let score;
    const currentVal = parseFloat(this.currentOperand);
    const previousVal = parseFloat(this.previousOperand);
    if (isNaN(currentVal) || isNaN(previousVal)) return;
    switch (this.operation) {
      case "+":
        score = previousVal + currentVal;
        break;
      case "-":
        score = previousVal - currentVal;
        break;
      case "*":
        score = previousVal * currentVal;
        break;
      case "÷":
        score = previousVal / currentVal;
        break;
      default:
        return;
    }
    this.currentOperand = score.toString().includes(".")
      ? score.toFixed(2)
      : score;

    this.operation = null;
    this.previousOperand = "";
  };
  handleUpdateDisplay = () => {
    this.currentOperandTextContent.innerText = this.handleRighDisplayNumbers(
      this.currentOperand
    );
    if (this.operation != null) {
      this.previousOperandTextContent.innerText = `${this.handleRighDisplayNumbers(
        this.previousOperand
      )} ${this.operation}`;
    } else {
      this.previousOperandTextContent.innerText = "";
    }
  };
}

const calculatorNumbers = [...document.querySelectorAll(".number")];
const calculatorOperators = [...document.querySelectorAll(".operator")];
const calculatorEqualSign = document.getElementById("equals");
const calculatorClearData = document.getElementById("clear-all");
const calculatorDeleteLastNumber = document.getElementById("delete");

const calculator = new Calculator({
  previousOperandTextContent: document.querySelector(".previous-operand"),
  currentOperandTextContent: document.querySelector(".current-operand"),
});

calculatorNumbers.forEach((number) => {
  number.addEventListener("click", (e) => {
    calculator.handleAppendNumber(e.target.textContent);
    calculator.handleUpdateDisplay();
  });
});
calculatorOperators.forEach((operator) => {
  operator.addEventListener("click", (e) => {
    calculator.handleMantainOperation(e.target.textContent);
    calculator.handleUpdateDisplay();
  });
});

calculatorDeleteLastNumber.addEventListener("click", () => {
  calculator.handleDeleteNumber();
});

calculatorEqualSign.addEventListener("click", () => {
  const isEqualClicked = true;
  calculator.handleComputeScore(isEqualClicked);
  calculator.handleUpdateDisplay();
});

calculatorClearData.addEventListener("click", () => {
  calculator.handleClearCalculator();
  calculator.handleUpdateDisplay();
});
