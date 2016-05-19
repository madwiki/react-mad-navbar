import './App.scss';

import React, {Component, PropTypes, cloneElement, createClass} from 'react';
import {windowResize,windowInitialSize} from '../actions';
import {connect} from 'react-redux';

import MadNav from '../../src/index';
import snow_sm from '../images/snow_sm.jpg'
import snow from '../images/snow.jpg'

class App extends Component {
  componentWillMount(){
  }
  componentDidMount() {
    this.getInitialSize();
    this.handleResize();
    window.addEventListener('resize',()=>{this.handleResize()})  
  }
  componentWillUnmount() {
      window.removeEventListener('resize',this.handleResize)  
  }
  render() {
    const {dispatch, text, children, vh, vw, svh} = this.props

    //通过路由往子组件传props
    const View = createClass({
      render(){
        if (children) {
          return cloneElement(children,{passdata: 'data'});
        }else{
          return null;
        }  
      }
    })
    
    
    //导航配置
    const navItems = [
      //side决定该项是从左到右还是从右到左排列,含href为a标签,含to为Link组件，用以内部路由
      {text: 'Home', to: '/home', side: 'left'},
      {text: 'GitHub', href: 'https://github.com/madwiki/react-mad-navbar', side: 'left'},
      {text: 'About', to: '/about', side: 'right'},
      {text: 'Tools', to: '/tools', side: 'right'},
      {text: 'Gallery', to: '/gallery', side: 'right'}
    ]
    const navConf = {
      //nav背景色
      barColor: '#C5E1A5',
      //字体颜色
      fontColor: '#004D40',
      //小封面（用在折叠状态时的小图，可选）
      smallCoverImage: snow_sm,
      //封面
      coverImage: snow,
      //封面高度
      coverHeight: 0.5*parseInt(svh),
      //导航条阴影
      shadow: false,
      //导航条边框
      border: '3px #9CCC65 solid',
      //导航条高度
      navHeight: '60px',
      //导航折叠时按钮尺寸
      toggleSize: 40
    }
    return (
      <div className="hole-page" style={{width:vw,height:vh}}>
        <MadNav navItems={navItems} navConf={navConf}/>
        <View/>
      </div>
    )
  }
  getInitialSize(){
    let initialSize = {
      width: (window.innerWidth || document.documentElement.clientWidth || document.offsetHeight),
      height: (window.innerHeight || document.documentElement.clientHeight || document.offsetHeight)
    }
    this.props.dispatch(windowInitialSize(initialSize));
  }
  //监听视口变化,弥补部分浏览器不支持vw,vh的问题
  handleResize(){
    let size = {
      width: (window.innerWidth || document.documentElement.clientWidth || document.offsetHeight),
      height: (window.innerHeight || document.documentElement.clientHeight || document.offsetHeight)
    };
    this.props.dispatch(windowResize(size));
  }
}

function states(state) {
  return {
    vw: state.windowResize.width,
    vh: state.windowResize.height,
    svh: state.windowInitialSize.height
  }
}

export default connect(states)(App);