export interface MetricCardProps {
  id: string;
  title: string;
  value: string;
  change: string;
  isPositive: boolean;
  ariaLabel: string;
}

export interface ActivityItem {
  id: string;
  user: string;
  action: string;
  timestamp: string;
  status: 'Completed' | 'Pending' | 'Failed';
}

export interface DashboardData {
  metrics: MetricCardProps[];
  activities: ActivityItem[];
}

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  ariaLabel: string;
  children: React.ReactNode;
}

export interface CardProps {
  title: string;
  children: React.ReactNode;
  className?: string;
  headerAction?: React.ReactNode;
}