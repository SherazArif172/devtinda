import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./_components/Navbar";
import Body from "./_components/Body";
import Login from "./_components/Login";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Body />}>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<p>jnsdkjfnksnbdfkfnb</p>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
