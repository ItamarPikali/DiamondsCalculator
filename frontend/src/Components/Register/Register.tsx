import { Button, TextField } from "@material-ui/core";
import axios from "axios";
import { Component, SyntheticEvent } from "react";
import User from "../../models/User";
import "./Register.css";
import { History } from "history";
import VisibilityIcon from "@material-ui/icons/Visibility";

interface RegisterProps {
  history: History;
}

interface RegisterState {
  errors: any;
  err: string;
  name: string;
  Lname: string;
  username: string;
  password: string;
  passwordConfirmation: string;
  allUsersToEnsure: any;
  userNameExist: boolean;
  erroruserNameExist: string;
  isPasswordShown: boolean;
  passwordConfirmationError: boolean;
}

class Register extends Component<RegisterProps, RegisterState> {
  constructor(props: RegisterProps) {
    super(props);
    this.state = {
      name: "",
      Lname: "",
      username: "",
      password: "",
      passwordConfirmation: "",
      err: "",
      errors: {},
      allUsersToEnsure: [],
      userNameExist: false,
      erroruserNameExist: "",
      isPasswordShown: false,
      passwordConfirmationError: false,
    };
  }

  public render(): JSX.Element {
    const { isPasswordShown } = this.state;
    //const { passwordConfirmationError } = this.state;
    return (
      <div className="Register">
        <h2>Register</h2>
        <TextField
          className="RegisterInput"
          label="Name"
          variant="outlined"
          type="text"
          onChange={this.nameChanged}
          value={this.state.name}
        />
        {this.state.errors.userFirstName && (
          <span className="failureMessage">
            {this.state.errors.userFirstName}
          </span>
        )}

        <TextField
          className="RegisterInput"
          label="Last Name"
          type="text"
          variant="outlined"
          onChange={this.LnameChanged}
          value={this.state.Lname}
        />
        {this.state.errors.userLastName && (
          <span className="failureMessage">
            {this.state.errors.userLastName}
          </span>
        )}

        <TextField
          className="RegisterInput"
          label="User Name"
          variant="outlined"
          type="text"
          onChange={this.usernameChanged}
          value={this.state.username}
        />
        {this.state.errors.chosenUserName && (
          <span className="failureMessage">
            {this.state.errors.chosenUserName}
          </span>
        )}
        {this.state.erroruserNameExist && (
          <span className="failureMessage">
            {this.state.erroruserNameExist}
          </span>
        )}

        <TextField
          className="RegisterInput"
          label="Password"
          type={isPasswordShown ? "text" : "password"}
          variant="outlined"
          onChange={this.passwordChanged}
          value={this.state.password}
        />
        <TextField
          className="RegisterInput"
          label="Confirm Password"
          type={isPasswordShown ? "text" : "password"}
          variant="outlined"
          onChange={this.passwordConfirmationChanged}
          value={this.state.passwordConfirmation}
        />
        <VisibilityIcon
          className="password-icon"
          onClick={this.togglePasswordVisiblity}
        />
        {this.state.passwordConfirmationError && (
          <span className="failureMessage">Password does not match</span>
        )}
        {this.state.errors.password && (
          <span className="failureMessage">{this.state.errors.password}</span>
        )}
        <Button className="RegisterButton" variant="contained" color="primary" onClick={this.register}>
          Register
        </Button>
      </div>
    );
  }
  togglePasswordVisiblity = () => {
    const { isPasswordShown } = this.state;
    this.setState({ isPasswordShown: !isPasswordShown });
  };
  nameChanged = (e: SyntheticEvent) => {
    const name = (e.target as HTMLInputElement).value;
    this.setState({ name: name });
  };

  LnameChanged = (e: SyntheticEvent) => {
    const Lname = (e.target as HTMLInputElement).value;
    this.setState({ Lname: Lname });
  };

  usernameChanged = (e: SyntheticEvent) => {
    const username = (e.target as HTMLInputElement).value;
    this.setState({ username: username });
  };

  passwordChanged = (e: SyntheticEvent) => {
    const password = (e.target as HTMLInputElement).value;
    this.setState({ password: password });
  };
  passwordConfirmationChanged = (e: SyntheticEvent) => {
    const passwordConfirmation = (e.target as HTMLInputElement).value;
    this.setState({ passwordConfirmation: passwordConfirmation });
  };

  register = async () => {
    this.setState({ userNameExist: false, erroruserNameExist: "", errors: {} });
    const newUser = new User(
      0,
      this.state.name,
      this.state.Lname,
      this.state.username,
      this.state.password
    );
    const allUsers = [...this.state.allUsersToEnsure];
    const userExist = allUsers.find(
      (user) =>
        user.username.toLowerCase() === this.state.username.toLowerCase()
    );
    if (userExist) {
      const err = "This user name is already used please select another one";
      this.setState({ userNameExist: true, erroruserNameExist: err });
    } else if (this.state.passwordConfirmation !== this.state.password) {
      this.setState({ passwordConfirmationError: true });
      return;
    } else {
      try {
       await axios.post<any>(`http://localhost:4000/api/user`, newUser);
        this.setState({
          name: "",
          Lname: "",
          username: "",
          password: "",
          errors: {},
          userNameExist: false,
          erroruserNameExist: "",
        });
        this.props.history.push("/login");
      } catch (errors: any) {
        console.log("here");
        
        this.setState({ errors: errors.response.data });
      }
    }
  };

  componentDidMount = async () => {
    try {
      const response = await axios.get<any[]>(
        `http://localhost:4000/api/users/all`
      );
      this.updateUsers(response.data);
    } catch (error: any) {
      console.log(error.status);
    }
  };

  updateUsers = (users: any[]) => {
    this.setState({ allUsersToEnsure: users });
  };
}

export default Register;
