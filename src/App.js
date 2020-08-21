import React from 'react';
import './App.css';
import RedditData from "./RedditData"
import RedditRecord from "./RedditRecord"
import NoMatch from "./NoMatch"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"


function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/">
            <RedditData />
          </Route>
          <Route exact path="/r/:subreddit/comments/:id/:link">
            <RedditRecord />
          </Route>
          <Route>
            <NoMatch />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
