/**         CodeMst API         **/
//代碼主檔列表
export const uiGetAllCodeMstPageable = "/springYao/codeMst/uiGetAllCodeMstPageable"
//新增/修改代碼主檔
export const uiSaveCodeMst = "/springYao/codeMst/uiSaveCodeMst"
//刪除代碼主檔
export const uiDeleteCodeMst = "/springYao/codeMst/uiDeleteCodeMst/"
//刪除代碼明細
export const uiDeleteCodeDtl = "/springYao/codeMst/uiDeleteCodeDtl/";
/**         CodeMst API         **/

/**         CodeDtl API         **/
//dropDown內容
export const uiGetDtlCodeDesc = "/springYao/codeDtl/uiGetDtlCodeDesc/";
//代碼明細列表
export const uiGetAllCodeDtlPageable = "/springYao/codeDtl/uiGetAllCodeDtlPageable";
/**         CodeDtl API         **/

//取得全部使用者(帳號)
export const uiGetAllUserByAccount = "/springYao/userBasic/uiGetAllUserByAccount/";

//取得全部使用者(郵箱)
export const uiGetAllUserByEmail = "/springYao/userBasic/uiGetAllUserByEmail/";

//註冊
export const uiRegisterUser = "/springYao/userBasic/uiRegisterUser";

//登入
export const uiUserLogging = "/springYao/userBasic/uiUserLogging";

//路由驗證token
export const uiCheckToken = "/springYao/userBasic/uiCheckToken";

//取得個人行事曆
export const uiGetAllCalendar = "/springYao/userCalendar/uiGetAllCalendar/"

//新增個人行事曆
export const uiAddOwnCalendar = "/springYao/userCalendar/uiAddOwnCalendar"

//刪除個人行事曆
export const uiDelOwnCalendar = "/springYao/userCalendar/uiDelOwnCalendar/"

//重定向到 Google OAuth 2.0 驗證頁面
export const uiRedirectToGoogleOAuth = "/springYao/Mail/uiRedirectToGoogleOAuth";

//檢查連結Token是否有效
export const uiCheckTokenDead = "/springYao/Mail/uiCheckTokenDead";