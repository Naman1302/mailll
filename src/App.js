import './App.css';
import Home from "./Home";
import Dashboard from "./Dashboard";
import History from "./History";
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';
// import {Route, Link} from 'react';


const App = () => {
  return (
    <Router>
    <div className="App">
      <Switch>
      <Route exact path='/' component={Dashboard} />
      <Route exact path='/home' component={Home} />
      <Route exact path='/history' component={History} />

      </Switch>
    </div>
    </Router>
  );
}

export default App;


