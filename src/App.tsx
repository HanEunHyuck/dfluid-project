import { Route, Routes } from "react-router-dom";
import { HomePage } from "./pages";

import "./App.css";
import "swiper/css";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
    </Routes>
  );
}

export default App;
