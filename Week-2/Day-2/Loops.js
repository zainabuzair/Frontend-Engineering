// 1. Standard for loop
for (let i = 1; i <= 3; i++) {
  console.log(`Count: ${i}`);
}

// 2. While loop
let countdown = 3;
while (countdown > 0) {
  console.log(`T-minus ${countdown}`);
  countdown--;
}

// 3. For...of loop
const colors = ["Red", "Green", "Blue"];
for (const color of colors) {
  console.log(color);
}