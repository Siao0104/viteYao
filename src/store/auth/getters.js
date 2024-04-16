import {
    IS_USER_AUTHENTICATED,
    GET_ACCOUNT
} from "../storeconstants.js";

export default {
    [IS_USER_AUTHENTICATED](state){
        return state.authenticated;
    },

    [GET_ACCOUNT](state){
        return state.account;
    }
}