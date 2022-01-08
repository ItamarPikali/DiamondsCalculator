import { Button, TextField } from "@material-ui/core";
import axios from "axios";
import { Component, SyntheticEvent } from "react";
import "./Login.css";
import { History } from "history";
import VisibilityIcon from "@material-ui/icons/Visibility";

interface LoginProps {
  history: History;
}

interface LoginState {
  userNameToCompare: string;
  passwordToCompare: string;
  failureMessage: string;
  isPasswordShown: boolean;
}

class Login extends Component<LoginProps, LoginState> {
  constructor(props: LoginProps) {
    super(props);
    this.state = {
      userNameToCompare: "",
      failureMessage: "",
      passwordToCompare: "",
      isPasswordShown: false,
    };
  }

  public render(): JSX.Element {
    const { isPasswordShown } = this.state;
    return (
      <div className="Login">
        <h2>Login</h2>

        <TextField
          className="loginInput"
          label="username"
          variant="outlined"
          type="text"
          onChange={this.username}
          value={this.state.userNameToCompare}
        />
        <TextField
          className="loginInput"
          label="Password"
          type={isPasswordShown ? "text" : "password"}
          variant="outlined"
          onChange={this.password}
          value={this.state.passwordToCompare}
        />
        <VisibilityIcon
          className="password-Licon"
          onClick={this.togglePasswordVisiblity}
        />

        <Button variant="contained" color="primary" onClick={this.signIn}>
          Sign In
        </Button>
        {this.state.failureMessage && (
          <div className="failureMessage">
            <span>{this.state.failureMessage}</span>
          </div>
        )}
      </div>
    );
  }

  togglePasswordVisiblity = () => {
    const { isPasswordShown } = this.state;
    this.setState({ isPasswordShown: !isPasswordShown });
  };

  username = (e: SyntheticEvent) => {
    const userName = (e.target as HTMLInputElement).value;
    this.setState({ userNameToCompare: userName });
  };

  password = (e: SyntheticEvent) => {
    const password = (e.target as HTMLInputElement).value;
    this.setState({ passwordToCompare: password });
  };

  signIn = async () => {
    try {
      const response = await axios.post("http://localhost:4000/api/login", {
        username: this.state.userNameToCompare,
        password: this.state.passwordToCompare,
      });
      localStorage["loginData"] = JSON.stringify(response.data);
      this.setState({
        userNameToCompare: "",
        passwordToCompare: "",
        failureMessage: "",
      });
      const { role } = JSON.parse(localStorage.getItem("loginData") || "{}");
      if (role === "admin") this.props.history.push("/admin");
      else {
        this.props.history.push("/calcByCharacteristics");
      }
    } catch (error: any) {
      this.setState({
        failureMessage: `Incorrect username or password Please make sure you are already registered and that all the fields are filled properly`,
      });
    }
  };
}

export default Login;
