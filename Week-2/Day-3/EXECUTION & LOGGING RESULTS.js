console.log("--- Destructuring & Default Params ---");
console.log("Created User:", newUser);
console.log("Lead Name & Score:", leadName, leadScore);

console.log("\n--- Optional Chaining & Nullish Coalescing ---");
console.log(processUserContacts(rawUsers));

console.log("\n--- Array Methods ---");
console.log("User Summaries (map):", userSummaries);
console.log("Top Developers (filter):", topDevelopers);
console.log("Found Architect (find):", architect?.name);
console.log("Has Incomplete Users? (some):", hasIncompleteUsers);
console.log("All Are Skilled? (every):", allAreSkilled);
console.log("Average Score (reduce):", averageScore);
console.log("Users Grouped By Role (reduce):", usersByRole);

console.log("\n--- Object Methods ---");
console.log("Transformed Config (Object.entries & Object.fromEntries):", transformedConfig);