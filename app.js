function appendToDisplay(value) {
    const display = document.calc.display.value;
    const lastChar = display.slice(-1);
    const operators = ['+', '-', '*', '/'];

    // Prevent adding multiple consecutive operators
    if (operators.includes(lastChar) && operators.includes(value)) {
        return;
    }

    // Prevent multiple decimals in a number
    if (value === '.' && display.split(/[\+\-\*\/]/).pop().includes('.')) {
        return;
    }

    document.calc.display.value += value;
}

function clearDisplay() {
    document.calc.display.value = '';
}

function deleteLastChar() {
    document.calc.display.value = document.calc.display.value.slice(0, -1);
}

function calculateResult() {
    try {
        const expression = document.calc.display.value;
        // Replace invalid characters
        const sanitizedExpression = expression.replace(/[^-()\d/*+.]/g, '');
        // Safe evaluation using Function constructor
        const result = new Function('return ' + sanitizedExpression)();
        document.calc.display.value = result;
    } catch (e) {
        document.calc.display.value = 'Error';
    }
}
