import React, { Component } from "react";
import { Nav, NavItem, Navbar, Badge } from "react-bootstrap";

export default class Menu extends Component {
  render() {
    return (
      <Navbar inverse fixedTop>
        <Navbar.Header>
          <Navbar.Brand />
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav>
            <NavItem eventkey={1} href="/about">
              about
            </NavItem>
            <NavItem eventKey={2} href="/contacts">
              contacts
            </NavItem>
          </Nav>
          <Nav pullRight>
            <NavItem eventKey={1} href="/admin">
              admin
            </NavItem>
            <NavItem eventkey={2} href="/cart">
              cart <Badge className="badge">1 </Badge>
            </NavItem>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}
