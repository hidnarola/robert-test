import { combineReducers } from 'redux';
import { reducer as reduxFormReducer } from 'redux-form';
import getLogin from './login';
import getAllUsers from './getAllUsers';
import handleModal from './handleModal';
import editProfile from './editProfile';
import uploadImage from './uploadImage';

export default combineReducers({
    form: reduxFormReducer,
    getLogin,
    getAllUsers,
    handleModal,
    editProfile,
    uploadImage
});