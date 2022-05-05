import requests from "@/utils/http";

/**
 * @description 获取商品列表
 * @param {*} 无参数
 * @returns {}
 */
async function queryProducts({ url } = {}) {
  const result = await requests({
    url: url,
    method: "GET",
  });
  return result && result.data;
}

/**
 * @description 获取商品详情
 * @param {*} productId
 * @returns {}
 */
async function getPorduct({ id } = {}) {
  const res = await requests({
    url: "/product/get",
    params: { id },
  });
  return res && res.data;
}

/**
 * @description 获取购买成功客户
 * @returns {}
 */
async function queryPaySuccessCustomer() {
  const res = await requests({ url: "/order/queryrecentpaysuccess" });
  return res && res.data;
}

/**
 * @description 获取产品承诺
 * @returns {}
 */
async function getProductPromise() {
  const res = await requests({ url: "/product/promise" });
  return res && res.data;
}

/**
 * @description 获取商品SKU
 * @returns {}
 */
async function getProductSKU() {
  const res = await requests({ url: "/product/sku" });
  return res && res.data;
}

export {
  queryProducts,
  getPorduct,
  queryPaySuccessCustomer,
  getProductPromise,
  getProductSKU,
};
