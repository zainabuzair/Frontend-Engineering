import { useState } from "react";
import Counter from "./components/Counter";
import ProductCard from "./components/ProductCard";
import InteractiveForm from "./components/InteractiveForm";

function App() {
  const [products, setProducts] = useState([
    { id: 1, name: "React Book", price: "29", description: "Learn React step by step." },
    { id: 2, name: "Vite Course", price: "19", description: "Fast frontend development." }
  ]);

  const handleAddProduct = (newProduct) => {
    setProducts([...products, newProduct]);
  };

  return (
    <div className="container">
      <h1>Day 2: Props, State & Events</h1>

      {/* Counter Component */}
      <Counter />

      {/* Controlled Form Component */}
      <InteractiveForm onAddProduct={handleAddProduct} />

      {/* Reusable Interactive Cards Grid */}
      <div className="section">
        <h2>3. Dynamic Reusable Cards</h2>
        <div className="card-grid">
          {products.map((item) => (
            <ProductCard
              key={item.id}
              name={item.name}
              price={item.price}
              description={item.description}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;