<template>
  <div class="product-main">
  <el-card class="search-box card" shadow="never">
      <div slot="header">
        <span>条件查询</span>
      </div>
      <el-row :gutter="30">
        <el-col :span="6">
          <el-input v-model="search.username" size="small" placeholder="用户名/模糊查询" />
        </el-col>
        <el-col :span="6">
          <el-select v-model="search.status" size="small" clearable placeholder="订单状态">
            <!-- 订单状态 0 未付款; 1 已付款 ;  2 已发货; 3: 已收货; 9 申请退款 -->
            <el-option v-for="(v,key) in orderStatusObj" :key="v" :label="v" :value="key" />
          </el-select>
        </el-col>
        <el-col :span="6">
          <el-select v-model="search.statusend" size="small" clearable placeholder="是否关闭">
            <el-option label="正在进行" value="0" />
            <el-option label="已关闭" value="1" />
          </el-select>
        </el-col>

        <el-col :span="6">
          <!-- <el-button type="default" size="mini" @click="doReset">重置</el-button> -->
          <el-button type="primary" size="mini" @click="doSearch">搜索</el-button>
        </el-col>
      </el-row>
    </el-card>

    <!-- 数据部分开始 -->
    <el-card class="container card">
      <el-table v-loading="loading" :data="orderListCom" border stripe>
    <el-table-column align="center" label="订单状态" :width="160">
          <template slot-scope="scope">
            {{ scope.row.orderStatusText }}: {{ scope.row.orderStatus }}
          </template>
        </el-table-column>
       <el-table-column align="center" prop="statusend" label="是否关闭" :width="160">
          <template slot-scope="scope">
            <span v-if="scope.row.statusend=='1'" style="color: red;">已关闭</span>
            <span v-else style="color: green;">正在进行</span>
          </template>
        </el-table-column>
        <el-table-column prop="username" label="用户名" width="120"></el-table-column>
        <el-table-column prop="price" label="商品价格" width="120"></el-table-column>
        <el-table-column prop="count" label="商品数量" width="120"></el-table-column>
         <el-table-column prop="userId" label="用户id" width="180">
        </el-table-column>
        <el-table-column label="操作" width="220">
          <template slot-scope="scope">
            <el-button type="primary" @click="goEdit(scope.row.orderId)">详情</el-button>
            <el-button type="primary" @click="del(scope.row.orderId)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-pagination
        :current-page="page.start"
        :page-sizes="page.sizes"
        :page-size="page.limit"
        layout="total, sizes, prev, pager, next, jumper"
        :total="page.totalCount"
        @size-change="sizeChange"
        @current-change="currentChange"
      />
    </el-card>
  <!-- <Mariage ref="mariage" @saveCoverImg="addCoverList"></Mariage> -->
  </div>
</template>

<script>
// import Mariage from "@/components/mariage/index.vue";
import { pickBy } from "@/utils/index";
import { orderList,orderDel } from "@/api/order/index";
import _ from "lodash";
import axios from "axios";
export default {
  name: "OrderList",
  //  components: {
  //   Mariage,
  // },
  data() {
    return {
      search:{},
      loading: false,
      gname:'',
      orderStatusObj: {
        '0': '未付款',
        '1': '已付款',
        '2': '已发货',
        '3': '已收货',
        '9': '申请退货'
      },
      page: {
        start: 1,
        limit: 10,
        sizes: [10, 20, 30, 40],
        totalCount: 0,
      },
      list: [],

      // productList: []
    };
  },
  computed: {
       orderListCom() {
      var vm = this
      // 对象遍历  修改的是对象本身 隐患:修改了原始数据,可能造成程序在其他地方受影响
      this.list.forEach(item => {
        item.orderStatusText = vm.orderStatusObj[item.orderStatus]
        // // 添加了以元为单位的字段
        // item.priceCom = item.price / 100
      })
      return this.list
    }
  },
  created() {
    this.getProductList()
  },
  mounted() {},
  methods: {
     addCoverList(v) {
      console.log(v);
    },
    doSearch() {
      // 重置分页
      this.page.start = 1;
      this.getProductList();
    },
    // showSkuList(id){
    //   console.log(id);
    //   this.$refs.mariage.openDialog(id);
    // },
    getProductList() {
      this.loading = true;
      var params = {
        username:this.gname,
        start: this.page.start,
        limit: this.page.limit,
        ...this.search,
      };
      // console.log(params);
      params = pickBy(params);
      orderList(params).then((res) => {
        this.list = res.data.list;
        console.log(res);
        this.page.totalCount = res.data.totalRow;
        this.loading = false;
        // console.log(res);  
      });
    },
    // 更新字符
    // getswitchCode(obj) {
    // console.log(obj);
    // var obj2 ={
    //   isnew:obj.isnew,
    //   ishot:obj.ishot,
    //   isshow:obj.isshow,
    //   id:obj.id,

    // }
    //   switchCode(
    //     obj2,
    //   ).then((res) => {
    //       if (res.code == "success") {
    //       this.$message.success("保存成功");
       
    //     } else {
    //       this.$message.error("保存失败");
    //     }
    //     console.log(res);
    //   });
    // },
    // 删除对象
    // doDelCostItem(id) {
    //   delList({
    //     id: id,
    //   }).then((res) => {
    //     // console.log(res);
    //     this.getProductList();
    //   });
    // },
    // 去新增页面
    // goAdd() {
    //   // 跳转
    //   this.$router.push({ name: "productAdd" });
    // },
    // 编辑
    goEdit(id) {
      console.log(id);
      this.$router.push({name: "Detail", params:{id } });
    },
    del(id){
orderDel({id:id}).then(res=>{
  console.log(res);
  this.getProductList();
})
    },
    sizeChange(v) {
      //  console.log(`每页 ${v} 条`);
    },
    currentChange(v) {
      //  console.log(`当前页: ${v}`);
      // console.log(v);
      this.page.start = v;
      this.getProductList();
    },
  },
};
</script>

<style scoped lang="scss">
.product-main {
  .card {
    margin: 30px;
  }
}
</style>
