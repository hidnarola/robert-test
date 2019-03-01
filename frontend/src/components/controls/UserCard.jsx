import React, { Component, Fragment } from 'react';
import { connect } from "react-redux";
import { Card, Button } from "react-bootstrap";
import defaultImage from '../../assets/images/user_one.png';
import { getModal, getProfileModal } from '../../redux/actions/handleModal';
import { decodeJwtToken } from '../../helpers/func';
import { SERVER_URL } from '../../api';
import { FaPen } from "react-icons/fa";

class UserCard extends Component {
    handleModal = (e, id, image, first_name, last_name) => {
        e.preventDefault();
        let data = {
            id,
            image,
            first_name,
            last_name
        }
        let { dispatch } = this.props;
        dispatch(getModal(data))
    }
    handleEdit = (e, id, image, first_name, last_name) => {
        e.preventDefault();
        let { dispatch } = this.props;
        let data = {
            id,
            image,
            first_name,
            last_name
        }
        dispatch(getProfileModal(data))
    }
    render() {
        const { data } = this.props;
        let loggedUserTokenData = decodeJwtToken(localStorage.getItem('token'));
        return (
            <Fragment>
                <Card>
                    <a href="javascript:void(0)" onClick={(e) => this.handleModal(e, data._id, data.image, data.first_name, data.last_name)} className="product-details-link">
                        <div className="image-wrapper">
                            <Card.Img
                                variant="top"
                                src={`${SERVER_URL}${data.image}`}
                                onError={(e) => {
                                    e.target.src = defaultImage
                                }}
                            />
                        </div>
                        <Card.Body>
                            <Card.Title><div className={`online-badge ${(data._id === loggedUserTokenData.id) ? "active" : ""}`}></div>{data.first_name} {data.last_name}</Card.Title>
                        </Card.Body>
                    </a>
                    {data._id === loggedUserTokenData.id ?
                        <Button onClick={(e) => this.handleEdit(e, data._id, data.image, data.first_name, data.last_name)}><FaPen /></Button>
                        :
                        null
                    }
                </Card>
            </Fragment>
        );
    }
}

const mapStateToProps = ((state) => {
    let { status, id } = state.handleModal;
    return {
        status,
        id
    }
})

UserCard = connect(mapStateToProps)(UserCard);

export default UserCard;