import React from 'react';
import { Navbar, Nav} from 'react-bootstrap'
import { withRouter } from 'react-router-dom';

class NavBar extends React.Component {
    state = {  }
    render() { 
        return ( 
            <Navbar style={{"background": "#B9B9B9"}}  expand="lg">
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="mr-auto">
                <Nav.Link href="/">Home</Nav.Link>
                {this.props.user ? <Nav.Link href="/leagues">Leagues</Nav.Link> : <Nav.Link style={{"textAlign": "right"}} href="/signup">Sign-Up</Nav.Link>}
                {this.props.user ? <Nav.Link style={{"textAlign": "right"}} onClick={this.props.logoutHandler}>LogOut</Nav.Link> : <Nav.Link style={{"textAlign": "right"}} href="/login">Log-In</Nav.Link>}
              </Nav>
            </Navbar.Collapse>
          </Navbar>
      )
    }
}

export default withRouter(NavBar)