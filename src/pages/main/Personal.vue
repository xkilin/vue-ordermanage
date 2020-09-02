<template>
  <div class="father">
    <p class="title">管理员信息</p>
    <div class="content">
      <p>管理员ID: {{id}}</p>
      <p>账号: {{zh}}</p>
      <p>用户组: {{ group}}</p>
      <p>创建时间: {{ time}}</p>
      <p class="pic">
        管理员头像:
        <img :src="picsrc" alt />
      </p>
      <el-upload
        :action="ip"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        :data="uploaddata"
      >
        <!-- <img v-if="imageUrl" :src="imageUrl" class="avatar" /> -->
        <!-- <i class="el-icon-plus avatar-uploader-icon"></i> -->
        <span class="sp">点我上传头像</span>
      </el-upload>
    </div>
  </div>
</template>

<script>
import { accountinfo,ip } from "../../api/apis.js";
export default {
  data() {
    return {
      ip:'', //图片上传地址
      imageUrl: "",
      id: "",
      zh: "",
      group: "",
      time: "",
      picsrc: "",
      uploaddata: {},
    };
  },
  methods: {
    rel() {
      accountinfo(localStorage.id).then((res) => {
        console.log(res);
        //不足10 补0函数
        function num(a) {
          return a < 10 ? "0" + a : a;
        }
        this.id = res.data.accountInfo.id;
        this.zh = res.data.accountInfo.account;
        this.group = res.data.accountInfo.userGroup;
        let sj = new Date(res.data.accountInfo.ctime);
        this.picsrc = res.data.accountInfo.imgUrl;
        // console.log(sj);
        this.time =
          num(sj.getFullYear()) +
          "/" +
          num(sj.getMonth()) +
          "/" +
          num(sj.getDate());
      });
    },
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);

      if (res.code == 0) {
        //图片上传成功!
        this.$bus.$emit("imguploadfinish");
        this.rel();
      }
    },

    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
  },
  created() {
    this.ip = ip +'/users/avatar_upload';  //图片上传地址
    this.uploaddata = { id: localStorage.id };
    this.rel();
  },
};
</script>

<style scoped lang='less'>
.father {
  background: #ffffff;
  margin-top: 25px;
  height: 500px; ///////////////
  .title {
    padding: 15px 15px;
    font-size: 18px;
    border-bottom: 1px solid #ebeef5;
  }
  .content {
    padding: 10px 30px;
    p {
      height: 50px;
      line-height: 50px;
      border-bottom: 1px solid #cccccc;
    }
    .pic {
      height: 80px;
      line-height: 80px;
      display: flex;
      align-items: center;
      img {
        width: 50px;
        height: 50px;
        border-radius: 5px;
        margin-left: 20px;
      }
    }
  }
  
  .sp{
      margin-top: 10px;
      display:block;
      font-size: 12px;
      color: #cccccc;
      padding: 60px 37px;
      border: 1px dashed #ccc;
      border-radius: 5px;
  }
}
</style>