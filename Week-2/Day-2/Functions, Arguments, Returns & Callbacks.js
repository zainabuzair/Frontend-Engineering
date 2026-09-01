// Regular Function 
function calculateTotal(price, taxRate = 0.05) {
  return price + (price * taxRate); 
}

// Arrow Function
const double = (num) => num * 2;

// Callback Function 
function processNumbers(numbers, callback) {
  const result = [];
  for (const num of numbers) {
    result.push(callback(num)); 
  }
  return result;
}

// Using callback functions
const nums = [1, 2, 3, 4];
const doubledNums = processNumbers(nums, (n) => n * 2); 
