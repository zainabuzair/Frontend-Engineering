function LoadingSkeleton() {
  return (
    <div className="skeleton-grid">
      {[1, 2, 3].map((num) => (
        <div key={num} className="skeleton-card">
          <div className="skeleton-line title"></div>
          <div className="skeleton-line body"></div>
          <div className="skeleton-line body short"></div>
        </div>
      ))}
    </div>
  );
}

export default LoadingSkeleton;