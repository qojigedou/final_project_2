import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Header from "./components/Header";
import { useState } from "react";
import AddPage from "./pages/AddPage";
import NoteView from "./pages/NoteView";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <>
      <BrowserRouter>
        <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
        <Routes>
          <Route path="/">
            <Route index element={<Home isLoggedIn={isLoggedIn} />} />

            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="add-note" element={<AddPage />} />
            <Route path="note/:id" element={<NoteView />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}
export default App;
