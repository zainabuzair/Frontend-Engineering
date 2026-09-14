# Day 1: TypeScript Fundamentals & JS Conversion

## 📌 Topic Overview
This project covers the fundamentals of **TypeScript** and demonstrates how to migrate untyped legacy JavaScript code into a fully type-safe TypeScript module. It explores core concepts including static typing, primitive types, union types, type aliases, interfaces, optional properties, and type inference.

---

## 🚀 Setup & Execution Instructions

### Prerequisites
- **Node.js**: v18+ (tested on Node v24)
- **Package Manager**: `npm`

### Setup Steps
1. Navigate into the `Day-1` project directory:
   ```bash
   cd ~/Desktop/Week-4/Day-1
   ```
2. Initialize Node project and install dependencies:
   ```bash
   npm init -y
   npm install -D typescript tsx
   ```
3. Initialize TypeScript configuration (`tsconfig.json`):
   ```bash
   npx tsc --init
   ```

### Running the Code
To execute the TypeScript file directly using `tsx`:
```bash
npx tsx exercise.ts
```

To run in watch mode (auto re-runs on save):
```bash
npx tsx --watch exercise.ts
```

To compile TypeScript to standard JavaScript manually:
```bash
npx tsc
node exercise.js
```

---

## 📚 Core TypeScript Concepts Covered

| Concept | Description & Example |
| :--- | :--- |
| **Type Annotations** | Specifying explicit types for variables, function parameters, and return values (`name: string`, `price: number`). |
| **Primitive Types** | Basic primitives: `string`, `number`, `boolean`, `null`, `undefined`. |
| **Arrays** | Array type signatures such as `Product[]` or `Array<Product>`. |
| **Union Types** | Combining multiple potential types using `|` (e.g., `type ID = string | number`). |
| **Type Aliases** | Creating reusable custom type definitions using the `type` keyword. |
| **Interfaces** | Structuring object blueprints and contracts using the `interface` keyword. |
| **Optional Properties** | Properties marked with `?` (e.g., `discount?: number`) indicating they are optional. |
| **Type Inference** | Automatic identification of types by the TypeScript compiler based on value assignments. |

---

## 🛠️ Code Comparison: JavaScript vs. TypeScript

### 1. Plain JavaScript (`exercise.js`)
*Untyped function parameters allow invalid types (e.g., passing `"80"` as string or `null` as discount) without warning at compile time.*

```javascript
function createProductCatalog(storeName, isOnline) {
  const products = [];

  function addProduct(id, name, price, categories, discount) {
    const product = { id, name, price, categories, discount };
    products.push(product);
  }

  function calculateTotal(product, taxRate) {
    let finalPrice = product.price;
    if (product.discount) {
      finalPrice -= product.discount;
    }
    return finalPrice + finalPrice * taxRate;
  }

  function getProductSummary(product) {
    return `${product.name} costs $${product.price} (Categories: ${product.categories.join(', ')})`;
  }

  return { storeName, isOnline, products, addProduct, calculateTotal, getProductSummary };
}

const store = createProductCatalog("Tech Hub", true);
store.addProduct("p101", "Mechanical Keyboard", 120, ["Electronics", "Peripherals"], 15);
console.log(store.getProductSummary(store.products[0]));
```

---

### 2. Converted TypeScript (`exercise.ts`)
*Strictly typed model guaranteeing complete type safety, autocomplete, and early bug detection.*

```typescript
// 1. Primitive Types & Type Aliases
type ID = string | number;
type Category = "Electronics" | "Peripherals" | "Accessories" | "General";

// 2. Interfaces & Optional Properties
interface Product {
  id: ID;
  name: string;
  price: number;
  categories: Category[];
  discount?: number; // Optional property
}

interface Store {
  storeName: string;
  isOnline: boolean;
  products: Product[];
  addProduct: (product: Product) => void;
  calculateTotal: (product: Product, taxRate: number) => number;
  getProductSummary: (product: Product) => string;
}

// 3. Typed Functions & Type Inference
function createProductCatalog(storeName: string, isOnline: boolean): Store {
  const products: Product[] = [];

  function addProduct(product: Product): void {
    products.push(product);
  }

  function calculateTotal(product: Product, taxRate: number): number {
    let finalPrice = product.price; // Inferred as number
    if (product.discount !== undefined) {
      finalPrice -= product.discount;
    }
    return finalPrice + finalPrice * taxRate;
  }

  function getProductSummary(product: Product): string {
    return `${product.name} (ID: ${product.id}) costs $${product.price} [Categories: ${product.categories.join(", ")}]`;
  }

  return { storeName, isOnline, products, addProduct, calculateTotal, getProductSummary };
}

// 4. Execution & Testing
const store = createProductCatalog("Tech Hub", true);

const keyboard: Product = {
  id: "p101",
  name: "Mechanical Keyboard",
  price: 120,
  categories: ["Electronics", "Peripherals"],
  discount: 15
};

const mouse: Product = {
  id: 102,
  name: "Wireless Mouse",
  price: 80,
  categories: ["Electronics"]
};

store.addProduct(keyboard);
store.addProduct(mouse);

console.log(store.getProductSummary(store.products[0]));
console.log(`Total price with tax: $${store.calculateTotal(keyboard, 0.05)}`);
```

---

## 📁 Project Directory Structure

```text
Day-1/
├── node_modules/
├── exercise.js          # Untyped initial JavaScript file
├── exercise.ts          # Fully typed TypeScript solution
├── package.json         # Project dependencies & scripts
├── package-lock.json    # Lockfile for installed dependencies
├── tsconfig.json        # TypeScript compiler configuration
└── README.md            # Task summary & documentation
```
