import { useState } from "react";
import { useResourceApi } from "./hooks/useResourceApi";
import FilterSidebar from "./components/sidebar/FilterSidebar";
import ResourceGrid from "./components/vault/ResourceGrid";
import ResourceForm from "./components/vault/ResourceForm";
import LoadingSkeleton from "./components/common/LoadingSkeleton";
import AlertBanner from "./components/common/AlertBanner";

const API_ENDPOINT = "https://jsonplaceholder.typicode.com/posts";
const CATEGORIES = ["All", "React Hooks", "Architecture", "State Management"];

function App() {
  const { data: resources, isPending, errorNotice, setData } = useResourceApi(API_ENDPOINT);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const handleAddResource = (newResource) => {
    setData([newResource, ...resources]);
  };

  const handleToggleStar = (id) => {
    setData(
      resources.map((item) =>
        item.id === id ? { ...item, isStarred: !item.isStarred } : item
      )
    );
  };

  const handleDelete = (id) => {
    setData(resources.filter((item) => item.id !== id));
  };

  const filteredResources = resources.filter((item) => {
    const matchesCategory = selectedCategory === "All" || item.category === selectedCategory;
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.snippet.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  return (
    <div className="app-layout">
      <FilterSidebar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedCategory={selectedCategory}
        onCategorySelect={setSelectedCategory}
        categories={CATEGORIES}
      />

      <main className="main-viewport">
        <header className="viewport-header">
          <div>
            <h1 className="page-title">Engineering Knowledge Base</h1>
            <p className="page-subtitle">
              Showing {filteredResources.length} saved developer references
            </p>
          </div>
          <ResourceForm onAddResource={handleAddResource} />
        </header>

        {errorNotice && (
          <AlertBanner type="error" message={`Network error: ${errorNotice}`} />
        )}

        {isPending && <LoadingSkeleton />}

        {!isPending && !errorNotice && filteredResources.length === 0 && (
          <AlertBanner type="info" message="No matching snippets found for your search." />
        )}

        {!isPending && !errorNotice && (
          <ResourceGrid
            items={filteredResources}
            onToggleStar={handleToggleStar}
            onDelete={handleDelete}
          />
        )}
      </main>
    </div>
  );
}

export default App;