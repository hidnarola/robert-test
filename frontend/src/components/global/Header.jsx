import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Navbar, Nav, Button } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import { routeCodes } from '../../constants/routes';
import history from '../../config/history';

class Header extends Component {
    handleNavigation = (e, url) => {
        e.preventDefault();
        history.push(url);
    }
    handleLogin = (e, url) => {
        e.preventDefault();
        history.push(url);
    }
    render() {
        let { loading, data } = this.props;
        return (
            <div>
                <Navbar bg="dark" variant="dark" expand="lg">
                    <Navbar.Brand href="/" onClick={(e) => this.handleNavigation(e, routeCodes.HOME)}>Demo Project</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav>
                            {!loading && !data && <Button onClick={(e) => this.handleLogin(e, routeCodes.LOGIN)}>Login</Button>}
                            {!loading && data && <Button>Logout</Button>}
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </div>
        );
    }
}

const mapStateToProps = ((state) => {
    let { loading, data } = state.getLogin;
    return {
        loading,
        data
    }
})

Header = connect(mapStateToProps)(Header);
export default withRouter(Header);