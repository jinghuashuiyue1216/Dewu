import requests from "@/utils/http";

/**
 * @description 登录
 * @param {*} name
 * @param {*} password
 * @returns {}
 */
async function login({ name, password } = {}) {
  const result = await requests({
    url: "/login",
    data: { name, password },
    method: "POST",
  });
  return result;
}

/**
 * @description 注册
 * @param {*} name
 * @param {*} password
 * @returns
 */
async function regist({ name, password } = {}) {
  const result = await requests({
    url: "/register",
    method: "post",
    data: { name, password },
  });
  return result;
}

export { login, regist };
