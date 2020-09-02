<template>
  <div class="father">
    <p class="title">商品添加</p>
    <div class="content">
      <div>
        <span>商品名称</span>
        <el-input v-model="input" placeholder="请输入商品名称" size="mini"></el-input>
      </div>
      <div>
        <span>商品分类</span>
        <el-select v-model="cateName" size="mini" slot="prepend" placeholder="请选择">
          <el-option v-for="(items,index) in list" :key="index" :label="items.cateName" :value="items.cateName"></el-option>
        </el-select>
      </div>
      <div>
        <span>商品价格</span>
        <el-input-number v-model="num" size="mini" :min="1" :max="100000" label="描述文字"></el-input-number>
      </div>
      <div class="pic">
        <span>图片上传</span>
        <el-upload
          :action="ip"
          list-type="picture-card"
          :on-preview="handlePictureCardPreview"
          :on-success="handleAvatarSuccess"
        >
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt />
        </el-dialog>
      </div>
      <div class="pic">
        <span>商品描述</span>
        <el-input type="textarea" :rows="2" placeholder="请输入内容" size="mini" v-model="textarea"></el-input>
      </div>
    </div>
    <button class="add" @click="addpro">添加商品</button>
  </div>
</template>

<script>
//查询所有分类名称
import { Categories, addgoods, ip } from "../../api/apis.js";

export default {
  data() {
    return {
      ip:'',  //图片上传地址
      input: "",
      num: 1,
      imageUrl: "", //图片上传的
      textarea: "",
      cateName: "",
      src: "", //图片上传后返回的图片的地址src
      list: [], //来接 传进来的商品分类数据
      //图片上传的属性
      dialogImageUrl: "",
      dialogVisible: false,
      ////////////////
    };
  },
  methods: {
    handleAvatarSuccess(res, file) {
      this.src = res.imgUrl;
      console.log(this.src);
      this.imageUrl = URL.createObjectURL(file.raw);
      this.$message({
        message: "图片上传成功",
        type: "success",
      });
    },

    handlePictureCardPreview(file) {
      //图片上传函数
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    //添加商品
    addpro() {
      addgoods(
        this.input,
        this.cateName,
        this.num,
        this.src,
        this.textarea
      ).then((res) => {
        // console.log(res);
        if (res.data.code == 0) {
          this.$message({
            message: "添加商品成功",
            type: "success",
          });
        }else this.$message.error('商品添加失败');
      });
    },
  },
  created() {
    this.ip = ip +'/goods/goods_img_upload';
    Categories().then((res) => {
      this.list = res.data.categories;
      this.cateName = this.list[0].cateName;
      console.log(this.list);
    });
  },
};
</script>

<style scoped lang='less'>
.father {
  background: #ffffff;
  margin: 25px 20px;
  height: 550px; ///////////////
  .title {
    padding: 15px 15px;
    font-size: 18px;
    border-bottom: 1px solid #ebeef5;
  }
  .content {
    padding: 10px 30px;
    div {
      margin-top: 15px;
    }
    .el-input {
      width: 400px;
      margin-left: 20px;
    }
    .el-select,
    .el-input-number {
      margin-left: 20px;
    }
  }
  .pic {
    display: flex;
    > div {
      margin-top: 0;
      margin-left: 20px;
    }
  }
  .el-textarea {
    width: 400px;
  }
  .add {
    padding: 10px 15px;
    background: #0099cc;
    color: #ffffff;
    border: none;
    border-radius: 6px;
    margin-left: 113px;
    margin-top: 15px;
  }
}
</style>