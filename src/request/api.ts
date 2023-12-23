import request from "./index"

// 请求中： 请求参数和返回值的类型都需要进行约束

// 验证码请求
export const CaptchaAPI = (params:Object):Promise<CaptchaAPIRes> =>request.get("/api/front/codeImage/get?key="+params.imageCodeKey+"&_="+Date.now(),{
    responseType: "arraybuffer",
  });
// uuid
export const GetUuidAPI = ():Promise<CaptchaAPIRes> =>request.get("/api/front/codeImage/uuid");
// 登录请求
// export const LoginAPI = (params:LoginAPIReq):Promise<LoginAPIRes> =>request.post("/prod-api/login",params);
export const LoginAPI = (params:LoginAPIReq):Promise<LoginAPIRes> =>request.post("/api/employee/login",params);
