import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./_components/Navbar";

function App() {
  return (
    <>
      <Navbar />
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<p>jkhsdf</p>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
