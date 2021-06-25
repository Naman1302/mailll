import './App.css';
import Home from "./Home";
import Dashboard from "./Dashboard";
import History from "./History";
import {Route, Link} from 'react-router-dom';


function App() {
  return (
    <div className="App">
      <Route exact path="/" component={Dashboard} />
      <Route exact path="/home" component={Home} />
      <Route exact path="/history" component={History} />
    </div>
  );
}

export default App;
