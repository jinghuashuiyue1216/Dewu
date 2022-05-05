<template>
  <div class="order-result">
    <img
      :src="`https://style.youkeda.com/img/course/f8/7/success.png`"
      alt=""
      class="img-decor"
    />
    <div class="text">支付成功</div>
    <div class="btn" @click="goBack">返回商品列表</div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";

const router = useRouter();
function goBack() {
  router.go(-3);
}
</script>

<style lang="scss" scoped>
.order-result {
  margin-top: 64px;
  padding: 0 30px;
  .img-decor {
    width: 140px;
    height: 110px;
    margin-bottom: 42px;
  }
  .text {
    font-size: 16px;
    line-height: 22px;
    text-align: center;
    color: #000000;
    margin-bottom: 40px;
  }
  .btn {
    width: 100%;
    height: 47px;
    font-weight: 500;
    font-size: 16px;
    text-align: center;
    line-height: 47px;
    margin-bottom: 30px;
    color: #ffffff;
    background: #00c2c3;
    border: 1px solid #00c2c3;
  }
}
</style>
