function UserSearch({ searchTerm, onSearchChange }) {
  return (
    <div className="search-wrapper">
      <input
        type="text"
        className="search-input"
        placeholder="Filter users by name or email..."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
      />
    </div>
  );
}

export default UserSearch;