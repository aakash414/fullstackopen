// Notification.js

import React from "react";

const Notification = ({ message, type }) => {
  let notificationStyle = {
    color: "white",
    backgroundColor: "green",
    padding: "10px",
    marginBottom: "10px",
  };

  if (type === "error") {
    notificationStyle.backgroundColor = "red";
  }

  if (!message) {
    return null;
  }

  return <div style={notificationStyle}>{message}</div>;
};

export default Notification;
