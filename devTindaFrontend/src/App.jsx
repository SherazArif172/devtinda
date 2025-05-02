import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./_components/Navbar";
import Body from "./_components/Body";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Body />}>
            <Route path="/login" element={<p>asdfasdf</p>} />
            <Route path="/signup" element={<p>jnsdkjfnksnbdfkfnb</p>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
