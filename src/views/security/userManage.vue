<template>
  <div style="margin:5px;" :style="{height: layout.windowHeight}">
    <div>
      <el-row style="margin-bottom: 5px;">
        <el-col :span="18" style="text-align: left;vertical-align: middle">
          用户名称:
          <el-input v-model="userManager.name" style="width:200px;" size="mini"></el-input>
        </el-col>
        <el-col :span="6" style="text-align: right;">
          <el-button plain type="primary" @click="query" size="mini">查询</el-button>
          <el-button plain type="success" @click="openAddNewUser" size="mini">添加用户</el-button>
        </el-col>
      </el-row>
    </div>    <!--页面的搜索查询添加按钮编辑-->
    <div>
      <el-table
        size="mini"
        :data="page.tableData"
        stripe
        style="width: 100%"
        highlight-current-row
        max-height="650"
        border
        tooltip-effect="dark"
        :default-sort="{prop: 'userName', order: 'descending'}">
        <el-table-column
          prop="userName"
          align="center"
          label="用户名称"
          sortable
          fit
        >
        </el-table-column>
        <el-table-column
          prop="displayName"
          align="center"
          label="显示名称"
          fit
          sortable>
        </el-table-column>
        <el-table-column
          prop="departmentName"
          align="center"
          label="所在部门"
          fit
          sortable>
        </el-table-column>

        <el-table-column
          prop="userPhone"
          align="center"
          label="手机号码"
          fit
          sortable>
        </el-table-column>
        <el-table-column
          prop="userMail"
          align="center"
          label="邮箱地址"
          fit
          sortable
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="lastLoginTime"
          align="center"
          label="上次登录"
          fit
          :formatter="dateFormat"
          sortable
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="createTime"
          align="center"
          label="创建时间"
          fit
          :formatter="dateFormat"
          sortable
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column align="center" label="编辑" width="80">
          <template slot-scope="scope">
            <el-button
              type="success"
              @click="handleEdit(scope.$index, scope.row)">编辑
            </el-button>
          </template>
        </el-table-column>
        <el-table-column prop="islocked" align="center" label="锁定状态" width="100">
          <template slot-scope="scope">
            <el-button
              type="warning"
              v-if="scope.row.islocked == 0"
              @click="handleLock(scope.$index, scope.row)">锁定用户
            </el-button>
            <el-button
              type="info"
              v-else
              @click="handleLock(scope.$index, scope.row)">解除锁定
            </el-button>
          </template>
        </el-table-column>
        <el-table-column align="center" label="重置密码" width="80">
          <template slot-scope="scope">
            <el-button
              type="primary"
              @click="handleResetPassword(scope.$index, scope.row)">重置
            </el-button>
          </template>
        </el-table-column>
        <el-table-column align="center" label="删除" width="80">
          <template slot-scope="scope">
            <el-button
              type="danger"
              @click.native.prevent="handleDelete(scope.$index, scope.row)">删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>    <!--表单页面编辑-->
    <div>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="page.currentPage"
        :page-sizes="page.pageSizes"
        :page-size="page.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="page.total">
      </el-pagination>
    </div>
    <div>
      <el-dialog :visible.sync="openAddNewUserView" :title="editOrAdd" style="text-align: left;">
        <el-form :model="userMessage" ref="userMessage" :rules="rules">
          <el-row :gutter="20">
            <el-col :span="11">
              <el-form-item label="用户名" :label-width="labelWidth" prop="name">
                <el-input v-model="userMessage.name" auto-complete="off" placeholder="用户名"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="显示名称" :label-width="labelWidth" prop="displayName">
                <el-input v-model="userMessage.displayName" auto-complete="off" placeholder="显示名称"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="11">
              <el-form-item label="邮箱" :label-width="labelWidth" prop="email">
                <el-input v-model="userMessage.email" auto-complete="off" placeholder="邮箱"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="手机号" :label-width="labelWidth" prop="phone">
                <el-input v-model="userMessage.phone" auto-complete="off" placeholder="手机号"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="11">
              <el-form-item label="归属省市" :label-width="labelWidth" prop="belongCityId">
                <el-select v-model="userMessage.belongCityId">
                  <el-option
                    v-for="item in cityOptions"
                    :key="item.id"
                    :label="item.regionName"
                    :value="item.id">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="所属部门" :label-width="labelWidth" prop="departmentId">
                <el-select v-model="userMessage.departmentId">
                  <el-option
                    v-for="item in departmentOptions"
                    :key="item.ID"
                    :label="item.departmentName"
                    :value="item.ID">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="11">
              <el-form-item label="所属角色" :label-width="labelWidth" prop="belongRoleId">
                <el-select multiple collapse-tags v-model="userMessage.belongRoleId">
                  <el-option
                    v-for="item in roleOptions"
                    :key="item.roleId"
                    :label="item.roleName"
                    :value="item.roleId">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item label="用户描述" :label-width="labelWidth" prop="userDescribe">
            <el-input
              type="textarea"
              :row="5"
              v-model="userMessage.userDescribe">
            </el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="cancelSubmit">取 消</el-button>
          <el-button type="primary" @click="onSubmit">确 定</el-button>
        </div>
      </el-dialog>
    </div>    <!--添加用户和编辑按钮使用的弹窗-->
  </div>
</template>
<script type="text/ecmascript-6">

  import userManage from './../../http/security/userManage'

  export default{
    props: [],
    data(){
      return {
        layout: {
          windowHeight: (window.outerHeight) + 'px',
          windowWidth: window.outerWidth + 'px'
        },
        userManager: {
          name: ''
        }, /*查询按钮需要的信息*/
        openAddNewUserView: false,
        userMessage: {
          name: '',
          displayName: '',
          email: '',
          phone: '',
          belongCityId: '',
          departmentId: '',
          belongRoleId: [],
          userDescribe: '',
          userId: ''
        }, /*编辑和添加用户信息*/
        labelWidth: '100px',
        cityOptions: [],
        departmentOptions: [],
        roleOptions: [],
        dialogFormVisible: 'false',
        rules: {
          name: [
            {required: true, message: '请输入不含特殊字符的用户名', trigger: 'blur'},
            {min: 2, message: '请输入不少于2个字符', trigger: 'blur'},
            {pattern: /^[A-Za-z0-9\u4e00-\u9fa5]+$/, message: '您输入的用户名格式不正确'}
          ],
          displayName: [
            {required: true, message: '请输入显示名称', trigger: 'blur'},
            {min: 2, message: '请输入不少于2个字符', trigger: 'blur'},
          ],
          email: [
            {required: true, message: '请输入邮箱', trigger: 'blur'},
            {min: 2, message: '请输入不少于2个字符', trigger: 'blur'},
            {pattern: /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/, message: '您输入的邮箱格式不正确'}
          ],
          phone: [
            {required: true, message: '请输入手机号', trigger: 'blur'},
            {min: 2, message: '请输入不少于2个字符', trigger: 'blur'},
            {pattern: /^[1][3,4,5,7,8][0-9]{9}$/, message: '您输入的手机号码格式不正确'}
          ]
        }, /*添加用户信息验证*/
        editOrAdd: '',
        selfId: '123456',
        page: {
          tableData: [],
          total: 0,           //总数
          currentPage: '',   //当前页
          pageSizes: [],        //this.$conf.page.page_sizes  //页码的选择数量
          pageSize: 0           //当前页多少条数据
        } /*分页信息*/
      }
    },
    created(){
      this.page.currentPage = 1;
      this.page.pageSizes = this.$conf.page.page_sizes;
      this.page.pageSize = this.page.pageSizes[0];
      let params = {
        pageIndex: this.page.currentPage,
        pageSize: this.page.pageSize,
        name: this.userManager.name
      }
      userManage.getAllUsers(params).then(
        (res)=> {
          console.log(res);
          if (res.data.status == 0) {
            this.page.tableData = res.data.data.record;
            this.page.total = res.data.data.total;
          } else {
            this.$message({
              type: 'info',
              message: '数据获取失败!'
            });
          }
        }
      ).catch((error)=> {
        console.log(error);
        this.$message.error('数据请求错误!');
      })
    }, /*created钩子函数初始化(已完成)*/
    methods: {
      dateFormat: function (row, column) {
        var time = row[column.property];
        //return time;
        if (time == undefined) {
          return "";
        }
        let timestamp = (new Date(time)).getTime();
        var newDate = new Date();
        newDate.setTime(timestamp);
        return newDate.toLocaleString();
      },  //格式化时间
      refresh(){
        let params = {
          pageIndex: this.page.currentPage,
          pageSize: this.page.pageSize,
          name: this.userManager.name
        }
        userManage.getAllUsers(params).then(
          (res)=> {
            if (res.data.status == 0) {
              this.page.tableData = res.data.data.record;
              this.page.total = res.data.data.total;
            } else {
              this.$message({
                type: 'info',
                message: '数据获取失败!'
              });
            }
          }
        ).catch((error)=> {
          console.log(error);
          this.$message.error('数据请求错误!');
        })
      }, /*刷新重新获取数据*/
      handleEdit(index, row) {
        if (this.$refs['userMessage'] !== undefined) {
          this.$refs['userMessage'].resetFields();
        }
        this.openAddNewUserView = true;
        this.editOrAdd = '编辑';
        this.getAllRegion();
        this.getAllDepartment();
        this.getAllRoles();
        let params = {
          userId: row.userId
        }
        console.log(row.userId);
        console.log(row.createTime);
        userManage.getUserById(params).then((res)=> {
          console.log(res);
          if (res.data.status == 0) {
            console.log(res.data.data);
            console.log(res.data.data.regionId);
            console.log(res.data.data.departmentId);
            console.log(res.data.data.userMail);
            this.userMessage.name = res.data.data.userName;
            this.userMessage.displayName = res.data.data.displayName;
            this.userMessage.email = res.data.data.userMail;
            this.userMessage.phone = res.data.data.userPhone;
            this.userMessage.belongCityId = res.data.data.regionId;
            this.userMessage.departmentId = res.data.data.departmentId;
            this.userMessage.userDescribe = res.data.data.userDescription;
            this.userMessage.userId = res.data.data.userId;
          } else {
            this.$message({
              type: 'info',
              message: '数据查询失败!'
            });
          }
        }).catch((error)=> {
          console.log(error);
          this.$message({
            type: 'info',
            message: '数据获取失败!'
          });
        })
        this.refresh();
      }, /*编辑用户界面*/
      handleLock(index, row) {
        let params = {
          userId: row.userId
        }
        if (row.islocked == 0) {
          this.$confirm('是否确定锁定用户', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(()=> {
            userManage.lockUser(params).then((res)=> {
              if (res.data.status == 0) {
                this.$message({
                  message: '锁定用户成功!',
                  type: 'success'
                });
                this.refresh();
              } else {
                this.$alert(res.data.message, "提示");
              }
            }).catch((error)=> {
              console.log(error);
              this.$message.error('锁定用户失败!');
            })
          }).catch(()=> {
            console.log('已取消锁定用户操作!');
          });
        } else if (row.islocked == 1) {
          this.$confirm('是否确定解锁用户', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(()=> {
            userManage.unlockUser(params).then((res)=> {
              if (res.data.status == 0) {
                this.$message({
                  message: '解锁用户成功!',
                  type: 'success'
                });
                this.refresh();
              } else {
                this.$alert('这里有一个错误', "提示");
              }
            }).catch((error)=> {
              console.log(error);
              this.$message.error('用户解锁失败!');
            })
          }).catch(()=> {
            console.log('已取消锁定用户操作!');
          });
        } else {
          this.$message.error('数据状态错误');
        }
      },
      handleResetPassword(index, row) {
        let params = {
          userId: row.userId
        }
        this.$confirm('是否确认重置密码?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(()=> {
          userManage.resetPwd(params).then((res)=> {
            if (res.data.status == 0) {
              this.$message({
                message: '密码重置成功!',
                type: 'success'
              });
              this.refresh();
            } else {
              this.$alert(res.data.message, "提示");
            }
          }).catch((error)=> {
            console.log(error);
            this.$message.error('重置密码失败!');
          })
        }).catch(()=> {
          console.log('已取消重置密码!');
        })
      },
      handleDelete(index, row) {
        let params = {
          userId: row.userId
        }
        this.$confirm('是否确定删除?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          })
          .then(()=> {
            userManage.deleteUserByID(params).then((res)=> {
              if (res.data.status == 0) {
                this.$message({
                  message: '用户删除成功!',
                  type: 'success'
                });
                this.refresh();
              } else {
                this.$alert(res.data.message, "提示");
              }
            }).catch((error)=> {
              console.log(error);
              this.$message.error('用户删除失败!');
            })
          })
          .catch(()=> {
            console.log('已取消删除!');
          });
      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
        this.page.pageSize = val;
        this.refresh();
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        this.page.currentPage = val;
        this.refresh();
      },
      query(){
        let params = {
          pageIndex: 1,
          pageSize: this.page.pageSize,
          name: this.userManager.name
        }
        userManage.getAllUsers(params).then(
          (res)=> {
            console.log(res);
            if (res.data.status == 0) {
              this.page.tableData = res.data.data.record;
              this.page.total = res.data.data.total;
            } else {
              console.log(res);
              //this.$message.error('数据查询失败!');
              this.$alert(res.data.message, "提示");
            }
          }
        ).catch((error)=> {
          console.log(error);
          this.$message.error('数据请求错误!');
        })
      },
      openAddNewUser(userMessage){
        this.openAddNewUserView = true;
        this.editOrAdd = '添加';
        this.getAllRoles();
        this.getAllRegion();
        this.getAllDepartment();
        if (this.$refs['userMessage'] !== undefined) {
          this.$refs['userMessage'].resetFields();
        }
      },
      cancelSubmit(){
        console.log('取消提交');
        this.openAddNewUserView = false;
      },
      onSubmit(){
        this.$refs['userMessage'].validate((valid) => {
          if (valid) {
            if (this.editOrAdd == '添加') {
              this.$confirm('是否确认添加新用户?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
              }).then(()=> {
                userManage.addRnopUser(this.userMessage.userId, this.userMessage.name, this.userMessage.displayName,
                  this.userMessage.email, this.userMessage.phone, this.userMessage.departmentId, this.userMessage.belongCityId,
                  this.userMessage.belongRoleId, this.userMessage.userDescribe
                ).then((res)=> {
                  console.log(111);
                  console.log(res);
                  if (res.data.status == 0) {
                    this.$message({
                      message: '信息提交成功!',
                      type: 'success'
                    });
                    this.refresh();
                  } else {
                    this.$alert(res.data.message, "提示");
                  }
                  this.openAddNewUserView = false;
                }).catch((error)=> {
                  console.log(error);
                  this.openAddNewUserView = false;
                  this.$message.error('提交用户信息失败!');
                })
              }).catch(()=> {
                console.log('已取消提交!');
              })
            } else if(this.editOrAdd == '编辑'){
              this.$confirm('是否确认提交编辑信息?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
              }).then(()=> {
                userManage.updateUserByID(this.userMessage.userId, this.userMessage.name, this.userMessage.displayName,
                  this.userMessage.email, this.userMessage.phone, this.userMessage.departmentId, this.userMessage.belongCityId,
                  this.userMessage.belongRoleId, this.userMessage.userDescribe).then((res)=> {
                  console.log(res);
                  if (res.data.status == 0) {
                    this.$message({
                      message: '信息提交成功!',
                      type: 'success'
                    });
                    this.refresh();
                  } else {
                    this.$alert(res.data.message, "提示");
                  }
                  this.openAddNewUserView = false;
                }).catch((error)=> {
                  console.log(error);
                  this.openAddNewUserView = false;
                  this.$message.error('提交用户信息失败!');
                })
              }).catch(()=> {
                this.openAddNewUserView = false;
                console.log('已取消提交!');
              })
            }
          } else {
            console.log('信息填写不完整!');
            return false;
          }
        });
      },
      resetForm(){
        this.userMessage.name = '';
        this.userMessage.displayName = '';
        this.userMessage.email = '';
        this.userMessage.phone = '';
        this.userMessage.belongCityId = '';
        this.userMessage.departmentId = '';
        this.userMessage.belongRoleId = [];
        this.userMessage.userDescribe = '';
        //this.userMessage.userID = '';
      },
      getAllDepartment(){
        userManage.getAllDepartment().then((res)=> {
          if (res.data.status == 0) {
            this.departmentOptions = res.data.data;
          } else {
            this.$alert(res.data.message, "提示");
          }
        }).catch((error)=> {
          console.log(error);
          this.$message({
            type: 'info',
            message: '部门数据获取失败!'
          });
        })
      },    //获取所有部门
      getAllRegion(){
        userManage.getAllRegion().then((res)=> {
          if (res.data.status == 0) {
            this.cityOptions = res.data.data;
          } else {
            this.$alert(res.data.message, "提示");
          }
        }).catch((error)=> {
          console.log(error);
          this.$message({
            type: 'info',
            message: '地市数据获取失败!'
          });
        })
      },      //获取所有地区
      getAllRoles(){
        userManage.getAllRoles().then((res)=> {
          if (res.data.status == 0) {
            this.roleOptions = res.data.data;
          } else {
            this.$alert(res.data.message, "提示");
          }
        }).catch((error)=> {
          console.log(error);
          this.$message({
            type: 'info',
            message: '角色数据获取失败!'
          });
        })
      }       //获取所有角色
    }
  }
</script>

