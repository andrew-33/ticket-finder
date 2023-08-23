import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing.js";
import Login from "./pages/Login.js";
function App() {
  return (
      <BrowserRouter>
          <Routes>
              <Route index element={<Landing />} />
              <Route path={"/login"} element={<Login />} />
          </Routes>
      </BrowserRouter>
  );
}

export default App;
