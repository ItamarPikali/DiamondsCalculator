import { Component } from "react";
import Menu from "../Menu/Menu";
import "./Header.css";

class Header extends Component {
  public render(): JSX.Element {
    return (

      <div className="header">
        <div className="logo">
          <h1>ITAMAR`S DIAMONDS-WEBSITE</h1>
        </div>
        <Menu />
      </div>
    );
  }
}

export default Header;
