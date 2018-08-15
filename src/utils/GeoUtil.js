//辛普森三角
function TRIANGLE_AREA(p, p1, p2) {
  return (p.x - p1.x) * (p2.y - p1.y) - (p.y - p1.y) * (p2.x - p1.x)
}

function TestPoint(x, y, x1, y1, x2, y2) {
  var d = (y2 - y1) * (x1 - x) + (y - y1) * (x2 - x1);
  if (y2 > y1)
    return y >= y1 && y < y2 && d >= 0.0;
  else
    return y >= y2 && y < y1 && d < 0.0;
}

//判断点是否在面内
function PointInPolygon(pt, x, y) {
  var iCount = pt.length;

  var k = 0;
  for (var i = 0; i < iCount; i++) {
    if (i == iCount - 1) {
      if (TestPoint(x, y, pt[0].x, pt[0].y, pt[i].x, pt[i].y))
        k++;
    } else {
      if (TestPoint(x, y, pt[i].x, pt[i].y, pt[i + 1].x, pt[i + 1].y))
        k++;
    }
  }
  return k != 0 && (k & 0x1) != 0;
}

//判断线是否相交
function IsLineCrossLine(p11, p12, p21, p22) {
  var area1, area2;
  var minx, miny, maxx, maxy;
  var minx1, miny1, maxx1, maxy1;

  if (p11.x > p12.x) {
    minx = p12.x;
    maxx = p11.x;
  } else {
    minx = p11.x;
    maxx = p12.x;
  }
  if (p11.y > p12.y) {
    miny = p12.y;
    maxy = p11.y;
  } else {
    miny = p11.y;
    maxy = p12.y;
  }

  if (p21.x > p22.x) {
    minx1 = p22.x;
    maxx1 = p21.x;
  } else {
    minx1 = p21.x;
    maxx1 = p22.x;
  }
  if (p21.y > p22.y) {
    miny1 = p22.y;
    maxy1 = p21.y;
  } else {
    miny1 = p21.y;
    maxy1 = p22.y;
  }

  if (maxx1 <= minx || minx1 >= maxx || maxy1 <= miny || miny1 >= maxy)
    return false;

  //计算线段1起点与线段2围成的泰森三角形面积
  area1 = TRIANGLE_AREA(p11, p21, p22);
  //计算线段1止点与线段2围成的泰森三角形面积
  area2 = TRIANGLE_AREA(p12, p21, p22);
  //若线段相接或包含，判为不相交
  if (area1 == 0 || area2 == 0)
    return false;
  //若两面积同导,则为同侧,同侧必不相交
  if (area1 > 0 && area2 > 0 || area1 < 0 && area2 < 0)
    return false;

  //计算线段2起点与线段1围成的泰森三角形面积
  area1 = TRIANGLE_AREA(p21, p11, p12);
  //计算线段2止点与线段1围成的泰森三角形面积
  area2 = TRIANGLE_AREA(p22, p11, p12);
  //若线段相接或包含，判为不相交
  if (area1 == 0 || area2 == 0)
    return false;
  //若两面积同导,则为同侧,同侧必不相交
  if (area1 > 0 && area2 > 0 || area1 < 0 && area2 < 0)
    return false;
  return true;
}

//判断线面是否相交
function IsPolyLineCrossPolygon(polyline, polygon) {
  var iPolylineCount = polyline.length;
  var iPolygonCount = polygon.length;

  var p1, p2, p3, p4;

  for (var i = 0; i < iPolylineCount; i++) {
    if (i == (iPolylineCount - 1))
      break;

    p1 = polyline[i];
    p2 = polyline[i + 1];

    for (var j = 0; j < iPolygonCount; j++) {
      p3 = polygon[j];
      if (j == iPolygonCount - 1)
        p4 = polygon[0];
      else
        p4 = polygon[j + 1];
      if (IsLineCrossLine(p1, p2, p3, p4))
        return true;
    }
  }
  return false;
}

//判断面是否相交
function IsPolygonCrossPolygon(polygon1, polygon2) {
  var iCount1 = polygon1.length;
  var iCount2 = polygon2.length;

  var p1, p2, p3, p4;
  for (var i = 0; i < iCount1; i++) {
    p1 = polygon1[i];
    if (i == (iCount1 - 1)) {
      p2 = polygon1[0];
    } else {
      p2 = polygon1[i + 1];

    }
    for (var j = 0; j < iCount2; j++) {
      p3 = polygon2[j];
      if (j == (iCount2 - 1)) {

        p4 = polygon2[0];
      } else {
        p4 = polygon2[j + 1];

      }
      if (IsLineCrossLine(p1, p2, p3, p4))
        return true;
    }
  }
  if (IsPolygonInPolygon(polygon1, polygon2) || IsPolygonInPolygon(polygon2, polygon1))
    return true;
  return false;
}

//判断面是否包含面
function IsPolygonInPolygon(polygon1, polygon2) {
  var iCount1 = polygon1.length;
  var iCount2 = polygon2.length;

  var p1 = polygon1[0];
  var p2 = polygon1[iCount1 - 1];
  return IsPolylineInPolygon(polygon1, polygon2) && IsLineInPolygon(p1, p2, polygon2);
}

//判断面是否包含线
function IsPolylineInPolygon(pPolyline1, pPolygon2) {
  var iCount1 = pPolyline1.length;
  var iCount2 = pPolygon2.length;

  var p1, p2;
  for (var i = 0; i < iCount1 - 1; i++) {
    p1 = pPolyline1[i];
    p2 = pPolyline1[i + 1];
    if (!IsLineInPolygon(p1, p2, pPolygon2))
      return false;
  }
  return true;
}


function IsLineInPolygon(pt1, pt2, pPolygon1) {
  if (!PointInPolygon(pPolygon1, pt1.x, pt1.y) || !PointInPolygon(pPolygon1, pt2.x, pt2.y))
    return false;
  var p3, p4;
  var iCount1 = pPolygon1.length;
  for (var i = 0; i < iCount1; i++) {
    p3 = pPolygon1[i];
    if (i == iCount1 - 1)
      p4 = pPolygon1[0];
    else
      p4 = pPolygon1[i + 1];
    if (IsLineCrossLine(pt1, pt2, p3, p4))
      return false;
  }
  return true;
}

//判断多边形pts 是否与矩形框相交(x1,y1,x2,y2)
function polyCrossRect(pts, closed, x1, y1, x2, y2) {
  var polygon = new Array();
  polygon.push({ x: x1, y: y1 });
  polygon.push({ x: x1, y: y2 });
  polygon.push({ x: x2, y: y2 });
  polygon.push({ x: x2, y: y1 });
  closed = true;
  if (closed)
    return IsPolygonCrossPolygon(pts, polygon);
  else
    return IsPolyLineCrossPolygon(pts, polygon);
}

//计算p1点到p2p3线段的距离及最近点坐标,返回结果为结构	{x,y,dist}
function sq_linear_dist(p1, p2, p3) {
  //IsZero 在Util.js中定义
  var res = { x: 0, y: 0, dist: 99999999999 };
  if (IsZero(p2.x - p3.x) && IsZero(p2.y - p3.y)) //p2,p3重合
  {
    res.x = p2.x;
    res.y = p2.y;
    res.dist = Math.sqrt((p1.x - p2.x) * (p1.x - p2.x) + (p1.y - p2.y) * (p1.y - p2.y));
    return res;
  } else {
    if (IsZero(p1.x - p2.x) && IsZero(p1.y - p2.y)) //p1与p2任意点重合
    {
      res.x = p2.x;
      res.y = p2.y;
      res.dist = 0;
      return res;
    } else if (IsZero(p1.x - p3.x) && IsZero(p1.y - p3.y)) //p1与p3任意点重合
    {
      res.x = p3.x;
      res.y = p3.y;
      res.dist = 0;
      return res;
    }
  }

  var d = 0.0;
  var f = (p1.x - p2.x) * (p3.x - p2.x) + (p1.y - p2.y) * (p3.y - p2.y);
  if (f < 0) {
    d = Math.sqrt((p1.x - p2.x) * (p1.x - p2.x) + (p1.y - p2.y) * (p1.y - p2.y));

    res.x = p2.x;
    res.y = p2.y;
    res.dist = d;
    return res;
  } else {
    f = (p1.x - p3.x) * (p2.x - p3.x) + (p1.y - p3.y) * (p2.y - p3.y);
    if (f < 0) {
      d = Math.sqrt((p1.x - p3.x) * (p1.x - p3.x) + (p1.y - p3.y) * (p1.y - p3.y));
      res.x = p2.x;
      res.y = p2.y;
      res.dist = d;
      return res;
    } else {
      var d3 = (p1.y - p2.y) * (p3.x - p2.x) - (p1.x - p2.x) * (p3.y - p2.y);
      d = d3 * d3 / ((p3.x - p2.x) * (p3.x - p2.x) + (p3.y - p2.y) * (p3.y - p2.y));

      var k = (p3.y - p2.y) / (p3.x - p2.x);
      var k2 = k * k;
      res.x = (k2 * p2.x + k * (p1.y - p2.y) + p1.x) / (k2 + 1);
      res.y = k * (res.x - p2.x) + p2.y;

      res.dist = d;
      return res;
    }
  }
  return res;
}

//返回角度返回文字排列方向：0平行，1垂直
function getTextDir(a) {
  var dir = 0;
  if (a >= 0 && a < 45)
    dir = 1;
  else if (a < 135)
    dir = 0;
  else if (a < 225)
    dir = 1;
  else if (a < 315)
    dir = 0;
  else if (a <= 360)
    dir = 1;
  return dir;
}

//根据斜率dy/dx计算角度,返回度
function getAngle(dx, dy) {
  var k;
  var angle = 0;
  if (dx != 0) {
    k = dy / dx;
    angle = (Math.atan(-k) * 57.295779513082321031868);
  } else {
    if (dy > 0)
      angle = -90;
    else if (dy == 0) {
      angle = 0;
    } else
      angle = 90;
  }

  if (dx < 0 && dy < 0)
    angle += 180;
  else if (dx < 0 && dy >= 0)
    angle += 180;
  else if (dx >= 0 && dy >= 0)
    angle += 360;

  angle += 90;

  if (angle >= 360)
    angle -= 360;


  return Math.floor(angle) % 360;
}

//根据线段角度a,文字方向dir,
function getTextAngle(a, dir, ba) {
  var angle = a;
  angle %= 360;
  //log.info("getTextAngle a=" + a + " angle=" + angle);
  //angle -= 90;

  if (dir == 1) {
    if ((angle >= 0 && angle < 90))
      angle = -angle;
    else if (angle >= 90 && angle < 270) {
      angle = 180 - angle;
    } else
      angle = 360 - angle;
  } else {
    if (angle > 0 && angle < 180)
      angle = 90 - angle;

  }


  //angle += 90;
  //angle -= 180;
  //angle -= 180;
  if (angle < 0)
    angle += 360;

  //log.info("getTextAngle return=" + angle);

  return Math.floor(angle);
}

function getLineLength(pts, bFlag) {
  if (bFlag == null)
    bFlag = false;

  var lenx = 0;
  var leny = 0;

  for (var i = 0; i < pts.length - 1; i++) {
    if (bFlag) {
      lenx += Math.abs(pts[i].x - pts[i + 1].x);
      leny += Math.abs(pts[i].y - pts[i + 1].y);
    } else {
      var dx = pts[i].x - pts[i + 1].x;
      var dy = pts[i].y - pts[i + 1].y;

      lenx += Math.sqrt(dx * dx + dy * dy);
    }
  }
  if (bFlag) {
    if (leny > lenx)
      lenx = leny;
  }
  return lenx;
}

// calculate Area
function calcArea(pts, degflag) {
  var Count = pts.length
  if (Count > 2) {
    var mtotalArea = 0.0;
    if (degflag) //经纬度坐标下的球面多边形
    {
      var LowX = 0.0;
      var LowY = 0.0;
      var MiddleX = 0.0;
      var MiddleY = 0.0;
      var HighX = 0.0;
      var HighY = 0.0;

      var AM = 0.0;
      var BM = 0.0;
      var CM = 0.0;

      var AL = 0.0;
      var BL = 0.0;
      var CL = 0.0;

      var AH = 0.0;
      var BH = 0.0;
      var CH = 0.0;

      var CoefficientL = 0.0;
      var CoefficientH = 0.0;

      var ALtangent = 0.0;
      var BLtangent = 0.0;
      var CLtangent = 0.0;

      var AHtangent = 0.0;
      var BHtangent = 0.0;
      var CHtangent = 0.0;

      var ANormalLine = 0.0;
      var BNormalLine = 0.0;
      var CNormalLine = 0.0;

      var OrientationValue = 0.0;

      var AngleCos = 0.0;

      var Sum1 = 0.0;
      var Sum2 = 0.0;
      var Count2 = 0;
      var Count1 = 0;

      var Sum = 0.0;
      var Radius = 6378137.0;

      Sum1 = pts[0].x - pts[Count - 1].x;
      Sum2 = pts[0].y - pts[Count - 1].y;
      Sum1 *= Sum1;
      Sum2 *= Sum2;
      Sum1 = Math.sqrt(Sum1 + Sum2);
      if (Sum1 < 0.00000001) {
        Count--;
      }
      if (Count < 3)
        return 0;

      Sum1 = 0.0;
      Sum2 = 0.0;
      var d2r = 0.017453292519943295722;
      for (i = 0; i < Count; i++) {
        if (i == 0) {
          LowX = pts[Count - 1].x;
          LowY = pts[Count - 1].y;
          MiddleX = pts[0].x;
          MiddleY = pts[0].y;
          HighX = pts[1].x;
          HighY = pts[1].y;
        } else if (i == Count - 1) {
          LowX = pts[Count - 2].x;
          LowY = pts[Count - 2].y;
          MiddleX = pts[Count - 1].x;
          MiddleY = pts[Count - 1].y;
          HighX = pts[0].x;
          HighY = pts[0].y;
        } else {
          LowX = pts[i - 1].x;
          LowY = pts[i - 1].y;
          MiddleX = pts[i].x;
          MiddleY = pts[i].y;
          HighX = pts[i + 1].x;
          HighY = pts[i + 1].y;
        }
        LowX *= d2r;
        LowY *= d2r;
        MiddleX *= d2r;
        MiddleY *= d2r;
        HighX *= d2r;
        HighY *= d2r;

        AM = Math.cos(MiddleY) * Math.cos(MiddleX);
        BM = Math.cos(MiddleY) * Math.sin(MiddleX);
        CM = Math.sin(MiddleY);
        AL = Math.cos(LowY) * Math.cos(LowX);
        BL = Math.cos(LowY) * Math.sin(LowX);
        CL = Math.sin(LowY);
        AH = Math.cos(HighY) * Math.cos(HighX);
        BH = Math.cos(HighY) * Math.sin(HighX);
        CH = Math.sin(HighY);

        CoefficientL = (AM * AM + BM * BM + CM * CM) / (AM * AL + BM * BL + CM * CL);
        CoefficientH = (AM * AM + BM * BM + CM * CM) / (AM * AH + BM * BH + CM * CH);

        ALtangent = CoefficientL * AL - AM;
        BLtangent = CoefficientL * BL - BM;
        CLtangent = CoefficientL * CL - CM;
        AHtangent = CoefficientH * AH - AM;
        BHtangent = CoefficientH * BH - BM;
        CHtangent = CoefficientH * CH - CM;

        AngleCos = (AHtangent * ALtangent + BHtangent * BLtangent + CHtangent * CLtangent) / (Math.sqrt(AHtangent * AHtangent + BHtangent * BHtangent + CHtangent * CHtangent) * Math.sqrt(ALtangent * ALtangent + BLtangent * BLtangent + CLtangent * CLtangent));
        AngleCos = Math.acos(AngleCos);

        ANormalLine = BHtangent * CLtangent - CHtangent * BLtangent;
        BNormalLine = 0 - (AHtangent * CLtangent - CHtangent * ALtangent);
        CNormalLine = AHtangent * BLtangent - BHtangent * ALtangent;

        if (AM != 0)
          OrientationValue = ANormalLine / AM;
        else if (BM != 0)
          OrientationValue = BNormalLine / BM;
        else
          OrientationValue = CNormalLine / CM;

        if (OrientationValue > 0) {
          Sum1 += AngleCos;
          Count1++;
        } else {
          Sum2 += AngleCos;
          Count2++;
          //Sum +=2*Math.PI-AngleCos;
        }
      }

      if (Sum1 > Sum2) {
        //log.info(" area1 "  + Sum1 + " " + Sum2);
        Sum = Sum1 + (2 * Math.PI * Count2 - Sum2);
      } else {
        //log.info(" area2 "  + Sum1 + " " + Sum2);
        Sum = (2 * Math.PI * Count1 - Sum1) + Sum2;
      }

      //平方米
      mtotalArea = (Sum - (Count - 2) * Math.PI) * Radius * Radius;
      // mtotalArea /= 1000000.0;

    } else { //非经纬度坐标下的平面多边
      var i, j;
      var j;
      var p1x, p1y;
      var p2x, p2y;
      for (i = Count - 1, j = 0; j < Count; i = j, j++) {
        p1x = pts[i].x;
        p1y = pts[i].y;
        p2x = pts[j].x;
        p2y = pts[j].y;

        mtotalArea += p1x * p2y - p2x * p1y;
      }
      mtotalArea /= 2.0;
    }
    return mtotalArea; //.toFixed(6);
  }
  return 0.0;
}

//获取两线段交点
function getCrossPoint(a, b, c, d) {

  // 三角形abc 面积的2倍
  var area_abc = (a.x - c.x) * (b.y - c.y) - (a.y - c.y) * (b.x - c.x);

  // 三角形abd 面积的2倍
  var area_abd = (a.x - d.x) * (b.y - d.y) - (a.y - d.y) * (b.x - d.x);

  // 面积符号相同则两点在线段同侧,不相交 (对点在线段上的情况,本例当作不相交处理);
  if (area_abc * area_abd >= 0) {
    return false;
  }

  // 三角形cda 面积的2倍
  var area_cda = (c.x - a.x) * (d.y - a.y) - (c.y - a.y) * (d.x - a.x);
  // 三角形cdb 面积的2倍
  // 注意: 这里有一个小优化.不需要再用公式计算面积,而是通过已知的三个面积加减得出.
  var area_cdb = area_cda + area_abc - area_abd;
  if (area_cda * area_cdb >= 0) {
    return false;
  }

  //计算交点坐标
  var t = area_cda / (area_abd - area_abc);
  var dx = t * (b.x - a.x),
    dy = t * (b.y - a.y);
  return { x: a.x + dx, y: a.y + dy };

}

//点集排序
function ClockwiseSortPoints(points) {
  //重心
  var x = 0.0;
  var y = 0.0;
  for (var i = 0; i < points.length; i++) {
    x += points.x;
    y += points.y;
  }
  var centerPoint = new Object();
  centerPoint.x = 0.0;
  centerPoint.y = 0.0;
  centerPoint.x = x / points.length;
  centerPoint.y = y / points.length;
  //冒泡排序
  // for (var i = 0; i < points.length - 1; i++) {
  //     for (var j = 0; j < points.length - i - 1; j++) {
  //         if (PointCmp(points[j], points[j + 1], centerPoint)) {
  //             var tempPoint = points[j];
  //             points[j] = points[j + 1];
  //             points[j + 1] = tempPoint;
  //         }
  //     }
  // }
  for (var i = 0; i < points.length - 1; i++) {
    for (var j = 0; j < points.length; j++) {
      if (j < points.length - 1) {
        if (PointCmp(points[j], points[j + 1], centerPoint)) {
          var tempPoint = points[j];
          points[j] = points[j + 1];
          points[j + 1] = tempPoint;
        }
      } else {
        if (PointCmp(points[j], points[0], centerPoint)) {
          var tempPoint = points[j];
          points[j] = points[0];
          points[0] = tempPoint;
        }
      }
    }
  }
  return points;
}

//若点a大于点b,即点a在点b顺时针方向,返回true,否则返回false
function PointCmp(a, b, center) {
  if (a.x >= 0 && b.x < 0)
    return true;
  // if (a.x == 0 && b.x == 0)
  //     return a.y > b.y;
  //向量OA和向量OB的叉积
  var det = (a.x - center.x) * (b.y - center.y) - (b.x - center.x) * (a.y - center.y);
  if (det < 0)
    return true;
  if (det > 0)
    return false;
  //向量OA和向量OB共线，以距离判断大小
  var d1 = (a.x - center.x) * (a.x - center.x) + (a.y - center.y) * (a.y - center.y);
  var d2 = (b.x - center.x) * (b.x - center.y) + (b.y - center.y) * (b.y - center.y);
  return d1 > d2;
}


function clockwisePoints(points) {
  var k = 0;
  for (var i = 1; i < points.length; i++) {
    if (points[i].y < points[k].y || (points[i].y == points[k].y && points[i].x < points[k].x)) {
      k = i;
    }
  }
  var temp = points[0];
  points[0] = points[k];
  points[k] = temp;
  for (var i = 1; i < points.length - 1; i++) {
    k = i;
    for (var j = i + 1; j < points.length; j++) {
      if (multiply(points[j], points[k], points[0]) > 0 || (multiply(points[j], points[k], points[0]) == 0 && (dist(points[0], points[j]) < dist(points[0], points[k])))) {
        k = j;

      }
    }
    var tempPoint = points[i];
    points[i] = points[k];
    points[k] = tempPoint;
  }
  return points;
}

function multiply(begPnt, endPnt, nextPnt) {

  return ((nextPnt.x-begPnt.x)*(endPnt.y-begPnt.y) - (endPnt.x-begPnt.x)*(nextPnt.y-begPnt.y));

}

function dist(a, b) {
  dx = a.x - b.x;
  dy = a.y - b.y;
  ds = Math.sqrt(dx * dx + dy * dy);
  return ds;
}

function PolygonClip(polygon1, polygon2) {
  var interPolygon = [];
  if (polygon1.length < 3 || polygon2.length < 3) {
    return false;
  }
  var x = 0.0;
  var y = 0.0;
  //计算多边形交点
  for (var i = 0; i < polygon1.length; i++) {
    var p1next = (i + 1) % polygon1.length;
    for (var j = 0; j < polygon2.length; j++) {
      var p2next = (j + 1) % polygon2.length;
      if (getCrossPoint(polygon1[i], polygon1[p1next], polygon2[j], polygon2[p2next])) {
        interPolygon.push(getCrossPoint(polygon1[i], polygon1[p1next], polygon2[j], polygon2[p2next]));
      }
    }
  }
  //计算多边形内部点
  for (var i = 0; i < polygon1.length; i++) {
    if (PointInPolygon(polygon2, polygon1[i].x, polygon1[i].y)) {
      interPolygon.push(polygon1[i]);
    }
  }

  for (var i = 0; i < polygon2.length; i++) {
    if (PointInPolygon(polygon1, polygon2[i].x, polygon2[i].y)) {
      interPolygon.push(polygon2[i]);
    }
  }
  if (interPolygon.length <= 0) {
    return false;
  }

  //点集排序
  // return ClockwiseSortPoints(unique(interPolygon));
  return clockwisePoints(unique(interPolygon)); //ClockwiseSortPoints(interPolygon);
}

//点数组去重
function unique(points) {
  var res = [];
  var json = {};
  for (var i = 0; i < points.length; i++) {
    if (!json[points[i].x+"|"+points[i].y]) {
      res.push(points[i]);
      json[points[i].x+"|"+points[i].y] = 1;
    }
  }
  return res;
}
