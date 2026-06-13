// Calculates the tax for a given price and tax rate.

function calculateTax(price, taxRate) {
  // Ensure taxRate is a number
  if (typeof taxRate !== 'number') {
    throw new Error('Tax rate must be a number');
  }

  // Convert taxRate to a decimal
  const taxDecimal = taxRate / 100;

  // Calculate tax
  const tax = price * taxDecimal;

  return tax;
}

// ... rest of the content remains the same
