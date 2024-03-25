import { NavLink, useNavigate } from "react-router-dom";
import { isUserLoggedIn, logout } from "../service/AuthService";

const Header = () => {
    const isAuth = isUserLoggedIn();
    const navigate = useNavigate();

    function handlLogout() {
        logout();
        navigate("/login");
    }
    return (
      <header>
        <nav className="navbar navbar-expand-md">
          <div>
            <a href="http://localhost:3000" className="navbar-brand">
              Todo Management Application
            </a>
          </div>
          <div className="collapse navbar-collapse justify-content-end">
            <ul className="navbar-nav">
              {isAuth && (
                <li className="nav-item">
                  <NavLink to="/list" className="nav-link">
                    List
                  </NavLink>
                </li>
              )}
              {!isAuth && (
                <li className="nav-item">
                  <NavLink to="/register" className="nav-link">
                    Register
                  </NavLink>
                </li>
              )}
              {!isAuth && (
                <li className="nav-item">
                  <NavLink to="/login" className="nav-link">
                    Login
                  </NavLink>
                </li>
              )}
              {isAuth && (
                <li className="nav-item">
                  <NavLink
                    to="/login"
                    className="nav-link"
                    onClick={handlLogout}
                  >
                    Logout
                  </NavLink>
                </li>
              )}
            </ul>
          </div>
        </nav>
      </header>
    )
}

export default Header