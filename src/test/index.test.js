// Added test for tax calculations
describe('tax calculations', function() {
  it('should calculate tax correctly', function() {
    var price = 100;
    var taxRate = 20;
    var taxAmount = calculateTax(price, taxRate);
    expect(taxAmount).to.equal(price * (taxRate / 100));
  });
});

// ... rest of the content remains the same
