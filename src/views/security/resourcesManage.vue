<template>
  <div :style="{height: workspaceHeight}">
    <div style="margin:5px;">
      <div>
        <el-row style="margin-bottom: 5px;">
          <el-col :span="18" style="text-align: left;vertical-align: middle">
            系统名称:
            <el-input v-model="manageQuery.systemName" style="width:200px;"></el-input>
          </el-col>
          <el-col :span="6" style="text-align: right;">
            <el-button type="primary" plain @click="query">查询</el-button>
            <el-button type="success" plain @click="addNewSystem">添加</el-button>
            <el-button type="warning" plain @click="handleRefresh">刷新</el-button>
          </el-col>
        </el-row>
      </div><!--头-->
      <div>
        <el-table
          highlight-current-row
          border
          stripe
          :height="gridHeight"
          :data="tableData"
          style="width: 100%"
          row-key="moduleId"
          :expand-row-keys="expands"
          @row-click="rowClick">
          <el-table-column type="expand">
            <template slot-scope="props">
              <el-form label-position="left" inline v-for="sysData in props.row.resourceList"
                       :key="props.row.resourceList.resourceId">
                <el-row>
                  <el-col :span="6">
                    <el-form-item label="资源名称:">
                      <span>{{ sysData.resourceName }}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item label="资源路径:">
                      <span>{{ sysData.resourceValue }}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item label="资源类型:">
                      <span>{{ sysData.resourceType }}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item label="资源标题:">
                      <span>{{ sysData.resourceTitle }}</span>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-form>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            label="系统名称"
            prop="moduleName">
          </el-table-column>
          <el-table-column
            align="center"
            label="注册中心名称"
            prop="moduleValue">
          </el-table-column>
          <el-table-column
            align="center"
            label="创建时间"
            prop="createdate">
          </el-table-column>
          <el-table-column
            align="center"
            label="创建人"
            prop="createby">
          </el-table-column>
          <el-table-column
            align="center"
            label="操作">
            <template slot-scope="scope">
              <el-button
                type="success"
                @click="handleEdit(scope.$index, scope.row)">编辑
              </el-button>
              <el-button
                type="danger"
                @click="handleDelete(scope.$index, scope.row)">删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </div> <!--表格-->
      <div>
        <div align="center">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="page.currentPage"
            :page-sizes="page.pageSizes"
            :page-size="page.pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="page.totalCount">
          </el-pagination>
        </div>
      </div><!--分页-->
      <div>
        <el-dialog :title="dialog.editOrNewAdd" :close="closeDialog()" :visible.sync="dialog.dialogFormVisible"
                   style="text-align: left">
          <el-form :model="moduleInfo" :rules="rules" ref="moduleInfo">
            <el-row :gutter="20">
              <el-col :span="11">
                <el-form-item label="系统名称:" :label-width="dialog.labelWidth" prop="moduleName">
                  <el-input v-model="moduleInfo.moduleName" auto-complete="off" placeholder="系统名称"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="11">
                <!--<el-form-item label="注册中心名称:" :label-width="dialog.labelWidth" prop="moduleValue">
                  <el-input v-model="moduleInfo.moduleValue" auto-complete="off" placeholder="显示注册中心名称"></el-input>
                </el-form-item>-->
                <el-form-item label="注册中心名称" :label-width="dialog.labelWidth" prop="moduleValue">
                  <el-select v-model="moduleInfo.moduleValue" placeholder="请选择">
                    <el-option
                      v-for="item in moduleInfo.applicationOption"
                      :key="item"
                      :label="item"
                      :value="item">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row :gutter="20" v-if="dialog.isEdit">
              <el-col :span="11">
                <el-form-item label="创建人:" :label-width="dialog.labelWidth" prop="createby">
                  <el-input v-model="moduleInfo.createby" :readonly="true" auto-complete="off"
                            placeholder="创建人"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="11">
                <el-form-item label="创建时间:" :label-width="dialog.labelWidth" prop="createdate">
                  <el-input v-model="moduleInfo.createdate" :readonly="true" auto-complete="off"
                            placeholder="创建时间"></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row :gutter="20">
              <el-col :span="11">
                <el-form-item label="类型:" :label-width="dialog.labelWidth" prop="moduleType">
                  <el-input v-model="moduleInfo.moduleType" :disabled="true" auto-complete="off" placeholder="类型"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="11">
                <el-form-item label="顺序:" :label-width="dialog.labelWidth" prop="orderNo">
                  <el-input v-model="moduleInfo.orderNo" auto-complete="off" placeholder="顺序"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="22">
                <el-form-item label="描述:" :label-width="dialog.labelWidth" prop="moduleDescription">
                  <el-input
                    type="textarea"
                    :row="5"
                    v-model="moduleInfo.moduleDescription">
                  </el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>

          <div v-if="isShowMenu">
            <el-row>
              <el-col>
                菜单信息:
              </el-col>
            </el-row>
            <template>
              <el-table
                :data="menuInfo.sumMenu"
                size="mini"
                stripe
                highlight-current-row
                border
                max-height="260"
                style="width: 100%">
                <el-table-column
                  prop="id"
                  label="编号"
                  align="center"
                  width="130">
                </el-table-column>
                <el-table-column
                  prop="order"
                  label="顺序"
                  align="center"
                  width="50">
                </el-table-column>
                <el-table-column
                  prop="text"
                  label="名称"
                  align="center"
                  width="100">
                </el-table-column>
                <el-table-column
                  prop="url"
                  label="地址"
                  align="center">
                </el-table-column>

              </el-table>
            </template>
          </div>


          <div slot="footer">
            <!--<el-button @click="showInfo">展 示</el-button>-->
            <el-button @click="cancel">取 消</el-button>
            <el-button type="primary" @click="submit">确 定</el-button>
          </div>
        </el-dialog>


      </div><!--添加和编辑的弹窗-->
    </div>
  </div>
</template>

<script type="text/ecmascript-6">

  import resourcesManage from './../../http/security/resourcesManage'

  export default {
    props: [],
    data () {
      return {
        layout: {
          windowHeight: (window.outerHeight),
          windowWidth: window.outerWidth
        },
        manageQuery: {
          systemName: ''
        },
        tableData: [],
        expands: [],
        page: {
          currentPage: 1,
          pageSizes: [],
          pageSize: 0,
          totalCount: 1
        },
        changeState: true,
        dialog: {
          editOrNewAdd: '',
          dialogFormVisible: false,
          isEdit: false,
          labelWidth: '120px',
        },
        moduleInfo: {
          moduleId: '',
          moduleName: '',
          moduleValue: '',
          applicationOption: [],
          createby: '',
          createdate: '',
          moduleType: '1',
          orderNo: '1',
          moduleDescription: ''
        },
        menuInfo: {
          sumMenu: []
        },
        rules: {
          moduleName: [
            {required: true, message: '请输入系统名称', trigger: 'blur'}
          ],
          moduleValue: [
            {required: true, message: '请输入注册中心名称', trigger: 'blur'}
          ],
          moduleType: [
            {required: true, message: '请输入类型', trigger: 'blur'},
            {pattern: /^[0-9]+$/, message: '请输入数字值'}
          ]
        },
        isShowMenu: false
      }
    },
    computed: {
      workspaceHeight: function () {
        return (this.layout.windowHeight) + 'px'
      },
      gridHeight: function () {
        return (this.layout.windowHeight - 140) + 'px'
      }
    },
    created () {
      this.page.currentPage = 1
      this.page.pageSizes = this.$conf.page.page_sizes
      this.page.pageSize = this.page.pageSizes[0]
      let params = {
        name: this.manageQuery.systemName,
        pageIndex: this.page.currentPage,
        pageSize: this.page.pageSize
      }
      resourcesManage.getModuleByName(params).then((res) => {
        console.log(res)
        if (res.data.status == 0) {
          this.tableData = res.data.data.record
          this.page.totalCount = res.data.data.total
        } else {
          this.$message({
            message: '数据访问错误!',
            type: 'warning'
          })
        }
      }).catch((error) => {
        console.log(error)
        this.$alert(error.message, '错误')
      })
    },
    watch: {
      'moduleInfo.moduleValue': function (val, oldVal) {
        console.log(val)
        console.log(oldVal)
        this.getMenu(val)
        //this.isShowMenu = true;
        if (val) {
          console.log(val)
          this.isShowMenu = true
        } else {
          this.isShowMenu = false
        }
      }
    },
    methods: {
      closeDialog () {
        this.changeState = true
      },  //监听弹窗是否关闭，如果关闭改变changeState的状态，使得表可以展开
      query () {
        console.log('查询按钮')
        this.refresh()
      },
      addNewSystem () {
        console.log('添加新系统按钮')
        if (this.$refs['moduleInfo'] !== undefined) {
          this.$refs['moduleInfo'].resetFields()
        }
        this.dialog.dialogFormVisible = true
        this.dialog.editOrNewAdd = '添加'
        this.dialog.isEdit = false

        this.getApplicationName()
      },
      getApplicationName () {
        resourcesManage.getApplicationName().then((res) => {
          console.log(res)
          this.moduleInfo.applicationOption = res.data.data
        }).catch((error) => {
          console.log(error)
          this.$alert(error.message, '错误')
        })
      },
      getMenu (applicationName) {
        resourcesManage.getMenuByName(applicationName).then((res) => {
          console.log(res)
          this.menuInfo.sumMenu = res.data.data
        }).catch((error) => {
          console.log(error)
          this.$alert(error.message, '错误')
        })
      },
      handleRefresh () {
        resourcesManage.updateMenu().then((res) => {
          if (res.data.status == 0) {
            console.log('刷新成功')
            this.$message({
              message: '刷新成功!',
              type: 'success'
            })
          }
          this.tableData = res.data.record
        }).catch((error) => {
          console.log(error)
          this.$alert(error.message, '错误')
        })
        this.refreshOnePage()
      },
      handleEdit (index, row) {
        console.log(index, row)
        if (this.$refs['moduleInfo'] !== undefined) {
          this.$refs['moduleInfo'].resetFields()
        }
        this.getApplicationName()

        this.changeState = false
        this.dialog.dialogFormVisible = true
        this.dialog.editOrNewAdd = '编辑'
        this.dialog.isEdit = true
        this.moduleInfo.moduleId = row.moduleId
        this.moduleInfo.moduleName = row.moduleName
        this.moduleInfo.moduleValue = row.moduleValue
        this.moduleInfo.createby = row.createby
        this.moduleInfo.createdate = row.createdate
        this.moduleInfo.moduleType = row.moduleType
        this.moduleInfo.orderNo = row.orderNo
        this.moduleInfo.moduleDescription = row.moduleDescription
      },
      handleDelete (index, row) {
        console.log(index, row)
        let params = {
          moduleId: row.moduleId
        }
        this.changeState = false
        this.$confirm('是否删除此系统?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.changeState = true
          resourcesManage.deleteModule(params).then((res) => {
            if (res.data.status == 0) {
              this.$message({
                type: 'success',
                message: '删除成功!'
              })

              this.refreshOnePage();
            }
            else {
              this.$message({
                type: 'success',
                message: '删除失败!'
              })
            }
          }).catch((error) => {
            console.log(error)
            this.$alert(error.message, '错误')
          })
        }).catch(() => {
          this.changeState = true
          console.log('已取消删除!')
        })
        //需要刷新页面来刷新下数据
      },
      rowClick (row, event, column) {
        if (this.changeState == true) {
          this.changeExpand(row)
        } else {
          return
        }
      },
      handleSizeChange (val) {
        console.log(`每页 ${val} 条`)
        this.page.pageSize = val
        this.refreshOnePage()
      },
      handleCurrentChange (val) {
        console.log(`当前页: ${val}`)
        this.page.currentPage = val
        this.refreshOnePage()
      },
      changeExpand (row, event, column) {
        Array.prototype.remove = function (val) {
          let index = this.indexOf(val)
          if (index > -1) {
            this.splice(index, 1)
          }
        }
        if (this.expands.indexOf(row.moduleId) < 0) {
          this.expands.push(row.moduleId)
        } else {
          this.expands.remove(row.moduleId)
        }
      }, //数据展开合起方法
      cancel () {
        console.log('已取消提交')
        console.log(this.moduleInfo.moduleType)
        this.dialog.dialogFormVisible = false
      },
      submit () {
        let moduleTypeNumber = parseInt(this.moduleInfo.moduleType)
        let addParams = {
          moduleName: this.moduleInfo.moduleName,
          moduleValue: this.moduleInfo.moduleValue,
          moduleType: moduleTypeNumber,
          orderNo: this.moduleInfo.orderNo,
          moduleDescription: this.moduleInfo.moduleDescription
        }
        let updataParams = {
          moduleId: this.moduleInfo.moduleId,
          moduleName: this.moduleInfo.moduleName,
          moduleValue: this.moduleInfo.moduleValue,
          createby: this.moduleInfo.createby,
          createdate: this.moduleInfo.createdate,
          moduleType: moduleTypeNumber,
          orderNo: this.moduleInfo.orderNo,
          moduleDescription: this.moduleInfo.moduleDescription
        }
        this.$refs['moduleInfo'].validate((valid) => {
          if (valid) {
            this.$confirm('是否确定提交信息?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              if (this.dialog.editOrNewAdd == '添加') {
                resourcesManage.addModule(addParams).then((res) => {
                  console.log(res)
                  if (res.data.status == 0) {
                    this.$message({
                      type: 'success',
                      message: '信息提交成功!'
                    })
                    this.refreshOnePage()
                  } else {
                    this.$alert(res.data.message, '提示')
                  }
                }).catch((error) => {
                  console.log(error)
                  this.$alert(error.message, '错误')
                })
              } else if (this.dialog.editOrNewAdd == '编辑') {
                resourcesManage.updateModule(updataParams).then((res) => {
                  console.log(res)
                  if (res.data.status == 0) {
                    this.$message({
                      type: 'success',
                      message: '信息提交成功!'
                    })
                    this.refreshOnePage()
                  } else {
                    this.$alert(res.data.message, '提示')
                  }
                }).catch((error) => {
                  console.log(error)
                  this.$alert(error.message, '错误')
                })
              }
            }).catch(() => {
              console.log('已取消提交!')
            })
            this.dialog.dialogFormVisible = false
          } else {
            console.log('信息填写不完整')
            this.$alert('信息填写不完整!', '错误')
            return false
          }
        })
      },
      /*showInfo(){
       let params = {
       moduleName: this.moduleInfo.moduleName,
       moduleValue: this.moduleInfo.moduleValue
       }
       this.menuDialog.dialogVisible = true;
       resourcesManage.showMenu(params).then((res)=> {
       console.log(res);
       }).catch((error)=> {
       console.log(error);
       })
       },
       */
      refresh () {
        console.log('刷新到第一页')
        this.page.currentPage = 1
        this.page.pageSizes = this.$conf.page.page_sizes
        this.page.pageSize = this.page.pageSizes[0]
        let params = {
          name: this.manageQuery.systemName,
          pageIndex: this.page.currentPage,
          pageSize: this.page.pageSize
        }
        resourcesManage.getModuleByName(params).then((res) => {
          console.log(res)
          if (res.data.status == 0) {
            this.tableData = res.data.data.record
            this.page.totalCount = res.data.data.total
          } else {
            this.$message({
              message: '数据访问错误!',
              type: 'warning'
            })
          }
        }).catch((error) => {
          console.log(error)
          this.$alert(error, '错误')
        })
      },
      refreshOnePage () {
        console.log('刷新到当前页')
        let params = {
          name: this.manageQuery.systemName,
          pageIndex: this.page.currentPage,
          pageSize: this.page.pageSize
        }
        resourcesManage.getModuleByName(params).then((res) => {
          console.log(res)
          this.tableData = res.data.data.record
        }).catch((error) => {
          console.log(error)
          this.$alert(error, '错误')
        })
      }
    }
  }
</script>
<!--<style >
  .resource-add .el-dialog__body {
    padding: 0 20px!important;
  }
</style>-->
