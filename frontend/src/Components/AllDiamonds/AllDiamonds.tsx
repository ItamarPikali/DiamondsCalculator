import { Grid } from "@material-ui/core";
import axios from "axios";
import { Component } from "react";
import FullDiamondModel from "../../models/FullDiamondModel";
import SingleDiamond from "../SingleDiamond/SingleDiamond";
import "./AllDiamonds.css";
interface CalculatorState {
  allDiamonds: FullDiamondModel[];
}
class AllDiamonds extends Component<{}, CalculatorState> {
  constructor(props: {}) {
    super(props);
    this.state = { allDiamonds: [] };
  }
  public render(): JSX.Element {
    return (
      <div className="AllDiamonds">
        <h1>Our Diamonds</h1>
        <Grid container spacing={2}>
          {this.state.allDiamonds.map((diamond, i) => (
            <SingleDiamond
              key={i}
              image={diamond.image}
              price={diamond.price}
            />
          ))}
        </Grid>
      </div>
    );
  }

  componentDidMount = async () => {
    try {
      const response = await axios.get<FullDiamondModel[]>(
        `http://localhost:4000/api/diamonds/all`
      );
      this.setState({ allDiamonds: response.data });
    } catch (error: any) {
      alert(error);
    }
  };
}

export default AllDiamonds;
