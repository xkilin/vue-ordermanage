<template>
  <div class="father">
    <!-- <div class="mid">
      <p>
        <span>订单号</span>
        <input type="number" placeholder="订单号" v-model="orderNo" />
      </p>
      <p>
        <span>收货人</span>
        <input type="text" placeholder="收货人" v-model="consignee" />
      </p>
      <p>
        <span>手机号</span>
        <input type="number" placeholder="手机号" v-model="phone" />
      </p>
      <p>
        <span>订单状态</span>
        <select class="select" v-model="orderState">
          <option value>派送中</option>
          <option value>已完成</option>
          <option value>已受理</option>
        </select>
      </p>
    </div>-->
    <!-- 订单信息  -->
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item label="订单号">
        <el-input v-model="orderNo" placeholder="订单号"></el-input>
      </el-form-item>
      <el-form-item label="收货人">
        <el-input v-model="consignee" placeholder="收货人"></el-input>
      </el-form-item>
      <el-form-item label="手机号">
        <el-input v-model="phone" placeholder="手机号"></el-input>
      </el-form-item>
      <el-form-item label="订单状态">
        <el-select v-model="orderState" placeholder="订单状态">
          <el-option v-for="item in option" :key="item" :label="item" :value="item"></el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <div class="query">
      <span>选择时间</span>
      <el-date-picker
        v-model="date"
        type="datetimerange"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
      ></el-date-picker>
      <button @click="search">查询</button>
    </div>
    <div class="table">
      <el-table :data="tableData" height="310" border size="mini">
        <el-table-column fixed prop="orderNo" label="订单号" width="80"></el-table-column>
        <el-table-column label="下单时间" width="100">
          <template slot-scope="scope">
            <span>{{new Date(scope.row.orderTime).getHours()+':'+new Date(scope.row.orderTime).getMinutes()+':'+ new Date(scope.row.orderTime).getSeconds()}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="phone" label="手机号" width="100"></el-table-column>
        <el-table-column prop="consignee" label="收货人" width="120"></el-table-column>
        <el-table-column prop="deliverAddress" label="配送地址" width="200"></el-table-column>
        <el-table-column label="送达时间" width="100">
          <template slot-scope="scope">
            <span>{{new Date(scope.row.deliveryTime).getHours()+':'+new Date(scope.row.deliveryTime).getMinutes()+':'+ new Date(scope.row.deliveryTime).getSeconds()}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="remarks" label="用户备注" width="80"></el-table-column>
        <el-table-column prop="orderAmount" label="订单金额" width="80"></el-table-column>
        <el-table-column prop="orderState" label="订单状态" width="80"></el-table-column>
        <el-table-column fixed="right" prop="name" label="操作" width="100">
          <template slot-scope="scope">
            <el-button type="text" @click="chakan(scope.row.id)">查看</el-button>
            <el-button type="text" @click="bianji(scope.row)">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 查看的显示位置 -->
    <el-dialog title="详细情况" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="订单id" :label-width="formLabelWidth">
          <span v-show="state">{{form.id}}</span>
          <el-input v-show="!state" autocomplete="off" v-model="form.id"></el-input>
        </el-form-item>
        <el-form-item label="订单号" :label-width="formLabelWidth">
          <span v-show="state">{{form.orderNo}}</span>
          <el-input v-show="!state" autocomplete="off" v-model="form.orderNo"></el-input>
        </el-form-item>
        <el-form-item label="下单时间" :label-width="formLabelWidth">
          <span v-show="state">{{form.orderTime}}</span>
          <el-input v-show="!state" autocomplete="off" v-model="form.orderTime"></el-input>
        </el-form-item>
        <el-form-item label="联系电话" :label-width="formLabelWidth">
          <span v-show="state">{{form.phone}}</span>
          <el-input v-show="!state" autocomplete="off" v-model="form.phone"></el-input>
        </el-form-item>
        <el-form-item label="收货人" :label-width="formLabelWidth">
          <span v-show="state">{{form.consignee}}</span>
          <el-input v-show="!state" autocomplete="off" v-model="form.consignee"></el-input>
        </el-form-item>
        <el-form-item label="送货地址" :label-width="formLabelWidth">
          <span v-show="state">{{form.deliverAddress}}</span>
          <el-input v-show="!state" autocomplete="off" v-model="form.deliverAddress"></el-input>
        </el-form-item>
        <el-form-item label="送达时间" :label-width="formLabelWidth">
          <span v-show="state">{{form.deliveryTime}}</span>
          <el-input v-show="!state" autocomplete="off" v-model="form.deliveryTime"></el-input>
        </el-form-item>
        <el-form-item label="备注" :label-width="formLabelWidth">
          <span v-show="state">{{form.remarks}}</span>
          <el-input v-show="!state" autocomplete="off" v-model="form.remarks"></el-input>
        </el-form-item>
        <el-form-item label="订单金额" :label-width="formLabelWidth">
          <span v-show="state">{{form.orderAmount}}</span>
          <el-input v-show="!state" autocomplete="off" v-model="form.orderAmount"></el-input>
        </el-form-item>
        <el-form-item label="订单状态" :label-width="formLabelWidth">
          <span v-show="state">{{form.orderState}}</span>
          <!-- <el-input v-show="!state" autocomplete="off" v-model="form.orderState"></el-input> -->
          <el-select v-show="!state" v-model="form.orderState" placeholder="订单状态">
            <el-option v-for="item in option" :key="item" :label="item" :value="item"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="sure">确 定</el-button>
      </div>
    </el-dialog>
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
import { orderlist, orderdetail, orderedit } from "@/api/apis";
import { getChinatime } from "@/utils/utils";
export default {
  data() {
    return {
      //查询数据
      date: null,
      orderNo: "",
      consignee: "",
      phone: "",
      orderState: "",
      option: ["已完成", "派送中", "已受理", "全部"],

      currentPage: 1, //默认显示第一页
      pageSize: 5, //默认每页显示10条
      totalNum: 1000, //总页数
      tableData: [], //表格数据

      dialogFormVisible: false,
      formLabelWidth: "100px",
      form: {},
      state: false,
    };
  },
  methods: {
    //刷新列表
    ky(paramsex) {
      orderlist({
        currentPage: this.currentPage,
        pageSize: this.pageSize,
        ...paramsex,
      }).then((res) => {
        for (let obj of res.data.data) {
          obj.deliveryTime = getChinatime(obj.deliveryTime);
          obj.orderTime = getChinatime(obj.orderTime);
        }

        this.tableData = res.data.data;
        // console.log(this.tableData);
        this.totalNum = res.data.total; //总条数
      });
    },
    //点击切页
    handleCurrentChange(val) {
      this.currentPage = val; //动态改变
      this.ky(this.paramsex);
    },
    //查询功能
    search() {
      //如果用户选择了时间
      let { orderNo, consignee, phone, orderState } = this;
      //额外参数对象
      let paramsex = {};
      if (orderNo != "") paramsex.orderNo = orderNo;
      if (consignee != "") paramsex.consignee = consignee;
      if (phone != "") paramsex.phone = phone;
      if (orderState != "" && orderState != "全部")
        paramsex.orderState = orderState;
      if (this.date)
        paramsex.date = JSON.stringify([
          getChinatime(this.date[0]),
          getChinatime(this.date[1]),
        ]);
      this.paramsex = paramsex;
      this.ky(paramsex);
    },
    //查看功能
    chakan(a) {
      this.dialogFormVisible = true;
      orderdetail(a).then((res) => {
        res.data.data.deliveryTime = getChinatime(res.data.data.deliveryTime);
        res.data.data.orderTime = getChinatime(res.data.data.orderTime);
        this.form = res.data.data;
        this.state = true;
      });
    },
    bianji(a) {
      console.log(a);
      this.form = a;
      this.dialogFormVisible = true;
      this.state = false;
    },
    sure() {
      this.dialogFormVisible = false;
      if (this.state == false) {
        orderedit(this.form).then((res) => {
          if (res.data.code == 0) {
            this.$message({
              message: "信息修改成功！",
              type: "success",
            });
          }
        });
        this.ky();
      }
    },
  },
  created() {
    this.ky();
  },
};
</script>
<style scoped lang='less'>
.father {
  margin: 30px 20px 0;
  margin-top: 30px;
  padding: 10px 20px;
  box-sizing: border-box;
  background: #ffffff;
  .query {
    margin-top: 20px;
    .el-date-editor {
      margin-left: 15px;
      margin-right: 15px;
    }
    button {
      padding: 8px 10px;
      background: #0099cc;
      color: #ffffff;
      border: none;
    }
  }
  .table {
    width: 100%;
    margin-top: 20px;
    background: #ffffff;
  }
  .sp {
    margin-left: 15px;
  }
  .el-input {
    width: 180px;
  }
  .el-form-item {
    margin-bottom: 8px;
  }
  .el-dialog__body {
    padding: 0 !important;
  }
}
</style>