function checkValue(input) {
  // Determine data type
  const dataType = typeof input;
  
  // Convert value to boolean to check truthiness
  const isTruthy = Boolean(input);
  
  // Log formatted output using template literals
  console.log(`Value: ${input} | Type: ${dataType} | Truthy: ${isTruthy}`);
}

// Test cases
checkValue("Hello World"); // Truthy string
checkValue(0);             // Falsy number
checkValue(null);          // Falsy object
checkValue([1, 2, 3]);     // Truthy object (array)