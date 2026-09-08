import { useState } from "react";

function InteractiveForm({ onAddProduct }) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !price) return;

    onAddProduct({
      id: Date.now(),
      name,
      price,
      description,
    });

    setName("");
    setPrice("");
    setDescription("");
  };

  return (
    <div className="section">
      <h2>2. Controlled Form (Parent-Child Communication)</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Product Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="number"
          placeholder="Product Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <input
          type="text"
          placeholder="Product Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button type="submit">Add Card</button>
      </form>
    </div>
  );
}

export default InteractiveForm;