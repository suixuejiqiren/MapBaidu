<!--
功能：三级菜单页面
作者：guojianfeng
邮箱：guojianfeng@boco.com.cn
版本：v1.0
时间：2018年1月5日 16:37:00
修改记录：
        修改内容：
        修改人员：
        修改时间：
-->
<template>
  <div class="yyb7">
    <div class="yyb8">
      <div :id="item.resourceId" :_href="item.resourceValue" :data-title="item.resourceTitle" class="yyb9"
           v-for="(item,index) in menuItems" @click="leafClick">
        <span class="yyb10"><img :src="item.imageSource" width="50" height="50"></span>
        <span class="yyb11">
               <dl>
                 <dt>{{item.resourceTitle}}</dt>
               </dl>
         </span>
      </div>
    </div>
  </div>
</template>

<script>
  import http from '@/http/index.js'

  export default {
    name: 'MenuLevel3',
    data () {
      return {
        menuItems: []
      }
    },
    computed: {
      reversedMessage: function () {
        return this.message
      }
    },
    methods: {
      init () {
        let parentId = this.$route.query.parentId
        http.getMenusByParentId(parentId).then(
          (res) => {
            if (res.data.status == 0) {
              this.menuItems = res.data.data
            }
            else {
              this.$alert(res.data.message, '提示')
            }
          }
        ).catch((res) => {
          console.log(res)
          this.$alert('这里有一个错误', '错误')
        })
      },
      leafClick (event) {
        //debugger
        console.log(event.target)
        let el = event.target
        if (!$(el).attr('_href')) {
          el = $(el).closest('[_href]')
        }
        window.parent.addTab({
          id: $(el).attr('id'),
          href: http.attachToken($(el).attr('_href')),
          title: $(el).attr('data-title'),
          closable: true
        })
      }
    },
    components: {
      // 'my-component': MyComponent
    },
    mounted () {
      this.init()

      /*      window.parent.postMessage(
       {
       topic: 'addTab',
       data: {
       id: '123',
       href: 'http://www.baidu.com',
       title: '测试',
       closable: false
       }
       }, '*')*/
      /*window.parent.addTab({
       id: '123',
       href: 'http://www.baidu.com',
       title: '测试',
       closable: false
       })*/
    }
  }
</script>

<style scoped>
  /*.yyb7{width:0;height:0;position:fixed;left:50%;rigth:50%;top:50%;bottom:50%;}*/
  .yyb8 {
    padding: 15px;
  }

  /*.yyb8{width:680px; height:328px; margin-top:-159px; margin-left:-295px;}*/
  .yyb9 {
    float: left;
    margin: auto;
    width: 200px;
    height: 170px;
    margin: 15px;
    background: #f7ffff;
    border-radius: 5px;
    border: 1px #dddddd solid;
    cursor: pointer
  }

  .yyb9:hover {
    float: left;
    margin: auto;
    width: 20/0px;
    height: 170px;
    margin: 15px;
    background: #f7ffff;
    border-radius: 5px;
    border: 1px #1e90e5 solid;
    cursor: pointer
  }

  .yyb10 {
    float: left;
    width: 100%;
    text-align: center;
    margin: 30px 0px 16px 0px;
  }

  .yyb11 {
    float: left;
    width: 100%;
    text-align: center;
    margin: 0px auto;
  }

  .yyb11 dt {
    font-size: 14px;
    font-family: '微软雅黑';
    color: #313131
  }

  .yyb11 dd {
    font-size: 12px;
    height: 32px;
    line-height: 32px;
    font-family: '微软雅黑';
    color: #577075;
    background: #dee7f0;
    border-radius: 0px 0px 5px 5px;
    margin-top: 20px;
    text-align: left;

  }

  yyb11 dd img {
    float: left;
  }

  .yyb11 dd a {
    float: left;
  }
</style>
