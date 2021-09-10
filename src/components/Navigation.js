import React from 'react';
import App from './App';
import Add from './Add.js';
import New from './New.js';

import {
    Switch,
    Route,
    useLocation
  } from "react-router-dom";


function Navigation(){
    let location = useLocation();
    return(
        <div>
            <Switch location={location}>                
                <Route path="/add" children={<Add />} />
                <Route path="/new" children={<New />} />
                <Route path="/" children={<App />} />
            </Switch>
        </div>
    ); 
}

export default Navigation;
  