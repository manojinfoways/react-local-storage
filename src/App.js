import React from 'react';
import './App.css';

import CreateOrder from './component/createOrder';
import ListOrder from './component/listOrder';
import { BrowserRouter, Route, Switch,NavLink } from 'react-router-dom';
import { Navbar,Nav,NavDropdown } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="wrapper">
      <BrowserRouter>
      
        <Navbar bg="light" expand="lg">
        <Navbar.Brand href="/">Daily Drinks</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
              <NavLink
                className="link"
                activeClassName="activeLink"
                to="/" exact>Create Order</NavLink>
              <NavLink
                className="link"
                activeClassName="activeLink"
                to="/list" exact>Oreder list</NavLink>
          </Nav>
        </Navbar.Collapse>
        </Navbar>
        <Switch>
          <Route path="/" exact component={CreateOrder}>
          </Route>
          <Route path="/list" exact component={ListOrder}>
          </Route>
          <Route path="/update/:id" exact component={CreateOrder}>
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;