import React from "react";
import "../styles/loadingIndicator.css";

const LoadingIndicator = () => {
  return (
    <div className="loading-container flex justify-center items-center py-4">
      <div className="loader border-4 border-blue-500 border-t-transparent rounded-full w-8 h-8 animate-spin"></div>
    </div>
  );
};

export default LoadingIndicator;
