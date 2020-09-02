<template>
  <div class="father">
    <p class="title">
      <span>店铺管理</span>
      <button @click="save">保存</button>
    </p>
    <div class="content">
      <div>
        <span>店铺名称</span>
        <el-input v-model="list.name" placeholder="请输入商品名称" size="small"></el-input>
      </div>
      <div class="pic">
        <span>店铺公告</span>
        <el-input type="textarea" autosize placeholder="请输入内容" size="mini" v-model="list.bulletin"></el-input>
      </div>
      <div class="pic">
        <span>店铺头像</span>
        <el-upload
          class="avatar-uploader"
          :action="ip"
          :show-file-list="false"
          :on-success="shopsuccess"
        >
          <img :src=" dialogImageUrl == ''? '':shoppicURL + dialogImageUrl" class="shoppic" width="100px" />
        </el-upload>
      </div>
      <div class="pic">
        <span>店铺图片</span>
        <el-upload
          :action="ip"
          list-type="picture-card"
          :on-remove="picremove"
          :on-success="handleAvatarSuccess"
          :file-list="filelist"
        >
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl11" alt />
        </el-dialog>
      </div>
      <div>
        <span>配送费</span>
        <el-input v-model="list.deliveryPrice" type="number" placeholder="请输入商品名称" size="small"></el-input>
      </div>
      <div>
        <span>配送时间</span>
        <el-input v-model="list.deliveryTime" placeholder="请输入商品名称" size="small"></el-input>
      </div>
      <div>
        <span>配送描述</span>
        <el-input v-model="list.description" placeholder="请输入商品名称" size="small"></el-input>
      </div>
      <div>
        <span>店铺评分</span>
        <el-input v-model="list.score" placeholder="请输入商品名称" size="small"></el-input>
      </div>
      <div>
        <span>销量</span>
        <el-input v-model="list.sellCount" placeholder="请输入商品名称" size="small"></el-input>
      </div>
      <div>
        <span>活动</span>
        <el-checkbox-group v-model="checked">
          <el-checkbox label="在线支付满28减5">在线支付满28减5</el-checkbox>
          <el-checkbox label="VC无限橙果汁全场8折">VC无限橙果汁全场8折</el-checkbox>
          <el-checkbox label="单人精彩套餐">单人精彩套餐</el-checkbox>
          <el-checkbox label="特价饮品8折抢购">特价饮品8折抢购</el-checkbox>
          <el-checkbox label="单人特色套餐">单人特色套餐</el-checkbox>
        </el-checkbox-group>
      </div>
      <div>
        <span>营业时间</span>
        <el-time-picker
          is-range
          v-model="time"
          range-separator="至"
          start-placeholder="开始时间"
          end-placeholder="结束时间"
          placeholder="选择时间范围"
        ></el-time-picker>
      </div>
    </div>
  </div>
</template>

<script>
import { shopinfo, ip, shoppicURL, shopedit } from "@/api/apis";
import {getChinatime} from '@/utils/utils'
export default {
  data() {
    return {
      ip: "", //
      shoppicURL: "", //图片在后台服务器的位置  

      imageUrl: [],   
      dialogVisible: false,
      dialogImageUrl: "", //店铺头像
      dialogImageUrl11: "", //店铺图片
      checked: [],    //活动数组
      list: "",    
      time: [],   //营业时间
      filelist: [], //店铺照片的列表
    };
  },
  methods: {
    ky() {
      this.ip = ip + "/shop/upload";
      this.shoppicURL = shoppicURL;
      shopinfo().then((res) => {
        this.list = res.data.data; //赋值新数组
        this.checked = res.data.data.supports   //活动数组
        this.dialogImageUrl =res.data.data.avatar; //店铺头像
        let picarr = res.data.data.pics; //店铺图片
        this.time = res.data.data.date; //营业时间
        for (let obj of picarr) {
          this.filelist.push({ name: obj, url: this.shoppicURL + obj });
        }
      });
    },
    //店铺头像上传成功
    shopsuccess(res){
        if(res.code == 0){
          console.log(res);
          this.dialogImageUrl =res.imgUrl;
          this.$message({
            type:"success",
            message:"店铺头像上传成功"
          })
        }
    },
    //图片移除
    picremove(res, filelist) {
      //第一种方法  删除完后会返回一个新的对象filelist，循环对象filelist，并拿取里面的name属性
      // this.filelist = filelist;
      // this.list.pics = [];
      // for (let obj of filelist) {
      //   this.list.pics.push(obj.name);
      // }
      // console.log(res);

      //第二种  是通过寻找索引值， res是返回的删除的某个具体的图片
      console.log(filelist);
      this.list.pics.splice(this.list.pics.indexOf(res.name),1);
    },
    handleAvatarSuccess(res) {
      if (res.code == 0) {
        this.list.pics.push(res.imgUrl);
        this.$message({
          message: "图片上传成功",
          type: "success",
        });
      }
    },
    save() {
      this.list.avatar = this.dialogImageUrl;
      this.list.date = JSON.stringify([getChinatime(this.time[0]),getChinatime(this.time[1])]);
      this.list.supports = JSON.stringify(this.checked);
      this.list.pics = JSON.stringify(this.list.pics);
      shopedit(this.list).then((res) => {
        if (res.data.code == 0) {
          this.$message({
            message: "店铺信息修改成功！",
            type: "success",
          });
        }
      });
    },
  },
  created() {
    this.ky();
  },
};
</script>

<style scoped lang='less'>
.father {
  background: #ffffff;
  margin-top: 25px;
  height: 1100px; ///////////////
  .el-checkbox-group {
    display: inline-block;
    margin-left: 20px;
  }
  .el-date-editor {
    margin-left: 20px;
  }
  .title {
    padding: 15px 15px;
    font-size: 18px;
    border-bottom: 1px solid #ebeef5;
    display: flex;
    justify-content: space-between;
    button {
      padding: 8px 10px;
      background: #0099cc;
      color: #ffffff;
      border: none;
    }
  }
  .content {
    padding: 10px 30px;
    div {
      margin-top: 15px;
      span {
        display: inline-block;
        width: 64px;
        text-align: right;
      }
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
    width: 300px !important;
  }
  .peisong {
    width: 80px;
    height: 30px;
    margin-left: 30px;
    border: 1px solid #0099cc;
    border-radius: 5px;
    text-indent: 15px;
    outline: none;
  }
  .shoppic {
    margin-left: 20px;
  }
  
}
</style>