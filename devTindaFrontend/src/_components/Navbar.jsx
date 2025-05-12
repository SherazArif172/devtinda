import React from "react";
import { UserRound } from "lucide-react";
import { useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { useDispatch } from "react-redux";
import { useLogoutMutation } from "../redux/auth/authApi";
// import { setCredentials } from "../redux/auth/authslice";

const Navbar = () => {
  // const navigate = useNavigate();

  const [logout] = useLogoutMutation();
  console.log(logout);

  const user = useSelector((state) => state.auth.user);

  const handleLogout = async () => {
    await logout();
    // dispatch(setCredentials(data));
    window.location.href = "/login";
    console.log("whagt is this ");
  };

  return (
    <div className="navbar bg-base-100 shadow-sm">
      <div className="flex-1">
        <a className="btn btn-ghost text-xl">👨🏻‍💻 devUI</a>
      </div>
      <div className="flex items-center gap-2">
        <p className="font-bold">Welcome {user?.name}</p>
        <div className="flex gap-2">
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img alt="user" src={user?.photoUrl} />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              <li>
                <a className="justify-between">
                  Profile
                  <span className="badge">New</span>
                </a>
              </li>
              <li>
                <a>Settings</a>
              </li>
              <li>
                <a onClick={handleLogout}>Logout</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
