
var menuHelper = (function () {
  var MenuHelper = function() {
    this.systemMenuName = 'SystemManage';
  }

  MenuHelper.prototype.menuData = null;
  MenuHelper.prototype.curMenuData = null;
  MenuHelper.prototype.menuStr = null;
  MenuHelper.prototype.tmpMenuLevel = 0;

  MenuHelper.prototype.afterMenuInit = undefined;

  MenuHelper.prototype.init = function () {
    this.initTopMenu(this.createMenus_2017);
    console.log("MenuHelper.init")
  };

  MenuHelper.prototype.initTopMenu = function (successCallback) {
    var _dataUrl = '/menu';
    _dataUrl = "https://cdn.jsdelivr.net/npm/vue@2.5.16/dist/vue.js";
    var that = this;
    $.get(_dataUrl,function(data){
      data = require("../../../mock/index/menus.json").default.data;
      that.menuData = data;
      if (successCallback != undefined) {
        successCallback.call(that, data);
      }
    })
  };

  MenuHelper.prototype.createMenus_2017 = function (menuData) {
    console.log(menuData)
    if (menuData == null) {
      return;
    }

    this.menuStr = "";
    this.createCascadeMenuItems_2017(menuData);

    $('#div-menu-container').html(this.menuStr);
    this.fold(".menu_dropdown dl dt", ".menu_dropdown dl dd", "fast", 0, "click");

    $(".menu-no-child").bind("click", function (e) {
      eval($(e.target).find("a").data("href"));
    });

    $(".menu-no-child a").bind("click", function (e) {
      $(e.target).closest(".menu-no-child").trigger("click");
    });
    //创建系统管理工具条 maojun
    //this.createSystemBar(this.systemMenuName);

    if (this.afterMenuInit != undefined) {
      this.afterMenuInit();
    }
  };

  //菜单折叠
  MenuHelper.prototype.fold = function (obj, obj_c, speed, obj_type, Event) {
    if (obj_type == 2) {
      $(obj + ":first").find("b").html("-");
      $(obj_c + ":first").show();
    }
    $(obj).on(Event, function () {
      if ($(this).next().is(":visible")) {
        if (obj_type == 2) {
          return false;
        } else {
          $(this).next().slideUp(speed).end().removeClass("selected");
          if ($(this).find("b")) {
            $(this).find("b").html("+");
          }
        }
      }
      else {
        if (obj_type == 3) {
          $(this).next().slideDown(speed).end().addClass("selected");
          if ($(this).find("b")) {
            $(this).find("b").html("-");
          }
        } else {
          $(obj_c).slideUp(speed);
          $(obj).removeClass("selected");
          $(obj).next().hide();
          if ($(this).find("b")) {
            $(obj).find("b").html("+");
          }
          $(this).next().slideDown(speed).end().addClass("selected");
          if ($(this).find("b")) {
            $(this).find("b").html("-");
          }
        }
      }
    });
  }

  //创建菜单具体项
  MenuHelper.prototype.createCascadeMenuItems_2017 = function (menuData) {
    return;
    var that = this;
    $.each(menuData, function (i, item) {
      that.menuStr += "<dl>";
      createLevel1MenuItems(item);
      if (item.subMenuList !== null && item.subMenuList.length > 0) {
        createLevel2MenuItems(item.subMenuList);
      }
      that.menuStr += "</dl>";
    });

    function createLevel1MenuItems(item) {

      var hasChild = item.subMenuList !== null && item.subMenuList.length > 0;
      that.menuStr += hasChild ? "<dt>" : "<dt class=\"menu-no-child\" for=\"" + item.menuId + "\">";
      that.menuStr += "<img src=" + item.imageSource + " width=\"20\" height=\"20\" style=\"margin-right:17px;\">";
      if (item.menuName.length > 0) {
        //url 页面
        that.menuStr += "<a id= \"" + item.menuId + "\" data-href=\"javascript:_MenuHelper.menuClick('" + item.menuId + "')\" id=\"" + item.menuId + "\" style=\"color:#FFF; text-decoration:none;font-size:14px\">";
        that.menuStr += item.menuTitle;
        that.menuStr += "</a>";
      }
      else {
        that.menuStr += item.menuTitle;
      }
      that.menuStr += "</dt>";
    }

    function createLevel2MenuItems(subItems) {
      that.menuStr += "<dl style=\"display:none\">";
      that.menuStr += "<ul>";
      $.each(subItems, function (i, item) {
        that.menuStr += "<li>";
        if (!item.subMenuList || item.subMenuList.length==0) {
          //url 页面
          // that.menuStr += "<a _href=\"" + item.Url + "\" data-title=\"" + item.Text + "\" href=\"javascript:;\">";
          that.menuStr += "<a href=\"javascript:_MenuHelper.menuClick('" + item.menuId + "')\" id=\"" + item.menuId + "\" title=\"" + item.menuName + "\" >";
          that.menuStr += "<img src=" + item.imageSource + " style=\"margin-right:23px;width:14px;\">";
          that.menuStr += item.menuTitle;
          that.menuStr += "</a>";
        }
        else if (item.subMenuList && item.subMenuList.length > 0) {
          that.menuStr += "<a href=\"javascript:_MenuHelper.openLevel3MenuPage('" + item.menuId + "')\" title=\"" + item.menuName + "\" >";
          that.menuStr += "<img src=" + item.imageSource + " style=\"margin-right:23px;width:14px\">";
          that.menuStr += item.menuTitle;
          that.menuStr += "</a>";
        }
        that.menuStr += "</li>";
      });
      that.menuStr += "</ul>";
      that.menuStr += "</dl>";
    }
  };

  MenuHelper.prototype.menuClick = function (menuItemID) {

    if ((typeof (menuItemID) == "undefined") || menuItemID == null) return;

    var curMenuData = this.getMenuData(menuItemID, false);
    if (curMenuData == null) return;

    this.curMenuData = curMenuData;

    //节点本身处理
    if (curMenuData.url != null && curMenuData.url != "") {
      _contentTabHelper.addTab(curMenuData.menuTitle, curMenuData.url, true, curMenuData.imageSource, curMenuData.menuId);
    }

  };

  MenuHelper.prototype.getMenuData = function (menuItemID, isTopMenu) {
    var curMenuData = null;
    //if (isTopMenu) {
    $.each(this.menuData, function (i, menuData) {
      if (menuData.ID == menuItemID) {
        curMenuData = menuData;
      }
    });

    if (curMenuData != null) return curMenuData;
    //}

    //不递归了，直接点的只支持3级，需要多级的请树图方式
    $.each(this.menuData, function (i, menuData) {
      if (menuData.subMenuList.length > 0) {
        $.each(menuData.subMenuList, function (i, subMenuData) {
          if (subMenuData.menuId == menuItemID) {
            curMenuData = subMenuData;
            return false;
          }

          if (curMenuData == null && subMenuData.subMenuList.length > 0) {
            $.each(subMenuData.subMenuList, function (i, subSubMenuData) {
              if (subSubMenuData.menuId == menuItemID) {
                curMenuData = subSubMenuData;
                return false;
              }
            });
          }
        });
      }
    });
    return curMenuData;
  };

  MenuHelper.prototype.createSystemBar = function (menuItemID) {
    var curMenuData = this.getMenuData(menuItemID, true);
    var systemBarStr = '';
    $.each(curMenuData.SubMenus, function (i, item) {
      var clickStr = "_MenuHelper.menuClick('" + item.ID + "')";
      var customHandler = (item.CustomJSClickHandler != "");
      if (customHandler) {
        clickStr = item.CustomJSClickHandler + "('" + item.ID + "', 'secondMenu')";
      }
      systemBarStr += '<a href="#" id="' + item.ID + '"' + ' title="' + item.Text + '" onclick="' + clickStr + '" type="secondMenu"> <i class="quickToolIcon" style="background-image: url(\'' + item.ImageName + '\')"></i></a>';
    });
    $('#system-options').html(systemBarStr);

    //// Define any icon actions before calling the toolbar
    $('.toolbar-icons a').on('click', function (event) {
      event.preventDefault();
    });

    $('#linkSystemBar').toolbar({ content: '#system-options', position: 'bottom', hover: true });
  }

  //打开三级菜单页面
  MenuHelper.prototype.openLevel3MenuPage = function (menuItemID) {
    //alert(menuItemID);
    var curMenuData = this.getMenuData(menuItemID, true);
    if (curMenuData) {
      var url = '/index/Level3MenuPage?curMenuID=' + menuItemID+'&menuTitle='+curMenuData.menuTitle;
      window.top._contentTabHelper.addTab(curMenuData.menuTitle, url, true, '', menuItemID);
    }
  }
  return MenuHelper;
})();

window.MenuHelper = menuHelper;
