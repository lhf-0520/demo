<template>
  <div class="dashboard-container">
    <el-card class="card total-count-card">
      <div slot="header">
        <span>基本信息</span>
      </div>
     <el-row :gutter="30" >
       <el-col :span="6" class="card-item">
         <el-card>
            <div slot="header">
               <span>用户统计:{{ baseDate.userCount}}</span>
            </div> 
              <p>今日新增:{{ baseDate.userToday }}个 </p> 
         </el-card>
       </el-col>
      <el-col :span="6" class="card-item">
         <el-card>
            <div slot="header">
              <span>产品统计:{{ baseDate.productCount }}</span>
             
            </div> <p>今日新增:{{ baseDate.productToday }}个</p>
         </el-card>
       </el-col>
         <el-col :span="6" class="card-item">
         <el-card>
            <div slot="header">
              <span>订单数量:{{ baseDate.orderCount }}个</span> </div>
              <p>今日新增:{{ baseDate.orderToday }}个</p>
           
         </el-card>
       </el-col>
         <el-col :span="6" class="card-item">
         <el-card>
            <div slot="header">
              <span>退单数量:{{ baseDate.backCount }}个</span> </div>
              <p>今日新增:{{ baseDate.backToday }}个</p>
           
         </el-card>
       </el-col>
     </el-row>
    </el-card>
  </div>
</template>

<script>
import _ from "lodash";
import axios from "axios";
import { dashboard } from '@/api/dashboard/index'
export default {
  name: 'Dashboard',


   
data(){
  return{
     baseDate:{
       userCount:0,
       productCount:0,
       backCount:0,
       orderCount:0,
       productToday:0,
       userToday:0,
       orderToday:0,
       backToday:0
      //  imgCountByDay:[]
     },
     
  }
},
created(){
this.getBaseDate()
},

methods:{
  getBaseDate(){
    dashboard()
    .then(res=>{
      console.log(res);
      this.baseDate = res
      
    })
  }
}
}
</script>

<style lang="scss" scoped>
.dashboard-container{
  .card{
    margin: 20px;
  }
  .total-count-card{
    .card-item{
      height: 200px;
      margin: 30px auto;
    }
  }
  #echarts1{
    float: left;
    margin-left: 20px ;
    width: 230px;
    height: 300px;
    background-color: pink;
  }
  #echarts2{
    float: left;
    margin-left: 20px ;
    width: 230px;
    height: 300px;
    background-color:blue;
  }
  #echarts3{
    float: left;
    margin-left: 20px ;
    width: 230px;
    height: 300px;
    background-color: green;
  }
}
</style>
