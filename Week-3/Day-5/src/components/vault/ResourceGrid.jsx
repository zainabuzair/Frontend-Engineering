import ResourceCard from "./ResourceCard";

function ResourceGrid({ items, onToggleStar, onDelete }) {
  return (
    <div className="resource-grid">
      {items.map((item) => (
        <ResourceCard
          key={item.id}
          item={item}
          onToggleStar={onToggleStar}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}

export default ResourceGrid;