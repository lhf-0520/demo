<template>
  <div class="product-main">
    <el-card class="card search-bar" shadow="hover">
      <div slot="header">
        <span>搜索栏</span>
      </div>
      <el-row :gutter="30">
        <el-col :span="6">
          <el-input v-model="search.gname" size="small" placeholder="商品名称" />
        </el-col>
        <el-col :span="6">
          <el-input v-model="search.gname" size="small" placeholder="商品名称" />
        </el-col>
        <el-col :span="6">
          <el-input v-model="search.gname" size="small" placeholder="商品名称" />
        </el-col>
        <el-col :span="6">
          <el-input v-model="search.gname" size="small" placeholder="商品名称" />
        </el-col>
      </el-row>
      <el-row :gutter="30" style="margin-top: 30px">
        <el-col :span="6">
          <el-input v-model="search.gname" size="small" placeholder="商品名称" />
        </el-col>
        <el-col :span="6" :offset="12">
          <el-button type="primary" size="small" @click="doSearch">搜索</el-button>
        </el-col>
      </el-row>
    </el-card>

    <!-- 数据部分开始 -->
    <el-card class="container card">
      <div slot="header">
        <el-button type="primary" size="small" @click="goAdd">新增</el-button>
      </div>
      <el-table v-loading="loading" :data="list" border stripe>
        <el-table-column label="更新状态" :width="200">
          <template slot-scope="scope">
            <p>
              上架:
              <el-switch
                v-model="scope.row.isshow"
                :active-value="1"
                :inactive-value="0"
                @change="getswitchCode(scope.row)"
              />
            </p>
            <p>
              最热:
              <el-switch
                v-model="scope.row.ishot"
                :active-value="1"
                :inactive-value="0"
                @change="getswitchCode(scope.row)"
              />
            </p>
            <p>
              最新:
              <el-switch
                v-model="scope.row.isnew"
                :active-value="1"
                :inactive-value="0"
                @change="getswitchCode(scope.row)"
              />
            </p>
          </template>
        </el-table-column>
        <el-table-column align="center" label="商品名称" width="220">
          <template slot-scope="scope">
            <p>{{ scope.row.gname }}</p>
            <p>品牌: {{ scope.row.brandName }} | {{ scope.row.brandEname }}</p>
            <p>{{ scope.row.descr }}</p>
          </template>
        </el-table-column>
          <el-table-column label="商品封面" width="120">
          <template slot-scope="scope">
            <img style="height:100px" :src="scope.row.cover_img" alt />
          </template>
        </el-table-column>
        <el-table-column prop="pcode" label="商品编码" width="120"></el-table-column>
        <el-table-column prop="price_in" label="商品价格" width="120"></el-table-column>
        <el-table-column prop="ctitles" label="商品分类" width="120"></el-table-column>
         <el-table-column align="center" label="查看sku" :width="180">
          <template slot-scope="scope">
            <a style="color: #409EFF;" class="el-icon-edit" @click="showSkuList(scope.row.id)">查看sku</a>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="220">
          <template slot-scope="scope">
            <el-button type="primary" @click="goEdit(scope.row.id)">编辑</el-button>

            <el-button type="danger" size="mini" @click="doDelCostItem(scope.row.id)">删除</el-button>
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
  <Mariage ref="mariage" @saveCoverImg="addCoverList"></Mariage>
  </div>
</template>

<script>
import Mariage from "@/components/mariage/index.vue";
import { pickBy } from "@/utils/index";
import { productList, delList, switchCode } from "@/api/product/index";
import _ from "lodash";
import axios from "axios";
export default {
  name: "ProductList",
   components: {
    Mariage,
  },
  data() {
    return {
      loading: false,
      search: {},
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
  computed: {},
  created() {
    this.getProductList();
    this.doDelCostItem();
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
    showSkuList(id){
      console.log(id);
      this.$refs.mariage.openDialog(id);
    },
    getProductList() {
      this.loading = true;
      var params = {
        start: this.page.start,
        limit: this.page.limit,
        ...this.search,
      };
      // console.log(params);
      params = pickBy(params);
      productList(params).then((res) => {
        this.list = res.data.list;
        console.log(res);
        this.page.totalCount = res.data.totalRow;
        this.loading = false;
        // console.log(res);
      });
    },
    // 更新字符
    getswitchCode(obj) {
    console.log(obj);
    var obj2 ={
      isnew:obj.isnew,
      ishot:obj.ishot,
      isshow:obj.isshow,
      id:obj.id,

    }
      switchCode(
        obj2,
      ).then((res) => {
          if (res.code == "success") {
          this.$message.success("保存成功");
       
        } else {
          this.$message.error("保存失败");
        }
        console.log(res);
      });
    },
    // 删除对象
    doDelCostItem(id) {
      delList({
        id: id,
      }).then((res) => {
        // console.log(res);
        this.getProductList();
      });
    },
    // 去新增页面
    goAdd() {
      // 跳转
      this.$router.push({ name: "productAdd" });
    },
    // 编辑
    goEdit(id) {
      console.log(id);
      this.$router.push({name: "productEditor", params:{id:id } });
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
