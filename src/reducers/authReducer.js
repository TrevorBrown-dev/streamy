import { SIGN_IN, SIGN_OUT } from '../actions/types';

const INITIAL_STATE = {
    isSignedIn: null,
    userId: null,
    profile: null
}

export default (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case SIGN_IN:
            return {...state, isSignedIn: true, userId: action.payload.userId, profile: action.payload.profile};
        
        case SIGN_OUT:
            return {...state, isSignedIn: false, userId: null, profile: null};
        
        default: return state;
    }
}