<script>
import {SET_AUTHENTICATION, SET_ACCOUNT, SET_TOKEN} from "../../store/storeconstants.js";
import {onMounted, ref} from "vue";
import {useRouter} from "vue-router";
import {useStore} from "vuex";
import showMessage from "../message/message.js";
import serviceApi from "../../request/request.js";
import {uiUserLogging} from "../../api/api.js";
export default {
  name: "Logging",
  setup() {
    const account = ref("");
    const password = ref("");

    const router = useRouter();
    const store = useStore();

    onMounted(() => {

    })

    //登入
    const login = async () => {
      if(account.value!=="" && password.value!==""){
        let patMap = {
          account: account.value,
          password: password.value,
        }
        const loggingData = await serviceApi.post(uiUserLogging,patMap)
        if(loggingData.status === 200){
          store.commit(`auth/${SET_AUTHENTICATION}`, true);
          store.commit(`auth/${SET_ACCOUNT}`, loggingData.data.account);
          store.commit(`auth/${SET_TOKEN}`, loggingData.data.accessToken);
          localStorage.setItem("accessToken",loggingData.data.accessToken)
          router.push('/home');
        }
      }else{
        store.commit(`auth/${SET_AUTHENTICATION}`,false);
        showMessage("帳密不可為空!!","warning",5000);
      }
    };

    //註冊
    const registerPage = () => {
      router.push('/register');
    };

    return{
      account,
      password,
      login,
      registerPage
    }
  },
}
</script>

<template>
  <form name="login-form" @submit.prevent>
    <div class="mb-3">
      <label>帳號 : </label>
      <input v-model="account" type="text" />
    </div>
    <div class="mb-3">
      <label>密碼 : </label>
      <input v-model="password" type="password" />
    </div>
    <div class="mb-3">
      <button class="btn btn-outline-dark me-3" type="submit" @click="login">
        登入
      </button>
      <button class="btn btn-outline-dark" type="submit" @click="registerPage">
        註冊
      </button>
    </div>
  </form>
</template>

<style scoped>
label {
  margin-right: 10px; /* 根據需要調整間距大小 */
}
</style>