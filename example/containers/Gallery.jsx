import  './Gallery.scss';
import challenge from '../images/challenge.jpg';
import sea from '../images/sea.jpg';
import React,{Component} from 'react';

export default class Gallery extends Component {
  render(){
    // const {dispatch, svh} = this.props
    return (
        <div className="page">
          <section className="content">
            <header className="title">
              <h1>这里放几幅图装装样子</h1>
            </header>
            <article>
              <img src={challenge} alt=""/>
              <p>这两张图，以及导航里面使用的封面图都是从<a href="https://unsplash.com/">unsplash</a>上面找的，没有版权限制的。</p>
              <img src={sea} alt=""/>
            </article>
          </section>
        </div>
      )
  }
}