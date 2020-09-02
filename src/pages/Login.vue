<template>
  <div class="father">
    <div class="mid">
      <p>老李头外卖系统登录</p>
      <div class="pr">
        <i class="el-icon-s-custom"></i>
        <input type="text" v-model="user" />
      </div>
      <div class="pr">
        <i class="el-icon-s-check"></i>
        <input type="password" v-model="pwd" />
      </div>
      <p class="error">{{errormsg}}</p>
      <button type="button" @click="butlogin">登录</button>
    </div>
  </div>
</template>

<script>
import { login } from "../api/apis.js";     //引入登录接口
import {checktoken} from '../api/apis.js'   //引入 token 接口

export default {
  data() {
    return {
      user: "",
      pwd: "",
      errormsg: "",
    };
  },
  created(){
      checktoken(localStorage.token).then((res)=>{
            if(res.data.code==0) location.href='/#/main/index';
      })
  },
  methods: {
    butlogin() {
      // location.href='/#/main/index'
      login(this.user, this.pwd).then((res) => {
        // console.log(res);
        if (res.data.code == 0) {
          //成功
          localStorage.token=res.data.token;   //本地存储 token 令牌
          localStorage.user=this.user;          // 存储用户名
          localStorage.role = res.data.role    //写入用户组
          localStorage.id=res.data.id     //存入id
          //成功后的提示信息
          this.$message({
            message: "用户登录成功!",
            type: "success",
          });
          location.href = "/#/main/index";      //跳转到首页去
        } else {
          //失败
          this.errormsg = res.data.msg;
        }
      });
    },
  },
};
</script>

<style scoped lang='less'>
.father {
  width: 100%;
  height: 100%;
  background: #304156;
  // background: url(../assets/images/timg.jpg) center no-repeat;
  // background-size: 100%;
  display: flex; 
  justify-content: center;
  align-items: center;
  .mid {
    width: 300px;
    height: 200px;
    p {
      text-align: center;
      color: #ffffff;
    }
    .error {
      color: red;
      text-align: left;
      margin-bottom: 10px;
    }
  }
  .pr,
  .el-input {
    position: relative;
    margin: 15px 0;
  }
  .el-icon-s-custom,
  .el-icon-s-check {
    position: absolute;
    left: 4px;
    top: 12px;
    color: #cccccc;
  }
  input {
    height: 40px !important;
    width: 100%;
    border: 1px solid #cccccc;
    outline: none;
    box-sizing: border-box;
    text-indent: 25px;
    border-radius: 5px;
    background: #283443;
    color: #ffffff;
  }
  button {
    width: 100%;
    border: none;
    border-radius: 5px;
    background: #0099cc;
    color: #ffffff;
    height: 30px;
  }
}
</style>