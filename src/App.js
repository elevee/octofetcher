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
import {Colors} from 'resources/Index';
import styled from 'styled-components';

const AppWideStyles = styled.div`
  .App {
    font-family: 'Heebo', 'cursive';
    font-weight: bold;
    text-align: center;
    background-color: ${Colors.SECONDARY};
    height: 100vh;
  }

  a {
    color: ${Colors.TRIM};
    &:hover { color: ${Colors.ACCENT}}
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
