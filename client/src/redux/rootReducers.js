import {combineReducers} from 'redux';

// import chatReducer from './reducers/chatReducer'
import userReducer from './reducers/userReducer';

const rootReducer = combineReducers({
    userState : userReducer
})

export default rootReducer;