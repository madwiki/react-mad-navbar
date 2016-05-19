import  './Tools.scss';
import React,{Component} from 'react';

export default class Tools extends Component {
  render(){
    // const {dispatch, svh} = this.props
    return (
        <div className="page">
          <section className="content">
            <header className="title">
              <h1>工具，我想来也就只有安利一下example里面用到的了</h1>
            </header>
            <article>
              <p>首先是 <a href="http://redux.js.org/">redux</a>，这东西是一个专门管理状态的库，用以维护一个贯穿整个前端应用的状态树。每次状态改变的过程都是透明的，状态改变来源清晰，单向可控的。</p>
              <p>其次是 <a href="http://redux.js.org/docs/basics/UsageWithReact.html">react-redux</a>，这东西提供了 react 与 redux 交互的方式，通过 store.subscribe() 在redux机制中注册一个回调，在状态树发生改变后调用，触发前端重新渲染，即用 connect 函数构造包装组件，用传递 props 的方式给被包装组件传递状态。这样开发的好处是缓解了 react 组件自上往下层层传递状态的复杂繁琐，任意层次的组件都可以按需和状态树交互。</p>
              <p>最后是 <a href="https://github.com/reactjs/react-router">react-router</a>，这东西是路由组件，不用过多解释，就是用卸载组件和实例化组件的方式来模拟路由跳转。说实话，react啥啥都是组件的方式确实是降低了业务复杂度。</p>
            </article>
          </section>
        </div>
      )
  }
}