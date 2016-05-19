import  './Home.scss';
import React,{Component} from 'react';

export default class Home extends Component {
  render(){
    return (
        <div className="page">
          <section className="content">
            <header className="title">
              <h1>这是一个导航插件</h1>
            </header>
            <article>
              <p>
              封装了一些效果，比如模糊、颜色渐变等。
              </p>
              <p>
              没有使用媒体查询做响应式，而是使用了实例化初次渲染阶段判断换行来做。利用react的生命周期方法，在初次渲染完成瞬间取到导航各个项的宽度和间距，得到平铺导航所需的最小宽度并储存起来。发现如果窗口宽小于所需，迅速调整为折叠模式，触发重新渲染。
              可保证任意宽度下无换行出现。
              </p>
              <p>
              依赖 react-router，导航链接也是基于 react-router 实现的。换句话说，这是个专为 react-router 设计的导航。
              </p>
              <p>
              样式可定制，接受两个参数，第一个参数是导航项数组；第二个参数是样式配置对象。
              </p>
              <p>
              虽然是个玩具性质的组件，但在做前端路由的单页面应用时，可以帮你快速做好基础的搭建。
              </p>
            </article>
          </section>
        </div>
      )
  }
}