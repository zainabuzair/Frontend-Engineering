function ErrorMessage({ message, onRetry }) {
  return (
    <div className="state-container error-box">
      <h3>⚠️ Connection Error</h3>
      <p>{message}</p>
      {onRetry && (
        <button className="btn-retry" onClick={onRetry}>
          Try Again
        </button>
      )}
    </div>
  );
}

export default ErrorMessage;