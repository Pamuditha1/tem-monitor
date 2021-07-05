import {Route, Switch} from 'react-router-dom'

import Chart from './components/Chart';
import Login from './components/Login';
import Register from './components/Register';

function App() {
  return (
    <div>
      {/* <Chart /> */}
      <Switch>
        <Route path="/chart" component={Chart} />
        <Route path="/register" component={Register} />
        <Route path="/login" component={Login} />
        <Route path="/" component={Login} />
      </Switch>
    </div>
  );
}

export default App;
