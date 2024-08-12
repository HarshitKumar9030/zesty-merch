import React from "react";
import { IconX } from "@tabler/icons-react" // You can use an SVG icon if preferred

interface DemoAlertProps {
  alertTitle: React.ReactNode;
  alertBody?: React.ReactNode;
  onClose?: () => void;
  severity?: "success" | "info" | "warning" | "error";
}

const DEMO_ALERT_SEVERITY_COLOR: Record<
  "success" | "info" | "warning" | "error",
  string
> = {
  success: "bg-green-100 border-green-500 text-green-700",
  info: "bg-blue-100 border-blue-500 text-blue-700",
  warning: "bg-yellow-100 border-yellow-500 text-yellow-700",
  error: "bg-red-100 border-red-500 text-red-700",
};

/**
 * DemoAlert - implemented for consistent alert theming across the demo e-commerce shop.
 * @param props - includes alertTitle, alertBody, onClose (when provided will show a close
 *  action button, or when not close action will be hidden).
 * @returns a JSX Element styled with Tailwind CSS.
 */
export const DemoAlert: React.FC<DemoAlertProps> = ({
  alertTitle,
  alertBody,
  onClose,
  severity = "success",
}) => {
  const alertClass = DEMO_ALERT_SEVERITY_COLOR[severity];

  return (
    <div
  className={`border-l-4 p-4 flex items-center space-x-4 bg-neutral-900 mb-6 rounded-lg border-neutral-700 text-gray-200 ${alertClass}`}
>
  <div className="flex-1">
    <div className={`font-semibold ${alertClass.split(" ")[2]}`}>
      {alertTitle}
    </div>
    {alertBody && <p className="mt-2 text-gray-400">{alertBody}</p>}
  </div>
  {onClose && (
    <button
      className={`text-gray-400 hover:text-gray-300 focus:outline-none`}
      aria-label="close"
      onClick={onClose}
    >
      <IconX />
    </button>
  )}
</div>

  );
};
