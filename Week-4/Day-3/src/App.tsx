import { useState } from "react";
import { Navbar } from "./components/Navbar";
import { MetricCard } from "./components/MetricCard";
import { CourseGrid } from "./components/CourseGrid";
import { Course } from "./types/dashboard";
import { BookOpen, Users, DollarSign, TrendingUp } from "lucide-react";

const initialCourses: Course[] = [
  {
    id: 1,
    title: "TypeScript & Modern UI Architecture",
    category: "Frontend",
    students: 1240,
    rating: 4.9,
    status: "Active",
  },
  {
    id: 2,
    title: "Tailwind CSS Utility-First Mastery",
    category: "Design System",
    students: 890,
    rating: 4.8,
    status: "Active",
  },
  {
    id: 3,
    title: "React Server Components & Next.js",
    category: "Fullstack",
    students: 450,
    rating: 4.7,
    status: "Draft",
  },
];

export function App() {
  const [darkMode, setDarkMode] = useState<boolean>(false);

  return (
    <div className={darkMode ? "dark" : ""}>
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 font-sans antialiased">
        <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
          {/* Header Section */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-extrabold tracking-tight">
                Day 3: Tailwind CSS Dashboard
              </h1>
              <p className="mt-1 text-slate-500 dark:text-slate-400 text-sm">
                Utility-first styling, flexbox/grid layouts, responsive breakpoints, and dark mode.
              </p>
            </div>
            <button className="self-start md:self-auto px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium text-sm rounded-lg shadow-md shadow-indigo-500/20 active:scale-95 transition-all">
              + Add New Course
            </button>
          </div>

          {/* Metrics Section (Grid Utilities) */}
          <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <MetricCard
              title="Total Active Courses"
              value="12"
              change="+14%"
              isPositive={true}
              icon={<BookOpen className="w-5 h-5" />}
            />
            <MetricCard
              title="Total Enrolled Students"
              value="2,580"
              change="+22%"
              isPositive={true}
              icon={<Users className="w-5 h-5" />}
            />
            <MetricCard
              title="Monthly Revenue"
              value="$14,230"
              change="-3%"
              isPositive={false}
              icon={<DollarSign className="w-5 h-5" />}
            />
            <MetricCard
              title="Completion Rate"
              value="88.4%"
              change="+5%"
              isPositive={true}
              icon={<TrendingUp className="w-5 h-5" />}
            />
          </section>

          {/* Courses Grid Section */}
          <section>
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4">
              <h2 className="text-xl font-bold tracking-tight">
                Featured Courses
              </h2>
              <a
                href="#"
                className="text-sm font-semibold text-indigo-600 dark:text-indigo-400 hover:underline"
              >
                View all
              </a>
            </div>
            <CourseGrid courses={initialCourses} />
          </section>
        </main>
      </div>
    </div>
  );
}

export default App;