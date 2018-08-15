<template>
    <div class="map-wrap">
      <div class="left">

        <div id="bd"></div>
        <div class="search">
          <div class="input">
            <mapInput label="城市" v-model="city"></mapInput>
            <button @click="getCity">查看范围</button>
          </div>
          <div class="input">
            <mapInput label="场景" v-model="searchFor"></mapInput>
            <button @click="getPoi">索引</button>
          </div>
        </div>
      </div>

      <div class="right">
        <div class="item" v-for="item in searchArr"  @click="Drawing(item)">
          <span class="list">{{item.title}}</span>
          <span>{{item.centerLng}}&nbsp&nbsp&nbsp{{item.centerLat}}</span>
        </div>
        <div id="r-result">
        </div>
      </div>
    </div>
</template>

<script type="text/ecmascript-6">
  import axios from 'axios'
  let axiosJsonp=require('axios-jsonp')
  import mapInput from './components/MapInput/mapInput.vue';
  export default {
    name: "resmap",
    components:{
    mapInput
  },
    data(){
      return {
        num:0,
        city:"",
        searchFor:"",
        newMap: {},
        searchArr: [],
      }
    },
mounted(){
   this.getMap()
},

methods:{
      getMap(){
        // this.newMap=map;
        var map = new BMap.Map("bd");

        // 初始化地图,设置中心点坐标和地图级别
        map.centerAndZoom(new BMap.Point(116.4035,39.915), 8)
        // 添加地图类型控件
        map.addControl(new BMap.MapTypeControl());
        // 设置地图显示的城市 此项是必须设置的
        map.setCurrentCity("北京");
        // 开启鼠标滚轮缩放
        map.enableScrollWheelZoom(true);
        this.newMap=map
        console.log(this.newMap)
      },
    getCity(){
      //行政区获取及绘制
      var map = this.newMap
      var city = this.city
      let bdary =new BMap.Boundary();
      bdary.get(city,function (rs) {
        map.clearOverlays()
        var count=rs.boundaries.length
        if(count === 0){
          alert('查无此区');
          return;
        }

        var Points=[]
        for(var i =0;i<count;i++){
          var ply= new BMap.Polygon(rs.boundaries[i],{strokeWeight:2,strokeColor:"#ff0000"})
          map.addOverlay(ply)                                    //添加覆盖物
          Points = Points.concat(ply.getPath())  //getPach()获取大量点坐标，之后拼接加入Points中
          console.log(Points)
        }

        map.setViewport(Points)  //调整视野
      })
    },
  // 根据输入框内容索引POI点
      getPoi(){
        //根据输入内容索引并获取索引信息
        let p=this.searchArr=[]
        let that=this
        // var list = []
        // let num=0
        var options = {
          onSearchComplete: function(results){
            // 判断状态是否正确
            if (local.getStatus() == BMAP_STATUS_SUCCESS){
              // var s = []
              for (var i = 0; i < results.getCurrentNumPois(); i ++){

                let contentCro=results.getPoi(i)
                //根据uid请求Poi详细数据
                axios({
                  url:"http://map.baidu.com/?reqflag=pcmap&from=webmap&qt=ext&uid=" +results.getPoi(i).uid + "&ext_ver=new&l=18",
                  adapter:axiosJsonp
                }).then((res)=>{
                  contentCro.geo = res.data.content.geo
                  var geoStr=res.data.content.geo
                  if (geoStr){
                    var subgeoStr=geoStr.split("|1-")
                    var squareStr = subgeoStr[0].substring(2,subgeoStr[0].length)
                    var squarPoints = that.coordinateToPoints(squareStr);
                    // console.log(squarPoints)
                    var centerPointLng=(squarPoints[0].lng+squarPoints[1].lng)/2
                    var centerPointlat=(squarPoints[0].lat+squarPoints[1].lat)/2
                    // console.log(centerPointLng)
                    var centerPoint=new BMap.Point(centerPointLng,centerPointlat)
                    // console.log(centerPoint)
                    var centerLat=centerPoint.lat.toString()
                    var centerLng=centerPoint.lng.toString()
                    contentCro.centerLat=centerLat
                    contentCro.centerLng=centerLng
                  }else{
                    contentCro.centerLat=""
                    contentCro.centerLng=""
                  }
                })

                p.push(contentCro)
              }
              // console.log(that.searchArr)
              // that.searchArr.forEach(val=>{
              //   console.log(val.centerLat)
              // })
  }
          }
        }
        var local = new BMap.LocalSearch(this.newMap, options)
        local.search(this.searchFor)
        console.log(this.searchArr)
      },
  //百度米制单位转经纬度的方法
 coordinateToPoints(coordinate) {
    var points = [];

    if (coordinate) {
      var projection = BMAP_NORMAL_MAP.getProjection();

      if (coordinate && coordinate.indexOf(";") >= 0) {
        coordinate = coordinate.split(';');
      }

      for (var i = 0, len = coordinate.length; i < len; i++) {
        var pos = coordinate[i].split(',');
        var point = projection.pointToLngLat(new BMap.Pixel(pos[0], pos[1]));
        points.push(point);
      }
    }

    return points;
  },

  //点击POI点事件
  Drawing(item){
    var map = this.newMap
    var geoStr=item.geo
    map.clearOverlays();
    if (geoStr&&geoStr.indexOf(";")>=0){

      var subgeoStr=geoStr.split("|1-")
      if(subgeoStr[1]){
        var tempStr = subgeoStr[1].replace(/;/,"")
        var resultPoints = tempStr.split(',')
        var temPoints=''
        for(var i = 0;i<resultPoints.length-1;i++){
          temPoints+=resultPoints[i]+","+resultPoints[i+1]+';'
          i=i+1
        }
        temPoints=temPoints.substr(0,temPoints.length-1)
        var resulPoints = this.coordinateToPoints(temPoints);
        console.log(temPoints);
        console.log(resulPoints);
        var polygonResult = new BMap.Polygon(resulPoints,{strokeWeight:2,strokeColor:"#ff0000"})
        map.addOverlay(polygonResult)
        // console.log(resulPoints)
        map.setViewport(resulPoints)
      }
      var squareStr = subgeoStr[0].substring(2,subgeoStr[0].length)
      // console.log(squareStr);
      var squarPoints = this.coordinateToPoints(squareStr);
      // console.log(squarPoints)
      var centerPointLng=(squarPoints[0].lng+squarPoints[1].lng)/2
      var centerPointlat=(squarPoints[0].lat+squarPoints[1].lat)/2
      // console.log(centerPointLng)
      var centerPoint=new BMap.Point(centerPointLng,centerPointlat)
      console.log(centerPoint)
      this.searchArr.center=centerPoint
      var marker = new BMap.Marker(centerPoint);  // 创建标注
      map.addOverlay(marker);              // 将标注添加到地图中
      map.panTo(centerPoint);              //大概是移动地图吧
      //原本是绘制外包矩形。
      // var polygon = new BMap.Polygon([
      //   new BMap.Point(squarPoints[0].lng,squarPoints[0].lat),
      //   new BMap.Point(squarPoints[1].lng,squarPoints[0].lat),
      //   new BMap.Point(squarPoints[1].lng,squarPoints[1].lat),
      //   new BMap.Point(squarPoints[0].lng,squarPoints[1].lat)
      // ], {strokeColor:"blue", strokeWeight:6, strokeOpacity:0.5});
      // map.addOverlay(polygon);


      // var squareArr=squareStr.split(";")
      // console.log(squareArr);
      // var squareArr0=squareArr[0].split(",")
      // var squareArr1=squareArr[1].split(",")
      // console.log(squareArr0)
      // console.log(squareArr1)
      // let centerArr=[]
      // centerArr[0]=(Number(squareArr0[0])+Number(squareArr1[0]))/2
      // centerArr[1]=(Number(squareArr0[1])+Number(squareArr1[1]))/2
      // console.log(centerArr)
      // var centerStr=centerArr.join(',')
      // console.log(centerStr);

    } else{
      alert("该点没有范围")
    }
  }
}

    }

</script>
<style>
  html, body,#app{ margin:0; height:100%; }
  .map-wrap{
    width: 100%;
    height: 100%;
    position: relative;
  }
  .map-wrap .left{
    width: 100%;
    height: 100%;
    position: relative;
  }
  #bd{
    height: 100%;
    width: 100%;
  }
  /*.map-wrap .mainInput{*/
    /*!*width: 40%;*!*/
  /*}*/
  .map-wrap .search{
    position: absolute;
    top: 20px;
    left: 20px;
    z-index: 10;
  }
  .input {
    width: 100%;
    display: flex;
    background: #EDFFFD;
    justify-content: space-between;
  }
  .input label,.input label .map-input{
    background: #EDFFFD;
  }
  .input label .map-input{
    margin-right: 0;
  }
  .input button{
    height: 30px;
    background: #0a6999;
    color: #f0f0f0;
    width: 80px;
    border: none;
    border-radius: 2px;
    margin: 20px 20px 20px 0;
  }
  .right{
    position: absolute;
    right: 0;
    top: 80px;
    width: 40%;
    z-index: 10;
  }
  .left{
    width: 50%;
  }
  .map-wrap .list{
    margin: 2px 0;
    cursor: pointer;
  }
</style>
