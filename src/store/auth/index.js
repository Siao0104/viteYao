import mutations from "./mutations.js";
import getters from "./getters.js";

export default {
    namespaced: true,
    state() {
        return {
            authenticated: false,
            account: "",
        }
    },
    mutations,
    getters
}