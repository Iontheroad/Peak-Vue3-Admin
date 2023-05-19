<template>
  <div class="login-container">
    <div class="container">
      <div class="drop">
        <div class="content">
          <h2>{{ getTranslateLanguage("login.title") }}</h2>
          <form>
            <div class="inputBox">
              <input
                type="text"
                :placeholder="getTranslateLanguage('login.username')"
                v-model="formData.username"
              />
            </div>
            <div class="inputBox">
              <input
                type="password"
                :placeholder="getTranslateLanguage('login.password')"
                v-model="formData.password"
              />
            </div>
            <div class="inputBox" @click.prevent="clickLogin">
              <input
                type="submit"
                :value="getTranslateLanguage('login.login')"
              />
            </div>
          </form>
        </div>
      </div>
      <!-- <a href="javascript:;" class="btns">Forget Password</a>
      <a href="javascript:;" class="btns signup">Signup</a> -->
    </div>
  </div>
</template>

<script setup lang="ts" name="Login">
import { ElMessage } from "element-plus";
import { useUserStore } from "@/store";
import { reactive } from "vue";
import { useRouter } from "vue-router";
import { getTranslateLanguage } from "@/lang";

const userStore = useUserStore(); // 用户状态仓库
const router = useRouter();
const formData = reactive({
  username: "admin",
  password: "123456",
});

// 点击登录
const clickLogin = async () => {
  try {
    let result = await userStore.login_actions(formData);
    ElMessage.success({
      showClose: true,
      message: "登陆成功",
    });
    router.replace("/");
  } catch (error) {
    console.log(error as Error);
    // ElMessage.error({
    //   showClose: true,
    //   message: (error as Error).message,
    // });
  }
};
</script>

<style lang="scss" scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: #eff0f4;
  .container {
    position: relative;
    // left: -80px;
    display: flex;
    justify-content: center;
    align-items: center;

    // 大水滴
    .drop {
      position: relative;
      width: 350px;
      height: 350px;
      box-shadow: inset 20px 20px 20px rgba(0, 0, 0, 0.05),
        25px 35px 20px rgba(0, 0, 0, 0.05), 25px 30px 30px rgba(0, 0, 0, 0.05),
        inset -20px -20px 25px rgba(255, 255, 255, 0.9);
      transition: 0.5s;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 52% 48% 33% 67% / 38% 45% 55% 62%;
      &:hover {
        border-radius: 50%;
      }
      // 大水滴的两个小光点
      &::before {
        content: "";
        position: absolute;
        top: 50px;
        left: 85px;
        width: 35px;
        height: 35px;
        border-radius: 50%;
        background: #fff;
        opacity: 0.9;
      }
      &::after {
        content: "";
        position: absolute;
        top: 90px;
        left: 110px;
        width: 15px;
        height: 15px;
        border-radius: 50%;
        background: #fff;
        opacity: 0.9;
      }
      // 大水滴主体内容
      .content {
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        text-align: center;
        padding: 40px;
        gap: 15px;
        h2 {
          position: relative;
          color: #333;
          font-size: 1.5em;
        }

        form {
          display: flex;
          flex-direction: column;
          gap: 20px;
          justify-content: center;
          align-items: center;
          .inputBox {
            position: relative;
            width: 225px;
            box-shadow: inset 2px 5px 10px rgba(0, 0, 0, 0.1),
              inset -2px -5px 10px rgba(255, 255, 255, 1),
              15px 15px 10px rgba(0, 0, 0, 0.05),
              15px 10px 15px rgba(0, 0, 0, 0.025);
            border-radius: 25px;
            &::before {
              content: "";
              position: absolute;
              top: 8px;
              left: 50%;
              transform: translateX(-50%);
              width: 65%;
              height: 5px;
              background: rgba(255, 255, 255, 0.5);
              border-radius: 5px;
            }
            input {
              box-sizing: border-box;
              border: none;
              outline: none;
              background: transparent;
              width: 100%;
              font-size: 1em;
              padding: 10px 15px;
              &[type="submit"] {
                color: #fff;
                text-transform: uppercase;
                font-size: 1em;
                cursor: pointer;
                letter-spacing: 0.1em;
                font-weight: 500;
                text-align: center;
              }
            }
            &:last-child {
              width: 120px;
              background: #ff0f5b;
              box-shadow: inset 2px 5px 10px rgba(0, 0, 0, 0.1),
                15px 15px 10px rgba(0, 0, 0, 0.05),
                15px 10px 15px rgba(0, 0, 0, 0.025);
              transition: 0.5s;
            }
            &:last-child:hover {
              width: 150px;
            }
          }
        }
      }
    }

    // 忘记密码和注册水滴
    .btns {
      position: absolute;
      right: -120px;
      bottom: 0;
      width: 120px;
      height: 120px;
      background: #c61dff;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      text-decoration: none;
      color: #fff;
      line-height: 1.2em;
      letter-spacing: 0.1em;
      font-size: 0.8em;
      transition: 0.25s;
      text-align: center;
      box-shadow: inset 10px 10px 10px rgba(190, 1, 254, 0.05),
        15px 25px 10px rgba(190, 1, 254, 0.1),
        15px 20px 20px rgba(190, 1, 254, 0.1),
        inset -10px -10px 15px rgba(255, 255, 255, 0.5);
      border-radius: 44% 56% 65% 35% / 57% 58% 42% 43%;
      // 小光点
      &::before {
        content: "";
        position: absolute;
        top: 15px;
        left: 30px;
        width: 20px;
        height: 20px;
        border-radius: 50%;
        background: #fff;
        opacity: 0.45;
      }
      // 注册水滴
      &.signup {
        bottom: 150px;
        right: -120px;
        width: 80px;
        height: 80px;
        border-radius: 49% 51% 52% 48% / 63% 59% 41% 37%;
        background: #01b4ff;
        box-shadow: inset 10px 10px 10px rgba(1, 180, 255, 0.05),
          15px 25px 10px rgba(1, 180, 255, 0.1),
          15px 20px 20px rgba(1, 180, 255, 0.1),
          inset -10px -10px 15px rgba(255, 255, 255, 0.5);
        &::before {
          left: 20px;
          width: 15px;
          height: 15px;
        }
      }
      &:hover {
        border-radius: 50%;
      }
    }
  }
}
</style>
