function AlertBanner({ type = "info", message, onClose }) {
  if (!message) return null;

  return (
    <div className={`alert-banner ${type}`}>
      <span className="alert-message">
        {type === "error" && "⚠️ "}
        {type === "success" && "✓ "}
        {type === "info" && "ℹ️ "}
        {message}
      </span>
      {onClose && (
        <button className="alert-close" onClick={onClose}>
          ✕
        </button>
      )}
    </div>
  );
}

export default AlertBanner;