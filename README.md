## Dev

#### Installation

```javascript
npm install --save react-mad-navbar
```

#### Run Example

```javascript
npm start
```

#### Build Example

```javascript
npm run dist:example
```

#### Build The  Component

```javascript
npm run dist
```

You can finde the minified js file in dist folder.



## Usage

First,import

```javascript
import MadNav from 'react-mad-navbar'
```



Two props are needed.

```html
<MadNav navItems={navItems} navConf={navConf}/>
```



`navItems` is an array of navigation items. For example:

```javascript
    const navItems = [
      //'side' decides the direction of display,
      //the items which with the key 'href' will be rendered as normal <a> tag
      //the items which with the key 'to' will be rendered as <Link> component
      {text: 'Home', to: '/home', side: 'left'},
      {text: 'GitHub', href: 'https://github.com/madwiki/react-mad-navbar', side: 'left'},
      {text: 'About', to: '/about', side: 'right'},
      {text: 'Tools', to: '/tools', side: 'right'},
      {text: 'Gallery', to: '/gallery', side: 'right'}
    ]
```



`navConf` is an object with some style configurations.For example:

```javascript
    const navConf = {
      //navbar background color
      barColor: '#C5E1A5',
      //font color
      fontColor: '#004D40',
      //small cover（used when collapsed,optional）
      smallCoverImage: snow_sm,
      //cover
      coverImage: snow,
      //cover height
      coverHeight: 0.5*parseInt(svh),
      //css style string or false
      shadow: false,
      //same as above
      border: '3px #9CCC65 solid',
      //navbar height
      navHeight: '60px',
      //toggle size(when collapsed)
      toggleSize: 40
    }
```



## Feature

It calculates the required width of the navigation instead of using media query to decide whether it would be collapsed.

![](http://g.recordit.co/DEyzTwKZK0.gif)



## Example

see [example](http://madwiki.github.io/react-mad-navbar)

