import requests from "@/utils/http";
import { getStorage } from "@/utils/storage";

/**
 * @description 购买商品
 * @param {*} userId
 * @param {*} productId
 * @returns
 */
async function order({ productId } = {}) {
  const userId = getStorage("user").userId;
  const result = await requests({
    url: "/buyproducts",
    method: "POST",
    data: { productId, userId },
  });
  return result && result.isSuccess;
}

export { order };
