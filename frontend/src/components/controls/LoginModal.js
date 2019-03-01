import React, { Component } from 'react'
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Modal, Button } from 'react-bootstrap';
import { Field, reduxForm } from 'redux-form';
import InputText from './formControls/InputText';
import { required, email, minLength8 } from './formControls/validators';
import { routeCodes } from '../../constants/routes';
import history from '../../config/history';


class LoginModal extends Component {
  handleClose = (e, url) => {
    // e.preventDefault();
    history.push(url)
  }

  render() {
    const { handleSubmit } = this.props;
    return (
      <Modal
        show
        onHide={(e) => this.handleClose(e, routeCodes.HOME)}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Login
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit}>
            <Field
              name="email"
              type="text"
              class_name="fields"
              component={InputText}
              label="Email"
              placeholder="Enter your email address"
              validate={[required, email]}
            />
            <Field
              name="password"
              type="password"
              class_name="fields"
              component={InputText}
              label="Password"
              placeholder="Enter your password"
              validate={[required, minLength8]}
            />
            <div className="form-button">
              <Button className="submit-btn" type="submit"> Submit </Button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    )
  }
}

LoginModal = reduxForm({
  form: 'loginForm', // a unique identifier for this form
  enableReinitialize: true
})(LoginModal);

const mapStateToProps = ((state) => {
  return {
  }
})

LoginModal = connect(mapStateToProps)(LoginModal);

export default withRouter(LoginModal);
