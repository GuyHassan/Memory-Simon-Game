import React from 'react';
import WelcomePage from './WelcomePage';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Game from './Game';

const App = () => {
    return (
        <Router>
            <div className="app">
                <Switch>
                    <Route path="/game" component={Game} />
                    <Route path="/" component={WelcomePage} />
                </Switch>
                <div className="made-by">
                    <h3>Developed By <a href="http://guy-hassan.herokuapp.com/" target="_blank" rel="noreferrer">Guy Hassan</a></h3>
                </div>

            </div>
        </Router>
    )
}

export default App;