import { Route, Switch } from "react-router-dom";

import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
// import "bootstrap/dist/css/bootstrap.min.css";
function App() {
  return (
    <div>
      {/* <Chart /> */}
      <Switch>
        <Route path="/home" component={Home} />
        <Route path="/register" component={Register} />
        <Route path="/login" component={Login} />
        <Route path="/" component={Login} />
      </Switch>
    </div>
  );
}

export default App;
