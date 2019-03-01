import React, { Component, Fragment } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { routeCodes } from '../constants/routes';
import { decodeJwtToken } from '../helpers/func';

class UserRouter extends Component {
    render() {
        let token = localStorage.getItem('token');
        let data = null;
        if (token) {
            data = decodeJwtToken(token);
        }
        const { component: Component, ...rest } = this.props;
        return (
            <Route
                {...rest}
                render={() => {
                    if (token && data && data.role === 'client') {
                        return (
                            <Fragment>
                                <Component {...this.props} />
                            </Fragment>
                        )
                    } else {
                        return <Redirect to={routeCodes.HOME} />
                    }
                }}
            />
        );
    }
}

export default UserRouter;