import {
    RESET_STATE,
    SET_ACCOUNT,
    SET_AUTHENTICATION,
    SET_TOKEN,
} from "../storeconstants.js";

function getDefaultState() {
    return {
        authenticated: false,
        account: "",
        token: null,
    }
}

export default {
    [SET_AUTHENTICATION](state,authenticated){
        state.authenticated = authenticated;
    },
    [SET_ACCOUNT](state,account){
        state.account = account;
    },
    [SET_TOKEN](state,token){
        state.token = token;
    },
    [RESET_STATE](state){
        Object.assign(state,getDefaultState());
    },
}