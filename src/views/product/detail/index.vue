<template>
  <div class="product-detail-main">
    <div class="step-bar">
      <el-steps :active="active" finish-status="success">
        <el-step title="步骤 1" />
        <el-step title="步骤 2" />
        <el-step title="步骤 3" />
        <el-step title="步骤 4" />
      </el-steps>
    </div>
    <el-card class="card-form card">
      <el-form ref="product" :model="product" label-width="80px">
        <!-- 第一步表单内容开始 -->
        <div v-show="active == 0" class="step-one">
          <el-form-item label="基本信息">
            <el-form ref="form" :model="product" label-width="80px">
              <el-card shadow="never">
                <el-row :gutter="80">
                  <el-col :span="12">
                    <el-form-item label="商品名称">
                      <el-input size="small" v-model="product.gname" />
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="商品编码">
                      <el-input size="small" v-model="product.pcode" />
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="商品单位">
                      <el-input size="small" v-model="product.unit_name" />
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="商品排序">
                      <el-input size="small" v-model="product.sort" />
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="关键词">
                      <el-input size="small" v-model="product.keywords" />
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="品牌">
                      <el-select v-model="product.brand_id" size="small" placeholder>
                        <el-option
                          v-for="item in brandLists"
                          :key="item.id"
                          :label="item.cname"
                          :value="item.id"
                        />
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="原产地">
                      <el-cascader
                        v-model="selectedCity"
                        size="small"
                        :options="cityOptions"
                        placeholder="原产地"
                      />
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="系列">
                      <el-select v-model="product.seriesId" size="small" placeholder>
                        <el-option
                          v-for="item in seriesLists"
                          :key="item.id"
                          :label="item.cname"
                          :value="item.id"
                        />
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="22">
                    <el-form-item label="是否火热" style="float:left">
                      <el-switch
                        v-model="product.ishot"
                        :active-value="'1'"
                        :inactive-value="'0'"
                        active-color="#13ce66"
                        inactive-color="#C0CCDA"
                      ></el-switch>
                    </el-form-item>

                    <el-form-item label="是否上架" style="float:left;margin-left:50px">
                      <el-switch
                        v-model="product.isshow"
                        :active-value="'1'"
                        :inactive-value="'0'"
                        active-color="#13ce66"
                        inactive-color="#C0CCDA"
                      ></el-switch>
                    </el-form-item>

                    <el-form-item label="是否推荐" style="float:right">
                      <el-switch
                        v-model="product.isnew"
                        :active-value="'1'"
                        :inactive-value="'0'"
                        active-color="#13ce66"
                        inactive-color="#C0CCDA"
                      ></el-switch>
                    </el-form-item>

                    <!-- <el-form-item label="送货服务">
                      <el-switch
                        v-model="product.service_promise"
                        :active-value="'1'"
                        :inactive-value="'0'"
                        active-color="#13ce66"
                        inactive-color="#C0CCDA"
                      ></el-switch>
                    </el-form-item>-->
                  </el-col>
                </el-row>
                <el-col :span="12">
                  <el-form-item label="商品进价">
                    <el-input-number v-model="product.price_in" :min="0" label></el-input-number>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="商品标价">
                    <el-input-number v-model="product.price_out" :min="0" label></el-input-number>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="当前价位">
                    <el-input-number v-model="product.price_now" :min="0" label></el-input-number>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="商品重量">
                    <el-input-number v-model="product.weight" :min="0" label></el-input-number>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="库存总量">
                    <el-input-number v-model="product.sku_count" :min="0" label></el-input-number>
                  </el-form-item>
                </el-col>
              </el-card>
            </el-form>
          </el-form-item>
        </div>
        <!-- 第二步表单内容开始 -->
        <div v-show="active == 1" class="step-two">
          <el-form-item label="商品详情">
            <el-form ref="form" :model="product" label-width="80px">
              <el-card shadow="never">
                <el-row :gutter="80">
                  <el-col :span="24">
                    <el-upload
                      ref="upload"
                      :action="host+'/api/leju/admin/material/uploadImg'"
                      :file-list="fileList"
                      :on-success="handleUpCoveimg"
                    >
                      <el-button
                        size="small"
                        type="primary"
                        style="float:left;margin-top:30px"
                      >点击封面上传</el-button>
                      <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                      <img
                        style="float:left;margin-left:20px;margin-top:30px"
                        class="coverimg"
                        :src="product.cover_img"
                        alt
                      />
                    </el-upload>
                  </el-col>

                  <el-col :span="8">
                    <el-form-item label="商品分类">
                      <el-checkbox-group v-model="product.kindIds" size="small">
                        <el-checkbox
                          v-for="item in kindLists"
                          :key="item.id"
                          :label="item.id"
                        >{{ item.ctitle }}</el-checkbox>
                      </el-checkbox-group>
                    </el-form-item>
                  </el-col>

                  <el-row></el-row>
                </el-row>
                <el-row :gutter="30">
                  <el-col :span="20">
                    <el-form-item label="添加sku">
                      <span>颜色:</span>
                      <el-checkbox-group v-model="colorSel">
                        <el-checkbox
                          v-for="item in colorObjList"
                          :key="item.value"
                          :label="item.text"
                        >
                          <span :style="{color:item.value}">{{ item.text }}</span>
                          <span style="font-size:12px;" @click="delColor(item.text)">删除</span>
                        </el-checkbox>
                      </el-checkbox-group>

                      <el-input
                        v-model="colorObj.text"
                        size="small"
                        style="width:160px"
                        placeholder="颜色描述:比如土豪金"
                      />
                      <el-input
                        v-model="colorObj.value"
                        size="small"
                        style="width:160px"
                        placeholder="色值:比如#ff0055"
                      />
                      <el-button size="small" type="primary" @click="addColorObj">创建</el-button>

                      <div>
                        <el-button
                          v-show="colorObjList"
                          type="small"
                          @click="createSkus"
                        >{{ skuList.lenght>0?'重新生成':'生成' }}</el-button>
                      </div>
                      <el-table :data="skuList" border stripe>
                        <el-table-column prop="color_text" label="颜色" :width="120" />
                        <el-table-column prop="color" label="色值" :width="120" />
                        <el-table-column label="sku编码" :width="200">
                          <template slot-scope="scope">
                            <el-input
                              v-model="scope.row.sku_code"
                              size="mini"
                              placeholder="自定义sku编码"
                            />
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
                        <el-table-column label="操作" :width="160">
                          <template slot-scope="scope">
                            <el-button
                              style="color:red"
                              size="mini"
                              type="text"
                              @click="removeSku(scope.row.tempId)"
                            >删除</el-button>
                          </template>
                        </el-table-column>
                      </el-table>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row></el-row>
              </el-card>
            </el-form>
          </el-form-item>
        </div>
        <!-- 第三步表单内容开始 -->
        <div v-show="active == 2" class="step-three">
          <el-form-item label="详情页">
            <el-form ref="form" :model="product" label-width="80px">
              <el-card shadow="never">
                <el-row :gutter="80">
                  <el-col :span="12">
                    <el-form-item label="详情标题">
                      <el-input size="small" v-model="product.detail_title" />
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="关键词">
                      <el-input size="small" v-model="product.keywords" />
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="备注">
                      <el-input size="small" v-model="product.bak" />
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="详情描述">
                      <el-input size="small" v-model="product.descr" />
                    </el-form-item>
                  </el-col>
                  <el-col :span="20">
                    <el-upload
                      ref="upload"
                      :action="host+'/api/leju/admin/material/uploadImg'"
                      :file-list="fileList"
                      :on-success="handleUploadSucc"
                    >
                      <el-button size="small" type="primary" style="float:left;margin-top:30px">点击上传</el-button>
                      <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                      <div v-if="ishow==1" style="float:left;margin-left:20px">
                        <div
                          v-for="(item,index) in args"
                          :key="index"
                          style="float:left;margin-left:20px;margin-top:40px"
                        >
                          <img style="float:left;margin-left:20px" class="dreeimg" :src="item" alt />
                        </div>
                      </div>
                      <div v-if="ishow==0" style="float:left;margin-left:20px">
                        <div
                          v-for="(item,index) in arr"
                          :key="index"
                          style="float:left;margin-left:20px;margin-top:40px"
                        >
                          <img style="float:left" class="dreeimg" :src="item" alt />
                        </div>
                      </div>
                    </el-upload>
                  </el-col>
                  <el-col :span="8"></el-col>
                </el-row>
                <Tinymce v-model="product.content" class="last" />
              </el-card>
            </el-form>
          </el-form-item>
        </div>

        <div v-show="active == 3" class="step-three">
          <el-form-item label="第四步">
            <el-button type="primary" @click="doSave">确 定</el-button>
          </el-form-item>
          <el-row :gutter="30">
            <el-col :span="12">
              <el-form-item label="关联商品">
                <el-transfer v-model="linkProduct" :titles="['所有商品','选中商品']" :data="productLists" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item label="备注">
            <el-input v-model="product.bak" type="textarea" placeholder="填写备注信息" />
          </el-form-item>
        </div>
      </el-form>
      <el-button type="primary" @click="goPre" style="margin-left:40%" v-if="show==1">上一步</el-button>
      <el-button type="primary" @click="goNext">下一步</el-button>
    </el-card>
  </div>
</template>

<script>
import _ from "lodash";
import { regionDataPlus, CodeToText } from "element-china-area-data";
const settingFile = require("@/settings.js");
import Tinymce from "@/components/Tinymce/index.vue";
import {
  productList,
  productDetail,
  productUpdate,
  productSave,
  seriesList,
} from "@/api/product/index";
import { brandList } from "@/api/brand/brand";
import { kindList } from "@/api/kind/kind";
export default {
  components: {
    Tinymce,
  },
  name: "detail",
  data() {
    return {
      productLists:[],
      linkProduct: [],
      skuList: [],
      brandLists: [],
      colorObj: {},
      colorSel: [],
      seriesLists: [],
      colorObjList: [],
      kindLists: [],
      active: 0,
      product: {
        isshow: "1",
        kindIds: [],
        // service_promise: '',
        cover_img: "",
        imgs: [],
      },
      host: settingFile.host,
      fileList: [],
      cityOptions: regionDataPlus,
      selectedCity: [],
      img: "",
      arr: [],
      ishow: 1,
      args: [],
      show: 1,
    };
  },
  computed: {},
  created() {
    this.getproductList();
    this.getKindList();
    this.getBrandList();
    this.getSeriesList();
    // console.log(this.$route.params.id);
    //    setTimeout(() => {
    //   this.selectedCity = ['110000', '110100', '110102']
    // }, 2000)
    if (this.$route.params.id) {
      this.getproduct();
    }
  },
  mounted() {},
  methods: {
    createSkus() {
      this.skuList = [];
      this.colorObjList.forEach((item) => {
        this.skuList.push({
          tempId: item.text, // 颜色描述为id
          sku_code: "",
          color_text: item.text,
          color: item.value,
          price: 0,
          count: 0,
        });
      });
    },
    addColorObj() {
      var colorObjNew = _.clone(this.colorObj);
      this.colorObjList.push(colorObjNew);
      this.colorObj = {};
    },
    getproductList(){
      productList().then((res)=>{
      var list = res.data.list
        list.forEach(item => {
          this.productLists.push({
            key: item.id,
            label: item.gname
          })
        })
      })

    },
    getSeriesList() {
      seriesList().then((res) => {
        console.log(res);
        this.seriesLists = res.data;
      });
    },
    getKindList() {
      kindList().then((res) => {
        this.kindLists = res.data;
      });
    },
    openImg() {},
    removeSku(tempId) {
      this.skuList = this.skuList.filter((item) => item.tempId != tempId);
    },
    delColor(text) {
      this.colorObjList = this.colorObjList.filter((item) => item.text != text);
    },
    handleUploadSucc(response, file, fileList) {
      this.img = response.ossUrl;
      this.ishow = 0;
      if (this.arr.length < 4) {
        this.arr.push(this.img);
        this.product.imgs = this.arr;
        // console.log(this.product.imgs);
        this.$refs.upload.clearFiles();
        this.getproduct();
      } else {
        this.$message.error("已经满了");
        return;
      }
      // console.log(this.img);
    },

    getBrandList() {
      brandList().then((res) => {
        this.brandLists = res.data.list;
      });
    },
    handleUpCoveimg(response, file, fileList) {
      this.product.cover_img = response.ossUrl;
      console.log(this.product.cover_img);
      this.$refs.upload.clearFiles();
      // this.getproduct()
    },
    doSave() {
      // var submitObj = {
      //   ...this.product
      // };
      // var api = null;
      // if (this.product.id) {
      //   api = productUpdate;
      // } else {
      //   api = productSave;
      // }

      productSave(this.product).then((res) => {
        if (res.code == "success") {
          this.$message.success("保存成功");
          this.$router.push({ name: "productList" });
        } else {
          this.$message.error("保存失败");
        }
        console.log(res);
      });
    },
    getproduct() {
      var obj = {
        id: this.$route.params.id,
      };
      
      productDetail(obj).then((res) => {
        this.product = res.data;
        if (this.product.link1) {
          
          if (this.product.link1.indexOf(',') != 1) {
            this.linkProducts = this.product.link1.split(',')
            console.log(this.linkProducts);
          }
        }
        
        this.args = this.product.imgs.split(",");
        if (this.product.kindIds.indexOf(",") != -1) {
          this.product.kindIds = this.product.kindIds.split(",");
        }
        this.skuList = this.product.skuList;
      });
    },
    stepNext() {
      if (this.active++ > 2) this.active = 0;
    },
    goPre() {
      if (this.active <= 0) {
        this.show = 0;
      } else {
        this.active--;
      }
    },
    goNext() {
      if (this.active === 3) return;
      this.show = 1;
      this.active++;
    },
  },
};
</script>

<style scoped lang="scss">
.product-detail-main {
  .card {
    margin: 10px;
    .dreeimg {
      transform: translateY(-10px);
      height: 30px;
      width: 30px;
    }
    .coverimg {
      // display: block;
      transform: translateY(-10px);
      height: 60px;
    }
    ::v-deep .tinymce {
      width: 90%;
    }
  }
  .step-bar {
    width: 900px;
    margin: 30px auto;
  }
}
</style>

