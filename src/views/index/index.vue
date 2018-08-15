<template>
  <div>
    <aside id="aside" class="Hui-aside" style="overflow-y: auto; overflow-x: hidden;">
      <div
        style="width: 172px; height: 60px; border-bottom: 1px solid #62aae1;">
			<span style="float: left"> <img src="../../assets/index/images/dltx.png"
                                      width="34" height="34" style="padding: 13px;"/>
			</span> <span
        style="line-height: 59px; font-size: 12px; color: #fff; margin-right: 4px">{{loginUser.userName}}</span> <span> <a
        href='javascript:void(0)' style="cursor: pointer;" title="注销"
        id="logout"> <img src="../../assets/index/images/dlgy2.png" width="16"
                          height="16"/>
      </a>
			</span>
      </div>
      <div id="div-menu-container" class="menu_dropdown bk_2 content" style="overflow-y:auto;overflow-x:hidden;">
        <v-menu></v-menu>
      </div>
    </aside>

    <section class="Hui-article-box">
      <div id="Hui-tabNav" class="Hui-tabNav hidden-xs">
        <div class="dislpayArrow hidden-xs">
          <a id="pngfix" href="javascript:void(0);" style="height: 45px;"></a>
        </div>
        <div id="login-bg" class="yyb2_1">
          <el-row>
            <el-col style="width:30px;"><img src="../../assets/sso/logo.png"/></el-col>
            <el-col style="width:150px;margin-left:5px;"><span>{{appName}}</span></el-col>
          </el-row>
        </div>
        <div class="yyb3"><a @click.stop="showNotice">
          <img src="../../assets/index/images/icon_notice.png" name="btn-notice" width="16" height="12" border="0"
               @mouseover="noticeMouseOver" @mouseout="noticeMouseOut"></a>
        </div>
        <div class="yyb3" id="linkNETree" style="display:none;">
          <img id="btn-net-tree" src="../../assets/index/images/icon_netree.png"/>
        </div>
        <div class="Hui-tabNav-wp">
          <ul id="min_title_list" class="acrossTab cl"
              style="width: 133px; left: 0px;"></ul>
        </div>
        <div class="Hui-tabNav-more btn-group" style="display: none;">
          <a id="js-tabNav-prev" class="btn radius btn-default size-S" href="javascript:;"><i class="Hui-iconfont">
            &#xe6d4;</i></a>
          <a id="js-tabNav-next" class="btn radius btn-default size-S" href="javascript:;"><i class="Hui-iconfont">
            &#xe6d7;</i></a>
        </div>
        <div id="secondMenuLine" style="display: none;">
          <div class="headTip">
            <span class="wh">欢迎您:</span> <a id="currentUserName"
                                            style="cursor: pointer;" class="ye b" CurUserID="1"
                                            CurUserName="1" CurUserDisplayName="1" CurProvinceId="1"
                                            CurRegionID="1" SiteRoot="1" IsAdmin="1" IsProvinceUser="1"
                                            :text="loginUser.userName">用户名</a> <a href='1'
                                                                                  style="cursor: pointer;" title="注销">
            <img
              src="../../assets/index/images/logout.png"/></a> <a href="#"
                                                                  id="linkSystemBar" style="cursor: pointer;"
                                                                  title="系统管理"> <img
            src="../../assets/index/images/setting.png"/></a> <a href="#" id="linkAbout"
                                                                 style="cursor: pointer;" title="关于系统"> <img
            src="../../assets/index/images/about.png"/></a>
          </div>
        </div>
      </div>
      <div id="iframe_box" class="Hui-article">
        <!--  <div id="content_tabs1" style="background-image: none">
            &lt;!&ndash; <style id="styleMainTab" />&ndash;&gt;
          </div>-->


      </div>
    </section>
    <div id="tabContextMenu" style="width: 150px;">
      <div id="mm-tabupdate" data-options="iconCls:'iconreload'">刷新</div>
      <div class="menu-sep"></div>
      <div id="mm-tabclose" data-options="iconCls:'iconcancel'">关闭</div>
      <div id="mm-tabcloseall">全部关闭</div>
      <div id="mm-tabcloseother">除此之外全部关闭</div>
      <div class="menu-sep"></div>
      <div id="mm-tabcloseright" data-options="iconCls:'iconredo'">当前页右侧全部关闭</div>
      <div id="mm-tabcloseleft" data-options="iconCls:'iconundo'">当前页左侧全部关闭</div>
      <div class="menu-sep"></div>
      <div id="mm-exit">退出</div>
    </div>
    <div id="windowCustomPortal" style="overflow: hidden; padding: 0px;">
    </div>
    <div id="windowNETree" style="padding: 0px; overflow: hidden;">
      <div id="mainTreeContainer" style="line-height: 19px;"></div>
    </div>
    <div id="system-options" class="toolbar-icons" style="display: none;">
    </div>

    <form action="@{/logout}" method="post" id="logoutform"></form>
    <!--  <remote-script src="../../../assets/index/scripts/clazz.js"></remote-script>-->
  </div>

</template>

<script type="text/ecmascript-6">
  //样式
  import '../../../static/styles/easyui/themes/default/easyui.css'
  import '../../../static/styles/easyui/themes/icon.css'
  import '../../../static/styles/Hui-iconfont/iconfont.css'
  import '../../../static/styles/H-ui/h-ui.admin.css'
  import '../../../static/styles/H-ui/h-ui.min.css'
  import '../../../static/styles/H-ui/style.css'
  import '../../../static/styles/H-ui/skin.css'
  import '@/assets/index/styles/index.css'

  import eui from '../../../static/scripts/easyui/jquery.easyui.min'
  import jqcontextMenu from '../../../static/scripts/jqtool/jquery.contextMenu'
  import jqtoolbar from '../../../static/scripts/jqtool/jquery.toolbar'


  //测试区域，请勿删除
  /*  import clazz from '@/assets/index/scripts/clazz.js'
   alert('new polygon()---' + new polygon().getCenter())
   alert('clazz.polygon----' + new clazz().getCenter())*/
  //alert('new clazz.polygon()----' + new clazz.polygon().getCenter())

  import Hui from "../../../static/scripts/H-ui/H-ui.js"
  import HuiAdmin from '../../../static/scripts/H-ui/H-ui.admin'
  import Perfect from '../../../static/scripts/H-ui/perfect-scrollbar.js'
  import '@/assets/index/scripts/contentTabHelper.js'
  import  Index from  '@/assets/index/scripts/index'
  import IndexMenu from '@/components/index/menu.vue'
  import http from './../../http/index'
  import sso from './../../http/sso'
  console.log(IndexMenu)
  export default {
    name: 'index',
    data () {
      return {
        layout: {
          windowHeight: window.outerHeight + 'px',
          windowWidth: window.outerWidth + 'px',
          menuItemBackgroundColor: '#107fd2'
        },
        appName: this.$conf.appName,
        imgs: {
          imageNotice: require('../../assets/index/images/icon_notice.png'),
          imageNoticeHover: require('../../assets/index/images/icon_notice_hover.png')
        },
        menu: {
          data: []
        }
      }
    },
    computed: {
      loginUser: function () {
        return this.$store.state.session.user

      }
    },
    methods: {
      showNotice () {
        this.$alert("即将开放..", '提示')
      },
      noticeMouseOut (target) {
        target.target.src = this.imgs.imageNotice
      },
      noticeMouseOver (target) {
        target.target.src = this.imgs.imageNoticeHover
      },
      logout () {
        //debugger
        this.$store.dispatch('clearSession')
        this.$router.push('login');
      }
    },
    components: {
      'v-menu': IndexMenu
    },
    mounted () {
      console.log(111);
      console.log(HuiAdmin)
      HuiAdmin.init();
      Index.init();
      var that = this;
      $("#logout").click(()=> {
        this.$confirm('您确定退出吗？', '提示', {
          type: 'warning'
        }).then(() => {
          sso.logout(this.loginUser.userName).then((res)=> {
            console.log(res);
            if (res.data.status == 0) {
              this.$message({
                type: 'success',
                message: '注销成功!'
              });
            }
          }).catch((error)=> {
            console.log(error);
            this.$alert(res.data.message, "提示");
          })
          that.logout();
        }).catch(() => {
        });
      });

      var num = 0, oUl = $('#min_title_list'), hide_nav = $('#Hui-tabNav')
//debugger
      Huiasidedisplay()
      var resizeID
      $(window).resize(function () {
        clearTimeout(resizeID)
        resizeID = setTimeout(function () {
          Huiasidedisplay()
        }, 500)
      })

      /*$('.Hui-aside').on('click', '.menu_dropdown a', function () {
       //Hui_admin_tab(this);
       window.top._contentTabHelper.addTabFromMenu(this)
       })*/

      $('#pngfix').bind('click', function (e) {
        //Huimodal_alert("asdasdsa", 2000);
        displaynavbar(e.target)
      })

      $('.Hui-aside').on('click', '.menu_dropdown dd li a', function () {

      })

      //tabNavallwidth()
      /*左侧菜单响应式*/
      function Huiasidedisplay() {
        if ($(window).width() >= 768) {
          $('.Hui-aside').show()
        }
      }

      /*左侧菜单-隐藏显示*/
      function displaynavbar(obj) {
        if ($(obj).hasClass('open')) {
          $(obj).removeClass('open')
          $('body').removeClass('big-page')
        } else {
          $(obj).addClass('open')
          $('body').addClass('big-page')
        }
      }

      /*获取顶部选项卡总长度*/
      /*function tabNavallwidth () {
       var taballwidth = 0,
       $tabNav = hide_nav.find('.acrossTab'),
       $tabNavWp = hide_nav.find('.Hui-tabNav-wp'),
       $tabNavitem = hide_nav.find('.acrossTab li'),
       $tabNavmore = hide_nav.find('.Hui-tabNav-more')
       if (!$tabNav[0]) { return }
       $tabNavitem.each(function (index, element) {
       taballwidth += Number(parseFloat($(this).width() + 60))
       })
       $tabNav.width(taballwidth + 25)
       var w = $tabNavWp.width()
       if (taballwidth + 25 > w) {
       var topWindow = $(window.parent.document)
       var show_nav = topWindow.find('#min_title_list')

       $(show_nav).css('left', w - $(show_nav).width())
       $tabNavmore.show()
       }
       else {
       $tabNavmore.hide()
       $tabNav.css({left: 0})
       }
       }*/
    }
  }
  /*
   function linkModule (title, url, closeable, image) {
   if (title == 'customJSClickHandler') {
   var func = eval(url)
   func()
   }
   else {
   ContentTabHelper.addTab(title, url, closeable, image)
   }
   }

   function closeWindowCustomPortal () {
   var kendoWindow = $('#windowCustomPortal').data('kendoWindow')
   if (kendoWindow) {
   kendoWindow.close()
   }
   }*/
</script>

<style scoped>
  #login-bg {
    height: 34px;
    line-height: 30px;
    text-align: left;
  }

  #login-bg img {
    /*    display: inline-block;
        vertical-align: middle;*/
    width: 30px;
    height: 30px;
  }

  #login-bg span {
    /*margin: 15px 0px 0px 10px;*/
    font-family: 微软雅黑;
    /*    font-weight: bold;*/
    font-size: 21px;
    color: #ffffff;
  }
</style>
