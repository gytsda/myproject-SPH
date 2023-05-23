# app

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

this.$options.name可以查看当前的组件名字

webpack对外默认暴露:图片、json数据

mockjs地址:http://mockjs.com


watch:监听器,监听某个数据的变化从而来执行一些操作
仅仅是数据发生改变的时候会侦听到
只是会检测到你写在watch里的那些属性,没写的就不会触发

updated:是vue生命周期里面的一个钩子函数—data数据更新后触发视图更新。这里是视图更新之后的操作可以在这里执行。
不能监听到路由数据(例如网址中的参数)
所有的数据发生变化都会调用(消耗性能)
执行到它的时候时候是数据发生变化且界面更新完毕
每次触发的代码都是同一个

