import { Routes, Route } from "react-router-dom";
import DashboardLayouts from "@/Layouts/DashboardLayout";
import Home from "@/Pages/Home";
import "@/Stylesheet/App.css";
function App() {
  return (
    <Routes>
      <Route path="/" element={<DashboardLayouts />}>
        <Route index element={<Home />} />
      </Route>
    </Routes>
  );
}

export default App;
