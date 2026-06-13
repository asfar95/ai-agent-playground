// BUG: taxRate is treated as a whole number instead of a percentage
// calculateTax(100, 20) returns 2000 instead of 20
function calculateTax(price, taxRate) {
  return price * (taxRate / 100);
}

// ... rest of the content remains the same
