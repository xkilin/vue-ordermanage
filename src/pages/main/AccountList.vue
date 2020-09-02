<template>
  <div class="father">
    <p class="title">账号列表</p>
    <el-table
      :data="tableData"
      border
      stripe
      size="mini"
      ref="multipleTable"
      tooltip-effect="dark"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column label="账号" width="120">
        <template slot-scope="scope">{{ scope.row.account }}</template>
      </el-table-column>
      <el-table-column prop="userGroup" label="用户组" width="120"></el-table-column>
      <el-table-column prop="ctime" label="创建时间" show-overflow-tooltip></el-table-column>
      <el-table-column label="操作" width="180">
        <template slot-scope="scope">
          <span
            class="caozuo"
            style="background:#fff;color:black"
            @click="bianji(scope.row.id)"
          >
            <el-button type="text" @click="dialogFormVisible = true">编辑</el-button>
          </span>
          <el-dialog title="修改账号" :visible.sync="dialogFormVisible">
            <el-form :model="form">
              <el-form-item label="账号" :label-width="formLabelWidth">
                <el-input v-model="form.name" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="用户组" :label-width="formLabelWidth">
                <el-select v-model="form.region" placeholder="请选择">
                  <el-option label="超级管理员" value="超级管理员"></el-option>
                  <el-option label="普通管理员" value="普通管理员"></el-option>
                </el-select>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogFormVisible = false">取 消</el-button>
              <el-button type="primary" @click="sure">确 定</el-button>
            </div>
          </el-dialog>
          <span class="caozuo" @click="remove(scope.row.id)">删除</span>
        </template>
      </el-table-column>
    </el-table>
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
    <div style="margin-top: 20px;margin-left:20px">
      <el-button
        @click="toggleSelection([tableData[1], tableData[2]])"
        style="background: #f56c6c;color:#fff"
      >批量删除</el-button>
      <el-button @click="toggleSelection()" style="background: #0099cc;color:#fff">取消选择</el-button>
    </div>
  </div>
</template>

<script>
//引入列表接口
import { list,del,batchdel,edit } from "../../api/apis.js";
export default {
  data() {
    return {
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
      id: "", //每个账号的id   用来删除//
      // arrid:[],
      ids: [],
      strids: "",
      currentPage: 1, //默认显示第一页
      pageSize: 3, //默认每页显示10条
      totalNum: 1000, //总条数
      tableData: [],
    };
  },
  created() {
    this.xc();
  },
  methods: {
    //封装一个 刷新列表 的功能
    xc() {
      // 调用接口
      list(this.currentPage, this.pageSize).then((res) => {
        // console.log(res);
        let arr = res.data.data;
        // 本页数据
        this.tableData = arr;
        // 总商品条数
        this.totalNum = res.data.total;
      });
    },
    //批量删除
    toggleSelection(rows) {
      if (rows) {
        // 批量选中
        // rows.forEach((row) => {
        //   this.$refs.multipleTable.toggleRowSelection(row);
        // });

        //转化为字符串
        this.strids = JSON.stringify(this.ids);
        // console.log(this.strids,typeof(this.strids));

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
            //调用批量删除接口
            batchdel(this.strids).then((res) => {
              console.log(res);
              if (res.data.code == 0) {
                this.xc(); //刷新列表
              }
            });
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消删除",
            });
          });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    //多选框的函数
    handleSelectionChange(val) {
      this.multipleSelection = val;
      //先循环将ID添加到空数组里，但是这样就会有很多重复的，所以下面要截取
      for (const item of val) {
        this.ids.push(item.id);
      }
      this.ids = this.ids.slice(-val.length);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.currentPage = val; //动态改变
      this.xc();
    },
    //删除账号
    remove(a) {
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
          del(a).then((res) => {
            if (res.data.code == 0) this.xc(); //刷新列表
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    //修改账号
    bianji(a) {
      this.id = a;
    },
    sure() {
      this.dialogFormVisible = false;
      edit(this.id, this.form.name, this.form.region).then((res) => {
        console.log(res);
        if (res.data.code == 0) this.xc(); //刷新列表
      });
      this.form.name = "";
      this.form.region = "";
    },
  },
};
</script>
<style scoped lang='less'>
.father {
  background: #ffffff;
  margin: 25px 20px 0 ;
  height: 400px; ///////////////
  .title {
    padding: 15px 15px;
    font-size: 18px;
    border-bottom: 1px solid #ebeef5;
  }
  .caozuo {
    padding: 7px 12px;
    display: inline-block;
    background: #f56c6c;
    border-radius: 5px;
    color: #ffffff;
    margin-right: 15px;
    border: 1px solid #cccccc;
    .el-button {
      padding: 0;
    }
  }
  .pages {
    margin-left: 20px;
    margin-top: 20px;
  }
  .el-table {
    height: 193px !important;
    border: none;
  }
}
</style>