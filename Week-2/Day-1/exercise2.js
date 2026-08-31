// Array of item objects
const inventory = [
  { name: "Mouse", price: 25 },
  { name: "Keyboard", price: 75 },
  { name: "Monitor", price: 200 },
  { name: "USB Cable", price: 10 }
];

// Add item to end
inventory.push({ name: "Headphones", price: 45 });

// Remove first item
const removedItem = inventory.shift();
console.log(`Removed item: ${removedItem.name}`);

// Filter items under or equal to $50
const affordableItems = inventory.filter(item => item.price <= 50);

console.log("Affordable Items:", affordableItems);