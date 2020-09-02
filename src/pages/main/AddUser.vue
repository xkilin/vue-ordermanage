<template>
  <div class="father">
    <p class="title">商品列表</p>

    <div class="mid">
      <p>
        <span>账&emsp;&nbsp;号</span>
        <input type="text" v-model="acc" />
      </p>
      <p>
        <span>密&emsp;&nbsp;码</span>
        <input type="password" v-model="pwd" />
      </p>

      <p>
        <span>用户组</span>
        <el-select v-model="value" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </p>
    </div>
    <div class="bt">
      <button style="background:#0099cc;color:#fff" @click="adduser">添加</button>
      <button>重置</button>
    </div>
  </div>
</template>

<script>
//引入 添加账号接口
import { add } from "../../api/apis.js";

export default {
  data() {
    return {
      acc: "",
      pwd: "",
      value: "",
      options: [
        {
          value: "超级管理员",
          label: "超级管理员",
        },
        {
          value: "普通管理员",
          label: "普通管理员",
        },
        {
          value: "游客",
          label: "游客",
        },
      ],
    };
  },
  methods: {
    adduser() {
      add(this.acc,this.pwd,this.value).then((res) => {
        if (res.data.code == 0) {
          //成功后的提示信息
          this.acc='';
          this.pwd='';
          this.value='';
          this.$message({
            message: "用户增加成功!",
            type: "success",
          });
        }
      });
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
    p {
      margin-top: 20px;
      span {
        display: inline-block;
        width: 80px;
        text-align: right;
        margin-right: 20px;
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
    margin-left: 85px;
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