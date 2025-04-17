import React from "react";

export default function ToastNotification({ message, type = "success" }) {
  const styles = {
    success: "bg-green-500 text-white",
    error: "bg-red-500 text-white",
    info: "bg-blue-500 text-white",
  };

  return (
    <div
      className={${styles[type]} p-2 rounded shadow-md fixed top-4 right-4}
    >
      {message}
    </div>
  );
}
