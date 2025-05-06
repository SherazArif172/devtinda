import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./_components/Navbar";
import Body from "./_components/Body";
import Login from "./_components/Login";
import PrivateRoute from "./_components/PrivateRoute";
import { Navigate } from "react-router-dom";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<p>jnsdkjfnksnbdfkfnb</p>} />
          <Route
            path="/"
            element={
              <PrivateRoute>
                <Body />
              </PrivateRoute>
            }
          ></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
