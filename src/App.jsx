import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProductPage from "./pages/ProductPage";
import Page404 from "./pages/Page404";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Product Page */}
        <Route 
          path="/:productCode"
          element={<ProductPage />}
        />
        <Route path="/404" element={<Page404 />} />
        <Route path="*" element={<Page404 />} />
      </Routes>
    </BrowserRouter>
  );
}