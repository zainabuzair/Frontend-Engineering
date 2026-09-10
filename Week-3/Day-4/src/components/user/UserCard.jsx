function UserCard({ user }) {
  return (
    <div className="user-card">
      <div className="avatar">{user.name.charAt(0)}</div>
      <div className="user-info">
        <h3>{user.name}</h3>
        <p>📧 {user.email}</p>
        <p>🏢 {user.company?.name || "Independent Contractor"}</p>
        <span className="city-tag">📍 {user.address?.city || "Remote"}</span>
      </div>
    </div>
  );
}

export default UserCard;