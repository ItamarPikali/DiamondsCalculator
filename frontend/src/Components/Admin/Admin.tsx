import { Component, SyntheticEvent } from "react";
import "./Admin.css";
import { Button, InputLabel, MenuItem, Select } from "@material-ui/core";
import jwtAxios from "../../services/JwtAxios";
import Diamond from "../../models/Diamond";
interface AdminState {
  carat: number;
  weight: number;
  cut: number;
  color: number;
  clarity: number;
  options: string[];
  err: string;
  image: any;
  successMessage:string;
}
class Admin extends Component<{}, AdminState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      carat: 0,
      weight: 0,
      cut: 0,
      color: 0,
      clarity: 0,
      options: ["1 - LOW", "2", "3 - HIGH"],
      err: "",
      image: "",
      successMessage:""
    };
  }
  public render(): JSX.Element {
    return (
      <>
      <div className="adminAddForm">
        <h2>add diamond now</h2>
        {this.state.err && (
          <div className="errMessage">{this.state.err}</div>
        )}
         {this.state.successMessage && (
          <div className="successMessage">{this.state.successMessage}</div>
        )}
        <InputLabel id="c-select-label">carat</InputLabel>
        <Select
          value={this.state.carat}
          onClick={this.caratChanged}
          labelId="c-select-label"
          variant="outlined"
          defaultValue={0}
        >
          <MenuItem value={0}>select carat level</MenuItem>
          {this.state.options.map((scale, index) => (
            <MenuItem key={index} value={index + 1}>
              {scale}
            </MenuItem>
          ))}
        </Select>
        <br />

        <InputLabel id="c-select-label">weight</InputLabel>
        <Select
          value={this.state.weight}
          onClick={this.weightChanged}
          labelId="c-select-label"
          variant="outlined"
          defaultValue={0}
        >
          <MenuItem value={0}>select weight level</MenuItem>
          {this.state.options.map((scale, index) => (
            <MenuItem key={index} value={index + 1}>
              {scale}
            </MenuItem>
          ))}
        </Select>
        <br />
        <InputLabel id="c-select-label">cut</InputLabel>
        <Select
          value={this.state.cut}
          onClick={this.cutChanged}
          labelId="c-select-label"
          variant="outlined"
          defaultValue={0}
        >
          <MenuItem value={0}>select cut level</MenuItem>
          {this.state.options.map((scale, index) => (
            <MenuItem key={index} value={index + 1}>
              {scale}
            </MenuItem>
          ))}
        </Select>
        <br />
        <InputLabel id="c-select-label">clarity</InputLabel>
        <Select
          value={this.state.clarity}
          onClick={this.clarityChanged}
          labelId="c-select-label"
          variant="outlined"
          defaultValue={0}
        >
          <MenuItem value={0}>select clarity level</MenuItem>
          {this.state.options.map((scale, index) => (
            <MenuItem key={index} value={index + 1}>
              {scale}
            </MenuItem>
          ))}
        </Select>
        <br />
        <InputLabel id="c-select-label">color</InputLabel>
        <Select
          value={this.state.color}
          onClick={this.colorChanged}
          labelId="c-select-label"
          variant="outlined"
          defaultValue={0}
        >
          <MenuItem value={0}>select color level</MenuItem>
          {this.state.options.map((scale, index) => (
            <MenuItem key={index} value={index + 1}>
              {scale}
            </MenuItem>
          ))}
        </Select>
        <br />
        <p>
          <InputLabel>Diamond Image:</InputLabel>
          <br />
          <input
            type="file"
            name="myImage"
            onChange={this.imageChanged}
            multiple
            accept="image/png, image/jpeg, image/webp, image/gif"
          />
        </p>
        <Button variant="contained" color="primary" onClick={this.addDiamond}>
          Add Diamond
        </Button>
        
       
        </div>
      </>
    );
  }
  caratChanged = (e: SyntheticEvent) => {
    const carat = +(e.target as HTMLInputElement).value;
    if (isNaN(carat)) {
      //preventing error if user clicked outside
      return;
    }
    this.setState({ carat: carat });
  };
  weightChanged = (e: SyntheticEvent) => {
    const weight = +(e.target as HTMLInputElement).value;
    if (isNaN(weight)) {
      return;
    }
    this.setState({ weight: weight });
  };
  cutChanged = (e: SyntheticEvent) => {
    const cut = +(e.target as HTMLInputElement).value;
    if (isNaN(cut)) {
      return;
    }
    this.setState({ cut: cut });
  };
  clarityChanged = (e: SyntheticEvent) => {
    const clarity = +(e.target as HTMLInputElement).value;
    if (isNaN(clarity)) {
      return;
    }
    this.setState({ clarity: clarity });
  };
  colorChanged = (e: SyntheticEvent) => {
    const color = +(e.target as HTMLInputElement).value;
    if (isNaN(color)) {
      return;
    }
    this.setState({ color: color });
  };
  private imageChanged = (e: SyntheticEvent) => {
    const image = (e.target as HTMLInputElement).files;
    this.setState({ image: image });
  };
  addDiamond = async () => {
    if (this.state.carat === 0) {
      this.setState({ err: "please select carat-level", successMessage:"" });
      return;
    } else if (this.state.weight === 0) {
      this.setState({ err: "please select weight-level", successMessage:"" });
      return;
    } else if (this.state.cut === 0) {
      this.setState({ err: "please select cut-level", successMessage:"" });
      return;
    } else if (this.state.clarity === 0) {
      this.setState({ err: "please select clarity-level", successMessage:"" });
      return;
    } else if (this.state.color === 0) {
      this.setState({ err: "please select color-level", successMessage:"" });
      return;
    } else if (!this.state.image) {
      this.setState({ err: "please select an image", successMessage:"" });
      return;
    }
    const diamond = new FormData();
    diamond.append("image", this.state.image[0]);
    diamond.append("carat", JSON.stringify(this.state.carat));
    diamond.append("weight", JSON.stringify(this.state.weight));
    diamond.append("cut", JSON.stringify(this.state.cut));
    diamond.append("clarity", JSON.stringify(this.state.clarity));
    diamond.append("color", JSON.stringify(this.state.color));

    try {
     
      await jwtAxios.post<Diamond>(
        `http://localhost:4000/api/add/diamond`,
        diamond
      );
      this.setState({
        carat: 0,
        weight: 0,
        cut: 0,
        clarity: 0,
        color: 0,
        err: "",
        successMessage:"added successfully!!! go and check in ALL-Diamonds-Page"
      });
    } catch (error: any) {
      //must be 'any' or 'unknown'
      if (error?.response?.data) {
        alert(error.response.data);
      }
    }
  };
}

export default Admin;
