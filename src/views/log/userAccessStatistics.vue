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
              prop="regionName"
              label="归属地市"
              v-if="tableBool.isRegionName">
            </el-table-column>
            <el-table-column
              align="center"
              prop="roleName"
              label="角色名称"
              v-if="tableBool.isRoleName">
            </el-table-column>
            <el-table-column
              align="center"
              prop="groupName"
              label="用户组"
              v-if="tableBool.isGroupName">
            </el-table-column>
            <el-table-column
              align="center"
              prop="name"
              label="用户登录名"
              v-if="tableBool.isName">
            </el-table-column>
            <el-table-column
              align="center"
              prop="displayName"
              label="用户真实姓名"
              v-if="tableBool.isDisplayName">
            </el-table-column>
            <!--sysCounts-->
            <el-table-column
              align="center"
              prop="counts"
              label="系统登录次数"
              v-if="tableBool.isSysCountsName">
            </el-table-column>
            <el-table-column
              align="center"
              prop="moduleCounts"
              label="模块访问次数"
              v-if="tableBool.isModuleCountsName">
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
            tooltip-effect="dark"
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
              label="模块访问名称">
            </el-table-column>
            <el-table-column
              align="center"
              prop="useTime"
              label="访问时间"
              show-overflow-tooltip>
            </el-table-column>
            <el-table-column
              align="center"
              prop="ipAddress"
              label="IP地址"
              show-overflow-tooltip>
            </el-table-column>
            <el-table-column
              align="center"
              prop="logcontent"
              label="日志内容"
              show-overflow-tooltip>
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

  import userAccessStatistics from './../../http/log/userAccessStatistics'

  export default{
    props: [],
    data(){
      return {
        layout: {
          windowHeight: (window.outerHeight) + 'px',
          windowWidth: window.outerWidth + 'px'
        },
        value: '',
        options: [{
          value: '用户',
          label: '用户'
        }, {
          value: '区域',
          label: '区域'
        }, {
          value: '角色',
          label: '角色'
        }, {
          value: '用户组',
          label: '用户组'
        }],
        tableBool: {
          isRegionName: true,
          isRoleName: false,
          isGroupName: false,
          isName: true,
          isDisplayName: true,
          isSysCountsName: true,
          isModuleCountsName: false
        },
        timeValue: '',
        pageOne: {
          tableData: [],
          currentPage: 1,
          pageSizes: [],
          pageSize: 0,
          totalCount: 1
        },
        pageTwo: {
          tableData: [],
          currentPage: 1,
          pageSizes: [],
          pageSize: 0,
          totalCount: 1
        }
      }
    },
    created(){
      this.pageOne.pageSizes = this.$conf.page.page_sizes;
      this.pageOne.pageSize = this.pageOne.pageSizes[0];
      this.pageTwo.pageSizes = this.$conf.page.page_sizes;
      this.pageTwo.pageSize = this.pageTwo.pageSizes[0];
      this.value = '用户';
    },
    methods: {
      query(){
        let params = {
          start: this.timeValue[0],     //开始时间
          end: this.timeValue[1],       //结束时间
          pageNum: this.pageOne.currentPage,                   //当前页
          pageSize: this.pageOne.pageSize   //每页数量
        }
        if (this.timeValue == null || this.timeValue == undefined || this.timeValue == '') {
          this.$message({
            message: '请先选择日期!',
            type: 'warning'
          });
        } else if (this.value == '用户') {
          this.tableBool.isRegionName = true;
          this.tableBool.isRoleName = false;
          this.tableBool.isGroupName = false;
          this.tableBool.isName = true;
          this.tableBool.isDisplayName = true;
          this.tableBool.isSysCountsName = true;
          this.tableBool.isModuleCountsName = true;
          userAccessStatistics.countByUserDate(params).then((res)=> {
            console.log(res);
            if (res.data.status == 0) {
              this.pageOne.totalCount = res.data.data.total;
              this.pageOne.tableData = res.data.data.list;
            } else {
              console.log(res.data.message);
              this.$alert(res.data.message, "提示");
            }
          }).catch((error)=> {
            console.log(error);
            this.$message.error('这里有一个错误!');
          })
        } else if (this.value == '区域') {
          this.tableBool.isRegionName = true;
          this.tableBool.isRoleName = false;
          this.tableBool.isGroupName = false;
          this.tableBool.isName = false;
          this.tableBool.isDisplayName = false;
          this.tableBool.isSysCountsName = true;
          this.tableBool.isModuleCountsName = true;

          userAccessStatistics.countByRegionDate(params).then((res)=> {
            console.log(res);
            if (res.data.status == 0) {
              this.pageOne.totalCount = res.data.data.total;
              this.pageOne.tableData = res.data.data.list;
            } else {
              console.log(111);
              console.log(res.data.message);
              this.$alert(res.data.message, "提示");
            }
          }).catch((error)=> {
            console.log(error);
            this.$message.error('这里有一个错误!');
          })
        } else if (this.value == '角色') {
          this.tableBool.isRegionName = false;
          this.tableBool.isRoleName = true;
          this.tableBool.isGroupName = false;
          this.tableBool.isName = false;
          this.tableBool.isDisplayName = false;
          this.tableBool.isSysCountsName = true;
          this.tableBool.isModuleCountsName = true;

          userAccessStatistics.countByRoleDate(params).then((res)=> {
            console.log(res);
            if (res.data.status == 0) {
              this.pageOne.totalCount = res.data.data.total;
              this.pageOne.tableData = res.data.data.list;
            } else {
              console.log(111);
              console.log(res.data.message);
              this.$alert(res.data.message, "提示");
            }
          }).catch((error)=> {
            console.log(error);
            this.$message.error('这里有一个错误!');
          })
        } else if (this.value == '用户组') {
          this.tableBool.isRegionName = false;
          this.tableBool.isRoleName = false;
          this.tableBool.isGroupName = true;
          this.tableBool.isName = false;
          this.tableBool.isDisplayName = false;
          this.tableBool.isSysCountsName = true;
          this.tableBool.isModuleCountsName = true;

          userAccessStatistics.countByGroupDate(params).then((res)=> {
            console.log(res);
            if (res.data.status == 0) {
              this.pageOne.totalCount = res.data.data.total;
              this.pageOne.tableData = res.data.data.list;
            } else {
              console.log(111);
              console.log(res.data.message);
              this.$alert(res.data.message, "提示");
            }
          }).catch((error)=> {
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
        console.log(row);

        if (this.value == '用户') {
          let params = {
            start: this.timeValue[0],     //开始时间
            end: this.timeValue[1],       //结束时间
            pageNum: this.pageOne.currentPage,   //当前页
            pageSize: this.pageOne.pageSize,   //每页数量
            userId: row.userId
          }
          userAccessStatistics.selectLogInfoByUserIdDate(params).then((res)=> {
            console.log(res);
            if (res.data.status == 0) {
              this.pageTwo.totalCount = res.data.data.total;
              this.pageTwo.tableData = res.data.data.list;
            } else {
              this.$alert(res.data.message, "提示");
            }
          }).catch((error)=> {
            console.log(error);
            this.$message.error('这里有一个错误!');
          })
        }else if(this.value == '区域'){
          let params = {
            start: this.timeValue[0],     //开始时间
            end: this.timeValue[1],       //结束时间
            pageNum: this.pageOne.currentPage,   //当前页
            pageSize: this.pageOne.pageSize,   //每页数量
            regionId: row.regionId
          }
          userAccessStatistics.selectLogInfoByRegionIdDate(params).then((res)=> {
            console.log(res);
            if (res.data.status == 0) {
              this.pageTwo.totalCount = res.data.data.total;
              this.pageTwo.tableData = res.data.data.list;
            } else {
              this.$alert(res.data.message, "提示");
            }
          }).catch((error)=> {
            console.log(error);
            this.$message.error('这里有一个错误!');
          })
        }else if(this.value == '角色'){
          let params = {
            start: this.timeValue[0],     //开始时间
            end: this.timeValue[1],       //结束时间
            pageNum: this.pageOne.currentPage,   //当前页
            pageSize: this.pageOne.pageSize,   //每页数量
            roleId: row.roleId
          }
          userAccessStatistics.selectByRoleDate(params).then((res)=> {
            console.log(res);
            if (res.data.status == 0) {
              this.pageTwo.totalCount = res.data.data.total;
              this.pageTwo.tableData = res.data.data.list;
            } else {
              this.$alert(res.data.message, "提示");
            }
          }).catch((error)=> {
            console.log(error);
            this.$message.error('这里有一个错误!');
          })
        }else if(this.value == '用户组'){
          let params = {
            start: this.timeValue[0],     //开始时间
            end: this.timeValue[1],       //结束时间
            pageNum: this.pageOne.currentPage,   //当前页
            pageSize: this.pageOne.pageSize,   //每页数量
            groupId: row.groupId
          }
          userAccessStatistics.selectByGroupDate(params).then((res)=> {
            console.log(res);
            if (res.data.status == 0) {
              this.pageTwo.totalCount = res.data.data.total;
              this.pageTwo.tableData = res.data.data.list;
            } else {
              this.$alert(res.data.message, "提示");
            }
          }).catch((error)=> {
            console.log(error);
            this.$message.error('这里有一个错误!');
          })
        }

      }
    }
  }
</script>
