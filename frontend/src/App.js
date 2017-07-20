import React from 'react'
import logo from './logo.svg'
import './App.css'
import PropTypes from 'prop-types';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';

const logoutUrl = `${process.env.REACT_APP_API_URL}/auth/login/`

const App = props => (
  <div className="App">
    <Navbar inverse collapseOnSelect>
      <Navbar.Header>
        <Navbar.Brand>
          <img src={logo} className="App-logo" alt="logo" />
        </Navbar.Brand>
        <Navbar.Brand>
          <a href="/">Dust</a>
        </Navbar.Brand>
      </Navbar.Header>
      <Navbar.Collapse>
        <Nav>
          <NavItem eventKey={1} href="#">Integrations</NavItem>
          <NavDropdown eventKey={3} title="Wallet" id="basic-nav-dropdown">
            <MenuItem eventKey={3.1}>Etherum</MenuItem>
            <MenuItem eventKey={3.2}>Bitcoin</MenuItem>
            <MenuItem eventKey={3.3}>Litecoin</MenuItem>
            <MenuItem divider />
            <MenuItem eventKey={3.3}>Want another coin?</MenuItem>
          </NavDropdown>
        </Nav>
        <Nav pullRight>
          <NavItem eventKey={2} href={logoutUrl}>Signout</NavItem>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
    <section className="App-body">
      {props.children}
    </section>
  </div>
)

App.propTypes = {
  children: PropTypes.node,
}

export default App
