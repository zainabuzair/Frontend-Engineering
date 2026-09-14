// Plain JavaScript exercise
function createProductCatalog(storeName, isOnline) {
  const products = [];

  function addProduct(id, name, price, categories, discount) {
    const product = {
      id: id,
      name: name,
      price: price,
      categories: categories,
      discount: discount
    };
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

// Example Execution
const store = createProductCatalog("Tech Hub", true);
store.addProduct("p101", "Mechanical Keyboard", 120, ["Electronics", "Peripherals"], 15);
store.addProduct(102, "Wireless Mouse", "80", ["Electronics"], null); // JS allows mixed/wrong types!

console.log(store.getProductSummary(store.products[0]));