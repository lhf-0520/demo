<template>
  <div class="student-main">
    <el-dialog title="选择头像" :visible.sync="dialog" width="60%" :before-close="handleClose">
       <el-table :data="List.skuList" border stripe>
        <el-table-column prop="color_text" label="颜色" :width="120" />
        <el-table-column prop="color" label="色值" :width="120" />
        <el-table-column label="sku编码" :width="200">
          <template slot-scope="scope">
            <el-input v-model="scope.row.sku_code" size="mini" placeholder="自定义sku编码" />
          </template>
        </el-table-column>
        <el-table-column label="价格" :width="160">
          <template slot-scope="scope">
            <el-input v-model="scope.row.price" size="mini" placeholder="价格,单位:分" />
          </template>
        </el-table-column>
        <el-table-column label="库存" :width="160">
          <template slot-scope="scope">
            <el-input v-model="scope.row.count" size="mini" />
          </template>
        </el-table-column>
        <!-- <el-table-column label="操作" :width="160">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="text"
              @click="doSaveSku(scope.row)"
            >提交修改</el-button>
          </template>
        </el-table-column> -->
      </el-table>
    </el-dialog>
  </div>
</template>

<script>
import _ from "lodash";
import { productDetail } from "@/api/product/index";
import axios from "axios";
export default {
  data() {
    return {
      List: [],
      dialog: false,
    };
  },
  created() {},
  methods: {
    handleClose() {
      this.dialog = false;
    },

    openDialog(id) {
      this.dialog = true;
      var obj = {
        id: id,
      };
      console.log(id);
      productDetail(obj).then((res) => {
        this.List = res.data;
        console.log(res);
        console.log(this.List.skuList);
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.student-main {
  .card {
    margin: 30px;
  }
}
</style>