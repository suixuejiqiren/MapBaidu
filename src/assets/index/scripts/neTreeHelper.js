var __extends = (this && this.__extends) || function (d, b) {
  for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
  function __() { this.constructor = d; }
  d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};

var NETreeContainerHelper = (function () {
    function NETreeContainerHelper() {
        this.divContainerName = '';
        this.customTree = null;
        this.treesData = null;
        this.treesObj = new Boco.Rnop.Web.Utilities.Hashtable();
        this.curTree = null;
        var baseImageUrl = Boco.Rnop.Web.Environments.BaseUri() + '/Images/neTree/';
        this.treeHTML =
        '<div id="divSearchContainer" style="width: 100%; margin-top: 1px; background-color: #E0ECFF;"> ' +
        '    <div id="topContainer" style="width: 100%;">                                               ' +
        '        <div style="width: 55px; float: left; margin-top: 5px; margin-left: 5px;">             ' +
        '            <span style="float: right">检索前：</span>                                         ' +
        '        </div>                                                                                 ' +
        '        <input id="topN" style="width: 60px;" />                                               ' +
        '        <input id="neSearchType" style="width: 120px;" />                                      ' +
        '    </div>                                                                                     ' +
        '    <div id="conditionContainer" style="width: 100%; margin-top: 3px;">                        ' +
        '        <div style="width: 55px; float: left; margin-top: 5px; margin-left: 5px;">             ' +
        '            <a id="quickSearchType" href="#" onclick="_neTreeContainerHelper.changeQuickSearchType(\'quickSearchType\');" style="float: right;">名称：</a>' +
        '        </div>                                                                                                                                          ' +
        '        <input type="text" id="searchCondition" class="k-textbox" style="width: 186px; height: 24px;" />                                                ' +
        '        <input type="button" id="buttonSearch" class="k-button" style="width: 24px; height: 22px; margin-left: -3px;background-image: url(' + baseImageUrl + 'ico_search.png);background-repeat:no-repeat;" />                                ' +
        '    </div>                                                                                                                                              ' +
        '</div>                                                                                                                                                  ' +
        '<div id="groupTreeTypeContainer" style="width: 100%; height: 30px;margin:0px; background-color: #E0ECFF;">                                                         ' +
        '    <div style="width: 241px; margin-left: 5px; margin-top: 2px; height: 26px; float: left;">                                                           ' +
        '        <input id="groupTreeType" style="width: 235px; float: right;" />                                                                                ' +
        '    </div>                                                                                                                                              ' +
        '    <div style="margin-right: 1px; margin-top: 0px;height: 26px; ">                                                                                     ' +
        '        <input type="button" id="buttonSelAll" class="k-button" style="width: 24px; height: 22px; margin-top: 3px; margin-left: 1px; background-image: url(' + baseImageUrl + 'ico_select_all.png);background-repeat:no-repeat;" />' +
        '        <input type="button" id="buttonSelNone" class="k-button" style="width: 24px; height: 22px; margin-top: 3px; margin-left: -2px;background-image: url( ' + baseImageUrl + 'ico_remove_all.png);background-repeat:no-repeat;" />                  ' +
        '    </div>                                                                                                                                                  ' +
        '</div>                                                                                                                                                      ' +
        '<div id="divTreeContainer" style="height: 367px; overflow: auto;">                                                                                          ' +
        '    <div id="geoTree" style="overflow: hidden;"></div>                                                                                                      ' +
        '    <div id="geoVendorTree" style="overflow: hidden;"></div>                                                                                                   ' +
        '    <div id="vendorTree" style="overflow: hidden;"></div>                                                                                                   ' +
        '    <div id="neGroupTree" style="overflow: hidden;"></div>                                                                                                  ' +
        '    <div id="customTree" style="overflow: hidden;"></div>                                                                                                   ' +
        '    <style scoped>                                                                                                                                          ' +
        '        .GSMTechnology {                                                                                                                                    ' +
        '            background-image: url(" ' + baseImageUrl + 'gsm.gif");                                                                                          ' +
        '        }                                                                                                                                                   ' +
        '                                                                                                                                                            ' +
        '        .TDTechnology {                                                                                                                                     ' +
        '            background-image: url(" ' + baseImageUrl + 'td.gif");                                                                                           ' +
        '        }                                                                                                                                                   ' +
        '                                                                                                                                                            ' +
        '        .LTETechnology {                                                                                                                                    ' +
        '            background-image: url(" ' + baseImageUrl + 'lte.gif");                                                                                          ' +
        '        }                                                                                                                                                   ' +
        '                                                                                                                                                            ' +
        '        .Region {                                                                                                                                           ' +
        '            background-image: url(" ' + baseImageUrl + 'region.gif");                                                                                       ' +
        '        }                                                                                                                                                   ' +
        '                                                                                                                                                            ' +
        '        .City {                                                                                                                                             ' +
        '            background-image: url(" ' + baseImageUrl + 'city.gif");                                                                                         ' +
        '        }                                                                                                                                                   ' +
        '                                                                                                                                                            ' +
        '        .BSC {                                                                                                                                              ' +
        '            background-image: url(" ' + baseImageUrl + 'bsc.gif");                                                                                          ' +
        '        }                                                                                                                                                   ' +
        '                                                                                                                                                            ' +
        '        .BTS {                                                                                                                                              ' +
        '            background-image: url(" ' + baseImageUrl + 'bts.gif");                                                                                          ' +
        '        }                                                                                                                                                   ' +
        '                                                                                                                                                            ' +
        '        .GsmCell {                                                                                                                                          ' +
        '            background-image: url(" ' + baseImageUrl + 'gsmcell.gif");                                                                                      ' +
        '        }                                                                                                                                                   ' +
        '                                                                                                                                                            ' +
        '        .RNC {                                                                                                                                              ' +
        '            background-image: url(" ' + baseImageUrl + 'rnc.gif");                                                                                          ' +
        '        }                                                                                                                                                   ' +
        '                                                                                                                                                            ' +
        '        .NodeB {                                                                                                                                            ' +
        '            background-image: url(" ' + baseImageUrl + 'nodeb.gif");                                                                                        ' +
        '        }                                                                                                                                                   ' +
        '                                                                                                                                                            ' +
        '        .UtranCell {                                                                                                                                        ' +
        '            background-image: url(" ' + baseImageUrl + 'utrancell.gif");                                                                                    ' +
        '        }                                                                                                                                                   ' +
        '                                                                                                                                                            ' +
        '        .ENodeB {                                                                                                                                           ' +
        '            background-image: url(" ' + baseImageUrl + 'enodeb.gif");                                                                                       ' +
        '        }                                                                                                                                                   ' +
        '                                                                                                                                                            ' +
        '        .EUtranCell {                                                                                                                                       ' +
        '            background-image: url(" ' + baseImageUrl + 'eutrancell.gif");                                                                                   ' +
        '        }                                                                                                                                                   ' +
        '                                                                                                                                                            ' +
        '        .Vendor {                                                                                                                                           ' +
        '            background-image: url(" ' + baseImageUrl + 'vendor.ico");                                                                                       ' +
        '        }                                                                                                                                                   ' +
        '                                                                                                                                                            ' +
        '        .CellGroup {                                                                                                                                        ' +
        '            background-image: url(" ' + baseImageUrl + 'CellGroup.gif");                                                                                    ' +
        '        }                                                                                                                                                   ' +
        '    </style>                                                                                                                                                ' +
        '</div>                                                                                                                                                      ';
    }

    NETreeContainerHelper.prototype.init = function (divContainerName) {
        var that = this;
        this.divContainerName = divContainerName;
        $('#' + divContainerName).html(this.treeHTML);

        $("#topN").kendoDropDownList({
            dataSource: [10, 20, 30]
        });

        $("#neSearchType").kendoDropDownList({
            dataSource: ['GsmCell', 'UtranCell', 'EUtranCell']
        });

        $('#buttonSelAll').click(function (event) {
            var treeView = $('#' + that.curTree.treeData.name).data("kendoTreeView");
            treeView.checkedAllItems(true);
        });

        $('#buttonSelNone').click(function (event) {
            var treeView = $('#' + that.curTree.treeData.name).data("kendoTreeView");
            treeView.checkedAllItems(false);
        });

        //this.initWindow('windowNETree');
        this.initTrees();
        this.initQuickSearch('searchCondition');
    };

    NETreeContainerHelper.prototype.initWindow = function (windowName) {
        var that = this;
        this.windowName = windowName;
        var window = $("#" + this.windowName);

        if (!window.data("kendoWindow")) {
            window.kendoWindow({
                width: "300px",
                height: "450px",
                title: "网元树",
                actions: [
                    "Close"
                ],
                position: {
                    top: 100,
                    left: 200
                },
                resizable: false
                //close: onClose
            });

            window.data("kendoWindow").close();
        }

        //$('#buttonTest').click(function (event) {
        //    var neInputObj = _neTreeContainerHelper.getNEInputObj();
        //    var neType = $('#neSearchType').val();

        //    neInputObj.getIntIDSQL(neType, function (sql) {
        //        alert(sql);
        //    },
        //    function error(error) {

        //    });

        //    neInputObj.getHisIntIDSQL(neType, "2015-02-01".toDate("yyyy-MM-dd"), function (sql) {
        //        alert(sql);
        //    },
        //    function error(error) {

        //    });

        //    NESourceServiceHelper.TestNEInputObjData(neInputObj.getNEInputObjData(neType));
        //});
    };
    NETreeContainerHelper.prototype.showWindow = function (left, top) {
        var window = $("#" + this.windowName);
        if (left, top) {
            window.data("kendoWindow").setOptions({
                position: {
                    top: top,
                    left: left
                }
            });
        }

        window.data("kendoWindow").open();
    };

    NETreeContainerHelper.prototype.closeWindow = function () {
        var window = $("#" + this.windowName);
        window.data("kendoWindow").close();
    };

    NETreeContainerHelper.prototype.initTrees = function () {
        var geoHierarchyStr = 'GSMTechnology,Region,City,BSC,BTS,GsmCell|TDTechnology,Region,City,RNC,NodeB,UtranCell|LTETechnology,Region,City,ENodeB,EUtranCell';
        var geoHierarchyStr2 = 'GSMTechnology,Region,Vendor|TDTechnology,Region,Vendor|LTETechnology,Region,Vendor';
        var vendorHierarchyStr = 'GSMTechnology,Vendor,BSC,BTS,GsmCell|TDTechnology,Vendor,RNC,NodeB,UtranCell|LTETechnology,Vendor,ENodeB,EUtranCell';
        var neGroupHierarchyStr = 'CellGroup,GsmCell|CellGroup,UtranCell|CellGroup,EUtranCell';
        this.treesData = [{ name: 'geoTree', chName: '地理树', hierarchy: this.createHierarchyNodes(geoHierarchyStr), hierarchyDesc: '制式->地市->县市->BSC级->基站->小区', hierarchyStr: geoHierarchyStr },
            { name: 'geoVendorTree', chName: '地理厂家树', hierarchy: this.createHierarchyNodes(geoHierarchyStr2), hierarchyDesc: '制式->地市->厂家->BSC级->基站->小区', hierarchyStr: geoHierarchyStr2 },
            { name: 'vendorTree', chName: '厂家树', hierarchy: this.createHierarchyNodes(vendorHierarchyStr), hierarchyDesc: '制式->厂家->BSC级->基站级->小区', hierarchyStr: vendorHierarchyStr },
            { name: 'neGroupTree', chName: '网元组树', hierarchy: this.createNEGroupTypeNodes(), hierarchyDesc: '小区组->小区', hierarchyStr: neGroupHierarchyStr },
            { name: 'customTree', chName: '查找树', hierarchy: null, hierarchyDesc: '快速查找', hierarchyStr: '' }];

        this.initTreeCombox(this.treesData);

        var that = this;
        $.each(this.treesData, function (i, item) {
            if (item.name == 'customTree') {
                that.customTree = new CustomNETree(item);
                that.customTree.init();
                that.treesObj.add(item.name, that.customTree);
            }
            else {
                var generalTree = new GeneralNETree(item);
                generalTree.init();
                that.treesObj.add(item.name, generalTree);
            }

            $('#' + item.name).hide();
        });

        $('#' + this.treesData[0].name).show();
        this.curTree = this.treesObj.get(this.treesData[0].name);
    };

    NETreeContainerHelper.prototype.showTree = function (treeName) {
        $.each(this.treesData, function (i, item) {
            $('#' + item.name).hide();
        });
        $('#' + treeName).show();
        if (treeName == "neGroupTree") {
        var dataType = [{ type: "CellGroup", subTypeNodes: [{ parent:null,type: "GsmCell", subTypeNodes: [] }, { type: "UtranCell", subTypeNodes: [] }, { type: "EUtranCell", subTypeNodes: [] }] }];
            var item = { name: 'neGroupTree', chName: '网元组树', hierarchy: dataType, hierarchyDesc: '小区组->小区', hierarchyStr: 'CellGroup,GsmCell|CellGroup,UtranCell|CellGroup,EUtranCell' };
            var generalTree = new GeneralNETree(item);
            generalTree.initCellGroupTreeData();
        }
    };

    NETreeContainerHelper.prototype.createHierarchyNodes = function (hierarchyStr) {
        var treeStrs = hierarchyStr.split('|');
        var typeNodes = [];

        $.each(treeStrs, function (i, treeStr) {
            var typeStrs = treeStr.split(',');

            var rootType = null, parentType = null, curType = null;
            $.each(typeStrs, function (i, typeStr) {
                //var curTypeStrs = typeStr.split('^');
                //$.each(curTypeStrs, function (i, curTypeStr) {
                curType = { type: typeStr, subTypeNodes: [], parent: parentType };
                if (parentType != null) {
                    parentType.subTypeNodes.push(curType);
                }
                if (parentType == null) {
                    rootType = curType;
                }
                parentType = curType;
                //});
            });

            typeNodes.push(rootType);
        });

        return typeNodes;
    };

    NETreeContainerHelper.prototype.createNEGroupTypeNodes = function () {
        var typeNodes = [];

        var rootNode = { type: 'CellGroup', subTypeNodes: [], parent: null };
        rootNode.subTypeNodes.push({ type: 'GsmCell', subTypeNodes: [], parent: rootNode });
        rootNode.subTypeNodes.push({ type: 'UtranCell', subTypeNodes: [], parent: rootNode });
        rootNode.subTypeNodes.push({ type: 'EUtranCell', subTypeNodes: [], parent: rootNode });

        typeNodes.push(rootNode);
        return typeNodes;
    };

    NETreeContainerHelper.prototype.initTreeCombox = function (treesData) {
        if (treesData == null || treesData.length == 0) return;
        var data = [];

        $.each(treesData, function (i, item) {
            data.push({ name: item.name, desc: item.chName + '(' + item.hierarchyDesc + ')' });
        });

        var that = this;
        $("#groupTreeType").kendoDropDownList({
            dataSource: data,
            dataTextField: "desc",
            dataValueField: "name",
            cascade: function (e) {
                that.showTree(this.value());
                that.curTree = that.treesObj.get(this.value());
            },
            select: function (e) {//选择网元数组的时候更新网元数组
                if (this.value() == "neGroupTree") {
                    that.showTree("neGroupTree");
                    that.curTree = that.treesObj.get("neGroupTree");
                }

            }
            //height: 26
            //enable: false
        });
    };

    NETreeContainerHelper.prototype.initQuickSearch = function (textSearchName) {
        this.quickSearchTypes = ['名称：', 'CI：'];
        this.curQuickSearchType = 0;

        var that = this;
        $('#' + textSearchName).keydown(function (event) {
            if (event.type !== 'click' && event.which !== Boco.Rnop.Web.Constants.getConstant('KEY_ENTER')) {//回车或点击时提交登录
                return;
            }

            that.doQuickSearch(textSearchName, that.quickSearchTypes[that.curQuickSearchType]);
        });

        $('#buttonSearch').click(function (event) {
            that.doQuickSearch(textSearchName, that.quickSearchTypes[that.curQuickSearchType]);
        });

        $('#' + textSearchName).tooltip({
            position: 'bottom',
            content: '<span style="color:#fff">可以,号分割模糊查询</span>',
            onShow: function () {
                $(this).tooltip('tip').css({
                    backgroundColor: '#666',
                    borderColor: '#666'
                });
            }
        });
    };

    NETreeContainerHelper.prototype.changeQuickSearchType = function (labelName) {
        this.curQuickSearchType = this.curQuickSearchType + 1;
        this.curQuickSearchType = this.curQuickSearchType % this.quickSearchTypes.length;
        $("#" + labelName).text(this.quickSearchTypes[this.curQuickSearchType]);
    };

    NETreeContainerHelper.prototype.doQuickSearch = function (textSearchName, quickSearchType) {
        var condition = $('#' + textSearchName).val();
        if (condition == '') return;

        var dropdownlist = $("#groupTreeType").data("kendoDropDownList");
        dropdownlist.select(this.treesData.length - 1);
        ////this.showTree('customTree');
        var value = $("#" + textSearchName).val(),
            neType = $('#neSearchType').val(),
            topN = $('#topN').val();

        if (quickSearchType.startWith('名称')) this.doQuickNameSearch(neType, value, topN);
        if (quickSearchType.startWith('CI')) this.doQuickCISearch(neType, value, topN);
    };

    NETreeContainerHelper.prototype.doQuickNameSearch = function (neType, conditionValue, topN) {
        var values = conditionValue.split(',');
        var sqlClause = '';
        $.each(values, function (i, value) {
            var neTypeLower = neType.toLowerCase();
            if (neTypeLower == "gsmcell" || neTypeLower == "bts" ||
                neTypeLower == "nodeb" || neTypeLower == "utrancell" ||
                neTypeLower == "enodeb" || neTypeLower == "eutrancell") {
                sqlClause += "(upper(a.name) like '%" + value.toUpperCase() + "%' or upper(a.zh_name)  like '% " + value.toUpperCase() + "%')";
            }
            else {
                sqlClause += "(upper(a.name) like '%" + value.toUpperCase() + "%')";
            };

            if (i < values.length - 1)
                sqlClause += " or ";
        });

        var that = this;
        NESourceServiceHelper.GetResourceObjectsBySqlClause(neType, sqlClause, topN,
            function (data) { that.bindCustomNETree(data, neType); },
            function (error) { });
    };

    NETreeContainerHelper.prototype.bindCustomNETree = function (data, neType) {
        this.customTree.refreshData(data, neType);
    };

    NETreeContainerHelper.prototype.doQuickCISearch = function (neType, conditionValue, topN) {
        var neTypeLower = neType.toLowerCase();
        if ((neTypeLower != "gsmcell") && (neTypeLower != "utrancell")) {
            $.messager.defaults.ok = '确认';
            $.messager.alert('错误', 'CI只支持GsmCell和UtranCell', 'error');
            return;
        }

        var values = conditionValue.split(',');
        var sqlClause = '';
        $.each(values, function (i, value) {
            if (neTypeLower == "gsmcell") {
                sqlClause += "to_char(a.ci) like '%" + value + "%')";
            }
            else {
                sqlClause += "to_char(a.cid) like '%" + value + "%')";
            };

            if (i < values.length - 1)
                sqlClause += " or ";
        });

        var that = this;
        NESourceServiceHelper.GetResourceObjectsBySqlClause(neType, sqlClause, topN,
            function (data) { that.bindCustomNETree(data, neType); },
            function (error) { });
    };

    NETreeContainerHelper.prototype.getNEInputObj = function () {
        return this.curTree.getNEInputObj();
    };

    NETreeContainerHelper.prototype.supportNEType = function (neType, selecedNode) {
        return this.curTree.supportNEType(neType, selecedNode);
    };

    return NETreeContainerHelper;
})();

var GeneralNETree = (function () {

    function GeneralNETree(tree) {
        this.treeData = tree;
    }

    GeneralNETree.prototype.init = function () {
        this.initTreeUI();
        this.initTreeData();
    };

    GeneralNETree.prototype.initTreeUI = function () {
        var treeName = this.treeData.name;
        var that = this;
        $('#' + treeName).kendoTreeView({
            checkboxes: {
                checkChildren: true
            },
            check: function (e) { that.treeNodeCheck(e); },
            dataTextField: "name",
            expand: function (e) { that.treeNodeExpand(e); },
            dataBound: function () {
                if (treeName == "neGroupTree") {
                    $.contextMenu({
                        selector: '#neGroupTree .k-in',
                        callback: function (key, options) {
                            switch (key) {
                                case "NECellGroupManage":
                                    {
                                        var url = "/NECellGroup/NECellGroupIndex?plugin=BusiCorePlugin&t=" + new Date();
                                        window.top._contentTabHelper.addTab('网元组管理', Boco.Rnop.Web.Environments.BaseUri() + url, true);
                                        break;
                                    }
                                default:
                                    {
                                        break;
                                    }
                            }
                        },
                        items: {
                            "NECellGroupManage": {
                                name: "网元组管理"
                            }
                        }
                    });
                }
            }
        });
    };

    GeneralNETree.prototype.initTreeData = function () {
        var treeName = this.treeData.name;
        this.buildRootData(function (data) {
            var treeview = $('#' + treeName).data("kendoTreeView");
            treeview.setDataSource(new kendo.data.HierarchicalDataSource({
                data: data
            }));
        });
    };

    GeneralNETree.prototype.initCellGroupTreeData = function () {
        var treeName = "neGroupTree";
        this.buildRootData(function (data) {
            var treeview = $('#' + treeName).data("kendoTreeView");
            treeview.setDataSource(new kendo.data.HierarchicalDataSource({
                data: data
            }));
        });
    };

    GeneralNETree.prototype.buildRootData = function (callback) {
        var roots = [];
        var that = this;
        $.each(this.treeData.hierarchy, function (i, item) {
            if (item.type == 'GSMTechnology' || item.type == 'TDTechnology' ||
                item.type == 'LTETechnology') {
                roots.push(NETreeNodeFactory.createTreeNode({ Name: item.type, typeData: item }));
            }
            else {
                NESourceServiceHelper.getResourceObjs(item.type,
                    function (data) { callback(that.appendRootNodes(data, item)); },
                    function (error) { });
            }
        });

        if (roots.length > 0)
            callback(roots);
    };

    GeneralNETree.prototype.appendRootNodes = function (data, typeData) {
        if (data.Result == null || data.Result.length == 0) return;

        var roots = [];
        $.each(data.Result, function (i, subData) {
            subData.typeData = typeData;
            roots.push(NETreeNodeFactory.createTreeNode(subData));
            delete subData.typeData;
        });

        return roots;
    };

    GeneralNETree.prototype.treeNodeCheck = function (e) {
        var dataItem = $('#' + this.treeData.name).data("kendoTreeView").dataItem(e.node);
        dataItem.treeNodeCheck(e);
    };

    GeneralNETree.prototype.treeNodeExpand = function (e) {
        var dataItem = $('#' + this.treeData.name).data("kendoTreeView").dataItem(e.node);
        dataItem.treeNodeExpand(e);
    };

    GeneralNETree.prototype.isAllChecked = function () {
        var treeView = $('#' + this.treeData.name).data("kendoTreeView");
        var rootNodes = treeView.dataSource.view();
        var result = true;
        $.each(rootNodes, function (i, node) {
            if (!node.checked) {
                result = false;
            }
        });

        return result;
    };

    GeneralNETree.prototype.getNEInputObj = function () {
        var treeView = $('#' + this.treeData.name).data("kendoTreeView");
        var checkedNodes = treeView.getCheckedItems();

        return new NEInputObj(checkedNodes, this.isAllChecked());
    };

    GeneralNETree.prototype.supportNEType = function (neType, selecedNode) {
        var nodeType = selecedNode.spriteCssClass;
        var treeHierarchyStrs = this.treeData.hierarchyStr.split('|');

        var supported = false;
        $.each(treeHierarchyStrs, function (i, item) {
            var hierarchyStr = item.toLowerCase();
            var indexNodeType = hierarchyStr.indexOf(nodeType.toLowerCase());
            if (indexNodeType != -1) { //finded
                var indexNeType = hierarchyStr.indexOf(neType.toLowerCase());
                if (indexNodeType <= indexNeType) {
                    supported = true;
                    return false;
                }
            }
        });

        return supported;
    }

    return GeneralNETree;
})();

var CustomNETree = (function (_super) {
    __extends(CustomNETree, _super);
    function CustomNETree() {
        _super.apply(this, arguments);
    }

    CustomNETree.prototype.initTreeUI = function () {
        var treeName = this.treeData.name;
        var that = this;
        $('#' + treeName).kendoTreeView({
            checkboxes: {
                checkChildren: true
            },
            dataTextField: "name"
        });
    };

    CustomNETree.prototype.initTreeData = function () {

    };

    CustomNETree.prototype.isAllChecked = function () {
        return false;
    };

    CustomNETree.prototype.refreshData = function (data, neType) {
        var treeName = this.treeData.name;

        var subNodes = [];
        $.each(data.Result, function (i, subData) {
            subData.typeData = { type: neType, subTypeNodes: [] };
            subNodes.push(NETreeNodeFactory.createTreeNode(subData));
            delete subData.typeData;
        });

        var treeview = $('#' + treeName).data("kendoTreeView");
        treeview.setDataSource(new kendo.data.HierarchicalDataSource({
            data: subNodes
        }));
    };

    CustomNETree.prototype.supportNEType = function (neType, selecedNode) {
        var nodeType = selecedNode.spriteCssClass;
        var treeDatas = _neTreeContainerHelper.treesData;

        var supported = false;
        $.each(treeDatas, function (i, treeData) {
            var treeHierarchyStrs = treeData.hierarchyStr.split('|');

            $.each(treeHierarchyStrs, function (i, item) {
                var hierarchyStr = item.toLowerCase();
                var indexNodeType = hierarchyStr.indexOf(nodeType.toLowerCase());
                if (indexNodeType != -1) { //finded
                    var indexNeType = hierarchyStr.indexOf(neType.toLowerCase());
                    if (indexNodeType <= indexNeType) {
                        supported = true;
                        return false;
                    }
                }
            });

            if (supported) return false;
        });

        return supported;
    }

    return CustomNETree;
})(GeneralNETree);

var NETreeBaseNode = (function () {
    function NETreeBaseNode(id, name, value, cssClass, hasChildren, typeDataFunc, technology) {
        this.id = id;
        this.name = name;
        this.value = value;
        this.spriteCssClass = cssClass;
        this.hasChildren = hasChildren;
        this.typeDataFunc = typeDataFunc;
        this.technology = technology;
    }

    NETreeBaseNode.prototype.treeNodeCheck = function (e) {

    };

    NETreeBaseNode.prototype.treeNodeExpand = function (e) {
        this.e = e;

        var dataItem = e.sender.dataItem(e.node);
        if (dataItem.initialized != undefined || dataItem.initialized == true)
            return;

        dataItem.initialized = true;
        var typeData = dataItem.typeDataFunc.getTypeData();
        //var parentType = typeData.parent;
        var that = this;
        if (typeData.type == 'GSMTechnology' || typeData.type == 'TDTechnology' || typeData.type == 'LTETechnology') {
            $.each(typeData.subTypeNodes, function (i, subType) {
                that.subType = subType;
                NESourceServiceHelper.getResourceObjs(subType.type,
                    function (data) { that.appendSubNodes(data); },
                    function (error) { that.treeNodeExpandError(error); });
            });
        }
        else {
            $.each(typeData.subTypeNodes, function (i, subType) {
                that.subType = subType;
                var dataItem = that.e.sender.dataItem(e.node);
                NESourceServiceHelper.getRelatedResourceObjects(
                    typeData.type,
                    dataItem.id, //dataItem.value.IdStr,
                    subType.type,
                    function (data) {
                        that.appendSubNodes(data);
                    },
                    function (error) { that.treeNodeExpandError(error); });
            });
        }
    };

    NETreeBaseNode.prototype.appendSubNodes = function (data) {
        if (data.Result == null || data.Result.length == 0) return;

        var treeView = this.e.sender;
        var nodeDataItem = this.e.sender.dataItem(this.e.node);

        var that = this;
        var subNodes = [];
        $.each(data.Result, function (i, subData) {

            //纠正地理厂家树显示地市下厂家异常问题 2016-09-19 guojianfeng
            if (that.parentNode != undefined && that.parentNode() != undefined && (
                        that.parentNode().value == "GSMTechnology"
                        || that.parentNode().value == "TDTechnology"
                        || that.parentNode().value == "LTETechnology")
                        && that.subType.type == "Vendor" && subData.NETechnologyStr.indexOf(that.parentNode().name) < 0
                    ) {
                return;
            }

            subData.typeData = that.subType;
            subNodes.push(NETreeNodeFactory.createTreeNode(subData));
            delete subData.typeData;
        });

        treeView.append(subNodes, treeView.findByUid(nodeDataItem.uid));
    };

    NETreeBaseNode.prototype.treeNodeExpandError = function (error) {
    };

    return NETreeBaseNode;
})();

var NETreeNodeFactory = {};
NETreeNodeFactory.createTreeNode = function (treeData) {
    var typeDataFunc = new TypeDataFunc(treeData.typeData);

    if (treeData.Name == 'GSMTechnology') {
        return new GSMTechNETreeNode('-1', 'GSM', 'GSMTechnology', 'GSMTechnology', true, typeDataFunc, 'GSM'); //不太好
    }
    if (treeData.Name == 'TDTechnology') {
        return new TDTechNETreeNode('-1', 'TD', 'TDTechnology', 'TDTechnology', true, typeDataFunc, 'GSM');
    }
    if (treeData.Name == 'LTETechnology') {
        return new LTETechNETreeNode('-1', 'LTE', 'LTETechnology', 'LTETechnology', true, typeDataFunc, 'GSM');
    }

    if (treeData.typeData.type == 'CellGroup') {
        return new NETreeBaseNode(treeData.GroupID, treeData.Name, treeData, treeData.typeData.type,
        treeData.typeData.subTypeNodes.length > 0, typeDataFunc, treeData.NETechnologyStr);
    }

    return new NETreeBaseNode(treeData.IdStr, treeData.Name, treeData, treeData.typeData.type,
        treeData.typeData.subTypeNodes.length > 0, typeDataFunc, treeData.NETechnologyStr);
};

var NETechNETreeNode = (function (_super) {
    __extends(NETechNETreeNode, _super);
    function NETechNETreeNode() {
        _super.apply(this, arguments);
    }

    return NETechNETreeNode;
})(NETreeBaseNode);

var GSMTechNETreeNode = (function (_super) {
    __extends(GSMTechNETreeNode, _super);
    function GSMTechNETreeNode() {
        _super.apply(this, arguments);
    }

    return GSMTechNETreeNode;
})(NETechNETreeNode);

var TDTechNETreeNode = (function (_super) {
    __extends(TDTechNETreeNode, _super);
    function TDTechNETreeNode() {
        _super.apply(this, arguments);
    }

    return TDTechNETreeNode;
})(NETechNETreeNode);

var LTETechNETreeNode = (function (_super) {
    __extends(LTETechNETreeNode, _super);
    function LTETechNETreeNode() {
        _super.apply(this, arguments);
    }

    return LTETechNETreeNode;
})(NETechNETreeNode);

var MoreNETreeNode = (function (_super) {
    __extends(MoreNETreeNode, _super);
    function MoreNETreeNode() {
        _super.apply(this, arguments);
    }

    MoreNETreeNode.prototype.expandMe = function (b) {
        return false;
    };

    MoreNETreeNode.prototype.checkMe = function (b) {
        return false;
    };

    return MoreNETreeNode;
})(NETreeBaseNode);

var TypeDataFunc = (function () {
    function TypeDataFunc(typeData) {
        var _typeData = typeData;

        this.getTypeData = function () {
            return _typeData;
        };
    }

    return TypeDataFunc;
})();

var NEInputObj = (function () {

    function NEInputObj(selectedNodes, allNodesSelected) {
        this.selectedNodes = selectedNodes;
        this.allNodesSelected = allNodesSelected;
    }

    NEInputObj.prototype.getSelectedNEs = function (neType) {
        var result = [];
        $.each(this.selectedNodes, function (i, node) {
            var currentNode = undefined;
            if (neType == null) { //有些情况只要选择的结点
                currentNode = { ID: node.id, Name: node.name, Type: node.spriteCssClass };
            }
            else if (_neTreeContainerHelper.supportNEType(neType, node)) {
                currentNode = { ID: node.id, Name: node.name, Type: node.spriteCssClass };
            }

            if (currentNode != undefined && node.parentNode != undefined && node.parentNode() != undefined) {
                var parent = { ID: node.parentNode().id, Name: node.parentNode().name, Type: node.parentNode().spriteCssClass };
                currentNode.Parent = parent;
            }

            if (currentNode != undefined) {
                result.push(currentNode);
            }
        });

        return result;
    };

    NEInputObj.prototype.getNESelectedType = function () {
        var neType = "";
        var currentNode = undefined;
        if (this.isWholeNESelected()) {
            return this.selectedNodes[0].name;
        }

        //选出来第一个子节点
        if (this.selectedNodes.length > 0) {
            currentNode = this.selectedNodes[0];
        }
        //排除掉查询树和网元组树
        if (currentNode.parentNode() == undefined) {
            return currentNode.spriteCssClass;
        }
        while (currentNode != undefined && currentNode.parentNode != undefined && currentNode.parentNode() != undefined) {
            currentNode = currentNode.parentNode();
        }
        var currentNeType = currentNode.name;
        if (currentNeType == "GSM") {
            neType = "GsmCell";
        } if (currentNeType == "TD") {
            neType = "UtranCell";
        } if (currentNeType == "LTE") {
            neType = "EUtranCell";
        }
        return neType;
    };

    NEInputObj.prototype.isWholeNESelected = function (neType) {
        var env = Boco.Rnop.Web.Environments;
        if (env.IsProvinceUser() == 'True' && this.allNodesSelected)
            return true;

        if (env.IsProvinceUser() == 'True' && this.getSelectedNEs(neType).length > 0) {
            var rootNode = this.getSelectedNEs(neType)[0];
            if (rootNode.Type.toLowerCase().endWith('technology'))
                return true;
        }

        return false;
    };

    NEInputObj.prototype.hasNESelected = function (neType) {
        if (this.isWholeNESelected(neType)) //全选网元
            return true;

        if (this.selectedNodes.length == 0)
            return false;

        return this.getSelectedNEs(neType).length > 0;
    };

    NEInputObj.prototype.getIntIDSQL = function (neType, callback, errCallback) {
        if (!this.hasNESelected(neType)) {
            callback('NONE');
            return;
        }

        if (this.isWholeNESelected(neType)) //全选网元
        {
            callback('ALL');
            return;
        }

        if (this.allNodesSelected) { //地市全选
            NESourceServiceHelper.GetAllIDSQL(neType, callback, errCallback);
        }
        else {
            NESourceServiceHelper.GetIntIDSQL(this.getSelectedNEs(neType), neType, callback, errCallback);
        }
    };

    NEInputObj.prototype.getHisIntIDSQL = function (neType, scan_start_time, callback, errCallback) {
        if (!this.hasNESelected(neType)) {
            callback('NONE');
            return;
        }

        if (this.isWholeNESelected(neType)) //全选网元
            return callback('ALL');

        if (this.allNodesSelected) { //地市全选
            NESourceServiceHelper.GetHisAllIDSQL(neType, scan_start_time, callback, errCallback);
        }
        else {
            NESourceServiceHelper.GetHisIntIDSQL(this.getSelectedNEs(neType), neType, scan_start_time, callback, errCallback);
        }
    };

    NEInputObj.prototype.getNEInputObjData = function (neType) {
        return {
            SelectedNEs: this.getSelectedNEs(neType),
            WholeNESelected: this.isWholeNESelected(neType),
            HasNESelected: this.hasNESelected(neType),
            NEType: neType
        }
    };

    NEInputObj.prototype.getNEInputObjDataNoNeType = function (neType) {
        return {
            SelectedNEs: this.getSelectedNEs(neType),
            WholeNESelected: this.isWholeNESelected(neType),
            HasNESelected: this.hasNESelected(neType),
            NEType: this.getNESelectedType(),
        }
    };

    return NEInputObj;

})();

//simple singleton
var NESourceServiceHelper = {
    getResourceObjs: function (neType, callback, errCallback) {
        var serviceURL = '/BusiCore/GetResourceObjects?plugin=BusiCorePlugin';
        var params = { neType: neType };
        JsonAjaxMethod(serviceURL, params,
            callback,
            errCallback);
    },

    getRelatedResourceObjects: function (neType, neID, relatedType, callback, errCallback) {
        var serviceURL = '/BusiCore/GetRelatedResourceObjects?plugin=BusiCorePlugin';
        var params = { neType: neType, neID: neID, relatedType: relatedType };
        JsonAjaxMethod(serviceURL, params,
            callback,
            errCallback);
    },

    GetResourceObjectsBySqlClause: function (neType, sqlClause, topN, callback, errCallback) {
        var serviceURL = '/BusiCore/GetResourceObjectsBySqlClause?plugin=BusiCorePlugin';
        var params = { neType: neType, sqlClause: sqlClause, topN: topN };
        JsonAjaxMethod(serviceURL, params,
            callback,
            errCallback);
    },

    GetIntIDSQL: function (neList, relatedType, callback, errCallback) {
        if (neList.length == 0) {
            callback('');
            return;
        }

        var serviceURL = '/BusiCore/GetIntIDSQL?plugin=BusiCorePlugin';
        var params = { neList: neList, relatedType: relatedType };
        JsonAjaxMethod(serviceURL, params,
            callback,
            errCallback);
    },

    GetAllIDSQL: function (neType, callback, errCallback) {
        var serviceURL = '/BusiCore/GetAllIDSQL?plugin=BusiCorePlugin';
        var params = { neType: neType };
        JsonAjaxMethod(serviceURL, params,
            callback,
            errCallback);
    },

    GetHisIntIDSQL: function (neList, relatedType, scan_start_time, callback, errCallback) {
        if (neList.length == 0) {
            callback('');
            return;
        }

        var serviceURL = '/BusiCore/GetHisIntIDSQL?plugin=BusiCorePlugin';
        var params = { neList: neList, relatedType: relatedType, dateTime: scan_start_time };
        JsonAjaxMethod(serviceURL, params,
            callback,
            errCallback);
    },

    GetHisAllIDSQL: function (neType, scan_start_time, callback, errCallback) {
        var serviceURL = '/BusiCore/GetHisAllIDSQL?plugin=BusiCorePlugin';
        var params = { neType: neType, dateTime: scan_start_time };
        JsonAjaxMethod(serviceURL, params,
            callback,
            errCallback);
    },

    TestNEInputObjData: function (neInputObjData, callback, errCallback) {
        var serviceURL = '/BusiCore/TestNEInputObjData?plugin=BusiCorePlugin';
        var params = { neInputObjData: neInputObjData };
        JsonAjaxMethod(serviceURL, params,
            callback,
            errCallback);
    }
};
