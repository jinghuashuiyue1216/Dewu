<template>
  <div class="login">
    <div class="input-box">
      <div class="pre-text">用户名</div>
      <input type="text" placeholder="输入用户名" v-model="userName" />
    </div>
    <div class="input-box">
      <div class="pre-text">密码</div>
      <input type="password" placeholder="输入密码" v-model="password" />
    </div>
    <div class="input-box" v-if="isRegist">
      <div class="pre-text">确认密码</div>
      <input type="text" placeholder="确认密码" v-model="confirmPassword" />
    </div>
    <div class="login-btn" @click="onLogin">{{ btnText }}</div>
  </div>
</template>

<script setup>
import { computed, ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { ElMessage } from "element-plus";
import { login, regist } from "@/api/login";
import { setStorage } from "@/utils/storage";

const route = useRoute();
const router = useRouter();
const userName = ref("");
const password = ref("");
const confirmPassword = ref("");
const refPageName = ref("");

const { pageName } = route.query;
refPageName.value = pageName;

const isRegist = computed(() => refPageName.value === "regist");

const btnText = computed(() => {
  return isRegist.value ? "注册" : "登录";
});

// 校验
function validate() {
  if (!userName.value.trim()) {
    ElMessage.error({ message: "用户名不能为空", center: true });
    return false;
  }
  if (!password.value.trim()) {
    ElMessage.error({ message: "密码不能为空", center: true });
    return false;
  }

  if (isRegist.value) {
    if (!confirmPassword) {
      ElMessage.error({ message: "确认密码不能为空", center: true });
      return false;
    }
    if (confirmPassword.value !== password.value) {
      ElMessage.error({ message: "两次密码不一致", center: true });
      return false;
    }
  }
  return true;
}

async function onLogin() {
  if (!validate()) {
    return;
  }
  let res = {};
  const data = { name: userName.value, password: password.value };
  if (isRegist.value) {
    res = await regist(data);
  } else {
    res = await login(data);
  }
  if (res.isSuccess) {
    ElMessage.success({
      message: isRegist.value ? "注册成功" : "登录成功",
      center: true,
    });
    setStorage("user", res.data);
    if (!isRegist.value) {
      setTimeout(() => {
        router.replace({ path: "/order" });
      }, 2000);
    } else {
      setTimeout(() => {
        refPageName.value = "login";
        router.replace({ query: { pageName: "login" } });
      }, 2000);
    }
  } else {
    ElMessage.error({
      message: isRegist.value ? "注册失败" : "登录失败",
      center: true,
    });
  }
}
</script>

<style lang="scss" scoped>
.login {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  padding: 0 30px;
  margin-top: 86px;
  .input-box {
    display: flex;
    align-items: center;
    width: 100%;
    padding: 10px 0;
    margin-bottom: 40px;
    border-bottom: 1px solid #e3e3ed;
    .pre-text {
      flex: none;
      width: 70px;
      font-weight: 600;
      text-align: left;
      font-size: 14px;
      color: #000000;
    }
    input {
      flex: 1;
      border: none;
      outline: none;
      font-weight: 500;
      font-size: 15px;
      color: #171717;
    }
    input::-webkit-input-placeholder {
      font-weight: 500;
      font-size: 15px;
      line-height: 21px;
      color: #d7d7e5;
    }
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
}
</style>
