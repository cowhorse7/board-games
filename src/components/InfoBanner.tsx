import { useEffect, useState } from "react";
import "./InfoBanner.css";

export default function InfoBanner() {
  const [visible, setVisible] = useState(true);

  // On load, check if user already dismissed it
  useEffect(() => {
    const dismissed = localStorage.getItem("bannerDismissed");
    if (dismissed === "true") {
      setVisible(false);
    }
  }, []);

  function handleClose() {
    setVisible(false);
    localStorage.setItem("bannerDismissed", "true");
  }

  if (!visible) return null;

  return (
    <div className="info-banner">
      <span>
        Welcome to Board Game Collector! This site is here to help you explore
        and manage your board game collection.
      </span>
      <button className="banner-close" onClick={handleClose}>
        ✕
      </button>
    </div>
  );
}
