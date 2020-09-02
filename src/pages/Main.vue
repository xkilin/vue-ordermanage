<template>
  <div class="app_father">
    <div class="app_left">
      <div class="app_top">
        <img :src="src" alt />
        <span>{{name}}</span>
      </div>
      <el-row class="tac">
        <el-col>
          <el-menu
            :default-active="hash"
            class="el-menu-vertical-demo"
            @open="handleOpen"
            @close="handleClose"
            background-color="#304156"
            text-color="#fff"
            active-text-color="#0099cc"
            router
            unique-opened
          >
            <div v-for="(items,index) in powerarr" :key="index">
              <el-menu-item :index="items.url" v-if="!items.child">
                <i :class="items.icon"></i>
                <span>{{items.name}}</span>
              </el-menu-item>
              <el-submenu :index="items.url" v-if="items.child">
                <template slot="title">
                  <i :class="items.icon"></i>
                  <span>{{items.name}}</span>
                </template>
                <el-menu-item
                  :index="child.url"
                  v-for="(child,index) in items.child"
                  :key="index"
                  class="option"
                >{{child.name}}</el-menu-item>
              </el-submenu>
            </div>
          </el-menu>
        </el-col>
      </el-row>
    </div>
    <div class="app_right">
      <div class="app_righttop">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item v-for="(item,index) in breadlist" :key="index">{{item}}</el-breadcrumb-item>
        </el-breadcrumb>
        <div>
          <el-dropdown trigger="click">
            <span class="el-dropdown-link">
              <span>{{name}}</span>
              <img :src="src" alt />
              <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>
                <span @click="remove">注销</span>
              </el-dropdown-item>
              <el-dropdown-item>设置</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </div>
      <div class="app_content">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
//引入 验证token是否过期接口
import { checktoken, accountinfo } from "../api/apis.js";
export default {
  // components: {Index},
  data() {
    return {
      hash: "", //默认hash值
      name: "", //登录出来显示的登陆者的名字
      app_num: 1,
      src: "", //图片地址
      breadlist: [], //面包屑数组
      list: [
        {
          url: "/main/index",
          icon: "el-icon-house",
          name: "后台首页",
          roles: ["super", "normal"],
        },
        {
          url: "/main/ordermanagr",
          icon: "el-icon-document",
          name: "订单管理",
          roles: ["super", "normal"],
        },
        {
          url: "3",
          icon: "el-icon-shopping-bag-1",
          name: "商品管理",
          roles: ["super", "normal"],
          child: [
            {
              url: "/main/productlist",
              name: "商品列表",
            },
            {
              url: "/main/addproduct",
              name: "商品添加",
            },
            {
              url: "/main/classification",
              name: "商品分类",
            },
          ],
        },
        {
          url: "/main/storemanage",
          icon: "el-icon-s-shop",
          name: "店铺管理",
          roles: ["super"],
        },
        {
          url: "5",
          icon: "el-icon-user",
          name: "账号管理",
          roles: ["super", "normal"],
          child: [
            {
              url: "/main/accountlist",
              name: "账号列表",
            },
            {
              url: "/main/adduser",
              name: "账号添加",
            },
            {
              url: "/main/changepassword",
              name: "修改密码",
            },
            {
              url: "/main/personal",
              name: "个人中心",
            },
          ],
        },
        {
          url: "6",
          icon: "el-icon-pie-chart",
          name: "销售统计",
          roles: ["super"],
          child: [
            {
              url: "/main/productstatistics",
              name: "商品统计",
            },
            {
              url: "/main/orderstatistics",
              name: "订单统计",
            },
          ],
        },
      ],
    };
  },
  methods: {
    reload() {
      accountinfo(localStorage.id).then((res) => {
        console.log(res);
        this.src = res.data.accountInfo.imgUrl;
      });
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    app_ab(num) {
      this.app_num = num;
    },
    remove() {
      console.log(11);
      localStorage.removeItem("token");
      localStorage.removeItem("id");
      localStorage.removeItem("role");
      location.href = "/";
    },
  },
  computed: {
    //权限数组
    powerarr() {
      // 根据用户权限进行运算，返回运算完毕的数组
      let newarr = this.list.filter((item) => {
        //返回包含此用户权限的数据
        return item.roles.includes(localStorage.role);
      });
      return newarr;
      // es6
      // return this.list.filter(item => item.roles.includes(localStorage.role))
    },
  },
  created() {
    //改变默认hash值
    this.hash = this.$route.path;
    checktoken(localStorage.token).then((res) => {
      // console.log(res);
      //成功
      if (res.data.code == 0) this.name = localStorage.user;
      //拿取存储的用户名
      //失败
      else this.name = "请登录";
    }),
      this.reload();

    // 3. 监听bus的传递事件
    this.$bus.$on("imguploadfinish", () => {
      this.reload(); //刷新头像
    });

    //面包屑导航
    this.breadlist = this.$route.meta.breadlist;
  },
  //切换面包屑数组
  watch: {
    //监听当前路由的变化
    //to: 要切换到哪里, from: 来自哪里
    // $route(to, from){
    $route(to) {
      this.breadlist = to.meta.breadlist;
    },
  },
};
</script>

<style lang='less'>
a {
  text-decoration: none;
}
* {
  padding: 0;
  margin: 0;
}
.el-col {
  width: 221px !important;
}
.el-submenu__title {
  background: #006666 !important;
}
.el-menu-item {
  background: #006666 !important;
}
.app_father {
  display: flex;
  height: 100%;
  .app_left {
    height: 100% !important;
    width: 220px;
    background: #006666;
    .option {
      background: #006633 !important;
    }
    .app_top {
      width: 165px;
      margin: 0 auto;
      display: flex;
      justify-content: space-around;
      align-items: center;
      img {
        width: 50px;
        height: 50px;
        border-radius: 50%;
      }
      color: #fff;
    }
  }
  .app_right {
    flex: 1;
    display: flex;
    flex-direction: column;
    background: #f0f2f5;
    height: 100%;
    .app_righttop {
      .el-breadcrumb__inner{
        color: #fff;
      }
      color: #fff;
      width: 100%;
      padding: 5px 20px;
      box-sizing: border-box;
      height: 50px;
      display: flex;
      justify-content: space-between;
      background: #0099CC;
      img {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        margin-left: 15px;
      }
      div {
        color: #fff;
        display: flex;
        align-items: center;
      }
    }
    .app_content {
      flex: 1;
      overflow: auto;
      background: #dddddd;
    }
  }
  .el-dropdown-link {
    display: flex;
    align-items: center;
  }
}
button {
  outline: none;
}
.father {
  margin: 20px 20px;
}
html,
body {
  background: #f0f2f5;
}
</style>
