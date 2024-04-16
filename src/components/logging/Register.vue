<script>
import serviceApi from "../../request/request.js";
import {onMounted,ref} from "vue";
import { useRouter } from "vue-router";
import {uiGetDtlCodeDesc, uiRegisterUser} from "../../api/api.js";
import {countryStr} from "../constant/constant.js";
import showMessage from "../message/message.js";

export default {
  name: "register",
  setup() {
    const account = ref(undefined);
    const password = ref(undefined);
    const confirmPassword = ref(undefined);
    const userName = ref(undefined);
    const birthday = ref(undefined);
    const sex = ref("M");
    const country = ref(undefined);

    let codeDtlOptions = ref([]);

    const router = useRouter();

    onMounted(async () => {
      const resCodeDtl = await serviceApi.get(`${uiGetDtlCodeDesc}${countryStr}`)
      codeDtlOptions.value = resCodeDtl.data;
    })

    const register = async () => {
      let patMap = {
        account: account.value,
        password: password.value,
        confirmPassword: confirmPassword.value,
        userName: userName.value,
        birthday: birthday.value,
        sex: sex.value,
        country: country.value,
      }
      const registerData = await serviceApi.post(uiRegisterUser,patMap)
      if(registerData.status === 200){
        showMessage(registerData.data,"success")
        goBack();
      }
    };

    const goBack = () => {
      router.push("/");
    };

    return {
      account,
      password,
      confirmPassword,
      userName,
      birthday,
      sex,
      country,
      codeDtlOptions,
      register,
      goBack,
    }
  },
}
</script>

<template>
  <el-form label-position="right" label-width="80px" @submit.prevent>
    <el-form-item class="wordStytle">註冊</el-form-item>
      <el-form-item label="帳號 : ">
        <el-input v-model="account"/>
      </el-form-item>
      <el-form-item label="密碼 : ">
        <el-input v-model="password" show-password/>
      </el-form-item>
      <el-form-item label="密碼確認 : ">
        <el-input v-model="confirmPassword" show-password/>
      </el-form-item>
      <el-form-item label="姓名 : ">
        <el-input v-model="userName"/>
      </el-form-item>
      <el-form-item label="生日 : ">
        <el-date-picker
            v-model="birthday"
            type="date"
            placeholder="請選擇"
            format="YYYY-MM-DD"
            value-format="YYYY-MM-DD"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label="性別 : ">
        <el-radio-group v-model="sex">
          <el-radio value="M">男</el-radio>
          <el-radio value="F">女</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="國籍 : ">
        <el-select v-model="country" placeholder="請選擇">
          <el-option
              v-for="(item,index) in codeDtlOptions"
              :key="index"
              :label="item.codeDesc"
              :value="item.code"
              :disabled="item.disabled"
          />
        </el-select>
      </el-form-item>
      <el-button @click="register">註冊</el-button>
      <el-button @click="goBack">返回</el-button>
  </el-form>
</template>

<style scoped>
.wordStytle {
  font-weight: bold;
  text-align: center;
  font-size: large;
}
</style>