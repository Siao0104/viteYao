<script>
import { GET_ACCOUNT } from "../store/storeconstants.js";
import {uiGetAllCodeMst} from "../api/api.js";
import serviceApi from "../request/request.js";
import {useStore} from "vuex";

export default {
  name: "Welcome",
  setup() {

    const store = useStore();

    //取得已使用的帳號
    const getAccount = () => {
      return store.getters[`auth/${GET_ACCOUNT}`];
    }

    const test = async () => {
      const codeMstTest = await serviceApi.get(uiGetAllCodeMst);
      console.log(codeMstTest)
    }

    return {
      getAccount,
      test
    }
  },
}
</script>

<template>
  <h3>{{getAccount()+"Welcome"}}</h3>
  <button class="btn btn-outline-dark me-3" type="submit" @click="test">
    codeMst只有ADMIN可存取
  </button>
</template>

<style scoped>

</style>