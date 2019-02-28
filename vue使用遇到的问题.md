### 覆盖组件库的样式
> 由于scoped讲html加上了[data-v]的属性，要修改时需加“>>>"深度选择器，则不会给那个节点加上data-v了
> 
```scss

>>>.style{color:blue}

```

### 组件注销时需要清除的方法绑定无用的this变量

> 在组件注销时，需要把组件内的定时器清除，麻烦的操作将timer绑定在组件的时例上，beforeDestroy再清除掉
> 解决方案：使用事件监听器进行去除

```javascript

const timer=setInterval(fn,time)
this.$once('hook:beforeDestroy',()=>{
    clearInterval(timer)
})

```