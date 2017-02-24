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
    const {lon,lat,city,style}=this.props;
    // 百度地图API功能
    var map = new BMap.Map("allmap");    // 创建Map实例
    map.centerAndZoom(new BMap.Point(lon,lat), 11);  // 初始化地图,设置中心点坐标和地图级别
    map.addControl(new BMap.MapTypeControl());   //添加地图类型控件
    map.centerAndZoom(city,11);         // 设置地图显示的城市 此项是必须设置的
    map.enableScrollWheelZoom(true);     //开启鼠标滚轮缩放
    this.setState({
      map:map
    })
  }
  componentWillReceiveProps(nextProps){
    this.state.map.centerAndZoom(nextProps.city,13);
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
