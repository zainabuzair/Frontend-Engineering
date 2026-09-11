function FilterSidebar({
  searchQuery,
  onSearchChange,
  selectedCategory,
  onCategorySelect,
  categories,
}) {
  return (
    <aside className="sidebar">
      <div className="brand">
        <h2>⚡ DevHub Vault</h2>
        <p className="version-tag">Architecture & Snippets</p>
      </div>

      <div className="search-section">
        <label className="sidebar-label">Search Index</label>
        <input
          type="text"
          placeholder="Filter snippets..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="search-input"
        />
      </div>

      <div className="filter-section">
        <label className="sidebar-label">Categories</label>
        <div className="chip-group">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`chip ${selectedCategory === cat ? "active" : ""}`}
              onClick={() => onCategorySelect(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>
    </aside>
  );
}

export default FilterSidebar;