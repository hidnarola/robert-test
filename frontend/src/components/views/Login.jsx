import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import LoginModal from '../controls/LoginModal';
import { routeCodes } from '../../constants/routes';
import { toast } from 'react-toastify';
import history from '../../config/history';
import { getLogin } from '../../redux/actions/login';

class Login extends Component {

    submit = (values) => {
        let {dispatch} = this.props;
        dispatch(getLogin(values));
    }

    render() {
        return (
            <LoginModal onSubmit={this.submit} />
        );
    }
    
    componentDidUpdate(prevProps, prevState) {
        let {loading, data, error} = this.props;
        if(!loading && prevProps.loading !== loading) {
            if(data && prevProps.data !== data) {
                toast.success('LoggedIn Successfully')
                history.push(routeCodes.ALLUSERS)
            }
            if(error && prevProps.error !== error) {
                toast.error(error.message)
                history.push(routeCodes.HOME)
            }
        }
    }
    
}
const mapStateToProps = ((state) => {
    let {loading, data, error} = state.getLogin;
    return {
        loading,
        data,
        error
    }
})

Login = connect(mapStateToProps)(Login);
export default withRouter(Login);
