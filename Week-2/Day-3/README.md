# Modern JavaScript (ES6+) Features & Array Manipulation Suite

A comprehensive demonstration and code library illustrating essential Modern JavaScript (ES6+) concepts, array/object manipulation methods, destructuring techniques, default parameters, nullish coalescing, and functional data transformation patterns.

---

## 📁 Repository & File Structure

The project is organized into structured modular JavaScript files, each focusing on a core domain of modern ES6+ capabilities:

```text
.
├── MOCK DATASET.js
├── ARRAY METHODS.js
├── DESTRUCTURING, REST, SPREAD & DEFAULT PARAMS.js
├── OBJECT METHODS.js
├── OPTIONAL CHAINING & NULLISH COALESCING.js
└── EXECUTION & LOGGING RESULTS.js
```

---

## 🚀 Overview of Modules & Core Concepts

### 1. `MOCK DATASET.js`
Serves as the central mock data store representing realistic user profiles and metrics.
* **Content:** Array of complex objects (`rawUsers`) containing nested structures, statistical scores, user roles, skills, and optional contact details (`email`, `phone`).

### 2. `ARRAY METHODS.js`
Demonstrates functional collection manipulation and data processing tools:
* **`map()`**: Transforms user profiles into concise summaries containing `name`, `role`, and `primarySkill`.
* **`filter()`**: Queries high-performing developers based on specific operational thresholds (`role === 'developer'` and `score >= 80`).
* **`find()`**: Retrieves the first record matching specific skill requirements (`"Architecture"`).
* **`some()` & `every()`**: Evaluates array-wide logical conditions (e.g., checking for zero completed tasks or verifying skill population).
* **`reduce()`**:
  * Calculates global statistical metrics (average user score).
  * Performs data categorization and grouping (grouping user names by roles).

### 3. `DESTRUCTURING, REST, SPREAD & DEFAULT PARAMS.js`
Illustrates syntactic enhancements introduced in modern JavaScript:
* **Default Parameters & Rest Operator (`...`)**: Factory function `createUser` accepting default values and gathering arbitrary skills into array format.
* **Array Destructuring**: Extracting positional elements (`firstUser`, `secondUser`) while collecting remaining items via rest syntax.
* **Object & Nested Destructuring**: Extracting deeply nested properties and remapping property names (`name: leadName`, `stats: { score: leadScore }`).
* **Spread Operator (`...`)**: Immutably merging datasets and creating deep clones of nested objects while applying updates.

### 4. `OBJECT METHODS.js`
Highlights modern static methods on the `Object` constructor for reflection and transformation:
* **`Object.keys()` & `Object.values()`**: Extracting keys and property values from configuration objects.
* **`Object.entries()` & `Object.fromEntries()`**: Converting objects to key-value tuple arrays, performing transformations (upper-casing configuration keys), and re-assembling them back into runtime objects.
* **`Object.freeze()`**: Enforcing object immutability.

### 5. `OPTIONAL CHAINING & NULLISH COALESCING.js`
Demonstrates safe property traversal and fallbacks for missing or undefined values:
* **Optional Chaining (`?.`)**: Prevents runtime `TypeError` exceptions when reading properties from potentially undefined nested objects (e.g., `user.contact?.email`).
* **Nullish Coalescing (`??`)**: Provides safe default fallbacks specifically when dealing with `null` or `undefined`, preventing accidental overwrites of valid falsy values (like empty strings `""` or `0`).

### 6. `EXECUTION & LOGGING RESULTS.js`
The entry/runner module that integrates all previous modules, invoking functions like `processUserContacts()` and displaying processed output in a structured terminal output format.

---

## 🛠️ How to Run

To execute the project in a Node.js environment, combine the modules into a single entry script or execute via Node:

```bash
# Combine and run using Node.js
node -e "
$(cat 'MOCK DATASET.js')
$(cat 'DESTRUCTURING, REST, SPREAD & DEFAULT PARAMS.js')
$(cat 'OPTIONAL CHAINING & NULLISH COALESCING.js')
$(cat 'ARRAY METHODS.js')
$(cat 'OBJECT METHODS.js')
$(cat 'EXECUTION & LOGGING RESULTS.js')
"
```

---

## 📊 Expected Output Summary

Running the execution file produces formatted console output detailing:
1. **User Creation & Dynamic Extraction:** Resulting user object creation and nested lead information.
2. **Contact Processing:** Safe extraction of email and phone data using nullish fallbacks for missing records.
3. **Array Transformations:** Summarized, filtered, searched, and aggregated analytical data.
4. **Configuration Mapping:** Uppercased dynamic key-value transformations using object entries