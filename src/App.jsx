import { Routes, Route } from "react-router-dom";
import DashboardLayouts from "@/Layouts/DashboardLayout";
import Home from "@/Pages/Home";
import "@/Stylesheet/font.css"
import "@/Stylesheet/App.css";
import "@/Stylesheet/color.css";
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
