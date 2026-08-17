import * as React from "react";

export interface StatusIndicatorProps {
  status: "OPEN" | "IN_PROGRESS" | "COMPLETED" | "CANCELLED" | "PENDING" | "PASSED" | "FAILED" | "ACTIVE";
  label?: string;
}

export const StatusIndicator: React.FC<StatusIndicatorProps> = ({
  status,
  label,
}) => {
  const statusConfig: Record<string, { color: string; text: string }> = {
    OPEN: { color: "bg-emerald-500", text: "Open" },
    IN_PROGRESS: { color: "bg-amber-500 animate-pulse", text: "In Progress" },
    COMPLETED: { color: "bg-indigo-500", text: "Completed" },
    CANCELLED: { color: "bg-slate-400", text: "Cancelled" },
    PENDING: { color: "bg-amber-400", text: "Pending" },
    PASSED: { color: "bg-emerald-500", text: "Passed" },
    FAILED: { color: "bg-rose-500", text: "Failed" },
    ACTIVE: { color: "bg-emerald-500", text: "Active" },
  };

  const config = statusConfig[status] || { color: "bg-slate-400", text: status };

  return (
    <div className="inline-flex items-center gap-2 text-xs font-medium text-slate-700">
      <span className={`h-2 w-2 rounded-full ${config.color}`} />
      <span>{label || config.text}</span>
    </div>
  );
};
