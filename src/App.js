import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect  } from 'react-router-dom';
import Products from './views/Products/Products';
import ProductEdit from './views/ProductEdit/ProductEdit';
import ProductView from './views/Product/Product';
import ProductAdd from './views/ProductAdd/ProductAdd';

import { Provider } from './context';

class App extends Component {
  render () {
    return (
      <Provider>
        <Router>
          <div className="App">
            <div className="container">
              <Switch>
                <Route exact path="/products" component={Products}/>
                <Route exact path="/products/create" component={ProductAdd}/>
                <Route exact path="/products/:id" component={ProductView} />
                <Route exact path="/products/:id/edit" component={ProductEdit}/>
                <Redirect to="/products" />
              </Switch>
            </div>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
