///<reference path="typings/requirejs/require.d.ts" />
///<reference path="typings/jquery/jquery.d.ts" />

var _MenuHelper, _contentTabHelper, _neTreeContainerHelper, _globalGISHelper;

export default {
  init(){
    run();
  }
}
function run() {
    //var env = Boco.Rnop.Web.Environments;

//debugger
    _contentTabHelper = new ContentTabHelper();
    _contentTabHelper.init();

   /* _MenuHelper = new MenuHelper();
    _MenuHelper.afterMenuInit = function () {
      _contentTabHelper.initWebcomePageTab(env.BaseUri() + '/WelcomePage/Index?plugin=WelcomePagePlugin');
      _contentTabHelper.initPrePageTab();
      _contentTabHelper.initGISTab(env.BaseUri() + '/GIS/Index?plugin=GISPlugin');
    };
    _MenuHelper.init();*/

    //_neTreeContainerHelper = new NETreeContainerHelper();
    //_neTreeContainerHelper.init('mainTreeContainer');//Window('windowNETree');
    //_neTreeContainerHelper.initWindow('windowNETree');

    initToolbar();

    /*$.messageManager.addEventListener(function (resp) {

      var data = JSON.parse(resp.data);
      if (data.messageType == "GIS_LOADED") {
        if (_contentTabHelper.isGisLoaded == false) {
          window.top._contentTabHelper.selectTab('概况');
        }
        _contentTabHelper.isGisLoaded = true;
      }
    })*/
}

var Class = {
    create: function () {
        return function () {
            this.initialize.apply(this, arguments);
        }
    }
}

/*Function.prototype.bind = function (object) {
    var method = this;
    return function () {
        method.apply(object, arguments);
    }
}*/
var Scroll = Class.create();
Scroll.prototype = {
    initialize: function (element, height) {
        this.element = $('#' + element)[0];
        this.element.innerHTML += this.element.innerHTML;
        this.height = height;
        this.maxHeight = this.element.scrollHeight / 2;
        this.counter = 0;
        this.scroll();
        this.timer = "";
        this.element.onmouseover = this.stop.bind(this);
        this.element.onmouseout = function () { this.timer = setTimeout(this.scroll.bind(this), 1000); }.bind(this);
    },
    scroll: function () {
        if (this.element.scrollTop < this.maxHeight) {
            this.element.scrollTop++;
            this.counter++;
        } else {
            this.element.scrollTop = 0;
            this.counter = 0;
        }

        if (this.counter < this.height) {
            this.timer = setTimeout(this.scroll.bind(this), 22);
        } else {
            this.counter = 0;
            this.timer = setTimeout(this.scroll.bind(this), 3126);
        }
    },
    stop: function () {
        clearTimeout(this.timer);
    }
};

var callback_GIS;
var OpenGISTab = function (callback) {
    callback_GIS = callback;
    var env = Boco.Rnop.Web.Environments;
    if (!$('#content_tabs1').tabs('exists', "GIS")) {
        window.top._globalGISHelper = undefined;
    }
    _contentTabHelper.addTab('GIS', env.BaseUri() + '/GIS/Index?plugin=GISPlugin', false, 'icon icon-nav', 'GIS');
    if (window.frameGIS != undefined) {
        if (window.top._globalGISHelper == undefined) {
            //IE通用
            addEvent("load", window.frameGIS, iframeLoadA);
        } else {
            callback();
        }
    }
};

function iframeLoadA() {
    callback_GIS();
}

function addEvent(eventName, element, fn) {
    if (element.attachEvent) element.attachEvent("on" + eventName, fn);
    else element.addEventListener(eventName, fn, false);
}

function initToolbar() {
  $('#linkNETree').on('click', function (event) {
    try {
      //暂时先这么处理，辽宁提出模板网元树不重复显示问题
      var exsist = document.getElementById("frameDqasTemplate").contentWindow.document.getElementById('treeContainer');
      if (exsist) {
        var tabName = $("#content_tabs .tabs").find(">[class='tabs-selected']").find("a").first().find("span").first().text();
        if (tabName == "数据查询") {
          alert("数据查询网元树请从左侧选择！");
          return;
        }
      }
    } catch (e) {
    }

    _neTreeContainerHelper.showWindow();
  });
}
