import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';
import { isLogin, isLoginRole } from '../../helpers/func';
import { routeCodes } from '../../constants/routes';

class Home extends Component {
    
    render() {
        return (
            <div className="welcome">
                <h1>Welcome</h1>
                <h5>Please Login to view profile card</h5>
            </div>
        );
    }
    componentDidMount() {
        if (isLogin()) {
            if (isLoginRole()) {
                let data = isLoginRole();
                if (data && data.role === 'client') {
                    this.props.history.push(routeCodes.ALLUSERS);
                } else {
                    this.props.history.push(routeCodes.HOME);
                }
            }
        }
    }
    
}

export default withRouter(Home);