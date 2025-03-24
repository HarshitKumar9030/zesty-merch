"use client";

import React, { Component, ReactNode, ErrorInfo } from "react";
import { AlertCircle, RefreshCw } from "lucide-react";

interface ErrorBoundaryProps {
  fallback?: ReactNode;
  children: ReactNode;
  onReset?: () => void;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

export default class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState> {
    // Update state so the next render will show the fallback UI
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    // Log the error to an error reporting service
    console.error("Error caught by ErrorBoundary:", error, errorInfo);
    this.setState({ errorInfo });
    
    // You could also send this to a reporting service
    // reportErrorToService(error, errorInfo);
  }

  resetErrorBoundary = (): void => {
    const { onReset } = this.props;
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
    });
    
    if (onReset) {
      onReset();
    }
  }

  render(): ReactNode {
    const { hasError, error } = this.state;
    const { children, fallback } = this.props;

    if (hasError) {
      // You can render any custom fallback UI
      if (fallback) {
        return fallback;
      }

      return (
        <div className="rounded-lg border border-red-200/30 bg-red-900/10 p-6 text-red-200 shadow-sm">
          <div className="flex flex-col items-center text-center sm:flex-row sm:text-left">
            <div className="mb-4 rounded-full bg-red-900/20 p-3 sm:mb-0 sm:mr-6">
              <AlertCircle className="h-8 w-8" />
            </div>
            <div>
              <h3 className="text-lg font-medium mb-2">
                Something went wrong
              </h3>
              <div className="mb-4 text-sm text-red-300/90">
                {error?.message || "An unexpected error occurred. Please try again."}
              </div>
              <button
                onClick={this.resetErrorBoundary}
                className="inline-flex items-center justify-center rounded-md border border-red-300/30 bg-red-900/20 px-4 py-2 text-sm font-medium shadow-sm transition-colors hover:bg-red-800/30 focus:outline-none focus:ring-2 focus:ring-red-700/50 focus:ring-offset-1 focus:ring-offset-red-200/10"
              >
                <RefreshCw className="mr-2 h-4 w-4" />
                Try Again
              </button>
            </div>
          </div>
        </div>
      );
    }

    return children;
  }
}