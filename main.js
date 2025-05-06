// DOM Elements
const displayBar = document.querySelector("#display");
const btnBar = document.querySelector("#btnBar");
const calculatorButtonsContainer = document.querySelector('.calculator-buttons');

// Buttons
const clearButton = calculatorButtonsContainer.querySelector('.clear');
const backspaceButton = calculatorButtonsContainer.querySelector('.backspace');
const percentButton = calculatorButtonsContainer.querySelector('.percent');
const equalButton = calculatorButtonsContainer.querySelector('.equal');
const decimalButton = calculatorButtonsContainer.querySelector('.decimal');

const numberButtons = calculatorButtonsContainer.querySelectorAll('.number');
const operators = document.querySelectorAll(".operator");

// Initial Values
let currentState = {
    currentValue: "0",
    newCurrent: "",
    operator: null, 
    result: null,
    display: "0",
};
let {currentValue, newCurrent, operator, result, display} = currentState

const updateState = () => {
    currentState = {
        currentValue,
        newCurrent,
        operator,
        result,
        display
    }
}

displayBar.value = currentValue;

const updateDisplay = (current) => {
    currentState.display = current
    display = current;
    displayBar.value = current
    updateState()
}

const eventNumberCreator = (item) => {
    numberButtons[item].addEventListener('click', () => {
        const number = numberButtons[item].textContent; 
        if (operator === null) {
            currentValue = (currentValue === "0" ? "" : currentValue) + number;
            updateDisplay(currentValue)
        } else if(result) {
            currentValue = String(result)
            currentValue =  (currentValue === "0" ? "" : currentValue) + number;
            newCurrent = ""
            operator = null
            result = null
            updateDisplay(currentValue)
        }
          else {
          newCurrent = (newCurrent === "0" ? "" : newCurrent) + number
              updateDisplay(newCurrent)
        }
      });
    };

const eventOperatorsCreator = (item) => {
    operators[item].addEventListener("click", () => {
        if(currentValue && newCurrent){
            
            resultFunction(currentValue, operator, newCurrent)
            currentValue = Number(result)
            newCurrent = ""
            updateState()
            result = ""
            updateState()
            updateDisplay(currentValue)
            console.log(result)
        }
        else if(result) {
            currentValue = String(result)
            result = null
            newCurrent = ""
            updateDisplay(currentValue)
        }
        currentState.operator = operators[item].textContent;
        operator = operators[item].textContent;
        updateDisplay(operator)
        updateState()
       
    });

};

const matchFunction = (current, operator, newCurrent) => {
    current = Number(current);
    newCurrent = Number(newCurrent);
    let result;
    
    switch (operator) {
        case "+":
            result = current + newCurrent;
            break;
        case "-":
            result = current - newCurrent;
            break;
        case "*":
            result = current * newCurrent;
            break;
        case "/":
            result = current / newCurrent;
            break;
        case "%":
            result = current % newCurrent;
            break;
        default:
            console.warn("Unknown operator:", operator);  // Added for debugging
            return "hello world";
    }
    return result;
};

const resultFunction = (current, operator, newCurrent) => {
    const mathResult = matchFunction(current, operator, newCurrent);
    result = mathResult;
    updateState()
};

// Event Listeners
equalButton.addEventListener("click", () => {
    resultFunction(currentState.currentValue, currentState.operator, currentState.newCurrent); 
    updateDisplay(currentState.result)
    
});

clearButton.addEventListener("click", () => {
    currentValue = "0";
    newCurrent = "";
    operator = null;
    result = null;
    updateDisplay("0");
})

backspaceButton.addEventListener("click", () => {
    if (operator === null) {
        currentValue = currentValue.slice(0, -1);
        if (currentValue === "") {
            currentValue = "0";
        }
         updateDisplay(currentValue)
    } else {
        newCurrent = newCurrent.slice(0, -1);
        if (newCurrent === "") {
            newCurrent = "0";
        }
         updateDisplay(newCurrent)
    }
});

decimalButton.addEventListener("click", () => {
    if (operator === null) {
        if (!currentValue.includes(".")) {
            currentValue += ".";
             updateDisplay(currentValue)
        }
    } else {
        if (!newCurrent.includes(".")) {
            newCurrent += ".";
             updateDisplay(newCurrent)
        }
    }
});

percentButton.addEventListener("click", () => {
    if (operator === null) {
        currentValue = String(Number(currentValue) / 100);
        updateDisplay(currentValue)
    } else {
        newCurrent = String(Number(newCurrent) / 100);
        updateDisplay(newCurrent)
    }
});
//Number
for (let i = 0; i < numberButtons.length; i++) {
    eventNumberCreator(i);
  }

for (let i = 0; i < operators.length; i++) {
    eventOperatorsCreator(i);
  }