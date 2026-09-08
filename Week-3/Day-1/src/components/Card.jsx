function Card({ topic, description, isCompleted }) {
  return (
    <div className="card">
      <h3>{topic}</h3>
      <p>{description}</p>
      <p>
        <strong>Status: </strong>
        {isCompleted ? "✅ Completed" : "⏳ In Progress"}
      </p>
    </div>
  );
}

export default Card;