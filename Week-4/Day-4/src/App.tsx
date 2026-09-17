import { useState } from "react";
import { Button } from "./components/ui/Button";
import { Input } from "./components/ui/Input";
import { Modal } from "./components/ui/Modal";
import { Badge, Alert, Tabs, Skeleton } from "./components/ui/Feedback";
import { Plus, SlidersHorizontal, Layers, Check } from "lucide-react";

export function App() {
  const [activeTab, setActiveTab] = useState("All Projects");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [projectName, setProjectName] = useState("");
  const [error, setError] = useState("");

  const handleCreate = () => {
    if (!projectName.trim()) {
      setError("Project name is required.");
      return;
    }
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsModalOpen(false);
      setProjectName("");
      setError("");
    }, 1000);
  };

  return (
    <div className="min-h-screen p-4 sm:p-8 max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-6">
        <div>
          <div className="flex items-center gap-2">
            <Layers className="w-6 h-6 text-indigo-600" />
            <h1 className="text-2xl font-bold">UI Component System</h1>
          </div>
          <p className="text-xs text-slate-500 mt-1">Day 4 – Professional UI Component Library & Design Tokens</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm">
            <SlidersHorizontal className="w-4 h-4" /> Filters
          </Button>
          <Button onClick={() => setIsModalOpen(true)}>
            <Plus className="w-4 h-4" /> New Component
          </Button>
        </div>
      </header>

      {/* Alert Component Showcase */}
      <Alert type="info" title="Accessibility Audit Passed" message="All components follow WAI-ARIA 1.2 patterns with full keyboard navigation." />

      {/* Tabs */}
      <Tabs tabs={["All Projects", "Components", "Design System"]} activeTab={activeTab} onChange={setActiveTab} />

      {/* Main Grid: Card System */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Card 1: Buttons & Badges */}
        <div className="p-6 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="font-bold text-sm">Button Variants</h3>
            <Badge variant="success">Active</Badge>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button size="sm">Primary</Button>
            <Button variant="secondary" size="sm">Secondary</Button>
            <Button variant="outline" size="sm">Outline</Button>
            <Button variant="danger" size="sm">Danger</Button>
          </div>
        </div>

        {/* Card 2: Form Controls */}
        <div className="p-6 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="font-bold text-sm">Form Controls</h3>
            <Badge variant="info">Input</Badge>
          </div>
          <Input label="Component Label" placeholder="e.g. Header Navigation" helperText="Used across all views" />
        </div>

        {/* Card 3: Loading States */}
        <div className="p-6 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="font-bold text-sm">Skeleton Loaders</h3>
            <Badge variant="warning">Loading</Badge>
          </div>
          <div className="space-y-2">
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-1/2" />
          </div>
        </div>
      </div>

      {/* Accessible Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Create New UI Primitive">
        <div className="space-y-4">
          <Input
            label="Primitive Name"
            placeholder="e.g. Dropdown Menu"
            value={projectName}
            onChange={(e) => {
              setProjectName(e.target.value);
              if (error) setError("");
            }}
            error={error}
          />
          <div className="flex justify-end gap-3 pt-4">
            <Button variant="outline" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button isLoading={isLoading} onClick={handleCreate}>
              <Check className="w-4 h-4" /> Save Primitive
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default App;