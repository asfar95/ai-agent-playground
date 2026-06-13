function calculateDiscount(price, discount) {
  var result = price - (price * discount / 100);
  return result;
}

function getUserData(users, id) {
  for (var i = 0; i < users.length; i++) {
    if (users[i].id == id) {
      return users[i];
    }
  }
}

function processItems(items) {
  var results = [];
  for (var i = 0; i < items.length; i++) {
    var item = items[i];
    var processed = {
      id: item.id,
      name: item.name,
      value: item.value * 2
    };
    results.push(processed);
  }
  return results;
}

function calculateTax(price, taxRate) {
  return price * taxRate;
}

function applyLateFee(amount, daysLate) {
  var dailyRate = 0.05;
  var fee = Math.round(amount * dailyRate * daysLate * 100) / 100;
  return Math.round((amount + fee) * 100) / 100;
}

module.exports = { calculateDiscount, getUserData, processItems, calculateTax, applyLateFee };
