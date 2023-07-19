import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { GraphPage } from "./pages/GraphPage";

export const RouterApp = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/graficos" element={<GraphPage />} />
      </Routes>
    </Router>
  );
};
