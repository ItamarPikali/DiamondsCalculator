import { BrowserRouter } from "react-router-dom";
import "./App.css";
import Header from "./Components/Header/Header";
import Routing from "./Components/Routing/Routing";

function App() {
  return (
    <>
      <BrowserRouter>
       <Header/>
          <Routing />
      </BrowserRouter>
    </>
  );
}

export default App;
