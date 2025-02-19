import React from "react";
import ReactDOM from "react-dom/client"; // ✅ Correct import
import App from "./App";
import "./index.scss"; // Or your CSS file

// Ensure React 18+ createRoot() method is used
ReactDOM.createRoot(document.getElementById("root")).render(<App />);