<template>
  <div class="father">
    <p class="title">修改密码</p>

    <div class="mid">
      <p>
        <span>原密码</span>
        <input type="password" v-model="oldpwd" @blur="yan" />
        <span class="error">{{msg}}</span>
      </p>
      <p>
        <span>新密码</span>
        <input type="password" v-model="newpwd" />
      </p>

      <p>
        <span>确认新密码</span>
        <input type="password" v-model="newpwd2" />
      <span class="error">{{psaamsg}}</span>
      </p>
    </div>
    <div class="bt">
      <button style="background:#0099cc;color:#fff" @click="sure">确定</button>
      <button>重置</button>
    </div>
  </div>
</template>

<script>
//验证旧密码接口
import { checkoldpwd } from "../../api/apis.js";

//修改密码接口
import { editpwd } from "../../api/apis.js";

export default {
  data() {
    return {
      oldpwd: "",
      newpwd: "",
      newpwd2: "",
      msg: "",
      psaamsg:'',
    };
  },
  methods: {
    yan() {
      checkoldpwd(this.oldpwd, localStorage.id).then((res) => {
        if (res.data.code == 1) {
          this.msg = res.data.msg;
        } else this.msg = "";
      });
    },
    sure() {
      if (this.newpwd == this.newpwd2) {
        //两次密码一致
        editpwd(this.newpwd, localStorage.id).then((res) => {
          if (res.data.code == 0) {
            this.$message({
              message: "密码修改成功",
              type: "success",
            });

            //清空值
            this.newpwd='';
            this.newpwd2='';
            this.oldpwd='';
          }else{
            console.log('修改失败');
          }
        });
      }else{
        this.psaamsg='两次密码不一致,请重新输入';
      }
    },
  },
};
</script>

<style scoped lang='less'>
.father {
  background: #ffffff;
  margin-top: 25px;
  height: 400px; ///////////////
  .title {
    padding: 15px 15px;
    font-size: 18px;
    border-bottom: 1px solid #ebeef5;
  }
  .mid {
    padding: 0 20px;
    p {
      margin-top: 20px;
      span {
        display: inline-block;
        width: 80px;
        text-align: right;
        margin-right: 20px;
      }
      .error {
        display: inline-block;
        color: red;
        width: 300px;
        text-align: left;
        margin-left: 20px;
        font-size: 12px;
      }
      input {
        width: 200px;
        height: 30px;
        border: 1px solid #cccccc;
        border-radius: 6px;
        outline: none;
        text-indent: 10px;
      }
    }
  }
  .bt {
    margin-left: 105px;
    button {
      padding: 10px 17px;
      border: 1px solid #cccccc;
      border-radius: 5px;
      margin-top: 20px;
      margin-left: 15px;
    }
  }
}
</style>