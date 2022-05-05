<template>
  <div>
    <div class="order">
      <div class="get-address">
        <img
          src="https://qgt-style.oss-cn-hangzhou.aliyuncs.com/img/course/dewu/address.png"
          class="address-logo"
        />
        <span>线下门店自提</span>
      </div>
      <div class="products-short">
        <img :src="product.productLogo" class="product-pic" />
        <div class="introduce-part">
          <div class="product-name">{{ product.title }}</div>
          <div class="size-number">{{ product.size }} 数量X1</div>
          <div class="price">￥ {{ product.price }}</div>
        </div>
      </div>
      <div class="pay">
        <div class="left">
          <img
            src="https://qgt-style.oss-cn-hangzhou.aliyuncs.com/img/course/dewu/zhi.png"
            class="zhi"
          />
          <span class="zhi-pay">支付宝支付</span>
        </div>
        <img
          src="https://qgt-style.oss-cn-hangzhou.aliyuncs.com/img/course/dewu/check.png"
          class="icon"
        />
      </div>
      <div class="statements">
        <div
          class="statement"
          v-for="(statement, index) in statements"
          :key="index + 'statement'"
        >
          {{ statement }}
        </div>
      </div>
      <div class="submit-order">
        <div class="left">
          <div class="sub-text">实付款：</div>
          <div class="sub-price">￥{{ product.price }}</div>
        </div>
        <div class="right" @click="buy">提交订单</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { order } from "@/api/order";
import { useStore } from "vuex";
import { ElMessage } from "element-plus";
import { getPorduct } from "@/api/product";
import { useRouter } from "vue-router";

const statements = ref([
  "1、若买家未在36小时内发货导致交易关闭，您将获得47.95元现金及总计人民币170元的满减优惠券补偿。",
  "2、每件交易商品均由平台针对实物进行鉴别，鉴于产品价格波动性，同事每个款式每个尺码的商品出售时仅有一件等情况，故不支持退还差价。",
  "3、温馨提示：商品价格由市场供需决定，可能存在波动，请理性消费。",
  "4、企业商家ID：B231405117，支持七天无理由退货。拆封后不支持退货。",
  "提交订单即表示同意买家须知",
]);
const store = useStore();
const router = useRouter();
const productId = store.getters["order/getCars"][0];
const product = ref({});

onMounted(async () => {
  product.value = await getPorduct({ id: productId });
});

async function buy() {
  const res = await order({ productId });
  if (res) {
    store.commit("order/removeProduct", productId);
    ElMessage.success({ message: "订单提交成功", center: true });
    setTimeout(() => {
      router.push({ path: "/result" });
    }, 2000);
  } else {
    ElMessage.error({ message: "订单提交失败", center: true });
    console.log(productId);
  }
}
</script>

<style lang="scss" scoped>
.order-loading {
  height: calc(100vh - 40px);
  padding-bottom: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.order {
  .get-address {
    height: 58px;
    width: 100%;
    padding: 15px 25px;
    display: flex;
    background: #ffffff;
    align-items: center;
    margin-bottom: 10px;
    .address-logo {
      width: 28px;
      height: 28px;
      margin-right: 10px;
    }
    span {
      font-size: 14px;
      line-height: 20px;
      color: #1a1a1a;
    }
  }
  .products-short {
    display: flex;
    padding: 10px 20px;
    margin-bottom: 10px;
    height: 120px;
    width: 100%;
    background: #ffffff;
    align-items: center;
    .product-pic {
      width: 95px;
      height: 65px;
      margin-right: 20px;
    }
    .introduce-part {
      .product-name {
        text-align: left;
        font-size: 16px;
        line-height: 22px;
        color: #1a1a1a;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
      }
      .size-number {
        margin: 7px 0 10px;
        text-align: left;
        font-size: 12px;
        line-height: 17px;
        color: #1a1a1a;
        opacity: 0.4;
      }
      .price {
        text-align: left;
        font-size: 15px;
        line-height: 21px;
        color: #1a1a1a;
      }
    }
  }
  .pay {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 48px;
    width: 100%;
    padding: 0 20px;
    background: #ffffff;
    margin-bottom: 10px;
    .left {
      display: flex;
      align-items: center;
      .zhi {
        width: 24px;
        height: 24px;
        margin-right: 15px;
      }
      .zhi-pay {
        font-size: 14px;
        color: #424242;
      }
    }
    .icon {
      width: 16px;
      height: 16px;
    }
  }
  .statements {
    padding: 20px;
    background: #ffffff;
    .statement {
      text-align: left;
      font-size: 12px;
      line-height: 17px;
      color: #878796;
      margin-bottom: 10px;
      &:last-child {
        margin-bottom: 0;
      }
    }
  }
  .submit-order {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    height: 64px;
    background: #ffffff;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 20px;
    .left {
      display: flex;
      align-items: center;
      font-weight: 500;
      font-size: 14px;
      line-height: 20px;
      color: #ff5353;
    }
    .right {
      width: 108px;
      height: 43px;
      background: #00c2c3;
      text-align: center;
      font-weight: 500;
      font-size: 15px;
      line-height: 43px;
      color: #ffffff;
    }
  }
}
</style>
