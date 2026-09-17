import React from "react";
import { Course } from "../types/dashboard";
import { Users, Star, BookOpen } from "lucide-react";

interface CourseGridProps {
  courses: Course[];
}

export const CourseGrid: React.FC<CourseGridProps> = ({ courses }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
      {courses.map((course) => (
        <div
          key={course.id}
          className="group rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 overflow-hidden shadow-sm hover:shadow-xl hover:border-indigo-500/50 transition-all duration-300 flex flex-col justify-between"
        >
          <div className="p-5">
            <div className="flex items-center justify-between mb-3">
              <span className="px-2.5 py-1 rounded-md text-xs font-semibold bg-indigo-50 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-300">
                {course.category}
              </span>
              <span
                className={`text-xs font-medium px-2 py-0.5 rounded ${
                  course.status === "Active"
                    ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400"
                    : "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400"
                }`}
              >
                {course.status}
              </span>
            </div>

            <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
              {course.title}
            </h3>
          </div>

          <div className="px-5 py-3 border-t border-slate-100 dark:border-slate-700/50 bg-slate-50/50 dark:bg-slate-800/50 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
            <div className="flex items-center space-x-1">
              <Users className="w-3.5 h-3.5 text-slate-400" />
              <span>{course.students} enrolled</span>
            </div>
            <div className="flex items-center space-x-1">
              <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
              <span className="font-semibold text-slate-700 dark:text-slate-200">
                {course.rating}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};