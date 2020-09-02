<template>
  <div class="father">
    <p class="title">商品列表</p>

    <div>
      <el-table
        :data="tableData"
        border
        size="mini"
        v-loading="loading"
        element-loading-text="拼命加载中"
      >
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="商品ID">
                <span>{{ props.row.id }}</span>
              </el-form-item>
              <el-form-item label="分类">
                <span>{{ props.row.category }}</span>
              </el-form-item>
              <el-form-item label="商品图片">
                <span>{{ props.row.price }}</span>
              </el-form-item>
              <el-form-item label="商品评价">
                <span>{{ props.row.rating }}</span>
              </el-form-item>
              <el-form-item label="商品描述">
                <span>{{ props.row.goodsDesc }}</span>
              </el-form-item>
              <!-- //////////////////////////////////////// -->
              <el-form-item label="商品名称">
                <span>{{ props.row.name }}</span>
              </el-form-item>
              <el-form-item label="商品价格">
                <span>{{ props.row.price }}</span>
              </el-form-item>
              <el-form-item label="创建时间">
                <span>{{ (new Date(props.row.ctime)).getFullYear()+'-'+(new Date(props.row.ctime)).getMonth()+'-'+(new Date(props.row.ctime)).getDate()+' '+(new Date(props.row.ctime)).getHours()+':'+(new Date(props.row.ctime)).getMinutes()+':'+(new Date(props.row.ctime)).getSeconds() }}</span>
              </el-form-item>
              <el-form-item label="商品销量">
                <span>{{ props.row.sellCount }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column label="商品名称" prop="name"></el-table-column>
        <el-table-column label="所属分类" prop="category"></el-table-column>
        <el-table-column label="商品价格" prop="price"></el-table-column>
        <el-table-column label="商品图片">
          <template slot-scope="props">
            <img :src="picURL + props.row.imgUrl" alt />
          </template>
        </el-table-column>
        <el-table-column label="商品描述" prop="goodsDesc"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="props">
            <span @click="bianji(props.row)">
              <el-button type="text" @click="dialogFormVisible = true" class="btn">编辑</el-button>
            </span>
            <el-dialog title="修改商品" :visible.sync="dialogFormVisible">
              <el-form :model="shuju">
                <el-form-item label="商品名称" :label-width="formLabelWidth">
                  <el-input v-model="shuju.name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="商品分类" :label-width="formLabelWidth">
                  <el-select v-model="shuju.category" placeholder="请选择活动区域">
                    <el-option
                      :label="item.cateName"
                      :value="item.cateName"
                      v-for="(item,index) in categories"
                      :key="index"
                    ></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="商品价格" :label-width="formLabelWidth">
                  <el-input type="number" v-model="shuju.price" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="图片上传" :label-width="formLabelWidth">
                  <el-upload
                    :action="ip"
                    :show-file-list="false"
                    :on-preview="handlePictureCardPreview"
                    :on-success="handleAvatarSuccess"
                  >
                    <img width="100%" :src=" picURL + shuju.imgUrl" alt />
                  </el-upload>
                </el-form-item>
                <el-form-item label="商品描述" :label-width="formLabelWidth">
                  <el-input type="textarea" v-model="shuju.goodsDesc" autocomplete="off"></el-input>
                </el-form-item>
              </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <span @click="sure">
                  <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
                </span>
              </div>
            </el-dialog>
            <button class="btn" style="background:#f56c6c" @click="rem(props.row.id)">
              <span>删除</span>
            </button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pages">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[1, 3, 5, 8]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalNum"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import {
  goodslist,
  goodsdel,
  goodedit,
  ip,
  picURL,
  Categories,
} from "@/api/apis";
export default {
  data() {
    return {
      ip: "", //引入IP地址
      picURL: "", // 引入图片在后台服务器中的位置
      loading: true, //数据加载是的动画属性
      shuju: {}, //给新对象
      //图片上传的属性
      dialogImageUrl: "",
      dialogVisible: false,
      // src: "", //图片地址
      //编辑弹出框
      dialogFormVisible: false,
      formLabelWidth: "120px",
      currentPage: 1, //默认显示第一页
      pageSize: 3, //默认每页显示10条
      totalNum: 1000, //总页数
      categories: [], //分类数组
      tableData: [],
      from: {
        name: "",
        category: "",
        price: "",
        imgUrl: "",
        goodsDesc: "",
        id: "",
      },
    };
  },
  methods: {
    //刷新列表函数
    ki() {
      this.ip = ip + "/goods/goods_img_upload"; //图片上传接口地址
      this.picURL = picURL; //赋值
      this.loading = true; //为了让点击下一页时，也会加载loading图片
      setTimeout(() => {
        goodslist(this.currentPage, this.pageSize).then((res) => {
          let arr = res.data.data;
          console.log(res);
          this.tableData = arr; //赋值  新数组
          this.totalNum = res.data.total;
          this.loading = false;
        });
      }, 500);
    },
    //分页器条数改变
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`);
      this.pageSize = val; //动态改变
      this.ki();
    },
    //分页器当前页改变
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`);
      this.currentPage = val; //动态改变
      this.ki();
    },
    //删除商品
    rem(a) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          goodsdel(a).then((res) => {
            if (res.data.code == 0) {
              this.ki();
            } else this.$message.error("商品删除失败");
          });
          this.$message({
            type: "success",
            message: "删除成功!",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },

    handleAvatarSuccess(res, file) {
      this.shuju.imgUrl = res.imgUrl;
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
    bianji(a) {
      this.shuju = { ...a };
      Categories().then((res) => {
        this.categories = res.data.categories;
      });
    },
    sure() {
      goodedit(
        this.shuju.name,
        this.shuju.category,
        this.shuju.price,
        this.shuju.imgUrl,
        this.shuju.goodsDesc,
        this.shuju.id
      ).then((res) => {
        console.log(res);
        if (res.data.code == 0) {
          this.$message({
            message: "商品修改成功",
            type: "success",
          });
          (this.from.name = ""),
            (this.from.category = ""),
            (this.from.price = ""),
            this.ki();
        } else this.$message.error("商品修改失败");
      });
      console.log(this.shuju);
      console.log(this.tableData);
      this.ki();
    },
  },
  created() {
    //刷新列表
    this.ki();
  },
};
</script>

<style scoped lang='less'>
.father {
  background: #ffffff;
  margin: 20px 20px;
  height: 500px;
  .title {
    padding: 15px 15px;
    font-size: 18px;
  }
  .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
  .btn {
    display: inline-block;
    padding: 8px 10px;
    background: #409eff;
    color: #ffffff;
    margin-right: 10px;
    border-radius: 5px;
    outline: none;
    border: none;
    span {
      width: 27px;
      height: 17px;
    }
  }
  .cell {
    img {
      width: 50px;
      height: 50px;
      border-radius: 6px;
    }
  }
  .el-table {
    width: 100%;
  }
}
</style>