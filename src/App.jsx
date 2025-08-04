import { Routes, Route } from "react-router-dom";
import DashboardLayouts from "@/Layouts/DashboardLayout";
import Home from "@/Pages/Home";
import ErrorTemplate from "@/Pages/Err/PageErr";
import "@/Stylesheet/font.css";
import "@/Stylesheet/App.css";
import "@/Stylesheet/color.css";
import Product from "./Pages/Product";
import Kasir from "./Pages/Kasir";


function App() {
  return (
    <Routes>
      <Route path="/" element={<DashboardLayouts />}>
        <Route index element={<Home />} />
        <Route path="/product" element={<Product />} />
        <Route path="/Kasir" element={<Kasir />} />
      </Route>
      <Route path="*" element={<ErrorTemplate title="Halaman yang anda cari tidak ada" />} /> {/* Catch-all route */}
    </Routes>
  );
}

export default App;
