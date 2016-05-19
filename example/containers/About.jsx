import  './About.scss';
import React,{Component} from 'react';
import example from '../images/example.png';


export default class About extends Component {
  render(){
    // const {dispatch, svh} = this.props
    return (
        <div className="page">
          <section className="content">
            <header className="title">
              <h1>关于</h1>
            </header>
            <article>
              <p>本来应该在这里写介绍的，然而已经在Home页面写上了……</p>
              <p>那就介绍下API吧,以本展示为例：</p>
              <a href={example} target="_blank"><img src={example} /></a>
              <p>不好意思我偷懒了……如果看不清你可以点开看大图。</p>
            </article>
          </section>
        </div>
      )
  }
}