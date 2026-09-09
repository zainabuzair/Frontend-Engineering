function SearchBar({ searchTerm, onSearchChange }) {
  return (
    <input
      type="text"
      className="search-input"
      placeholder="🔍 Search items by name..."
      value={searchTerm}
      onChange={(e) => onSearchChange(e.target.value)}
    />
  );
}

export default SearchBar;