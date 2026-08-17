import * as React from "react";
import { AlertTriangle, RefreshCw } from "lucide-react";

export interface ErrorStateProps {
  title?: string;
  message: string;
  onRetry?: () => void;
}

export const ErrorState: React.FC<ErrorStateProps> = ({
  title = "Something went wrong",
  message,
  onRetry,
}) => {
  return (
    <div className="flex flex-col items-center justify-center p-6 text-center rounded-xl border border-rose-200 bg-rose-50/50 my-4">
      <div className="p-2.5 bg-rose-100 rounded-full text-rose-600 mb-3">
        <AlertTriangle className="w-6 h-6" />
      </div>
      <h3 className="text-sm font-semibold text-rose-900">{title}</h3>
      <p className="text-xs text-rose-700 mt-1 max-w-sm">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="mt-4 inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-rose-700 bg-rose-100 hover:bg-rose-200 rounded-lg transition-colors cursor-pointer"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          Try Again
        </button>
      )}
    </div>
  );
};
