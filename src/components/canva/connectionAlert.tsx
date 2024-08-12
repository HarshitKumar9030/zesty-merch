import { useEffect } from "react";
import { DemoAlert } from "./alert";
import { useAppContext } from "@/context";

export const ConnectionAlert = () => {
  const {
    displayName,
    showSuccessfulConnectionAlert,
    setShowSuccessfulConnectionAlert,
  } = useAppContext();

  useEffect(() => {
    // close alert when navigating to other pages
    return () => setShowSuccessfulConnectionAlert(false);
  }, []);

  if (!showSuccessfulConnectionAlert) {
    return null;
  }

  return (
    <DemoAlert
      severity="success"
      alertTitle={
        <>
          The Canva for <b>Zesty Merch</b> integration is now connected
        </>
      }
      alertBody={
        displayName && <>You&apos;re currently logged in as {displayName}.</>
      }
      onClose={() => setShowSuccessfulConnectionAlert(false)}
    />
  );
};
