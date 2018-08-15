var contentTabHelper = (function () {
    /*function ContentTabHelper() {
    }*/

    var ContentTabHelper = function() {

    }

    ContentTabHelper.prototype.havePrePage = false;
    ContentTabHelper.prototype._prePageMenu = undefined;
    ContentTabHelper.prototype.isGisLoaded = false;

    ContentTabHelper.prototype.init = function () {
        this.initContextMenu();
        console.log("ContentTabHelper.init")
        //this.initTabs();
    };

    //初始化导航邮件
    ContentTabHelper.prototype.initContextMenu = function () {
        var _this = this;
        /* 为选项卡绑定右键 */
        $(document).on("contextmenu", "#min_title_list li", function (e) {
            $('#tabContextMenu').menu('show', {
                left: e.pageX,
                top: e.pageY
            });

            var subtitle = $(e.target).text();
            $('#tabContextMenu').data("currtab", this);
            _this.selectTab(subtitle);
            return false;
        });

        $('#tabContextMenu').menu({});
        this.tabCloseEven();
    }

    // 绑定右键菜单事件
    ContentTabHelper.prototype.tabCloseEven = function () {
        var that = this;

        // 刷新
        $('#mm-tabupdate').on("click", function (e) {
            var tabName = $(e.target).text();
            var curTab = $('#tabContextMenu').data("currtab");
            var titleIndex = $("#min_title_list li").index(curTab);
            if (titleIndex > -1) {
                var topWindow = $(window.parent.document);
                var iframe_box = topWindow.find("#iframe_box");
                var frame = iframe_box.find(".show_iframe").hide().eq(titleIndex).find("iframe")[0];
                frame.src = frame.src;
                iframe_box.find(".show_iframe").hide().eq(titleIndex).show();
            }
        });

        // 关闭当前
        $('#mm-tabclose').on("click", function (e) {

            var tabName = $(e.target).text(),
                curTab = $('#tabContextMenu').data("currtab"),
                titleIndex = $("#min_title_list li").index(curTab);

            var closeBtn = $(curTab).find("i");
            if (closeBtn.length > 0 && $(closeBtn[0]).is(":visible")) {

                $(closeBtn[0]).trigger("click");
            }
        });

        // 全部关闭
        $('#mm-tabcloseall').on("click", function (e) {
            var tabName = $(e.target).text();
            var closeBtn = $("#min_title_list li i");

            if (closeBtn.length > 0) {
                closeBtn.toArray().forEach(function (val, i) {
                    if ($(val).is(":visible")) {
                        $(val).trigger("click");
                    }
                });
            }
        });

        // 关闭除当前之外的TAB
        $('#mm-tabcloseother').on("click", function (e) {
            var tabName = $(e.target).text(),
                closeBtn = $("#min_title_list li i"),
                curTab = $('#tabContextMenu').data("currtab"),
                titleIndex = $("#min_title_list li").index(curTab);

            if (closeBtn.length > 0) {
                closeBtn.toArray().forEach(function (val, i) {

                    var curTab1 = $(val).closest("li")[0];
                    if (curTab != curTab1 && $(val).is(":visible")) {
                        $(val).trigger("click");
                    }
                });
            }
        });

        // 关闭当前右侧的TAB
        $('#mm-tabcloseright').on("click", function (e) {

            var tabName = $(e.target).text(),
                closeBtn = $("#min_title_list li i"),
                curTab = $('#tabContextMenu').data("currtab"),
                titleIndex = $("#min_title_list li").index(curTab);

            if (closeBtn.length > 0) {
                closeBtn.toArray().forEach(function (val, i) {

                    if (i > titleIndex && $(val).is(":visible")) {
                        $(val).trigger("click");
                    }
                });
            }
        });

        // 关闭当前左侧的TAB
        $('#mm-tabcloseleft').on("click", function (e) {
            var tabName = $(e.target).text(),
                closeBtn = $("#min_title_list li i"),
                curTab = $('#tabContextMenu').data("currtab"),
                titleIndex = $("#min_title_list li").index(curTab);

            if (closeBtn.length > 0) {
                closeBtn.toArray().forEach(function (val, i) {

                    if (i < titleIndex && $(val).is(":visible")) {
                        $(val).trigger("click");
                    }
                });
            }
        });

        // 退出
        $("#mm-exit").on("click", function (e) {
            $('#tabContextMenu').menu('hide');
        });
    };

    //启动预制业务页签
    ContentTabHelper.prototype.activePrePageTab = function () {
        if (this._prePageMenu == undefined) {
            return;
        }

        this.selectTab(this._prePageMenu.Text);
    }

    ContentTabHelper.prototype.initPrePageTab = function () {
        var menuId = $.queryString.getValue("f");
        if (menuId == undefined) {
            return;
        }

        var menuData = _MenuHelper.getMenuData(menuId);
        if (menuData == undefined) {
            return;
        }

        this.havePrePage = true;
        this._prePageMenu = menuData;
        var params = [];
        $($.queryString.items()).each(function (i, e) {
            if (e.name == "plugin" || e.name == "f" || e.name == "token") {
                return;
            }

            params.push(e);
        });
        var url = menuData.Url;
        var newUrl = menuData.Url + (menuData.Url.indexOf('?') > 0 ? "&" : "?") + $.param(params);
        menuData.Url = newUrl;
        _MenuHelper.menuClick(menuId);
        menuData.Url = url;
    };

    ContentTabHelper.prototype.initWebcomePageTab = function (welcomePageUrl) {

        this.addTab('概况', welcomePageUrl, false, null, 'welcomePage', null, true);
    };

    ContentTabHelper.prototype.initGISTab = function (gisUrl) {

        this.addTab('GIS', gisUrl, false, null, 'GIS', null, true);
    };

    ContentTabHelper.prototype.changePasswordTab = function (url) {
        //this.tabClose();
        //this.tabCloseEven();

        this.addTab('密码修改', url, true, 'tabchangepassword', 'changepassword');
    };

    ContentTabHelper.prototype.selectTab = function (tabName) {
        //$('#content_tabs').tabs('select', tabName);
        var bStop = false;
        var bStopIndex = 0;
        var topWindow = $(window.parent.document);
        var show_navLi = topWindow.find("#min_title_list li");
        show_navLi.each(function () {
            if ($(this).find('span').text() === tabName) {
                bStop = true;
                bStopIndex = show_navLi.index($(this));
                return false;
            }
        });
        if (bStop) {
            show_navLi.removeClass("active").eq(bStopIndex).addClass("active");
            var iframe_box = topWindow.find("#iframe_box");
            iframe_box.find(".show_iframe").hide().eq(bStopIndex).show();
        }
    };
    //从菜单点击
    ContentTabHelper.prototype.addTabFromMenu = function (obj) {
        var href = $(obj).attr('_href');
        var subtitle = $(obj).attr("data-title");
        this.addTab(subtitle, href, true, null, subtitle, true);
    };
    ContentTabHelper.prototype.addTab = function (subtitle, url, closeble, icon, id, refresh, fixed) {
        if (url) {
            url = encodeURI(url);
            var bStop = false;
            var bStopIndex = 0;
            var topWindow = $(window.parent.document);
            var show_navLi = topWindow.find("#min_title_list li");
            show_navLi.each(function () {
                if ($(this).find('span').attr("data-href") == url
                    || $(this).find('span').attr("data-href").indexOf(url.replace("..", "")) > -1
                    || url.indexOf($(this).find('span').attr("data-href").replace("..", "")) > -1) {
                    bStop = true;
                    bStopIndex = show_navLi.index($(this));
                    return false;
                }
            });
            if (!bStop) {
                this.createFrame(url, id, subtitle, fixed);
            }
            else {
                show_navLi.removeClass("active").eq(bStopIndex).addClass("active");
                var iframe_box = topWindow.find("#iframe_box");
                iframe_box.find(".show_iframe").hide().eq(bStopIndex).show().find("iframe").attr("src", url);
            }
        }

        //    if (refresh) { //强制刷新
        //        refreshTab({ subtitle: subtitle, url: url });
        //    }
        //}
    };


    ContentTabHelper.prototype.createFrame = function (href, id, titleName, fixed) {
        var topWindow = $(window.parent.document);
        var show_nav = topWindow.find('#min_title_list');
        show_nav.find('li').removeClass("active");
        var iframe_box = topWindow.find('#iframe_box');
        show_nav.append('<li class="active ' + (fixed ? "fixed" : "") + '\"><span data-href="' + href + '">' + titleName + '</span><i></i><em></em></li>');
        var taballwidth = 0,
            $tabNav = topWindow.find(".acrossTab"),
            $tabNavWp = topWindow.find(".Hui-tabNav-wp"),
            $tabNavitem = topWindow.find(".acrossTab li"),
            $tabNavmore = topWindow.find(".Hui-tabNav-more");
        if (!$tabNav[0]) { return }
        $tabNavitem.each(function (index, element) {
            taballwidth += Number(parseFloat($(this).width() + 60))
        });
        $tabNav.width(taballwidth + 25);
        var w = $tabNavWp.width();
        if (taballwidth + 25 > w) {
            $(show_nav).css("left", w - $(show_nav).width());
            $tabNavmore.show()
        }
        else {
            $tabNavmore.hide();
            $tabNav.css({ left: 0 })
        }
        var iframeBox = iframe_box.find('.show_iframe');
        iframeBox.hide();
        id="boco"+id;
        iframe_box.append('<div class="show_iframe"><div class="loading"></div><iframe name=\"' + id + '\" id=\"' + id + '\" frameborder="0" src=' + href + '></iframe></div>');
        var showBox = iframe_box.find('.show_iframe:visible');
        showBox.find('iframe').load(function () {
            showBox.find('.loading').hide();
        });

        //var s = '<iframe scrolling="auto" frameborder="0"  src="' + url + '" style="position:relative !important;padding:0px 0px 0px 0px;width:100%;height:100%" fit="true"></iframe>';
        //if (typeof id != undefined && id != null) {
        //    s = '<iframe scrolling="auto" id="frame' + id + '" frameborder="0"  src="' + url + '" style="position:relative !important;padding:0px 0px 0px 0px;width:100%;height:100%" fit="true"></iframe>';
        //}
        //return s;
    };

    // 弹出信息窗口 title:标题 msgString:提示信息 msgType:信息类型 [error,info,question,warning]
    ContentTabHelper.prototype.msgShow = function (title, msgString, msgType) {
        $.messager.alert(title, msgString, msgType);
    };

    ContentTabHelper.prototype.regSelectHandler = function (selectHandler) {
        this.selectHandler = selectHandler;
    };

    ContentTabHelper.prototype.unRegSelectHandler = function (selectHandler) {
        this.selectHandler = null;
    };

    ContentTabHelper.prototype.openSLWindow = function (subtitle, url, subject, refresh) {
        var mywin = window.open('', subtitle, 'toolbar=1,location=1,directories=1,status=1,menubar=1,scrollbars=1,resizable=1');
        if (mywin.closed || (!mywin.document.URL) ||
           (mywin.document.URL.indexOf("about") == 0) || refresh)
            mywin.location = url; //+ '&subject=' + subject;
        else {
            mywin.blur();
            setTimeout(mywin.focus, 0);
            if (mywin.runSubject) {
                mywin.runSubject(subject);
            }
            $.messager.alert('安全提示', subtitle + '已经在另外一个标签打开。\r\n部分浏览器安全限制不允许自动切换。请您手工点切！');
        }
    };

    return ContentTabHelper;
})();

window.ContentTabHelper = contentTabHelper;
