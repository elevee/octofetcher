import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';

import Home from './Home/Home';
import Repository from './Repository/Repository';

import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        {/* <header className="App-header">
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/repositories">Repository</Link>
              </li>
            </ul>
          </nav>
        </header> */}
        
        <Switch>
          <Route path="/repositories">
            <Repository />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>

      </div>
    </Router>
  );
}

export default App;
