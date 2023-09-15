import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing.js";
import Login from "./pages/Login.js";
import {AddEntry} from "./pages/AddEntry";
import {ViewListings} from "./pages/ViewListings";
import "./App.css";

function App() {
  return (
      <BrowserRouter>
          <Routes>
              <Route index element={<Landing />} />
              <Route path={"/login"} element={<Login />} />
              <Route path={"/add-entry"} element={<AddEntry />} />
              <Route path={"/view-listings"} element={<ViewListings />} />
          </Routes>
      </BrowserRouter>
  );
}

export default App;
