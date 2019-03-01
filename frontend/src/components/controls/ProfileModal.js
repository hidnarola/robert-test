import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Modal, Button } from 'react-bootstrap';
import { Field, reduxForm } from 'redux-form';
import InputText from './formControls/InputText';
import { required, minLength3 } from './formControls/validators';
import { routeCodes } from '../../constants/routes';
import history from '../../config/history';
import { resetModal } from '../../redux/actions/handleModal';
import defaultImage from '../../assets/images/user_one.png';
import { SERVER_URL } from '../../api';
import { uploadImage } from '../../redux/actions/uploadImage';
import { toast } from 'react-toastify';
import { getAllUsers } from '../../redux/actions/getAllUsers';


class ProfileModal extends Component {
  handleClose = (e, url) => {
    // e.preventDefault();
    let { dispatch } = this.props;
    dispatch(resetModal())
    history.push(url)
  }

  handleChange = (e) => {
    e.preventDefault();
    let { dispatch } = this.props;
    let formData = new FormData();
    // formData.append('user_id', token.id);
    formData.append('image', e.target.files[0]);
    dispatch(uploadImage(formData)).then((res) => {
      dispatch(getAllUsers());
      dispatch(resetModal())
    }).catch(() => {
      //error
    });
  }
  render() {
    const { handleSubmit, data } = this.props;
    return (
      <Modal
        show
        onHide={(e) => this.handleClose(e, routeCodes.ALLUSERS)}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        backdrop="static"
        className="edit-details"
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Edit Profile
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <img
            alt="user_img"
            src={`${SERVER_URL}${data.image}`}
            onError={(e) => {
              e.target.src = defaultImage
            }}
          />
          <input type="file" name="image" id="my_doc_upload" onChange={(e) => this.handleChange(e)} />
          <form onSubmit={handleSubmit}>
            <Field
              name="first_name"
              type="text"
              class_name="fields"
              component={InputText}
              label="First Name"
              placeholder="Enter your first name"
              validate={[required, minLength3]}
            />
            <Field
              name="last_name"
              type="text"
              class_name="fields"
              component={InputText}
              label="Last Name"
              placeholder="Enter your last name"
              validate={[required, minLength3]}
            />
            <div className="form-button">
              <Button className="submit-btn" type="submit"> Update </Button>
              <Button className="submit-btn" onClick={(e) => this.handleClose(e, routeCodes.ALLUSERS)}> Cancel </Button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    )
  }
  componentDidMount() {
    let { data } = this.props;
    this.props.initialize(data)
  }

  componentDidUpdate(prevProps, prevState) {
    let { iloading, idata, ierror } = this.props;
    if (!iloading && prevProps.iloading !== iloading) {
      if (idata && prevProps.idata !== idata) {
        toast.success('image uploaded')
      }
      if (ierror && prevProps.ierror !== ierror) {
        console.log('ierror => ', ierror);
        toast.success('image not uploaded')
      }
    }
  }

}

ProfileModal = reduxForm({
  form: 'profileForm'
})(ProfileModal);

const mapStateToProps = ((state) => {
  let { iloading, idata, ierror } = state.uploadImage;
  return {
    iloading,
    idata,
    ierror
  }
})

ProfileModal = connect(mapStateToProps)(ProfileModal);

export default withRouter(ProfileModal);
