export interface MetricCardProps {
  title: string;
  value: string;
  change: string;
  isPositive: boolean;
  icon: React.ReactNode;
}

export interface Course {
  id: number;
  title: string;
  category: string;
  students: number;
  rating: number;
  status: "Active" | "Draft" | "Archived";
}