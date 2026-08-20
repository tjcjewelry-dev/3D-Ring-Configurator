import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProductPage from "./pages/ProductPage";
import Page404 from "./pages/Page404";
import { BASE_PATH_START } from "./data/assets";

export default function App() {
  return (
    <BrowserRouter basename={BASE_PATH_START}>
      <Routes>
        <Route
          path="/404"
          element={<Page404 />}
        />

        <Route
          path="/product/:parentName"
          element={<ProductPage />}
        />

        <Route
          path="/product/:parentName/:shank"
          element={<ProductPage />}
        />

        <Route
          path="/product/:parentName/:shank/:head"
          element={<ProductPage />}
        />

        <Route
          path="/product/:parentName/:shank/:head/:metal"
          element={<ProductPage />}
        />

        <Route
          path="*"
          element={<Page404 />}
        />
      </Routes>
    </BrowserRouter>
  );
}