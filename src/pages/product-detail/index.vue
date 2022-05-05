<template>
  <div class="container">
    <!-- 轮播图 -->

    <div class="swiper">
      <el-carousel height="175px" indicator-position="outside">
        <el-carousel-item v-for="image in productImages" :key="image">
          <img :src="image" />
        </el-carousel-item>
      </el-carousel>
      <div class="product-name">{{ product.title }}</div>
      <div class="price">￥{{ product.price }}</div>
    </div>
    <!-- 产品承诺 -->
    <div class="promise">
      <div
        class="promise-item"
        v-for="promise in productPromise"
        :key="promise.id"
      >
        <img :src="promise.imgUrl" class="img" />
        <div class="text">{{ promise.text }}</div>
      </div>
    </div>
    <!-- 最近购买 -->
    <div class="recent-buy">
      <div class="header">
        <div class="left">
          <span class="recent-text">最近购买</span>
          <span class="buy-number">({{ paySuccessCustomers.total || 0 }})</span>
        </div>
        <div class="right">
          <span class="all">全部</span>
          <img
            src="https://qgt-style.oss-cn-hangzhou.aliyuncs.com/img/course/f8/4/25.png"
            class="img"
          />
        </div>
      </div>
      <ul class="buyer-list">
        <li v-for="buyer in paySuccessCustomers.buyers || []" :key="buyer.id">
          <img :src="buyer.icon" class="avator" />
          <span class="name">{{ buyer.name }}</span>
          <span class="size">{{ buyer.size }}</span>
          <span class="price">{{ buyer.price }}</span>
          <span class="time">{{ buyer.buyTime }}</span>
        </li>
      </ul>
    </div>
    <!-- 立即购买 -->
    <div class="buy">
      <div class="btn" @click="onShow(true)">立即购买</div>
    </div>
  </div>
  <sku :onShow="onShow" :isShow="isShow" :productId="product.id" />
</template>

<script setup>
import { computed, onMounted } from "vue";
import { useRoute } from "vue-router";
import { ref } from "vue";
// 接口
import {
  getPorduct,
  queryPaySuccessCustomer,
  getProductPromise,
} from "@/api/product";
// 组件
import sku from "./components/sku.vue";

const route = useRoute();
const product = ref({});
const paySuccessCustomers = ref({});
const productPromise = ref({});
const isShow = ref(false);

onMounted(async () => {
  const { productId } = route.query;
  product.value = await getPorduct({ id: productId });
  paySuccessCustomers.value = await queryPaySuccessCustomer();
  productPromise.value = await getProductPromise();
});

const productImages = computed(
  () =>
    (product.value.productImages && product.value.productImages.split(";")) ||
    []
);
function onShow(show) {
  isShow.value = show;
}
</script>

<style lang="scss" scoped>
ul,
li {
  margin: 0;
  padding: 0;
  list-style: none;
}
.container {
  background: #f5f5f9;
  .swiper {
    background: #ffffff;
    margin-bottom: 5px;
    padding: 50px 0 50px;
    img {
      width: 255px;
      height: 175px;
    }
    .product-name {
      font-size: 16px;
      line-height: 22px;
      color: #1a1a1a;
      margin-bottom: 20px;
      margin-top: 15px;
    }
    .price {
      font-weight: 600;
      font-size: 22px;
      line-height: 31px;
      color: #1e1e1e;
    }
  }
  .promise {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px 29px;
    background-color: #fff;
    margin: 5px 0;
    .promise-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      .img {
        width: 30px;
        height: 30px;
        margin-bottom: 8px;
      }
      .text {
        font-size: 12px;
        line-height: 17px;
        color: #1e1e1e;
      }
    }
  }
  .recent-buy {
    background-color: #fff;
    padding: 20px;
    margin-bottom: 5px;
    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 22px;
      .left {
        display: flex;
        align-items: baseline;
        .recent-text {
          font-weight: 500;
          font-size: 16px;
          line-height: 22px;
          color: #1e1e1e;
        }
        .buy-number {
          font-weight: 500;
          font-size: 12px;
          line-height: 17px;
          color: #bebebe;
          margin-left: 5px;
        }
      }
      .right {
        display: flex;
        align-items: center;
        .all {
          font-size: 12px;
          line-height: 17px;
          color: #1e1e1e;
          opacity: 0.4;
        }
        .img {
          width: 6px;
          height: 10px;
          margin-left: 5px;
        }
      }
    }
    .buyer-list {
      li {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 10px;
        font-size: 12px;
        line-height: 17px;
        color: #1e1e1e;
        &:last-child {
          margin-bottom: 0;
        }
        span {
          flex: 1;
          text-align: left;
        }
        .avator {
          flex: none;
          width: 20px;
          height: 20px;
          margin-right: 10px;
          border-radius: 50%;
        }
        .time {
          text-align: right;
        }
      }
    }
  }
  .buy {
    background: #ffffff;
    padding: 20px;
    .btn {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 46px;
      background: #01cbcc;
      font-weight: 500;
      font-size: 17px;
      color: #ffffff;
    }
  }
}
</style>
