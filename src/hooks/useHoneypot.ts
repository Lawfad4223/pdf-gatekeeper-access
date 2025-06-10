
import { useState } from "react";

export const useHoneypot = () => {
  const [honeypot, setHoneypot] = useState("");

  const isBot = honeypot !== "";

  return {
    honeypot,
    setHoneypot,
    isBot,
  };
};
