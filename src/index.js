import './Navigation.scss'
import React, {Component, PropTypes} from 'react'
import {Link} from 'react-router'
import { MorphReplace } from 'react-svg-morph'
import ReactCSSTransitionGroup from 'react/lib/ReactCSSTransitionGroup'

let isWechat;
let ua = navigator.userAgent.toLowerCase();
isWechat = (/mqqbrowser/.test(ua)) ? true : false ;


//icons
class Menu extends Component {
  render(){
    return (
        <svg fill="#000000" height={this.props.size} viewBox="0 0 24 24" width={this.props.size} xmlns="http://www.w3.org/2000/svg">
            <path d="M0 0h24v24H0z" fill="none"/>
            <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/>
        </svg>
      )
  }
}

class Close extends Component {
  render(){
    return (
        <svg fill="#000000" height={this.props.size} viewBox="0 0 24 24" width={this.props.size} xmlns="http://www.w3.org/2000/svg">
            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
            <path d="M0 0h24v24H0z" fill="none"/>
        </svg>
      )
  }
}


export default class Navigation extends Component {
  constructor(props){
    super(props);
    let navConf = this.props.navConf;
    navConf.navHeight = parseInt(navConf.navHeight) + 'px';
    navConf.coverHeight = parseInt(navConf.coverHeight) + 'px';

    this.toggleHandleClick = this.toggleHandleClick.bind(this);
    this.handleLinkClick = this.handleLinkClick.bind(this);
    this.sizePattern = this.sizePattern.bind(this);
    this.slideCover = this.slideCover.bind(this);
    this.wrapperHandleMouseOver = navConf.coverImage ? this.wrapperHandleMouseOver.bind(this) : function () {};
    this.wrapperHandleMouseOut = navConf.coverImage ? this.wrapperHandleMouseOut.bind(this) : function () {};
    this.navInit = this.navInit.bind(this);




    this.state = {
      pattern: 'spread',
      navShow: false,
      navBackgroundColor: 'none',
      navBoxShadow: 'none',
      navBorder: 'none',
      coverWrapperHeight: (navConf.coverImage &&  navConf.coverHeight) ? (parseInt(navConf.coverHeight)+'px') : '0px',
      maskOpacity: 0,
      maskFilter: 'none'
    };
    this.spreadNeed = {
      widthNum: null,
      paddingNum: null
    }
  }
  componentWillReceiveProps(nextProps) {
    if(this.state.coverWrapperHeight == nextProps.navConf.coverHeight + 'px'){
      return false
    }else{
      this.setState({
        coverWrapperHeight: (nextProps.navConf.coverImage &&  nextProps.navConf.coverHeight) ? (parseInt(nextProps.navConf.coverHeight)+'px') : '0px',
      });
      return true
    }
  }
  componentDidMount() {
    this.sizePattern();
    window.addEventListener('resize',this.sizePattern);
    if (this.props.navConf.coverImage) {
      window.addEventListener('scroll',this.slideCover);
    }else{
      this.navInit();
    }
  }
  componentWillUnmount() {
    window.removeEventListener('resize',this.sizePattern);
    if (this.props.navConf.coverImage) {
      window.removeEventListener('scroll',this.slideCover);
    }
  }
  render (){
    const {fontColor,navHeight,coverHeight,barColor,coverImage,toggleSize} = this.props.navConf;
    const {navBackgroundColor,navBoxShadow,navBorder,maskOpacity,maskFilter,coverWrapperHeight} = this.state;
    const isMorph = isWechat ? ( <div>{this.state.navShow ? <Close key={true} size={toggleSize}/> : <Menu key={false} size={toggleSize} />}</div>) : (<MorphReplace width={toggleSize} height={toggleSize} >{this.state.navShow ? <Close key={true}/> : <Menu key={false}/>}</MorphReplace>);
    const menuBox = (!this.state.navShow && this.state.pattern == 'collapse') ? null : (
          <div key="menuBox" ref="menuBox" className={'menu-box ' + (this.state.pattern == 'spread' ? 'menu-box-spread' : 'menu-box-collapse')} style={this.state.pattern == 'spread' ? {'width': 'auto','height': 'auto','lineHeight': 'auto'} : {'width': this.state.vw,'height': this.state.vh,'lineHeight': this.state.vh}}>
            <ul ref="menu" className="menu" style={{lineHeight: navHeight}}>
              {this.props.navItems.map((item,index)=>{
                if (item.href) {
                  return (<li key={index} className={'link-wrapper' + (item.side ? (' link-wrapper-' + item.side) : '')}>
                          <a className="link" href={item.href} target="_blank" onClick={this.handleLinkClick} style={{color: fontColor}}>{item.text}</a>
                        </li>)
                }else{                
                  return (<li key={index} className={'link-wrapper' + (item.side ? (' link-wrapper-' + item.side) : '')}>
                          <Link className="link" to={item.to} onClick={this.handleLinkClick} style={{color: fontColor}}>{item.text}</Link>
                        </li>)
                }
              })}
            </ul>
          </div>
        );
    let boxWrapper;
    if (this.state.pattern == 'collapse'){
      //折叠状态下控制目录盒子是否展示
      boxWrapper = (
          <ReactCSSTransitionGroup transitionName="nav" transitionEnterTimeout={500} transitionLeaveTimeout={300}>
            {this.state.navShow ? menuBox : null}
          </ReactCSSTransitionGroup>
        )
    }else{
      boxWrapper = menuBox;
    }

    return (
        <div className="nav-wrapper" onMouseOver={this.wrapperHandleMouseOver} onMouseOut={this.wrapperHandleMouseOut}>
          <div className="cover-wrapper" style={{height: coverWrapperHeight}}>
            <div className="cover" ref="cover" style={{backgroundImage: 'url('+coverImage+')',filter: maskFilter,'WebkitFilter': maskFilter}}></div>
            <div className="mask" ref="mask" style={{backgroundColor: barColor,opacity: maskOpacity}}></div>
          </div>
          <nav className="navigation" ref="nav" style={{height: navHeight,lineHeight: navHeight,backgroundColor: navBackgroundColor,boxShadow: navBoxShadow,borderBottom: navBorder}}>
            <div className={"menu-btn " + (this.state.pattern == 'spread' ? "menu-btn-spread" : null)} onClick={this.toggleHandleClick}>
              {isMorph}
            </div>
            {boxWrapper}
          </nav>
        </div>
      )
  }

  wrapperHandleMouseOver(){
    this.setState({
      maskOpacity: 0.2
    });
  }
  wrapperHandleMouseOut(){
    this.slideCover();
  }

  //折叠状态下的开关展开
  toggleHandleClick(){
    this.setState({navShow: !this.state.navShow});
  }
  handleLinkClick(){
    this.setState({navShow: false});
  }
  //根据尺寸判断导航是否横向展开
  sizePattern(){
    let pattern = 'spread';
    let menu = this.refs.menu;
    if(!this.spreadNeed.widthNum) {
      let navItems = menu.children;
      let totalWidth = 0;
      for (let i = 0; i < navItems.length; i++) {
        totalWidth += (parseFloat(getStyle(navItems[i]).width) + parseFloat(getStyle(navItems[i])['margin-left']) + parseFloat(getStyle(navItems[i])['margin-right']))
      }
      this.spreadNeed.paddingNum = parseFloat(getStyle(menu)['padding-left']) + parseFloat(getStyle(menu)['padding-right']);
      this.spreadNeed.widthNum = totalWidth;
    }
    //set this to allow dynamic padding
    this.spreadNeed.paddingNum = this.state.pattern == 'collapse' ? this.spreadNeed.paddingNum : parseFloat(getStyle(menu)['padding-left']) + parseFloat(getStyle(menu)['padding-right']);
    const vw = (window.innerWidth || document.documentElement.clientWidth) + 'px';
    if (Math.ceil(this.spreadNeed.widthNum +  this.spreadNeed.paddingNum) > parseFloat(vw)) {
      pattern = 'collapse';
      const vh = (window.innerHeight || document.documentElement.clientHeight) + 'px';
      return this.setState({pattern,vw,vh});
    }
    return this.setState({pattern});
  }

  //导航划过封面时的动作
  slideCover(){
    const {barColor,navHeight,coverHeight,shadow,border} = this.props.navConf;    
    const scrollTop = document.body.scrollTop;
    const actualDistance = parseInt(coverHeight) - parseInt(navHeight);
    let ratio = scrollTop / actualDistance;

    if (scrollTop < actualDistance) {
      this.setState({
        navBackgroundColor: 'transparent',
        navBoxShadow: 'none',
        navBorder: 'none',
        maskOpacity: ratio,
        maskFilter: 'blur('+7*ratio+'px)'
      });
    }else{
      this.navInit();
    }
  }
  navInit(){
    const {barColor,navHeight,coverHeight,shadow,border} = this.props.navConf;
    this.setState({
      navBackgroundColor: barColor,
      maskOpacity: 1
    });
    if (shadow) {
      if (shadow === 'default') {
        this.setState({
          navBoxShadow: '0 1px 8px 0 rgba(0,0,0,.2),0 3px 4px 0 rgba(0,0,0,.14),0 3px 3px -2px rgba(0,0,0,.12)'
        });
      }else{
        this.setState({
          navBoxShadow: shadow
        });
      }
    }
    if (border) {
      this.setState({
        navBorder: border
      });
    }
  }
}


function getStyle(ele) {
  return window.getComputedStyle(ele,null)
}