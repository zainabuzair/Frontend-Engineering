import { useState } from "react";
import { useFetchUsers } from "./hooks/useFetchUsers";
import { filterUsers } from "./utils/filterUtils";
import UserSearch from "./components/user/UserSearch";
import UserList from "./components/user/UserList";
import LoadingSpinner from "./components/common/LoadingSpinner";
import ErrorMessage from "./components/common/ErrorMessage";

const API_URL = "https://jsonplaceholder.typicode.com/users";

function App() {
  // State lifted up to parent orchestrator
  const [searchTerm, setSearchTerm] = useState("");

  // Using Custom Hook for encapsulation
  const { data: users, loading, error } = useFetchUsers(API_URL);

  // Utility computation
  const filteredUsers = filterUsers(users, searchTerm);

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Day 4: Refactored User Directory</h1>
        <p>Clean Architecture, Custom Hooks & Explicit UI States</p>
      </header>

      {/* Controlled Search Component */}
      <UserSearch searchTerm={searchTerm} onSearchChange={setSearchTerm} />

      {/* Explicit UI State Handlers */}
      {loading && <LoadingSpinner message="Connecting to API directory..." />}

      {error && (
        <ErrorMessage
          message={error}
          onRetry={() => window.location.reload()}
        />
      )}

      {!loading && !error && <UserList users={filteredUsers} />}
    </div>
  );
}

export default App;