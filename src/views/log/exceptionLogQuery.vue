<template>
  <div :style="{height: layout.windowHeight}">
    <div style="margin:5px;">
      <el-row style="margin-bottom: 5px">
        <el-col :span="7" style="text-align: left">
          <el-date-picker
            v-model="timeValue"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            value-format="yyyy-MM-dd"
          >
          </el-date-picker>
        </el-col>
        <el-col :span="7" style="text-align: left">
          <el-select v-model="value" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="7">
          <el-button @click="query">查询</el-button>
        </el-col>
      </el-row>
      <el-row :gutter="5">
        <el-col :span="8">
          <el-table
            :data="pageOne.tableData"
            highlight-current-row
            @row-click="dataBackFillGoods"
            border
            max-height="650"
            style="width: 100%">
            <el-table-column
              align="center"
              prop="indexs"
              label="访问排名">
            </el-table-column>
            <el-table-column
              align="center"
              prop="moduleName"
              label="归属地市">
            </el-table-column>
            <el-table-column
              align="center"
              prop="counts"
              label="用户登录名">
            </el-table-column>
            <el-table-column
              align="center"
              prop="counts"
              label="用户真实姓名">
            </el-table-column>
            <el-table-column
              align="center"
              prop="counts"
              label="异常发生次数">
            </el-table-column>
          </el-table>
          <div align="center">
            <el-pagination
              @size-change="handleSizeChangeOne"
              @current-change="handleCurrentChangeOne"
              :current-page="pageOne.currentPage"
              :page-sizes="pageOne.pageSizes"
              :page-size="pageOne.pageSize"
              layout="total, sizes, prev, next, jumper"
              :total="pageOne.totalCount">
            </el-pagination>
          </div>
        </el-col>
        <el-col :span="16">
          <el-table
            :data="pageTwo.tableData"
            border
            max-height="650"
            style="width: 100%">
            <el-table-column
              align="center"
              prop="regionName"
              label="归属地市">
            </el-table-column>
            <el-table-column
              align="center"
              prop="userName"
              label="用户登录名">
            </el-table-column>
            <el-table-column
              align="center"
              prop="displayName"
              label="用户真实姓名">
            </el-table-column>
            <el-table-column
              align="center"
              prop="moduleName"
              label="异常模块名称">
            </el-table-column>
            <el-table-column
              align="center"
              prop="useTime"
              label="异常发生时间">
            </el-table-column>
            <el-table-column
              align="center"
              prop="ipAddress"
              label="IP地址">
            </el-table-column>
          </el-table>
          <div align="center">
            <el-pagination
              @size-change="handleSizeChangeTwo"
              @current-change="handleCurrentChangeTwo"
              :current-page="pageTwo.currentPage"
              :page-sizes="pageTwo.pageSizes"
              :page-size="pageTwo.pageSize"
              layout="total, sizes, prev, next, jumper"
              :total="pageTwo.totalCount">
            </el-pagination>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">

  import moduleAccessQueryLog from './../../http/log/moduleAccessQueryLog'

  export default{
    props: [],
    data(){
      return{
        layout: {
          windowHeight: (window.outerHeight) + 'px',
          windowWidth: window.outerWidth + 'px'
        },
        value:'选项1',
        options: [{
          value: '选项1',
          label: '用户'
        }, {
          value: '选项2',
          label: '模块'
        }],
        timeValue:'',
        pageOne:{
          tableData:[],
          currentPage:1,
          pageSizes:[],
          pageSize:0,
          totalCount:1
        },
        pageTwo:{
          tableData:[],
          currentPage:1,
          pageSizes:[],
          pageSize:0,
          totalCount:1
        }
      }
    },
    created(){
      this.pageOne.pageSizes = this.$conf.page.page_sizes;
      this.pageOne.pageSize = this.pageOne.pageSizes[0];
      this.pageTwo.pageSizes = this.$conf.page.page_sizes;
      this.pageTwo.pageSize = this.pageTwo.pageSizes[0];
    },
    methods:{
      query(){
        /*console.log('查询');
         console.log(this.timeValue[0]);*/
        let params = {
          start:this.timeValue[0],     //开始时间
          end:this.timeValue[1],       //结束时间
          pageNum:this.pageOne.currentPage,   //当前页
          pageSize:this.pageOne.pageSize   //每页数量
        }
        if(this.timeValue == null || this.timeValue == undefined || this.timeValue == ''){
          this.$message({
            message: '请先选择日期!',
            type: 'warning'
          });
        }else {
          moduleAccessQueryLog.countByModuleDate(params).then((res)=>{
            console.log(res);
            if(res.data.status == 0){
              this.pageOne.totalCount = res.data.data.total;
              this.pageOne.tableData = res.data.data.list;
            }else {
              console.log(111);
              console.log(res.data.message);
              this.$alert(res.data.message, "提示");
            }
          }).catch((error)=>{
            console.log(error);
            this.$message.error('这里有一个错误!');
          })
        }
      },
      handleSizeChangeOne(val) {
        console.log(`每页 ${val} 条`);
        this.pageOne.pageSize = val;
      },
      handleCurrentChangeOne(val) {
        console.log(`当前页: ${val}`);
        this.pageOne.currentPage = val;
      },
      handleSizeChangeTwo(val) {
        console.log(`每页 ${val} 条`);
        this.pageTwo.pageSize = val;
      },
      handleCurrentChangeTwo(val) {
        console.log(`当前页: ${val}`);
        this.pageTwo.currentPage = val;
      },
      dataBackFillGoods(row, column){
        let params = {
          start:this.timeValue[0],     //开始时间
          end:this.timeValue[1],       //结束时间
          pageNum:this.pageOne.currentPage,   //当前页
          pageSize:this.pageOne.pageSize,   //每页数量
          moduleId:row.moduleId
        }
        moduleAccessQueryLog.selectLogInfoByModuleIdDate(params).then((res)=>{
          console.log(res);
          if(res.data.status == 0){
            this.pageTwo.totalCount = res.data.data.total;
            this.pageTwo.tableData = res.data.data.list;
          }else {
            this.$alert(res.data.message, "提示");
          }
        }).catch((error)=>{
          console.log(error);
          this.$message.error('这里有一个错误!');
        })
      }
    }
  }
</script>
