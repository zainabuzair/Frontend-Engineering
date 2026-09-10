import UserCard from "./UserCard";
import EmptyState from "../common/EmptyState";

function UserList({ users }) {
  if (users.length === 0) {
    return <EmptyState message="No matching users match your search parameters." />;
  }

  return (
    <div className="user-grid">
      {users.map((user) => (
        <UserCard key={user.id} user={user} />
      ))}
    </div>
  );
}

export default UserList;