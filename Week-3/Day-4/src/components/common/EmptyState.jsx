function EmptyState({ title = "No Results Found", message = "Try adjusting your search criteria." }) {
  return (
    <div className="state-container empty-box">
      <h3>🔍 {title}</h3>
      <p>{message}</p>
    </div>
  );
}

export default EmptyState;