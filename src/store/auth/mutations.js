import {
    SET_ACCOUNT,
    SET_AUTHENTICATION,
} from "../storeconstants.js";

export default {
    [SET_AUTHENTICATION](state,authenticated){
        state.authenticated = authenticated;
    },
    [SET_ACCOUNT](state,account){
        state.account = account;
    },
}