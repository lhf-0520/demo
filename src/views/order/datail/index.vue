<template>
  <div class="product-detail-main">
    <div class="step-bar">
      <el-steps :active="step" finish-status="success">
        <el-step title="未付款"  />
        <el-step title="已付款"  />
        <el-step title="已发货"  />
        <el-step v-if="orderBaseInfo.orderStatus=='8'" title="申请退货"  />
        <el-step v-else title="已收货"  />
        <el-step title="已关闭"  />
      </el-steps>
    </div>
    <el-card class="card-form card">
      <el-form ref="product" label-width="80px">
        <!-- 第一步表单内容开始 -->
        <div v-show="active == 0" class="step-one" >
          <div slot="header">
        <span>当前订单状态: </span>
        <span v-if="orderBaseInfo.statusend == '0'" style="color: green;">订单处理中...</span>
        <span v-else style="color: red;">订单已关闭</span>
      </div>
          <el-form-item label="基本信息">
           <el-form ref="form" label-width="80px" >
              <el-card shadow="never" >
                <el-row :gutter="80" label="用户信息">
                      <el-col :span="24">
                      <img
                        style="float:left;margin-left:20px;margin-top:30px"
                        class="coverimg"
                        :src="product.avatar"
                        alt
                      />
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="NickName">
                      <el-input size="small" v-model="product.nickname" />
                    </el-form-item>
                  </el-col>
                   <el-col :span="12">
                    <el-form-item label="UserName">
                      <el-input size="small" v-model="product.username" />
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="Name">
                      <el-input size="small" v-model="product.name" />
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="居住城市">
                      <el-input size="small" v-model="product.cityStr" />
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="公司名称">
                      <el-input size="small" v-model="product.cityBak" />
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="联系电话">
                      <el-input size="small" v-model="product.tel" />
                    </el-form-item>
                  </el-col>
                </el-row>  
              </el-card>
           </el-form>
          </el-form-item>
           <el-form-item label="订单详情">
            <el-form ref="form" label-width="80px" >
              <el-card shadow="never" >
                <el-row :gutter="80" v-for="(item,index) in orderList" :key="index">
                      <el-col :span="24">
                      <img
                      label="商品头像"
                        style="float:left;margin-left:20px;margin-top:30px"
                        class="coverimg"
                        :src="item.cover_img"
                        alt
                      />
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="BrandName">
                      <el-input size="small" v-model="item.brandName" />
                    </el-form-item>
                  </el-col>
                   <el-col :span="12">
                    <el-form-item label="商品名称">
                      <el-input size="small" v-model="item.gname" />
                    </el-form-item>
                  </el-col>
                   
                  <el-col :span="12">
                    <el-form-item label="数量">
                      <el-input size="small" v-model="item.count" />
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="颜色">
                      <el-input size="small" v-model="item.color_text" />
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="价钱">
                      <el-input size="small" v-model="item.price" />
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="描述">
                      <el-input size="small" v-model="item.gdescr" />
                    </el-form-item>
                  </el-col>
                </el-row>  
              </el-card>
           </el-form>
          </el-form-item>
        </div>
      </el-form>
       <div style="margin:30px auto 60px; text-align: center;">
      <!-- 流程说明 客户端未付款0 ==> 客户端付款1==> 服务端发货2 ==> 客户端收货3 (申请退款9)==> 服务端关闭(statusend:1) -->
      <!-- 如果商家没有发货 当前状态是1  应该显示 已发货按钮
        如果商家发货成功 客户还没有收到货物 商家等待,不能操作
        如果客户确认收货,商家可以关闭订单  -->
      <el-button v-if="step==2" type="primary" @click="sendDone">已发货</el-button>
      <el-button v-if="step==3" disabled type="primary">等待客户收货...</el-button>
      <el-button v-if="orderBaseInfo.statusend == '0'&&step==4" type="primary" @click="closeOrder">关闭订单</el-button>
      <!-- 前提: 由于退单导致 客户端无法操作"确认收货" ,具体场景参考 后台=>订单管理=> 后台强制确认收货 api说明文档 -->
      <el-button v-if="isAllBak" type="primary" @click="closeOrderByBack">强制确认收货</el-button>

    </div>
    </el-card>
  </div>
</template>

<script>
import { userInfo,orderDetail,orderList,ordersendDone,ordercloseOrder,orderByBack } from "@/api/order/index";
import _ from "lodash";
const settingFile = require("@/settings.js");
export default {
  name: "detail",
  data() {
    return {
      // step:0,
      active: 0,
      ishow: 1,
      show: 1,
      product:[],
      orderId:'',
      orderList:[],
      orderBaseInfo:{}
    };
  },
  computed: {
    isAllBak() {
      // 默认是
      var isAll = true
      for (var i = 0; i < this.orderList.length; i++) {
        var order = this.orderList[i]
        // 如果有一个order的backId 是空 旧说明不是全部都退了
        if (!order.backId) {
          isAll = false
          break
        }
      }
      // 如果当前的状态是已发货,而且所有的sku都是申请退货状态 可以显示
      return isAll && (this.getOrderBaseInfo.orderStatus == '2')
    },
    step() {
      // 是否订单被关闭 跟statusend 有关
      if (this.orderBaseInfo.statusend == '1') return 4
      // 字符串强转number
      return parseInt(this.orderBaseInfo.orderStatus) + 1
    }
  },
  created() {
   this.getorder()
   this.getOrderBaseInfo()
   this.getorderDetail()
  },
  mounted() {},
  methods: {
    closeOrderByBack() {
      orderByBack({
        orderId: this.orderId
      }).then(res => {
        if (res.code == 'S') {
          // 更改状态成功,刷新页面
          this.$message.success('确认收货成功!')
          location.reload()
        } else {
          this.$message.error(res.msg)
        }
      })
    },
     closeOrder() {
      ordercloseOrder({ id: this.orderBaseInfo.orderId })
        .then(res => {
          if (res.code == 'S') {
            // 重新刷新页面
            location.reload()
          } else {
            this.$message.error(res.msg)
          }
        })
    },
 sendDone() {
      ordersendDone({
        id: this.orderBaseInfo.orderId
      }).then(res => {
        // 成功后状态变为1
        if (res.code == 'S') {
          // 简单来说重新刷新页面  这个写法不会刷新
          // this.$router.push({name: 'orderDetail',params:{orderId: this.orderBaseInfo.orderId}})
          // console.log('fff')
          window.location.reload()
          // 订单状态 1 已付款 ; 2 已发货; 3: 已收货; 9 申请退款
          // this.orderBaseInfo.orderStatus = 2 ;
        } else {
          // res.msg是返回的错误信息
          this.$message.error(res.msg)
        }
      })
    },
     getOrderBaseInfo() {
      
        orderList({
          orderId: this.$route.params.id
        })
        .then(res => {
          console.log(res);
          // this.step=orderBaseInfo.statusend;
          this.orderBaseInfo = res.data.list[0]
          console.log(this.orderBaseInfo.orderStatus);
          // this.step=this.orderBaseInfo.statusend;
        })
    },
    getorder() {
      var obj = {
        orderId: this.$route.params.id,
      };
      userInfo(obj).then(res => {
        this.product = res.data;
        // console.log(res);
      });
    },
      getorderDetail() {
      var obj = {
        orderId: this.$route.params.id,
      };
      
      orderDetail(obj).then((res) => {
        this.orderList = res.data;
        // console.log(res);
      });
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

