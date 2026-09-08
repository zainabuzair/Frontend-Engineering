import { useState } from "react";

function ProductCard({ name, price, description }) {
  const [liked, setLiked] = useState(false);

  return (
    <div className="card">
      <h3>{name}</h3>
      <p>Price: ${price}</p>
      <p>{description}</p>
      
      {/* Local state update within a reusable card */}
      <button onClick={() => setLiked(!liked)}>
        {liked ? "❤️ Liked" : "🤍 Like"}
      </button>
    </div>
  );
}

export default ProductCard;