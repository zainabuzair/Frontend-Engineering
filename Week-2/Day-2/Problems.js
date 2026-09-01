// Problem 1: Grade Classifier
function getGrade(score) {
  if (score < 0 || score > 100) return "Invalid Score";

  switch (true) {
    case (score >= 90): return "A";
    case (score >= 80): return "B";
    case (score >= 70): return "C";
    case (score >= 60): return "D";
    default: return "F";
  }
}

// Problem 2: Even/Odd Separator
const filterNumbers = (numbers, type) => {
  const filtered = [];
  
  for (const num of numbers) {
    if (type === "even" && num % 2 === 0) {
      filtered.push(num);
    } else if (type === "odd" && num % 2 !== 0) {
      filtered.push(num);
    }
  }
  
  return filtered;
};

// Problem 3: Custom Transformer using Callbacks
const transformArray = (arr, callback) => {
  const output = [];
  for (const item of arr) {
    output.push(callback(item));
  }
  return output;
};

// Execution Examples
console.log(getGrade(85)); 
console.log(filterNumbers([1, 2, 3, 4, 5, 6], "even")); 

const numbers = [10, 20, 30];
const halved = transformArray(numbers, (val) => val / 2);
console.log(halved); 