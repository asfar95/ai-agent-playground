function calculateTax(price, taxRate) {
  return price - (price * taxRate / 100);
}

module.exports = { calculateDiscount, getUserData, processItems, calculateTax };
