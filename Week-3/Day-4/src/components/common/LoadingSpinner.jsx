function LoadingSpinner({ message = "Fetching user records..." }) {
  return (
    <div className="state-container">
      <div className="spinner"></div>
      <p className="state-text">{message}</p>
    </div>
  );
}

export default LoadingSpinner;