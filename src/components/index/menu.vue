<template>
  <div>
    <dl v-for="(item,index) in menuItems">
      <dt :class="{'menu-no-child':item.subList==null||item.subList.length==0}"
          :for="item.resourceId"
          :_href="item.resourceValue"
          :id="item.resourceId"
          :data-title="item.resourceTitle"
          @click="item.subList==null||item.subList.length==0?leafClick($event):folderClick($event)"
      >
        <img :src="item.imageSource" width="20" height="20" style="margin-right:20px;">{{item.resourceTitle}}
      </dt>
      <dd v-if="item.subList!=null&&item.subList.length>0">
        <ul>
          <li v-for="(childItem,childIndex) in item.subList">
            <a
              :_href="childItem.subList==null||childItem.subList.length==0?childItem.resourceValue:'/index/menulevel3?parentId='+childItem.resourceId"
              :id="childItem.resourceId"
              :data-title="childItem.resourceTitle"
              href="javascript:void(0)"
              @click="leafClick($event)"
            >
              <img :src="childItem.imageSource" width="16" height="16"
                   style="margin:0px 22px;">{{childItem.resourceTitle}}
            </a>
          </li>
        </ul>
      </dd>
    </dl>

  </div>
</template>

<script type="text/ecmascript-6">

  import http from '@/http/index.js'

  export default {
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
        // debugger
        http.getAllMenu().then(
          (res) => {
            console.log(res)
            this.menuItems = res.data.data
            $.Huifold('.menu_dropdown dl dt', '.menu_dropdown dl dd', 'fast', 0, 'click')
            let allMenus = []
            for (let menu of this.menuItems) {
              allMenus.push(menu)
              if (menu.menus && menu.menus.length > 0) {
                for (let menuL2 of menu.menus) {
                  allMenus.push(menuL2)
                  if (menuL2.menus && menuL2.menus.length > 0) {
                    for (let menuL3 of menuL2.menus) {
                      allMenus.push(menuL3)
                    }
                  }
                }
              }
            }
            console.log('defaultMenuId:' + this.$conf.defaultMenuId)
            for (let menu of allMenus) {
              if (menu.resourceId == this.$conf.defaultMenuId) {
                console.log(menu)
                window.addTab({
                  id: menu.resourceId,
                  href: http.attachToken(menu.resourceValue),
                  title: menu.resourceTitle,
                  closable: true
                })
                break
              }
            }
          }
        ).catch((res) => {
          console.log(res)
          this.$alert('请求菜单出现异常', '错误')
        })
      },
      //一级菜单 有子节点
      folderClick (event) {
        //function (obj, obj_c, speed, obj_type, Event)
        //(".menu_dropdown dl dt", ".menu_dropdown dl dd", "fast", 0, "click")
        let obj = '.menu_dropdown dl dt'
        let obj_c = '.menu_dropdown dl dd'
        let obj_type = 0
        let speed = 'fast'
        let el = event.target
        if ($(el).next().is(':visible')) {
          if (obj_type == 2) {
            return false
          } else {
            $(el).next().slideUp(speed).end().removeClass('selected')
            if ($(el).find('b')) {
              $(el).find('b').html('+')
            }
          }
        } else {
          if (obj_type == 3) {
            $(el).next().slideDown(speed).end().addClass('selected')
            if ($(el).find('b')) {
              $(el).find('b').html('-')
            }
          } else {
            $(obj_c).slideUp(speed)
            $(obj).removeClass('selected')
            if ($(this).find('b')) {
              $(obj).find('b').html('+')
            }
            $(el).next().slideDown(speed).end().addClass('selected')
            if ($(el).find('b')) {
              $(el).find('b').html('-')
            }
          }
        }
      },
      //叶子节点
      leafClick (event) {
        console.log(event.target)
        let el = event.target
        let href = el.getAttribute('_href')
        console.log('href:' + href)
        let hrefWithToken = http.attachToken(href)
        if (hrefWithToken != href) {
          el.setAttribute('_href', href)
          console.log(el)
        }
        Hui_admin_tab(el)
      },

      //三级菜单
      /*      menuLevel3Click(event){
              console.log(event.target)
              let el = event.target;
              Hui_admin_tab(el);
            }*/
    },
    components: {},
    mounted () {
      this.init()
    }
  }
</script>

<style scoped>
  .content li {
    text-align: left;
  }
</style>
