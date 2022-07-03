import { StrictMode, useState } from "react";
import { render } from "react-dom";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import Detail from "./Detail";
import SearchParms from "./SearchParams";
import ThemeContext from "./ThemeContext";

const App = () => {
  const theme = useState("darkblue");
  return (
    <ThemeContext.Provider value={theme}>
      <div>
        <Router>
          <Link to="/">
            <h1>Adopt Me!</h1>
          </Link>
          <Switch>
            <Route path="/detail/:id">
              <Detail />
            </Route>
            <Route path="/">
              <SearchParms />
            </Route>
          </Switch>
        </Router>
      </div>
    </ThemeContext.Provider>
  );
};

render(
  <StrictMode>
    <App />
  </StrictMode>,
  document.getElementById("root")
);
