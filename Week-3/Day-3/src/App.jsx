import { useState, useEffect } from "react";
import SearchBar from "./components/SearchBar";
import FilterTabs from "./components/FilterTabs";
import ProductList from "./components/ProductList";

function App() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = ["All", "Electronics", "Books", "Clothing"];

  // 1. useEffect Side Effect: Simulating an API data fetch on component mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setItems([
        { id: 101, name: "Wireless Headphones", category: "Electronics", price: 99, inStock: true },
        { id: 102, name: "React Programming Guide", category: "Books", price: 35, inStock: true },
        { id: 103, name: "Cotton T-Shirt", category: "Clothing", price: 20, inStock: false },
        { id: 104, name: "Mechanical Keyboard", category: "Electronics", price: 120, inStock: true },
        { id: 105, name: "JavaScript Handbook", category: "Books", price: 28, inStock: false },
      ]);
      setLoading(false);
    }, 1000); 

    return () => clearTimeout(timer); 
  }, []); 

  // 2. Dynamic Filtering Logic
  const filteredProducts = items.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All" || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="container">
      <h1>Day 3: Searchable & Filterable Catalog</h1>

      <div className="controls">
        <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
        <FilterTabs
          categories={categories}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />
      </div>

      {/* Conditional Rendering: Loading State vs Content */}
      {loading ? (
        <p className="status-msg">⏳ Loading inventory database...</p>
      ) : (
        <ProductList products={filteredProducts} />
      )}
    </div>
  );
}

export default App;