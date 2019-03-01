import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { routeCodes } from '../../constants/routes';
import history from '../../config/history';
import ProfileModal from '../controls/ProfileModal';
import { editProfile } from '../../redux/actions/updateProfile';
import { getAllUsers } from '../../redux/actions/getAllUsers';
import { resetModal } from '../../redux/actions/handleModal';

class EditProfile extends Component {

    submit = (values) => {
        let data = {
            first_name: values.first_name,
            last_name: values.last_name
        }
        let { dispatch } = this.props;
        dispatch(editProfile(data));
        dispatch(getAllUsers());
        dispatch(resetModal());
        history.push(routeCodes.ALLUSERS);
    }

    render() {
        let { data } = this.props;
        return (
            <Fragment>
                <ProfileModal onSubmit={this.submit} data={data} />
            </Fragment>
        );
    }
    
}
const mapStateToProps = ((state) => {
    let { data } = state.handleModal;
    let { ploading } = state.editProfile;
    return {
        data,
        ploading
    }
})

EditProfile = connect(mapStateToProps)(EditProfile);
export default withRouter(EditProfile);
