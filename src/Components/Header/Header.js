import { Button } from "react-bootstrap";
import { NavLink } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import useFirebase from "../../Firebase/useFirebase";

const Header = () => {
  const { user, logOut } = useFirebase();

  const navact = {
    borderBottom: "3px solid rgba(255, 255, 255, 0.39)",
    // backgroundColor: "rgba(255, 255, 255, 0.39)",

    textDecoration: "none",
    color: "red",
    fontWeight: "700",
  };
  return (
    <div className="header">
      <nav className="row">
        <div className="col-lg-6 d-flex justify-content-evenly">
          <NavLink to="/home" className="navstyle" activeStyle={navact}>
            Home
          </NavLink>
          <NavLink to="/products" className="navstyle" activeStyle={navact}>
            Explore
          </NavLink>
        </div>

        <div className="col-lg-6">
          {user.email ? (
            <div className="d-flex justify-content-evenly align-items-center">
              <NavLink
                to="/dashboard"
                className="navstyle"
                activeStyle={navact}
              >
                Dashboard
              </NavLink>
              <div className="d-flex align-items-center">
                <div
                  className="pe-2"
                  style={{ fontSize: "large", color: "white" }}
                >
                  {user.displayName}
                </div>

                <Button variant="danger" onClick={logOut}>
                  Logout
                </Button>
              </div>
            </div>
          ) : (
            <div className="d-flex justify-content-end">
              <NavLink className="navstyle" activeStyle={navact} to="/login">
                Login
              </NavLink>
            </div>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Header;
