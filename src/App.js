import React, {useState} from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';

import Header from './Header';
import Home from './Home/Index';
import Repository from './Repository/Index';

import styled from 'styled-components';

const AppWideStyles = styled.div`
  .App {
    // background: pink;
    text-align: center;
    height: 100vh;
  }
`;

function App() {
  const [results, setResults] = useState({
      items: []
  });

  return (
    <AppWideStyles>
      <Header />
      <Router>
        <div className="App">
          <Switch>
            <Route path="/repositories/:id">
              <Repository 
                results={results} />
            </Route>
            <Route path="/">
              <Home 
                results={results}
                setResults={setResults} />
            </Route>
          </Switch>

        </div>
      </Router>
    </AppWideStyles>
  );
}

export default App;
