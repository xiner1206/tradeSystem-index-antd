import React,{Component} from 'react';
import {HashRouter,Route,Switch} from 'react-router-dom';
import DefaultLayout from './layouts/DefaultLayout/DefaultLayout.js';
import Login from "./layouts/Login/Login";
import Index from './layouts/Index/index'
import Trade from './routes/Trade/Trade'
import Store from './routes/Store/Store'
import Commodity from './routes/Commodity/Commodity'
export default class RouterWrap extends Component{
    render(){
        return (
          <div id="router">
            <HashRouter>
              <Switch>
                <Route path="/" component={Index} exact />
                <Route path="/index" component={Index} />
                <Route path="/trade" component={Trade} />
                <Route path="/store" component={Store} />
                <Route path="/commodity" component={Commodity} />
              </Switch>
            </HashRouter>
          </div>
        );
    }
}