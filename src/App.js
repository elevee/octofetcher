import React, {useState} from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';

import Header from './components/Header';
import Home from './views/Home/Index';
import Repository from './views/Repository/Index';

import 'bootstrap/dist/css/bootstrap.min.css';
import styled from 'styled-components';

const AppWideStyles = styled.div`
  .App {
    text-align: center;
    height: 100vh;
  }
`;

function App() {
  const [results, setResults] = useState({
      items: [],
      status: 'initialized',
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
