<!--
功能：载波智能调度系统登陆页
作者：xxx
邮箱：xxx@boco.com.cn
版本：v1.0
时间：2018-05-20 11:08
修改记录：
        修改内容：
        修改人员：
        修改时间：
-->
<template>
  <div class="div-main"
       :style="mainHeight">
    <div class="div-title">
      <div style="display: flex;align-items: center">
        <img src="./../../assets/sso-zaibo/zhongguoyidong.png" class="img-title">
        <span class="title">{{appName}}</span>
      </div>
    </div>

    <div class="div-login">
      <div class="div-login-title">
        <span class="login-title">HELLO</span>
      </div>
      <div class="div-login-main">
        <el-form v-loading="isLoading" label-position="right" :model="ruleForm" :rules="rules" ref="ruleForm">
            <div class="div-user-name">
              <el-form-item prop="userName">
              <img src="./../../assets/sso-zaibo/icon_login_user.png"/>
              <el-input class="input-user-name"
                        v-model="ruleForm.userName"
                        placeholder="请输入用户名">
              </el-input>
                <el-tooltip effect="light"
                            content="点击清空"
                            placement="right">
                  <img @click="clear"
                       src="./../../assets/sso-zaibo/btn_login_delete.png"/>
                </el-tooltip>
              </el-form-item>
            </div>

            <div class="div-password">
              <el-form-item prop="userPwd">
                <img src="./../../assets/sso-zaibo/icon_login_pw.png"/>
                <el-input class="input-password"
                          v-model="ruleForm.userPwd"
                          placeholder="请输入密码"
                          :type="pwdInputType">
                </el-input>
                <el-tooltip effect="light"
                            :content="pwdImgTooltip"
                            placement="right">
                  <img :src="pwdShowImg" @click="pwdShowImgClick"/>
                </el-tooltip>
              </el-form-item>
            </div>

            <div class="div-check">
            <el-form-item prop="identifyCode">
              <el-input class="input-check"
                        v-model="ruleForm.identifyCode"
                        placeholder="请输入验证码">
              </el-input>
              <s-identify
                style="float: right"
                :identifyCode="ruleForm.imgIdentifyCode"
                :contentWidth="85"
                @click="refreshIdentifyCode"></s-identify>
            </el-form-item>
          </div>
        </el-form>

      </div>
      <div>
        <el-button class="btn-login"
                   @click="submit"
                   type="primary"
                   round>登  陆</el-button>
      </div>
    </div>
  </div>
</template>

<script>
  import SIdentify from '@/components/common/identify'
  import http from '@/http/sso.js'
  import PwdShowImg from './../../assets/sso-zaibo/btn_login_eye_normal.png'
  import PwdUnShowImg from './../../assets/sso-zaibo/btn_login_eye_hide.png'
  export default {
    // 组件名称
    name: 'loginZaibo',
    // 组件参数 接收来自父组件的数据
    props: {},
    // 局部注册的组件
    components: {
      SIdentify
    },
    // 组件状态值
    data () {
      return {
        isLoading: false,
        appName: this.$conf.appName,
        mainHeight: {
          height:window.innerHeight + 'px'
        },
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
            message: '只能输入8-25个字母、数字、下划线'
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
          }, {validator: this.checkIdentifyCode, trigger: 'change'}]
        },
        pwdShow: false
      }
    },
    // 计算属性
    computed: {
      pwdImgTooltip () {
        return this.pwdShow ? '点击隐藏密码' : '点击显示密码'
      },
      pwdShowImg () {
        return this.pwdShow ? PwdShowImg : PwdUnShowImg
      },
      pwdInputType () {
        return this.pwdShow ? '' : 'password'
      }
    },
    // 侦听器
    watch: {},
    // 组件方法
    methods: {
      autoHeight () {
        this.mainHeight.height = window.innerHeight + 'px'
      },
      submit () {
        // 表单验证方法
        this.$refs['ruleForm'].validate((valid) => {
          if (valid) {
            this.isLoading = true
            http.login(this.ruleForm.userName, this.ruleForm.userPwd).then(
              (res) => {
                this.isLoading = false
                if (res.data.status == 0) {
                  // this.$message('认证成功，欢迎 ' + res.data.data.name)
                  let session = {
                    token: res.data.data.sessionId,
                    user: {
                      id: res.data.data.userId,
                      name: res.data.data.displayName,
                      userName: res.data.data.userName
                    }
                  }
                  this.$store.dispatch('setSession', session)
                  // this.$router.push('index')
                  window.location.href = window.$web.$conf.nvaPageUrl+'?token='+res.data.data.sessionId;
                }
                else {
                  this.$alert(res.data.message, '提示')
                }
              }
            ).catch((ex) => {
              this.isLoading = false
              this.$alert(ex.message, '错误')
            })
          } else {
            this.$message('信息填写不完整，请重新填写')
            return false
          }
        })
      },
      clear() {
        this.ruleForm.userName = ''
      },
      pwdShowImgClick () {
        this.pwdShow = !this.pwdShow
      },
      checkIdentifyCode (rule, value, callback) {
        if (value !== this.ruleForm.imgIdentifyCode) {
          callback(new Error('验证码识别错误'))
        } else {
          callback()
        }
      },
      refreshIdentifyCode () {
        this.ruleForm.imgIdentifyCode = ''
        let identifyCodes = '0123456789'
        let len = 4
        let max = identifyCodes.length
        let min = 0
        for (let i = 0; i < len; i++) {
          let random = Math.floor(Math.random() * (max - min) + min)
          this.ruleForm.imgIdentifyCode += identifyCodes[random]
        }
      }
    },
    /**
     * 组件实例创建完成，属性已绑定，但DOM还未生成，$ el属性还不存在
     */
    created () {
      window.addEventListener('resize', this.autoHeight)
    },
    /**
     * el 被新创建的 vm.$ el 替换，并挂载到实例上去之后调用该钩子。
     * 如果 root 实例挂载了一个文档内元素，当 mounted 被调用时 vm.$ el 也在文档内。
     */
    mounted () {
      this.refreshIdentifyCode()
    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<!--使用了scoped属性之后，父组件的style样式将不会渗透到子组件中，-->
<!--然而子组件的根节点元素会同时被设置了scoped的父css样式和设置了scoped的子css样式影响，-->
<!--这么设计的目的是父组件可以对子组件根元素进行布局。-->
<style scoped>
  .div-main{
    position: relative;
    min-width: 1200px;
    min-height: 600px;
    background-image: url("./../../assets/sso-zaibo/bg_login.png");
    background-size:100% 100%;
  }
  .div-title{
    display: inline-block;
    position: absolute;
    left: 8%;
    top: 10%
  }
  .div-title >:first-child{
    display: flex;
    align-items: center;
  }
  .title{
    font-size: 28px;
    margin-left: 10px;
    color: #606266;
  }
  .img-title{
    width: 48px;
    height: 48px;
  }
  .div-login-title{
    display: flex;
    align-items: center;
  }
  .div-login{
    display: flex;
    flex-direction:column;
    justify-content:space-between;
    width: calc(25% - 60px);
    height: calc(60% - 80px);
    max-width: 400px;
    max-height: 400px;
    border-radius: 10px;
    position: absolute;
    right: 10%;
    top: 20%;
    background-color: rgba(255, 255, 255, 0.91);
    box-shadow: 0 5px 20px 0 rgba(0, 0, 0, 0.1);
    text-align: left;
    padding: 40px 30px;
  }
  .div-login:hover{
    box-shadow: 0 5px 20px 2px rgba(0, 0, 0, 0.1)
  }
  .login-title{
    font-size: 24px;
    color: #3683EE;
  }
  .div-login-main{

  }
  .div-user-name,.div-password{
    padding-top: 18px;
    border-bottom: 1px solid #bbd2e9;
  }
  .input-user-name,.input-password{
    width: calc(100% - 26px - 34px - 20px);
  }
  .input-user-name >:first-child{
    font-size: 16px;
    border: 0;
    background-color: transparent;
  }
  .input-password >:first-child{
    font-size: 16px;
    border: 0;
    background-color: transparent;
  }
  .div-check{
    padding-top: 18px;
    display: flex;
    justify-content:space-between;
  }
  .input-check{
    float: left;
    width: calc(100% - 85px - 38px);
    margin-left: 38px;
  }
  .input-check >:first-child{
    font-size: 16px;
    border: 0;
    background-color: transparent;
  }
  .btn-login{
    width: 100%;
    background-color: #3683EE;
  }
</style>
