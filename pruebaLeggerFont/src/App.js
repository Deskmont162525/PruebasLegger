import React, { Suspense, useEffect } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { getAllLeads } from "./stateManagement/actions/getAllLeads";
import InicioViews from "./Views/Inicio/InicioViews";
import Loadins from './Views/lazyloadin/index';

function App() {

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getAllLeads());
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Route>
        <Suspense fallback={<Loadins />}>
          <Switch>
            <Route exact path="/" component={InicioViews}>
            </Route>
          </Switch> 
        </Suspense>
      </Route>
    </BrowserRouter>
  );
}

export default App;
