import React from 'react';
import './App.css';
import RedditData from "./RedditData"
import RedditRecord from "./RedditRecord"
import { BrowserRouter as Router, Route, Switch, Link, Redirect, useParams } from "react-router-dom"


function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/">
            <RedditData />
          </Route>
          <Route exact path=":permalink">
            <RedditRecord />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
