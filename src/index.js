import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import './index.css';
import AuthView from './Auth/Auth';
import App from './App';
import OrderView from './Orders/OrderView'
import * as serviceWorker from './serviceWorker';


const TokenExists = localStorage.getItem('token') ? true : false;


function PrivateRoute({component: Component, ...rest}) {
    return (
        <Route
        {...rest}
        render={props =>
          TokenExists? (
            <Component {...props} />
          ) : (
            <Redirect
              to={{
                pathname: "/login/",
                state: { from: props.location }
              }}
            />
          )
        }
      />
    )
}

class App_ extends React.Component {

   
    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <PrivateRoute exact path='/' component={App} />
                    <PrivateRoute exact path='/orders/:id' component={OrderView} />
                    <Route exact path='/login/' component={AuthView} />
                </Switch>
            </BrowserRouter>
        )
    }
}


ReactDOM.render(<App_ />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
