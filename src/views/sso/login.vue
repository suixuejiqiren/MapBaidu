<template>
  <div>
    <div class="loginWraper">
      <div class="loginBox">
        <div id="login-bg">
          <img src="../../assets/sso/logo.png" width="43" height="43"/><span>{{appName}}</span>
        </div>
        <el-form v-loading="isLoading"
                 element-loading-background="rgba(255, 255, 255, 0.2)"
                 label-position="right" :model="ruleForm" :rules="rules" ref="ruleForm"
                 style="margin:20px 50px 0px 50px;">
          <el-form-item prop="userName">
            <el-row :gutter="20">
              <el-col :span="4">
                <img src="../../assets/sso/userName.png" width="24" height="24" style="margin-top: 5px;"/>
              </el-col>
              <el-col :span="20">
                <el-input size="normal" v-model="ruleForm.userName" autofocus="true" placeholder="请输入账号"
                          style="width:100%"></el-input>
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item label="" prop="userPwd">
            <el-row :gutter="20">
              <el-col :span="4">
                <img src="../../assets/sso/userPwd.png" width="24" height="24" style="margin-top: 5px;"/>
              </el-col>
              <el-col :span="20">
                <el-input size="normal" v-model="ruleForm.userPwd" type="password" placeholder="请输入密码"
                          style="width:100%"></el-input>
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item label="" v-if="true" style="text-align: left" prop="identifyCode">
            <el-row :gutter="20">
              <el-col :span="4" style="text-align: center">
                <img src="../../assets/sso/identifyCode.png" width="24" height="24" style="margin-top: 5px;"/>
              </el-col>
              <el-col :span="20">
                <el-row :gutter="2">
                  <el-col :span="16">
                    <el-input size="normal" v-model="ruleForm.identifyCode" maxlength="4" placeholder="请输入验证码"
                              style="width:100%"></el-input>
                  </el-col>
                  <el-col :span="8">
                    <s-identify :identifyCode="ruleForm.imgIdentifyCode" :contentWidth="85"
                                @click="refreshIdentifyCode"></s-identify>
                  </el-col>
                </el-row>


              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item label="" id="isNeedChangeDatabase" v-if="false">
            <el-row :gutter="20">
              <el-col :span="4">
                <img src="../../assets/sso/userName.png" width="24" height="24" style="margin-top: 5px;"/>
              </el-col>
              <el-col :span="20">
                <el-input size="normal" id="database" name="database" placeholder="请选择数据库"
                          style="width:100%"></el-input>
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item>
            <el-row :gutter="10">
              <el-col :span="4">
                &nbsp;
              </el-col>
              <el-col :span="20">
                <el-button size="normal" id="imgLogin" style="width:100%" type="primary" @click="submit">
                  登&nbsp;&nbsp;&nbsp;&nbsp;录
                </el-button>
              </el-col>
            </el-row>
          </el-form-item>
        </el-form>
        <div class="footer">©2018 亿阳信通股份有限公司</div>
      </div>
    </div>
  </div>

</template>

<script type="text/ecmascript-6">
  import SIdentify from '@/components/common/identify'
  import http from '@/http/sso.js'

  export default {
    data () {
      var checkIdentifyCode = (rule, value, callback) => {
        if (value !== this.ruleForm.imgIdentifyCode) {
          callback(new Error('验证码识别错误'))
        } else {
          callback()
        }
      }
      return {
        isLoading: false,
        appName: this.$conf.appName,
        ruleForm: {
          userName: '',
          userPwd: '',
          identifyCode: '',
          imgIdentifyCode: ''
        },
        rules: {
          userName: [{
            required: true,
            message: '请输入账号',
            trigger: 'blur'
          }, {
            min: 5,
            max: 25,
            message: '长度在 5 到 25 个字符',
            trigger: 'blur'
          }, {
            pattern: /^(\w){5,20}$/,
            message: '只能输入6-20个字母、数字、下划线',
            trigger: 'blur'
          }
            // { pattern:/^[a-zA-Z]w{5,17}$/, message: '以字母开头，长度在6-18之间， 只能包含字符、数字和下划线'}
          ],
          userPwd: [{
            required: true,
            message: '请输入密码',
            trigger: 'blur'
          }, {
            min: 8,
            max: 25,
            message: '长度在 8 到 25 个字符'
          }, {
            pattern: /^(?![\d]+$)(?![a-zA-Z]+$)(?![^\da-zA-Z]+$).{6,20}$/,
            message: '只能输入6-25个字母、数字、下划线'
          }],
          identifyCode: [{
            required: true,
            message: '请输入验证码',
            trigger: 'blur'
          }, {
            min: 4,
            max: 4,
            message: '长度在 4 个字符'
          }, {
            pattern: /^[0-9]{4}$/,
            message: '只能输入数字'
          }, {validator: checkIdentifyCode, trigger: 'change'}]
        }
      }
    },
    computed: {
      reversedMessage: function () {
        return this.message
      }
    },
    methods: {
      submit () {
        // 表单验证方法
        this.$refs['ruleForm'].validate((valid) => {
          if (valid) {
            this.isLoading = true
            http.login(this.ruleForm.userName, this.ruleForm.userPwd).then((res) => {
              this.isLoading = false
              console.log(res)
              if (res.data.status == 0) {
                this.$message('认证成功，欢迎 ' + res.data.data.displayName)
                let session = {
                  token: res.data.data.sessionId,
                  user: {
                    id: res.data.data.userId,
                    name: res.data.data.displayName,
                    userName: res.data.data.userName
                  }
                }
                this.$store.dispatch('setSession', session)
                if (this.$route.query.redirect) {
                  if (this.$route.query.redirect.startsWith('/')) {
                    this.$router.push('index')
                  }
                  else {
                    location.href = this.$route.query.redirect
                  }
                }
                else {
                  this.$router.push('index')
                }
              }
              else {
                this.$alert(res.data.message, '提示')
              }
            }).catch((ex) => {
              this.isLoading = false
              console.log(ex)
              this.$alert(ex.message, '错误')
            })
          } else {
            this.$message('信息填写不完整，请重新填写')
            return false
          }
        })
      },
      refreshIdentifyCode () {
        this.ruleForm.imgIdentifyCode = ''
        let identifyCodes = '0123456789'
        let len = 4
        let max = identifyCodes.length
        let min = 0
        for (let i = 0; i < len; i++) {
          var random = Math.floor(Math.random() * (max - min) + min)
          this.ruleForm.imgIdentifyCode += identifyCodes[random]
        }
        console.log(this.ruleForm.imgIdentifyCode)
      }
    },
    mounted () {
      this.refreshIdentifyCode()
      document.onkeydown = () => {
        let key = window.event.keyCode
        if (key == 13) {
          this.submit()
        }
      }
    },
    components: {
      SIdentify
    }
  }
</script>

<style scoped>

  .loginWraper {
    position: absolute;
    width: 100%;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    z-index: 1;
    background: #035da8 /*url(../images/admin-login-bg.jpg) no-repeat center*/;
  }

  .loginBox {
    position: absolute;
    width: 417px;
    height: 330px;
    background-color: #0080fd; /*;background:url(../images/admin-loginform-bg.png) no-repeat;*/
    left: 50%;
    top: 50%;
    margin-left: -209px;
    margin-top: -184px;
    padding-top: 10px
  }

  @media (max-width: 417px) {
    .loginbox {
      width: 100%;
      position: static;
      margin-top: 0;
      margin-left: 0;
    }
  }

  .loginBox .row {
    margin-top: 20px;
  }

  .loginBox .row .form-label .Hui-iconfont {
    font-size: 24px
  }

  .loginBox .input-text {
    width: 260px
  }

  .footer {
    height: 26px;
    line-height: 26px;
    bottom: 0;
    text-align: center;
    color: #fff;
    font-size: 12px;
    background-color: #026ec8;
    margin-top: -6px;
  }

  .footer {
    border-top: 1px solid #E8E8E8;
    padding: 15px 0;
    font-family: tahoma, Arial;
    font-size: 12px;
    color: #999;
    line-height: 22px;
    text-align: center
  }

  .footer a, .footer a:hover {
    color: #999
  }

  .loginBox .k-widget.k-tooltip.k-tooltip-validation {
    position: absolute !important;
  }

  #login-bg {
    width: 100%;
    height: 60px;
    line-height: 60px;
    text-align: center;
  }

  #login-bg img {
    /*    display: inline-block;
        vertical-align: middle;*/
    margin-top: -5px
  }

  #login-bg span {
    margin: 15px 0px 0px 10px;
    font-family: 微软雅黑;
    /*    font-weight: bold;*/
    font-size: 22px;
    letter-spacing: 4px;
    color: #ffffff;
  }

  #imgLogin {
    width: 260px;
  }

  .loginBox.high_mode {
    height: 394px;
  }

  .k-dropdown.k-header {
    border-radius: 7px;
  }

  .k-dropdown-wrap {
    height: 39px;
    width: 230px;
    border-radius: 7px;
  }

  .k-dropdown-wrap > span.k-input {
    line-height: 36px;
  }

  .k-animation-container, .k-list-container {
    width: 258px !important;
  }

  .el-form-item__error {
    margin-left: 56px
  }
</style>
