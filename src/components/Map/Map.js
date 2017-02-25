import React,{Component} from 'react';
import styles from './Map.less';

class Map extends Component{
  constructor(props){
    super(props);
    this.state={
      map:null
    }
  }
  componentDidMount(){
    const {lng,lat,city,style,onChange}=this.props;
    // 百度地图API功能
    var map = new BMap.Map("allmap");    // 创建Map实例
    map.centerAndZoom(new BMap.Point(116.331398,39.897445), 13);  // 初始化地图,设置中心点坐标和地图级别
    if(lng&&lat){
      map.centerAndZoom(new BMap.Point(lng,lat), 13);
    }
    else if(city){
      map.centerAndZoom(city,11);         // 设置地图显示的城市 此项是必须设置的
    }
    else {
      var myCity = new BMap.LocalCity();
      myCity.get((result)=>{
        map.setCenter(result.name);
      })
    }
    map.addControl(new BMap.MapTypeControl());   //添加地图类型控件
    map.enableScrollWheelZoom(true);     //开启鼠标滚轮缩放
    this.setState({
      map:map
    })
  }
  componentWillReceiveProps(nextProps){
    var {address,onSelect}=nextProps;
    var map=this.state.map;
    var myGeo = new BMap.Geocoder();
    // 解析地址
    var options = {
      onSearchComplete: function(results){
        // 判断状态是否正确
        if (local.getStatus() == BMAP_STATUS_SUCCESS){
          map.clearOverlays();
          var res=results.getPoi(0);
          onSelect(res.point);
          var point = new BMap.Point(res.point.lng,res.point.lat);
          var marker = new BMap.Marker(point);
          marker.addEventListener("dragend",function(){
            //获取marker的位置
            var p = marker.getPosition();
            //保存经纬度
            onSelect(p)
          });
          map.addOverlay(marker);       // 将标注添加到地图中
          marker.enableDragging();
          map.centerAndZoom(point, 18);
        }
      }
    };
    var local = new BMap.LocalSearch(map, options);
    local.search(address);
  }
  render(){
    const {style}=this.props;
    return(
      <div>
        <div id="allmap" className={styles.allmap} style={style}></div>
      </div>
    )
  }
}
export default Map;
