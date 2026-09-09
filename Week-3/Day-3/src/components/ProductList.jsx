function ProductList({ products }) {
  // 1. Conditional Rendering: Empty State using logical rendering
  if (products.length === 0) {
    return <p className="status-msg">⚠️ No items matched your search or filter criteria.</p>;
  }

  return (
    <div className="product-grid">
      {/* 2. Rendering Lists with .map() and unique keys */}
      {products.map((item) => (
        <div key={item.id} className="product-card">
          <h3>{item.name}</h3>
          <p>Category: <strong>{item.category}</strong></p>
          <p>Price: ${item.price}</p>
          
          {/* 3. Conditional Rendering using Ternary Operators */}
          <span className={`badge ${item.inStock ? "in-stock" : "out-of-stock"}`}>
            {item.inStock ? "In Stock" : "Out of Stock"}
          </span>
        </div>
      ))}
    </div>
  );
}

export default ProductList;