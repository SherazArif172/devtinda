import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./_components/Navbar";
import Body from "./_components/Body";
import Login from "./_components/Login";
import { Navigate } from "react-router-dom";
import About from "./_components/About";
import { useEffect } from "react";
import { useGetProfileQuery } from "./redux/profile/profileApi";
import { useDispatch, useSelector } from "react-redux";
import { setCredentials, setLoading } from "./redux/auth/authslice";

function App() {
  const dispatch = useDispatch();
  const { isAuthenticated, isLoading: authLoading } = useSelector(
    (state) => state.auth
  );
  const { data, isLoading: profileLoading } = useGetProfileQuery();

  // Combined loading state
  const isLoading = authLoading || profileLoading;

  useEffect(() => {
    if (!profileLoading) {
      if (data) {
        dispatch(setCredentials(data));
      }
      dispatch(setLoading(false));
    }
  }, [data, profileLoading, dispatch]);

  return (
    <BrowserRouter>
      {!isLoading ? (
        <Routes>
          <Route
            path="/login"
            element={!isAuthenticated ? <Login /> : <Navigate to="/" replace />}
          />
          <Route
            path="/"
            element={
              isAuthenticated ? <Body /> : <Navigate to="/login" replace />
            }
          >
            <Route path="about" element={<About />} />
          </Route>
        </Routes>
      ) : (
        <div>Loading...</div>
      )}
    </BrowserRouter>
  );
}

export default App;
