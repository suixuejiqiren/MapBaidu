<template>
  <div :style="{height: layout.windowHeight}">
    <div id="PwdManage">
      <el-form :model="currentUserManage" :rules="Rules" ref="currentUserManage">
        <el-row>
          <el-col :span="6">
            <el-form-item label="用户名:" label-width="100px">
              <el-input type="text" :readonly="true" v-model="currentUserManage.userName" style="width:100%"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <el-form-item label="显示名称:" prop="displayName" label-width="100px">
              <el-input type="text" v-model="currentUserManage.displayName" placeholder="显示名称"
                        style="width:100%"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <el-form-item label="邮箱:" prop="userMail" label-width="100px">
              <el-input type="text" v-model="currentUserManage.userMail"
                        placeholder="e.g. myname@example.net" style="width:100%"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <el-form-item label="手机号:" prop="userPhone" label-width="100px">
              <el-input type="text" v-model="currentUserManage.userPhone" placeholder="手机号"
                        style="width:100%"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>

    <div>
      <el-row>
        <el-col :span="10">
          <el-button type="primary" plain size="small" @click="onSubmit">确认修改</el-button>
          <el-button type="primary" plain size="small" @click="changePwd">修改密码
          </el-button>
        </el-col>
      </el-row>
    </div>
    <div>
      <el-dialog title="修改密码" :visible.sync="changePassword" width="35%" style="text-align: left;">
        <div>
          <el-form :model="changePasswordRule" :rules="Rules" ref="changePasswordRule">
            <el-row>
              <el-col :span="18">
                <el-form-item label="旧密码" label-width="100px" prop="oldPassword">
                  <el-input type="password" v-model="changePasswordRule.oldPassword" placeholder="旧密码"></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="18">
                <el-form-item label="新密码" label-width="100px" prop="newPassword">
                  <el-input type="password" v-model="changePasswordRule.newPassword" auto-complete="off"
                            placeholder="新密码"></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="18">
                <el-form-item label="确认新密码" label-width="100px" prop="checkPassword">
                  <el-input type="password" v-model="changePasswordRule.checkPassword" placeholder="确认新密码"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
        <span slot="footer">
          <el-button type="primary" @click="submitChangePassword">确定</el-button>
          <el-button @click="changePassword = false" style="text-align: right">取消</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">

  import currentUserManage from './../../http/security/currentUserManage'

  export default{
    props: [],
    data(){
      var validateOldPass = (rule, value, callback) => {
        if (value == '') {
          callback(new Error('请输入旧密码'));
        }
      }
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.changePasswordRule.checkPassword !== '') {
            this.$refs.changePasswordRule.validateField('checkPassword');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.changePasswordRule.newPassword) {
          callback(new Error('两次输入密码不一致!'));
          /*添加不能点击确定按钮*/
        } else {
          callback();
        }
      };
      return {
        layout: {
          windowHeight: (window.outerHeight) + 'px',
          windowWidth: window.outerWidth + 'px'
        },
        currentUserManage: {
          userId:'',
          userName: '',
          displayName: '',
          userMail: '',
          userPhone: ''
        },
        Rules: {
          displayName: [
            {required: true, message: '请输入需要显示的名称', trigger: 'blur'},
            {min: 2, message: '请输入不少于2个字符', trigger: 'blur'}
          ],
          userMail: [
            {required: true, message: '请输入邮箱', trigger: 'blur'},
            {min: 2, message: '请输入不少于2个字符', trigger: 'blur'},
            {pattern: /^[a-zA-Z0-9@._-]+$/, message: '您输入的邮箱格式不正确'}
          ],
          userPhone: [
            {required: true, message: '请输入手机号', trigger: 'blur'},
            {min: 2, message: '请输入不少于2个字符', trigger: 'blur'},
            {pattern: /^[1][3,4,5,7,8][0-9]{9}$/, message: '您输入的手机号码格式不正确'}
          ],
          oldPassword: [
            {validator: validateOldPass, trigger: 'blur'}
          ],
          newPassword: [
            {validator: validatePass, trigger: 'blur'},
            {min: 6, message: '请输入不少于6个字符', trigger: 'blur'},
            {
              pattern: /^(?![\d]+$)(?![a-zA-Z]+$)(?![^\da-zA-Z]+$).{6,20}$/,
              message: '请输入6至20位数字，字母，特殊符号的组合'
            }
          ],
          checkPassword: [
            {validator: validatePass2, trigger: 'blur'}
          ]
        },
        emailRules: {},
        mobileRules: {},
        changePassword: false,
        changePasswordRule: {
          oldPassword: '',
          newPassword: '',
          checkPassword: ''
        },
        rulesChangePassWord: {}
      }
    },
    methods: {
      changePwd(){
        this.changePassword = true;
        if (this.$refs['changePasswordRule'] !== undefined) {
          this.$refs['changePasswordRule'].resetFields();
        }
        //this.$options.methods.resetForm.bind(this)();
      },
      onSubmit(){
        console.log(this.$store.state.session);
        let params = {
          displayName: this.currentUserManage.displayName,
          userMail: this.currentUserManage.userMail,
          userPhone: this.currentUserManage.userPhone
        }
        this.$refs['currentUserManage'].validate((valid) => {
          if (valid) {
            this.$confirm('是否确定修改用户信息?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning',
              center: true
            }).then(() => {
              currentUserManage.updateCurrentUser(params).then((res)=> {
                console.log(res);
                if (res.data.status == 0) {
                  this.$message({
                    message: '信息修改成功!',
                    type: 'success'
                  });
                } else {
                  this.$alert(res.data.message, '提示');
                }
              }).catch((error)=> {
                console.log(error);
                this.$alert('这里有一个错误', '错误');
              })
            }).catch(() => {
              console.log('已取消提交信息操作!');
            });
          } else {
            this.$message('信息填写不完整，请重新填写');
            return false;
          }
        });
      },
      submitChangePassword(){
        let params = {
          oldPwd: this.changePasswordRule.oldPassword,
          newPwd: this.changePasswordRule.newPassword
        }
        this.$refs['changePasswordRule'].validate((valid) => {
          if (valid) {
            this.$confirm('是否确认修改密码', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning',
              center: true
            }).then(() => {
              currentUserManage.updatePwd(params).then((res)=> {
                console.log(res);
                if (res.data.status == 0) {
                  this.$message({
                    type: 'success',
                    message: '密码已更改成功'
                  });
                } else {
                  this.$alert(res.data.message, "提示");
                }
              }).catch((error)=> {
                console.log(error);
                this.$alert('这里有一个错误', '错误');
              })
            }).catch(() => {
              console.log('已取消修改密码操作!');
            });
          } else {
            this.$message('信息填写不完整，请重新填写');
            return false;
          }
        });
      }
    },
    created(){
      let user = this.$store.state.session.user;
      this.currentUserManage.userId = user.id;
      this.currentUserManage.userName = user.userName;
      this.currentUserManage.displayName = user.name;
      this.currentUserManage.userMail = user.mail;
      this.currentUserManage.userPhone = user.tel;
      /*currentUserManage.getCurrentUsers().then((res)=> {
        console.log(res);
        if (res.data.status == 0) {
          this.currentUserManage.userName = res.data.data.userName;
          this.currentUserManage.displayName = res.data.data.displayName;
          this.currentUserManage.userMail = res.data.data.userMail;
          this.currentUserManage.userPhone = res.data.data.userPhone;
        } else {
          console.log(res);
          this.$alert(res.data.message, '提示');
        }
      }).catch((error)=> {
        console.log(error);
        this.$alert('这里有一个错误', '错误');
      })*/
    }
  }
</script>
