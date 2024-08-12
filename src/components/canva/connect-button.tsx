"use client"

import { useState, useEffect } from "react";
import { CanvaButton } from "@/components/canva/canvaButton"; 
import { useAppContext } from "@/context/";
import { getCanvaAuthorization, getUser, revoke } from "@/services";

export const ConnectButton = () => {
const {
    isAuthorized,
    setIsAuthorized,
    setDisplayName,
    setErrors,
    setShowSuccessfulConnectionAlert,
  } = useAppContext();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getAndSetDisplayName = async () => {
      const {
        profile: { display_name },
      } = await getUser();
      display_name && setDisplayName(display_name);
    };

    if (isAuthorized) {
      try {
        getAndSetDisplayName();
      } catch (error) {
        console.error(error);
      }
    }
  }, [isAuthorized]);

  const onConnectClick = async () => {
    try {
      setIsLoading(true);
      const result = await getCanvaAuthorization();

      if (result) {
        setIsAuthorized(true);
        setShowSuccessfulConnectionAlert(true);
      } else {
        setIsAuthorized(false);
      }
    } catch (error) {
      console.error(error);
      setIsAuthorized(false);
      setErrors((prevState) =>
        prevState.concat("Authorization has failed. Please try again later."),
      );
    } finally {
      setIsLoading(false);
    }
  };

  const onRevokeClick = async () => {
    const result = await revoke();

    if (result) {
      setIsAuthorized(false);
      setDisplayName("");
      setShowSuccessfulConnectionAlert(false);
    }
  };

  return isAuthorized ? (
    <CanvaButton
      canvaVariant="destructive"
      onClick={onRevokeClick}
      loading={isLoading} 
    >
      Disconnect From Canva
    </CanvaButton>
  ) : (
    <CanvaButton
      canvaVariant="primary"
      onClick={onConnectClick}
      loading={isLoading}
    >
       Connect To Canva
    </CanvaButton>
  );
};
