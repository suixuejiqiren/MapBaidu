const Mock = require('mockjs')

//模拟配置管理界面的接口(初始化界面时需要的数据)
Mock.mock($web.$conf.webServer + '/sysProperties/getSysPropertiesTreeData', 'get', (options) => {
  return {
    "status": 0,
    "message": "ok",
    "data": [{
      "children": [{
        "children": [{
          "children": [{
            "data": {
              "propProfile": "GIS地址",
              "propLabel": "dev",
              "propKey": "ComplaintGSM_GIS",
              "propValue": "123",
              "propType": "sys",
              "propApplication": "集中投诉",
              "propValueDefault": "http://10.151.71.13:8399/arcgis/rest/services/HljBusiMap_WYPT_NEW_170421/MapServer/34/query?geometry=$lng$,$lat$=esriGeometryPoint=json=int_id,cgi,chname",
              "propText": "集中投诉GSM_GIS地址",
              "propDescription": "修改集中投诉GSM_GIS地址",
              "propUserId": "-1"
            },
            "label": "集中投诉GSM_GIS地址"
          }, {
            "data": {
              "propProfile": "GIS地址",
              "propLabel": "dev",
              "propKey": "\tComplaintTD_GIS",
              "propValue": "http://10.151.71.13:8399/arcgis/rest/services/HljBusiMap_WYPT_NEW_170421/MapServer/34/query?geometry=$lng$,$lat$=esriGeometryPoint=json=int_id,cgi,chname",
              "propType": "sys",
              "propApplication": "集中投诉",
              "propValueDefault": "http://10.151.71.13:8399/arcgis/rest/services/HljBusiMap_WYPT_NEW_170421/MapServer/34/query?geometry=$lng$,$lat$=esriGeometryPoint=json=int_id,cgi,chname",
              "propText": "集中投诉TD_GIS地址",
              "propDescription": "修改集中投诉TD_GIS地址",
              "propUserId": "-1"
            },
            "label": "集中投诉TD_GIS地址"
          }],
          "label": "GIS地址"
        }, {
          "children": [{
            "data": {
              "propProfile": "GIS地址1",
              "propLabel": "dev",
              "propKey": "ComplaintGSM_GIS1",
              "propValue": "http://10.151.71.13:8399/arcgis/rest/services/HljBusiMap_WYPT_NEW_170421/MapServer/34/query?geometry=$lng$,$lat$=esriGeometryPoint=json=int_id,cgi,chname",
              "propType": "sys",
              "propApplication": "集中投诉",
              "propValueDefault": "http://10.151.71.13:8399/arcgis/rest/services/HljBusiMap_WYPT_NEW_170421/MapServer/34/query?geometry=$lng$,$lat$=esriGeometryPoint=json=int_id,cgi,chname",
              "propText": "集中投诉GSM_GIS地址",
              "propDescription": "修改集中投诉GSM_GIS地址",
              "propUserId": "-1"
            },
            "label": "集中投诉GSM_GIS地址"
          }],
          "label": "GIS地址1"
        }, {
          "children": [{
            "data": {
              "propProfile": "GIS地址2",
              "propLabel": "dev",
              "propKey": "ComplaintGSM_GIS2",
              "propValue": "http://10.151.71.13:8399/arcgis/rest/services/HljBusiMap_WYPT_NEW_170421/MapServer/34/query?geometry=$lng$,$lat$=esriGeometryPoint=json=int_id,cgi,chname",
              "propType": "sys",
              "propApplication": "集中投诉",
              "propValueDefault": "http://10.151.71.13:8399/arcgis/rest/services/HljBusiMap_WYPT_NEW_170421/MapServer/34/query?geometry=$lng$,$lat$=esriGeometryPoint=json=int_id,cgi,chname",
              "propText": "集中投诉GSM_GIS地址",
              "propDescription": "修改集中投诉GSM_GIS地址",
              "propUserId": "-1"
            },
            "label": "集中投诉GSM_GIS地址"
          }],
          "label": "GIS地址2"
        }],
        "label": "集中投诉"
      }, {
        "children": [{
          "children": [{
            "data": {
              "propProfile": "会审会时间",
              "propLabel": "dev",
              "propKey": "WF_HB_CentralizePlan_FillTriageTime",
              "propValue": "2055-11-11 00:00:00$2055-11-11 00:00:00;2055-11-11 00:00:00$2055-11-11 00:00:00",
              "propType": "sys",
              "propApplication": "集中规划",
              "propValueDefault": "2055-11-11 00:00:00$2055-11-11 00:00:00;2055-11-11 00:00:00$2055-11-11 00:00:00",
              "propText": "会审会时间",
              "propDescription": "会审会时间内不能提交填写会审环节数据",
              "propUserId": "-1"
            },
            "label": "会审会时间"
          }],
          "label": "会审会时间"
        }],
        "label": "集中规划"
      }, {
        "children": [{
          "children": [{
            "data": {
              "propProfile": "公共",
              "propLabel": "dev",
              "propKey": "\tHistoryDatabaseTitle",
              "propValue": "历史库（35天以前数据）",
              "propType": "sys",
              "propApplication": "网优3.0",
              "propValueDefault": "历史库（35天以前数据）",
              "propText": "\t历史库名字",
              "propDescription": "\t历史库名字",
              "propUserId": "-1"
            },
            "label": "\t历史库名字"
          },
            {
              "data": {
                "propProfile": "公共",
                "propLabel": "dev",
                "propKey": "\tHistoryDatabaseTitle",
                "propValue": "历史库（35天以前数据）",
                "propType": "sys",
                "propApplication": "网优3.0",
                "propValueDefault": "历史库（35天以前数据）",
                "propText": "\t历史库名字",
                "propDescription": "\t历史库名字",
                "propUserId": "-1"
              },
              "label": "\t现网库名字"
            }, {
              "data": {
                "propProfile": "公共",
                "propLabel": "dev",
                "propKey": "\tHistoryDatabaseTitle",
                "propValue": "历史库（35天以前数据）",
                "propType": "sys",
                "propApplication": "网优3.0",
                "propValueDefault": "历史库（35天以前数据）",
                "propText": "\t历史库名字",
                "propDescription": "\t历史库名字",
                "propUserId": "-1"
              },
              "label": "\t是否启用4A认证"
            },
            {
              "data": {
                "propProfile": "公共",
                "propLabel": "dev",
                "propKey": "\tHistoryDatabaseTitle",
                "propValue": "历史库（35天以前数据）",
                "propType": "sys",
                "propApplication": "网优3.0",
                "propValueDefault": "历史库（35天以前数据）",
                "propText": "\t历史库名字",
                "propDescription": "\t历史库名字",
                "propUserId": "-1"
              },
              "label": "\t是否支持4g制式"
            }],
          "label": "公共"
        }],
        "label": "网优3.0"
      }],
      "label": "系统级参数"
    }, {
      "children": [{
        "children": [{
          "children": [{
            "data": [{
              "propProfile": "公共",
              "propLabel": "dev",
              "propKey": "\tStartPagePortalState1",
              "propValue": "1112:66%,34%^TaskScheduleStatistics,NetworkGeneral,KeyIndicator,SubjectStastics:WorkTaskStatistics,ThreeNetworkFlow,KeyIndicatorWarn,SearchCellMiNi,HandleStatistics",
              "propType": "user",
              "propApplication": "网优3.0",
              "propValueDefault": "2:66%,34%^TaskScheduleStatistics,JiLinNetworkGeneral,JiLinKeyIndicator,JiLinsSubjectStastics:WorkTaskStatistics,ThreeNetworkFlow,KeyIndicatorWarn,SearchCellMiNi",
              "propText": "首页布局",
              "propDescription": "首页布局",
              "propUserId": "-1"
            }, {
              "propProfile": "公共",
              "propLabel": "dev",
              "propKey": "\tStartPagePortalState2",
              "propValue": "2222:66%,34%^TaskScheduleStatistics,NetworkGeneral,KeyIndicator,SubjectStastics:WorkTaskStatistics,ThreeNetworkFlow,KeyIndicatorWarn,SearchCellMiNi,HandleStatistics",
              "propType": "user",
              "propApplication": "网优3.0",
              "propValueDefault": "2:66%,34%^TaskScheduleStatistics,JiLinNetworkGeneral,JiLinKeyIndicator,JiLinsSubjectStastics:WorkTaskStatistics,ThreeNetworkFlow,KeyIndicatorWarn,SearchCellMiNi",
              "propText": "首页布局",
              "propDescription": "首页布局",
              "propUserId": "9d871a03-abe9-44e2-9372-cc9f3eabda70"
            }, {
              "propProfile": "公共",
              "propLabel": "dev",
              "propKey": "\tStartPagePortalState3",
              "propValue": "3332:66%,34%^TaskScheduleStatistics,NetworkGeneral,KeyIndicator,SubjectStastics:WorkTaskStatistics,ThreeNetworkFlow,KeyIndicatorWarn,SearchCellMiNi,HandleStatistics",
              "propType": "user",
              "propApplication": "网优3.0",
              "propValueDefault": "2:66%,34%^TaskScheduleStatistics,JiLinNetworkGeneral,JiLinKeyIndicator,JiLinsSubjectStastics:WorkTaskStatistics,ThreeNetworkFlow,KeyIndicatorWarn,SearchCellMiNi",
              "propText": "首页布局",
              "propDescription": "首页布局",
              "propUserId": "1395dfcf-a527-4a7e-8e2e-dbecb8f9bc9f"
            }],
            "label": "首页布局"
          }, {
            "data": [{
              "propProfile": "公共",
              "propLabel": "dev",
              "propKey": "StartPagePortalState1",
              "propValue": "2:66%,34%^TaskScheduleStatistics,NetworkGeneral,KeyIndicator,SubjectStastics:WorkTaskStatistics,ThreeNetworkFlow,KeyIndicatorWarn,SearchCellMiNi,HandleStatistics",
              "propType": "user",
              "propApplication": "网优3.0",
              "propValueDefault": "2:66%,34%^TaskScheduleStatistics,JiLinNetworkGeneral,JiLinKeyIndicator,JiLinsSubjectStastics:WorkTaskStatistics,ThreeNetworkFlow,KeyIndicatorWarn,SearchCellMiNi",
              "propText": "首页布局1",
              "propDescription": "首页布局",
              "propUserId": "-1"
            }],
            "label": "首页布局1"
          }],
          "label": "公共"
        }],
        "label": "网优3.0"
      }],
      "label": "用户级参数"
    }]
  }
})
