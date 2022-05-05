<template>
  <div class="log-out">
    <img
      class="logo"
      src="https://qgt-style.oss-cn-hangzhou.aliyuncs.com/img/course/dewu/dewu-logo.png"
    />
    <img
      class="slogan"
      src="https://qgt-style.oss-cn-hangzhou.aliyuncs.com/img/course/dewu/ads-text.png"
    />
    <div class="login-btn" @click="goPage('login')">用户登录</div>
    <div class="register-btn" @click="goPage('regist')">用户注册</div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";

const router = useRouter();
function goPage(pageName) {
  router.replace({ path: "/login", query: { pageName } });
}
</script>

<style lang="scss" scoped>
.log-out {
  max-width: 500px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0 20px;
  margin: 0 auto;
  margin-top: 98px;
  .logo {
    width: 62px;
    height: 62px;
    margin-bottom: 20px;
  }
  .slogan {
    width: 171px;
    height: 23px;
    margin-bottom: 72px;
  }
  .login-btn {
    width: 100%;
    height: 47px;
    background: #00c2c3;
    font-weight: 500;
    font-size: 16px;
    text-align: center;
    line-height: 47px;
    color: #ffffff;
  }
  .register-btn {
    width: 100%;
    height: 47px;
    margin-top: 20px;
    background: #ffffff;
    border: 1px solid #000000;
    font-weight: 500;
    text-align: center;
    font-size: 16px;
    line-height: 47px;
    color: #1d1d1d;
  }
}
</style>
