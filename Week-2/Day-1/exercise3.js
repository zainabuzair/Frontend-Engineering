const student = {
  name: "Alex",
  age: 20,
  grades: [85, 92, 78, 90, 88],
  
  // Method to calculate average
  calculateAverage: function() {
    let total = 0;
    
    // Loop through grades array
    for (let i = 0; i < this.grades.length; i++) {
      total += this.grades[i];
    }
    
    const average = total / this.grades.length;
    return average;
  },
  
  // Method to print student status
  getSummary: function() {
    const avg = this.calculateAverage();
    return `${this.name} (Age: ${this.age}) has an average grade of ${avg.toFixed(1)}.`;
  }
};

// Test output
console.log(student.getSummary());