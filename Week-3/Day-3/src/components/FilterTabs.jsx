function FilterTabs({ categories, selectedCategory, onSelectCategory }) {
  return (
    <div className="filter-tabs">
      {categories.map((cat) => (
        <button
          key={cat}
          className={`tab-btn ${selectedCategory === cat ? "active" : ""}`}
          onClick={() => onSelectCategory(cat)}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}

export default FilterTabs;