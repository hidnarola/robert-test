import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { routeCodes } from '../../constants/routes';
import { Modal } from 'react-bootstrap';
import history from '../../config/history';
import { resetModal } from '../../redux/actions/handleModal';
import defaultImage from '../../assets/images/user_one.png';
import { SERVER_URL } from '../../api';

class UserModal extends Component {
    handleClose = (e, url) => {
        // e.preventDefault();
        let { dispatch } = this.props;
        dispatch(resetModal())
        history.push(url)
    }

    render() {
        let { data } = this.props;
        return (
            <Fragment>
                <Modal
                    show
                    onHide={(e) => this.handleClose(e, routeCodes.ALLUSERS)}
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                    className="user-details"
                >
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                            Welcome {data.first_name} {data.last_name}
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <img
                            alt="user_img"
                            src={`${SERVER_URL}${data.image}`}
                            onError={(e) => {
                                e.target.src = defaultImage
                            }} />
                        <h5>
                            {data.first_name} {data.last_name}
                        </h5>
                    </Modal.Body>
                </Modal>
            </Fragment>
        );
    }
}

const mapStateToProps = ((state) => {
    let { data } = state.handleModal;
    return {
        data
    }
})

UserModal = connect(mapStateToProps)(UserModal);
export default withRouter(UserModal);
