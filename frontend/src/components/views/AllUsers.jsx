import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getAllUsers } from '../../redux/actions/getAllUsers';
import UserCard from '../controls/UserCard';
import loader from '../../assets/svg/loading1.svg';
import UserModal from './UserModal';
import EditProfile from './EditProfile';
import { toast } from 'react-toastify';

class AllUsers extends Component {
    render() {
        let { loading, data, error, status, profileStatus } = this.props;
        return (
            <Fragment>
                {loading && <img alt="loader" src={loader} />}
                <div className="container">
                    <h3 className="page-heading">Users</h3>
                    <span className="hints">(Please hover the card to edit profile of logged in user)</span>
                    {!loading && data && data.length > 0 &&
                        <div className="row">
                            {data.map((d) => {
                                return (
                                    <div className="col-sm-4" key={d._id}>
                                        <UserCard data={d} />
                                    </div>
                                )
                            })}
                        </div>
                    }
                    {!loading && error && <h4>Something went wrong!please try again later</h4>}
                    {status && status === 1 ?
                        <UserModal />
                        :
                        null
                    }
                    {profileStatus && profileStatus === 1 ?
                        <EditProfile />
                        :
                        null
                    }
                </div>
            </Fragment>
        );
    }
    componentDidMount() {
        let { dispatch } = this.props;
        dispatch(getAllUsers());
    }

    componentDidUpdate(prevProps, prevState) {
        let { ploading, pdata, perror } = this.props;
        if (!ploading && prevProps.ploading !== ploading) {
            if (pdata && prevProps.pdata !== pdata) {
                toast.success('Profile Updated');
            }
            if (perror && prevProps.perror !== perror) {
                perror.map((e) => (
                    toast.error(e)
                )
                )
            }
        }
    }
}

const mapStateToProps = ((state) => {
    let { loading, data, error } = state.getAllUsers;
    let { status, profileStatus } = state.handleModal;
    let { ploading, pdata, perror } = state.editProfile;
    return {
        loading,
        data,
        error,
        profileStatus,
        status,
        ploading,
        pdata,
        perror,
    }
})

AllUsers = connect(mapStateToProps)(AllUsers);
export default withRouter(AllUsers);
