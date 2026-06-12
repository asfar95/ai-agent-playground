// Math utility functions

function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

// BUG: Math.abs strips the sign from the result
function divide(a, b) {
  if (b === 0) throw new Error('Cannot divide by zero');
  return Math.abs(a / b);
}

function percentage(value, total) {
  if (total === 0) throw new Error('Total cannot be zero');
  return (value / total) * 100;
}

module.exports = { add, subtract, multiply, divide, percentage };
