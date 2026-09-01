// Logical operators and branching
const score = 85;
const isMember = true;

if (score >= 90 || isMember) {
  console.log("Eligible for Premium Tier");
} else if (score >= 70 && !isMember) {
  console.log("Eligible for Standard Tier");
} else {
  console.log("Not Eligible");
}

// Switch statement
const role = "admin";
switch (role) {
  case "admin":
    console.log("Full access");
    break;
  case "editor":
    console.log("Edit access");
    break;
  default:
    console.log("Read-only access");
}