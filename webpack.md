# webpack

> webpack可以看过是模块打包机：分析项目结构，找到js模块以及它的一些浏览器不能直接运行的拓展语言（scss，ts等），将其打包为合适的格式以供浏览器使用。  
> `为什么使用`：网页是功能丰富的应用，拥有复杂的js代码和一大堆依赖包，为了简化开发的复杂度，前端社区涌现很多好的时间方法（模块化、ts、scss等），能够提高我们的开发效率，但是浏览器无法识别，手动处理又太繁琐，所以出现了webpack类的工具。

## webpack和gulp
> gulp是一种能够优化前端的开发流程的工具，webpack是一种模块化的解决方案，webpack可以替代gulp。  
> - `gulp的工作方式`：在一个配置文件中，指定某些文件进行编译，组合，压缩等任务。
> - `webpack的工作方式`：把项目当成一个整体，通过指定一个给定的主文件，找到项目的所有依赖，使用loaders处理他们，最后打包为一个浏览器可识别的js文件。

## webpack的优点-模块化

## 组织css的方法
- css
  - css：`css-loader`(@import和url实现require的功能)和`style-loader`(将所有计算后的样式加入页面中)
  - css modules，通过css模块化，把样式只作用于当前模块，避免不同模块相同类名的问题。
  - 预编译：`scss-loader`等，`postcss-loader`自动添加不同浏览器的css前缀

## plugins
基于事件流框架tapable，作用参考DOM事件模型。pulgin系统提供开发者监听webpack声明周期，并在特定事件触发时执行指定操作的能力。
```javascript
//1.一个javacript命名函数
const pluginName = 'checkCompilerHooksPlugin';
module.exports = class checkCompilerHooksPlugin {
    // 2.原型上要有apply方法
    apply(compiler) {
        // 3.指定一个绑定到wbpack自身的事件钩子
        // 4.注册一个回调函数来处理webpack实例中的指定数据
        compiler.hooks.run.tap(pluginName, compilation => {
            // 5.处理完成后，调用webpack提供的回调
            console.log('webpack构建开始')
        })
    }
}
```
- compiler：包含了webpack环境的所有配置信息，包括options，loaders，plugins等信息，这个对象在webpack启动时候被初始化，全局唯一的，可以简单理解为webpack实例
- compilation：包括了当前的模块资源、编译生成资源、变化的文件等。当webpack以开发模式运行时，每当检测到一个文件变化，一次新的compilation将被创建。compilation对象也提供很多事件回调供插件做扩展。通过compilation也能读到compiler对象。


