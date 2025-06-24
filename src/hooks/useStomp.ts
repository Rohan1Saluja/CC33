import { useEffect } from "react";
import { stompClient } from "../lib/stompClient";

export const useStomp = () => {
  useEffect(() => {
    stompClient.activate();

    return () => {
      stompClient.deactivate();
    };
  }, []);
};
