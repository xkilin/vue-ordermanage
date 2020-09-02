<template>
  <div class="father">
    <div class="title">
      <span>商品分类</span>
      <div>
        <el-button type="text" @click="dialogFormVisible = true">添加分类</el-button>
        <el-dialog title="添加分类" :visible.sync="dialogFormVisible">
          <el-form :model="form">
            <el-form-item label="分类名称" :label-width="formLabelWidth">
              <el-input v-model="form.name" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="是否启用" :label-width="formLabelWidth">
              <el-switch v-model="value1" disabled active-color="#13ce66"  inactive-color="#ff4949"></el-switch>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <span class="sp" @click="queding">
              <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
            </span>
          </div>
        </el-dialog>
      </div>
    </div>
    <div>
      <el-table :data="tableData" border size="mini">
        <el-table-column prop="id" label="序号" width="180"></el-table-column>
        <el-table-column prop="cateName" label="分类名称" width="180">
          <template slot-scope="scope">
            <span v-show="!scope.row.isedit">{{scope.row.cateName}}</span>
            <el-input v-model="scope.row.cateName" v-show="scope.row.isedit" ></el-input>
          </template>
        </el-table-column>
        <el-table-column label="是否启用">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.state"
              active-color="#13ce66"
              inactive-color="#ff4949"
              @change="change(scope.row.state)"
              :disabled="!scope.row.isedit"
            ></el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="180">
          <template slot-scope="scope">
            <!--  -->
            <span @click="saveid(scope.row)">
              <el-button
                type="text"
                class="caozuo"
                size="mini"
                style="background:#fff;color:black"
                @click="dialogFormVisible22 = true"
              >{{ scope.row.isedit ? '完成': '编辑' }}</el-button>
            </span>
            <!--  -->
            <el-button
              size="mini"
              type="danger"
              class="caozuo"
              @click="handleDelete(scope.row.id)"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pages">
      <el-pagination
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[1, 3, 5, 8]"
        :page-size="pageSize"
        layout="total, prev, pager, next, jumper"
        :total="totalNum"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
//引入商品分类接口
import { catelist } from "../../api/apis.js";
//引入添加商品分类接口
import { addcate } from "../../api/apis.js";
//引入删除商品分类接口
import { delcate } from "../../api/apis.js";
//引入修改商品分类接口
import { editcate } from "../../api/apis.js";

export default {
  data() {
    return {
      //开关的值
      value1: true, //添加分类时的 开关
      value2: false,
      dialogFormVisible: false,
      form: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: "",
      },
      formLabelWidth: "120px",
      //拓展开关的值
      state: "",
      // date: "",
      //分页器的值
      currentPage3: 5,
      //   tableData: [], //数据
      currentPage: 1, //默认显示第一页
      pageSize: 3, //默认每页显示10条
      totalNum: 1000, //总页数
      tableData: [
        
      ],
    };
  },
  methods: {
    //封装的一个 获取分类 的函数
    xy() {
      catelist(this.currentPage, this.pageSize).then((res) => {
        // console.log(res);
        let arr = res.data.data;

        for (let item of arr) {
          item.isedit = false; //此对象数据是否在编辑状态
          item.state = item.state==1;
        }
        // 本页数据
        this.tableData = arr;
        // 总商品条数
        this.totalNum = res.data.total;
      });
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.currentPage = val; //动态改变
      this.xy();
    },
    //拓展开关的函数
    change(a) {
      if (a == true) a = false;
      else a = true;
      // console.log('啊啊啊啊啊啊');
    },
    //弹出框 商品分类添加确定 函数
    queding() {
      addcate(this.form.name, this.value1).then((res) => {
        console.log(this.form.name, this.value1);
        if (res.data.code == 0) {
          this.$message({
            message: "已成功添加到商品分类",
            type: "success",
          });
          // this.xy();
        } else this.$message.error("商品分类添加失败");

        //清空值
        this.form.name = "";
      });
    },
    //商品分类删除函数
    handleDelete(a) {
      // console.log(a);
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "删除成功!",
          });
          delcate(a).then((res) => {
            // console.log(res);
            if (res.data.code == 0);
          });
          this.xy();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },

    //保存商品分类id
    saveid(a) {
      this.id = a.id;
      // console.log(this.id);
      this.value3 = a.state;
      // console.log(this.value3);
      console.log(2222);
      if (a.isedit) {
        //改变数据
        a.isedit = false;
        editcate(this.id, a.cateName, a.state).then((res) => {
          if (res.data.code == 0) {
            this.xy();
            this.$message({
              message: "信息修改成功",
              type: "success",
            });
          }
        });
      } else {
        //打开编辑状态
        a.isedit = true;
      }
    },
  },
  created() {
    this.xy();
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
    display: flex;
    justify-content: space-between;
    button {
      padding: 8px 10px;
      background: #0099cc;
      color: #ffffff;
      border: none;
    }
  }
  .caozuo {
    padding: 7px 12px;
    display: inline-block;
    background: #f56c6c;
    border-radius: 5px;
    color: #ffffff;
    margin-right: 15px;
    border: 1px solid #cccccc;
  }
  .el-table {
    width: 100%;
    height: 260px !important;
  }
  .pages {
    margin-left: 300px;
    border: none;
  }
  .sp {
    margin-left: 15px;
  }
}
</style>