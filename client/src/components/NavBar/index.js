import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { outThunk } from "../redux/actions";
import { useHistory } from "react-router-dom";

function NavBar() {
  const dispatch = useDispatch();
  const history = useHistory();
  const isAuth = useSelector((state) => state.user);
  async function out(event) {
    event.preventDefault();
    dispatch(outThunk(history));
  }
  return (
    <nav>
      <div class="nav-wrapper">
        <ul id="nav-mobile" class="center hide-on-med-and-down">
          <li>
            <Link to="/">
              <h5>Home</h5>
            </Link>
          </li>
          {isAuth ? (
            <>
              <li>
                <h5 onClick={out}>Logout</h5>
              </li>
              <li>
                <Link to="/user">
                  <h5>Personal</h5>
                </Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/log">
                  <h5>Login</h5>
                </Link>
              </li>
              <li>
                <Link to="/reg">
                  <h5>Register</h5>
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default NavBar;
