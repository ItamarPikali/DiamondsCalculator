import { Component } from "react";
import { NavLink } from "react-router-dom";
import "./Menu.css";

class Menu extends Component {
  public render(): JSX.Element {
    return (
      <div className="topnav">
        <NavLink to="/allDiamonds">
          <span className="navlink">All Diamonds</span>
        </NavLink>
        <NavLink to="/signup">
          <span className="navlink">Sign up</span>
        </NavLink>
        <NavLink to="/login">
          <span className="navlink">Login</span>
        </NavLink>
      </div>
    );
  }
}

export default Menu;
