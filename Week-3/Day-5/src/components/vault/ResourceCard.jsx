import StatusBadge from "../common/StatusBadge";

function ResourceCard({ item, onToggleStar, onDelete }) {
  return (
    <div className={`resource-card ${item.isStarred ? "starred" : ""}`}>
      <div className="card-top">
        <StatusBadge label={item.category} />
        <button
          className="star-btn"
          onClick={() => onToggleStar(item.id)}
          title="Bookmark Snippet"
        >
          {item.isStarred ? "★" : "☆"}
        </button>
      </div>

      <h3 className="card-title">{item.title}</h3>
      <p className="snippet-text">{item.snippet}</p>

      <div className="card-footer">
        <span className="read-time">⏱ {item.readTime}</span>
        <button className="delete-btn" onClick={() => onDelete(item.id)}>
          Remove
        </button>
      </div>
    </div>
  );
}

export default ResourceCard;