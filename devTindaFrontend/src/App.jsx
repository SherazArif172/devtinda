import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./_components/Navbar";
import Body from "./_components/Body";
import Login from "./_components/Login";
import { Navigate } from "react-router-dom";
import About from "./_components/About";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          {/* <Route path="/signup" element={<p>jnsdkjfnksnbdfkfnb</p>} /> */}
          <Route path="/" element={<Body />}>
            <Route path="about" element={<About />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
