<template>
  <div class="mock" v-if="isShow">
    <div class="sku">
      <div class="top">
        <img :src="sku.productImage" class="img" />
        <div class="right">
          <div class="price">￥{{ choosedSku.price || "----" }}</div>
          <div class="logo-choose">
            <img
              src="https://qgt-style.oss-cn-hangzhou.aliyuncs.com/img/course/f8/5/1.png"
              class="img"
            />
            <span class="choose-num">{{
              isChoosedSku ? `已选择 ${choosedSku.size}` : "请选择商品"
            }}</span>
          </div>
        </div>
        <div class="close" @click="onShow(false)"></div>
      </div>
      <div class="bottom">
        <ul class="size-list">
          <li
            v-for="(product, index) in sku.products"
            :key="product.id"
            @click="choosesku(index)"
          >
            <div :class="['item', { 'item-choosed': currentIndex === index }]">
              <span class="size">{{ product.size }}</span>
              <span class="price">￥{{ product.price }}</span>
            </div>
          </li>
        </ul>
      </div>
      <div class="order" v-if="isChoosedSku">
        <div class="item two-days" @click="goOrder">
          <span class="price">￥{{ choosedSku.price || 0 }}</span>
          <div class="line"></div>
          <div class="arrive">约2天到</div>
          <div class="send-way">闪电发货</div>
        </div>
        <div class="item five-days" @click="goOrder">
          <span class="price">￥{{ choosedSku.price || 0 }}</span>
          <div class="line"></div>
          <div class="arrive">约5天到</div>
          <div class="send-way">普通发货</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { getProductSKU } from "@/api/product";
import { computed, defineProps, onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { getStorage } from "@/utils/storage";
import { isObjectEmpty } from "@/utils/empty";

const props = defineProps({
  onShow: Function,
  isShow: { type: Boolean, default: false },
  productId: String,
});

const router = useRouter();
const store = useStore();
const sku = ref({});
const choosedSku = ref({});
const currentIndex = ref(-1);

const isChoosedSku = computed(
  () => choosedSku.value && Object.keys(choosedSku.value).length > 0
);

onMounted(async () => {
  sku.value = await getProductSKU();
});

function choosesku(index) {
  currentIndex.value = index;
  choosedSku.value = sku.value.products[index];
}

function goOrder() {
  store.commit("order/addCars", props.productId);
  const userInfo = getStorage("user");
  if (isObjectEmpty(userInfo)) {
    router.push({ path: "/guide" });
  } else {
    router.push({ path: "/order", query: { productId: props.productId } });
  }
}
</script>

<style lang="scss" scoped>
ul,
li {
  margin: 0;
  padding: 0;
  list-style: none;
}
* {
  box-sizing: border-box;
}
.mock {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 2;
  background-color: rgba(0, 0, 0, 0.5);
  .sku {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    height: 585px;
    display: flex;
    flex-direction: column;
    .top {
      position: relative;
      flex: none;
      display: flex;
      align-items: center;
      height: 113px;
      padding: 20px 12px 28px;
      background-color: #fff;
      .img {
        width: 95px;
        height: 65px;
        margin-right: 18px;
      }
      .right {
        flex: 1;
        height: 100%;
        padding: 4px 0;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: flex-start;
        .price {
          font-weight: 500;
          font-size: 16px;
          line-height: 22px;
          color: #1a1a1a;
        }
        .logo-choose {
          display: flex;
          align-items: center;
          .img {
            width: 16px;
            height: 16px;
            margin-right: 10px;
          }
          .choose-num {
            font-size: 12px;
            color: #1a1a1a;
            opacity: 0.4;
          }
        }
      }
      .close {
        position: absolute;
        right: 20px;
        top: 25px;
        width: 12px;
        height: 12px;
        background: url(https://qgt-style.oss-cn-hangzhou.aliyuncs.com/img/course/f8/5/2.png)
          no-repeat center / contain;
      }
    }
    .bottom {
      flex: 1;
      background: #f3f3f6;
      padding: 10px;
      .size-list {
        display: flex;
        flex-wrap: wrap;
        max-height: 371px;
        overflow-y: scroll;
        li {
          width: 25%;
          margin-bottom: 10px;
          .item {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            background-color: #fff;
            width: 81px;
            height: 81px;
            .size {
              margin-bottom: 6px;
              font-weight: 500;
              font-size: 17px;
              line-height: 24px;
              color: #1a1a1a;
            }
            .price {
              font-size: 12px;
              line-height: 17px;
              color: #1a1a1a;
              opacity: 0.4;
            }
          }
          .item-choosed {
            border: 2px solid #000000;
          }
        }
      }
    }
    .order {
      position: fixed;
      left: 0;
      right: 0;
      bottom: 0;
      height: 90px;
      padding: 10px;
      background-color: #fff;
      display: flex;
      .item {
        flex: 1;
        height: 100%;
        color: #ffffff;
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;
        .price {
          font-weight: 600;
          font-size: 22px;
          line-height: 31px;
        }
        .line {
          width: 1px;
          height: 14px;
          background: #ffffff;
          margin: 0 12px;
        }
        .arrive {
          font-weight: 600;
          font-size: 14px;
          line-height: 20px;
        }
        .send-way {
          position: absolute;
          right: 0;
          top: 0;
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 2px 3px;
          font-weight: 600;
          font-size: 8px;
          color: #ffffff;
          background: rgba(255, 255, 255, 0.2);
        }
      }
      .two-days {
        background: #0b0b0b;
        margin-right: 7px;
      }
      .five-days {
        background: #00c2c3;
      }
    }
  }
}
</style>
