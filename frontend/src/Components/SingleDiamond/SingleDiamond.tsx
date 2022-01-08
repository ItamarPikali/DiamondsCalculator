import { Card, CardContent, CardMedia, Grid, Typography } from "@material-ui/core";
import { Component } from "react";
import "./SingleDiamond.css";
interface SingleDiamondProps {
  image: string;
  price: number;
}

interface SingleDiamondState {}

class SingleDiamond extends Component<SingleDiamondProps, SingleDiamondState> {
  constructor(props: SingleDiamondProps) {
    super(props);
    this.state = {};
  }
  public render(): JSX.Element {
    return (
      <Grid item xs={6} md={2} lg={3} xl={2}>
         <Card className="SingleDiamond">
        <CardMedia
          className="media"
          height={"130px"}
          component="img"
          image={`http://localhost:4000/api/images/${this.props.image}`}
          title="image"
        />
        <CardContent>
          <Typography  variant="h5">
          ${this.props.price}
          </Typography>
        </CardContent>
      </Card>
      </Grid>
    );
  }
}

export default SingleDiamond;
