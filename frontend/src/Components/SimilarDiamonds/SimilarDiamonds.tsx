import { Component } from "react";
import "./SimilarDiamonds.css";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@material-ui/core";
import axios from "axios";
import Diamond from "../../models/Diamond";

interface SimilarDiamondsProps {
  onClose(): void;
  currentPrice: number;
}

interface SimilarDiamondsState {
  openDialog: boolean;
  similarDiamondsByCategory: any[]; // the type is any to prevent
}
class SimilarDiamonds extends Component<
  SimilarDiamondsProps,
  SimilarDiamondsState
> {
  constructor(props: SimilarDiamondsProps) {
    super(props);
    this.state = { openDialog: true, similarDiamondsByCategory: [] };
  }
  public render(): JSX.Element {
    const { onClose } = this.props;
    return (
      <div className="SimilarDiamonds">
        <Dialog open={this.state.openDialog}>
          <DialogTitle>Similar Diamonds</DialogTitle>
          <DialogContent>
            {this.state.similarDiamondsByCategory.map((diamond, i) => (
              <div key={i}>
                <div
                  className="dialogDiamond"
                  style={{
                    backgroundImage: `url("http://localhost:4000/api/images/${diamond.image}")`,
                  }}
                ></div>
                <div>{diamond.price}</div>
              </div>
            ))}
          </DialogContent>
          <DialogActions>
            <Button variant="contained" color="primary" onClick={onClose}>
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
  componentDidMount = async () => {
    const price = +this.props.currentPrice;
    if (price < 25000) {
      this.getDiamondsByCategory(1);
    } else if (price >= 25000 && price < 50000) {
      this.getDiamondsByCategory(2);
    } else if (price >= 50000 && price < 75000) {
      this.getDiamondsByCategory(3);
    } else if (price > 75000) {
      this.getDiamondsByCategory(4);
    }
  };
  getDiamondsByCategory = async (categoryId: number) => {
    try {
      const response = await axios.get<Diamond[]>(
        `http://localhost:4000/api/${categoryId}`
      );
      this.setState({ similarDiamondsByCategory: response.data });
    } catch (error: any) {
      alert(error);
    }
  };
}

export default SimilarDiamonds;
