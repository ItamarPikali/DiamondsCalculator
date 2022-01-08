import { Component } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import Admin from "../Admin/Admin";
import AllDiamonds from "../AllDiamonds/AllDiamonds";
import CalculateByCharacteristics from "../CalculateByCharacteristics/CalculateByCharacteristics";
import Login from "../Login/Login";
import Register from "../Register/Register";
import "./Routing.css";

class Routing extends Component {

    public render(): JSX.Element {
        return (
            <>
				<Switch>
                <Route path="/allDiamonds" component={AllDiamonds}  exact /> 
                <Route path="/admin" component={Admin}  exact /> 
                <Route path="/signup" component={Register}  exact />
                <Route path="/login" component={Login}  exact />
                <Route path="/calcByCharacteristics" component={CalculateByCharacteristics}  exact />
                <Redirect from="/" to="/login"  exact/>
            </Switch>
            </>
        );
    }
}

export default Routing;
