import axios from "axios";
import { localHost } from "../components/constant/constant.js"
import showMessage from "../components/message/message.js";

const serviceApi = axios.create({
    baseURL: localHost,
    withCredentials: false,
    timeout: 3000,
})

serviceApi.interceptors.request.use(
    config=>{
        console.log("攔截器發出成功request : ",config)
        const accessToken = localStorage.getItem("accessToken");
        if(accessToken){
            config.headers["Authorization"] = "Bearer " +accessToken;
        }
        return config;
    },error => {
        console.log("攔截器發出失敗request : ",error)
        return Promise.reject(error)
})

serviceApi.interceptors.response.use(
    res=>{
        console.log("攔截器回傳成功response : ",res)
        return res
    },error => {
        console.log("攔截器回傳失敗response : ",error)
        showMessage(error.response.data,"error");
        return Promise.reject(error)
})

export default serviceApi