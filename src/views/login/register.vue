<template>
  <div class="register">
    <div class="container">
      <div class="tit">注册</div>
      <van-form @submit="onSubmit">
        <van-cell-group inset>
          <van-field v-model="ID"
                     name="ID"
                     label="用户名"
                     placeholder="用户名"
                     :error-message="errMsg.ID"
                     :rules="[{ required: true, message: '请填写用户名' }]" />
          <van-field v-model="username"
                     name="username"
                     label="昵称"
                     placeholder="昵称"
                     :rules="[{ required: true, message: '请填写昵称' }]" />
          <van-field v-model="password"
                     type="password"
                     name="password"
                     label="密码"
                     placeholder="密码"
                     :rules="[{ required: true, message: '请填写密码' }]" />
          <van-field v-model="comfirmPassword"
                     type="password"
                     name="comfirmPassword"
                     label="确认密码"
                     placeholder="确认密码"
                     :rules="[{ validator, message: '与第一次密码不一致' }]" />
        </van-cell-group>
        <div style="margin: 16px;">
          <van-button round
                      block
                      type="primary"
                      native-type="submit">
            注册
          </van-button>
        </div>
      </van-form>
      <span>
        <router-link to="/login">返回登录</router-link>
      </span>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import md5 from 'js-md5'

export default {
  data () {
    return {
      ID: "",
      username: "",
      password: "",
      comfirmPassword: "",
      errMsg: {
        ID: '',
      },
    }
  },
  methods: {
    validator () {
      if (this.password === this.comfirmPassword) return true
      else return false
    },
    onSubmit (values) {
      axios({
        url: "https://db-api.amarea.cn/users",
        method: "POST",
        data: {
          id: values.ID,
          name: values.username,
          password: md5(values.password),
        }
      }).then(res => {
        this.$router.push({
          path: "/login",
          query: {
            name: values.ID
          }
        })
      }).catch(error => {
        this.errMsg.ID = '用户名已存在'
        console.log(error);
      })
    }
  }
}
</script>

<style scoped>
.register {
  height: 100vh;
  /*弹性布局居中*/
  display: flex;
  justify-content: center;
  align-items: center;
  /*渐变背景*/
  background: linear-gradient(200deg, #e3c5eb, #a9c1ed);
  /*溢出影藏*/
  overflow: hidden;
}
.container {
  /*相对定位*/
  position: relative;
  z-index: 1;
  background-color: #fff;
  border-radius: 15px;
  display: flex;
  /*垂直配列*/
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 420px;
  height: 570px;
  /*阴影*/
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
}
.container .tit {
  font-size: 26px;
  margin: 65px auto 70px auto;
}
.container input {
  width: 280px;
  height: 30px;
  text-indent: 8px;
  border: none;
  border-bottom: 1px solid #ddd;
  outline: none;
  margin: 12px auto;
}
.container button {
  width: 280px;
  height: 40px;
  margin: 35px auto 40px auto;
  border: none;
  background: linear-gradient(-200deg, #fac0e7, #aac2ee);
  color: #fff;
  font-weight: bold;
  letter-spacing: 8px;
  border-radius: 10px;
  cursor: pointer;
  /*动画过渡*/
  transition: 0.5s;
}
.container button:hover {
  background: linear-gradient(-200deg, #aac2ee, #fac0e7);
  background-position-x: -280px;
}
.container span {
  font-size: 14px;
}
.container a {
  color: plum;
  text-decoration: none;
}
@keyframes square {
  0% {
    transform: scale(0) rotate(0deg);
    opacity: 0;
  }
  100% {
    transform: scale(0) rotate(1000deg);
    opacity: 0;
  }
}
@keyframes circle {
  0% {
    transform: scale(0) rotate(0deg);
    opacity: 1;
    bottom: 0;
    border-radius: 0;
  }
  100% {
    transform: scale(0) rotate(1000deg);
    opacity: 0;
    bottom: 90vh;
    border-radius: 50%;
  }
}
</style>