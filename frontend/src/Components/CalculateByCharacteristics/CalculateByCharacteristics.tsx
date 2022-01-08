import { Component, SyntheticEvent } from "react";
import { Button, InputLabel, MenuItem, Select } from "@material-ui/core";
import "./CalculateByCharacteristics.css";
import Diamond from "../../models/Diamond";
import SimilarDiamonds from "../SimilarDiamonds/SimilarDiamonds";
import jwtAxios from "../../services/JwtAxios";
interface CalculatorState {
  carat: number;
  weight: number;
  cut: number;
  color: number;
  clarity: number;
  result: number;
  options: string[];
  basePrice: number;
  popUpFlag: boolean;
  err: string;
}

class CalculateByCharacteristics extends Component<{}, CalculatorState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      carat: 0,
      weight: 0,
      cut: 0,
      color: 0,
      clarity: 0,
      result: 0,
      options: ["1 - LOW", "2", "3 - HIGH"],
      basePrice: 1000,
      popUpFlag: false,
      err: "",
    };
  }
  public render(): JSX.Element {
    return (
      <div className="CalculateByCharacteristics">
        <h3>Calculate Now</h3>
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
        <br /> <br />
        <Button variant="contained" color="primary" onClick={this.calc}>
          calculate
        </Button>
        <br />
        <div>
          {this.state.result > 0 && "Price :" + this.state.result + "$"}
        </div>
        <div>
          {this.state.result > 0 && (
            <Button
              onClick={this.openPopUp}
              variant="contained"
              color="primary"
            >
              Show Similar Diamonds
            </Button>
          )}
        </div>
        {this.state.popUpFlag && (
          <SimilarDiamonds
            currentPrice={this.state.result}
            onClose={() => this.setState({ popUpFlag: false })}
          />
        )}
        <span className="errMessage">{this.state.err}</span>
      </div>
    );
  }
  openPopUp = () => {
    this.setState({ popUpFlag: true });
  };

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
  calc = async () => {
    if (this.state.carat === 0) {
      this.setState({ err: "please select carat-level", result:0 });
      return;
    } else if (this.state.weight === 0) {
      this.setState({ err: "please select weight-level", result:0 });
      return;
    } else if (this.state.cut === 0) {
      this.setState({ err: "please select cut-level", result:0 });
      return;
    } else if (this.state.clarity === 0) {
      this.setState({ err: "please select clarity-level", result:0 });
      return;
    } else if (this.state.color === 0) {
      this.setState({ err: "please select color-level", result:0 });
      return;
    }
    const diamond = new Diamond(
      this.state.carat,
      this.state.weight,
      this.state.cut,
      this.state.clarity,
      this.state.color
    );

    try {
      const response = await jwtAxios.post<number>(
        `http://localhost:4000/api/price`,
        diamond
      );
      this.setState({
        result: response.data,
        carat: 0,
        weight: 0,
        cut: 0,
        clarity: 0,
        color: 0,
        err: "",
      });
    } catch (error: any) {//must be 'any' or 'unknown'
      alert(error.response.data);
    }
  };
}

export default CalculateByCharacteristics;
