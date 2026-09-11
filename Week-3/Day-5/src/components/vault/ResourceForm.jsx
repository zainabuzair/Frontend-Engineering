import { useState } from "react";

function ResourceForm({ onAddResource }) {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    category: "React Hooks",
    snippet: "",
    readTime: "3 min read",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.snippet.trim()) {
      alert("Please enter both a title and details.");
      return;
    }

    onAddResource({
      id: Date.now(),
      ...formData,
      isStarred: false,
    });

    setFormData({
      title: "",
      category: "React Hooks",
      snippet: "",
      readTime: "3 min read",
    });
    setIsOpen(false);
  };

  return (
    <div className="form-container">
      <button className="btn-primary" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? "✕ Close Editor" : "＋ New Snippet"}
      </button>

      {isOpen && (
        <div className="modal-overlay">
          <form className="resource-form" onSubmit={handleSubmit}>
            <div className="form-header">
              <h3>Create Resource Entry</h3>
              <button type="button" className="close-x" onClick={() => setIsOpen(false)}>
                ✕
              </button>
            </div>

            <label className="form-label">Title</label>
            <input
              type="text"
              placeholder="e.g. Custom Hook State Pattern"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="input-field"
            />

            <label className="form-label">Category</label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="input-field"
            >
              <option value="React Hooks">React Hooks</option>
              <option value="Architecture">Architecture</option>
              <option value="State Management">State Management</option>
            </select>

            <label className="form-label">Snippet Content</label>
            <textarea
              placeholder="Paste code or detailed reference notes..."
              value={formData.snippet}
              onChange={(e) => setFormData({ ...formData, snippet: e.target.value })}
              className="input-field textarea"
            />

            <button type="submit" className="btn-submit">
              Save Resource
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default ResourceForm;