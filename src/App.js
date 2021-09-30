import "./App.css";
import "./Animation.css";

import Connexion from "./components/Connexion";
import ChatBoxx from "./components/ChatBoxx";
import NotFound from "./components/NotFound";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Connexion />
        </Route>
        <Route path="/pseudo/:pseudo">
          <ChatBoxx />
        </Route>
        <Route>
          <NotFound />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
