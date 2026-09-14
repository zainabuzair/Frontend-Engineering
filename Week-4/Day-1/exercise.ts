// ==========================================
// 1. PRIMITIVE TYPES & TYPE ALIASES
// ==========================================
type ID = string | number; // Union Type
type Category = "Electronics" | "Peripherals" | "Accessories" | "General"; // String Literal Union Type

// ==========================================
// 2. INTERFACES & OPTIONAL PROPERTIES
// ==========================================
interface Product {
  id: ID;
  name: string;
  price: number;
  categories: Category[]; // Array Type
  discount?: number;      // Optional Property (?)
}

interface Store {
  storeName: string;
  isOnline: boolean;
  products: Product[];
  addProduct: (product: Product) => void; // Function Type Signature
  calculateTotal: (product: Product, taxRate: number) => number;
  getProductSummary: (product: Product) => string;
}

// ==========================================
// 3. TYPED FUNCTIONS & TYPE INFERENCE
// ==========================================
function createProductCatalog(storeName: string, isOnline: boolean): Store {
  // Array type annotation
  const products: Product[] = [];

  // Function with explicitly typed parameters
  function addProduct(product: Product): void {
    products.push(product);
  }

  // Function returning a number (inferred return types work, but explicit is better)
  function calculateTotal(product: Product, taxRate: number): number {
    // Type Inference: TypeScript infers 'finalPrice' as number
    let finalPrice = product.price;
    
    if (product.discount !== undefined) {
      finalPrice -= product.discount;
    }
    
    return finalPrice + finalPrice * taxRate;
  }

  function getProductSummary(product: Product): string {
    return `${product.name} (ID: ${product.id}) costs $${product.price} [Categories: ${product.categories.join(", ")}]`;
  }

  return {
    storeName,
    isOnline,
    products,
    addProduct,
    calculateTotal,
    getProductSummary
  };
}

// ==========================================
// 4. EXECUTION & TYPE CHECKING
// ==========================================
const store = createProductCatalog("Tech Hub", true);

// Valid Product insertion (with optional discount)
const keyboard: Product = {
  id: "p101",
  name: "Mechanical Keyboard",
  price: 120,
  categories: ["Electronics", "Peripherals"],
  discount: 15
};

// Valid Product insertion (without optional discount)
const mouse: Product = {
  id: 102,
  name: "Wireless Mouse",
  price: 80,
  categories: ["Electronics"]
};

store.addProduct(keyboard);
store.addProduct(mouse);

// Output results to console
console.log(store.getProductSummary(store.products[0]));
console.log(`Total price with tax: $${store.calculateTotal(keyboard, 0.05)}`);