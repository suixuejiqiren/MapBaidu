<template>
  <el-table
    :data="fatherData"
    height="250"
    border
    style="width: 100%"
    @row-click="rowClick"
    @cell-click="cellClick"
  >
    <el-table-column
      fixed
      prop="title"
      label="地点"
      width="180">
    </el-table-column>
    <el-table-column
      prop="point.lat"
      label="纬度"
      width="180">
    </el-table-column>
    <el-table-column
      prop="point.lng"
      label="经度">
    </el-table-column>
    <el-table-column
      label="添加描述"
      width="180">
      <template slot-scope="scope">
        <!--<el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>-->
        <!--<el-button type="text" size="small">编辑</el-button>-->
        <el-input size="mini" v-model="scope.row.desc" placeholder="请输入内容"  v-if="scope.row.seen" @blur="loseFcous(scope.$index, scope.row) ">
        </el-input>
        <span v-else>{{scope.row.desc}}</span>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
  export default {
    name:"mapTable",
    props:['fatherData'],
    data() {
      return {
      }
    },
    methods:{
      loseFcous(index, row) {
        // debugger
        row.seen=false;
      },
      rowClick(row){
        console.log(row)
        this.$emit('transfer',row)
      },
      cellClick(row, cell,column){
        // debugger
        row.seen=true;
        console.log(cell)
      },
    }
  }
</script>
<style>
  .displayInput{
    visibility: hidden;
  }
</style>
