<template>
  <div class="products-list">
    <div
      class="product"
      v-for="product in products"
      :key="product.id"
      @click="goDetail(product.id)"
    >
      <img :src="getImgUrl(product.product_imgs)" class="product-img" />
      <div class="name">{{ product.name }}</div>
      <div class="price-pays">
        <div class="price">￥{{ product.price }}</div>
        <div class="pays">{{ product.purchase_num }}人付款</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { queryProducts } from "@/api/product";
import { useRouter } from "vue-router";

const products = ref([]);
const router = useRouter();

onMounted(async () => {
  products.value = await queryProducts({ url: "/get/products" });
});

function getImgUrl(imgUrl) {
  return imgUrl.split(";")[0];
}

function goDetail(id) {
  router.push({ path: "/product-detail", query: { productId: id } });
}
</script>

<style lang="scss" scoped>
* {
  box-sizing: border-box;
}
.products-list {
  display: flex;
  flex-wrap: wrap;
  .product {
    width: 50%;
    padding: 30px 20px 20px;
    border-bottom: 1px solid #f5f5f5;
    border-right: 1px solid #f5f5f5;
    &:nth-child(2n) {
      border-right: none;
    }
    .product-img {
      width: 100%;
      margin-bottom: 30px;
    }
    .name {
      text-align: left;
      font-size: 12px;
      line-height: 17px;
      color: #1e1e1e;
      margin-bottom: 10px;
    }
    .price-pays {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 12px;
      line-height: 17px;
      .price {
        color: #1e1e1e;
      }
      .pays {
        color: #a6a6a6;
      }
    }
  }
}
</style>
