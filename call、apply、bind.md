# call、apply、bind

- 都用来改变函数的this指向
- 第一个参数都是this
- 都可以利用后续参数传参
  - call：fn.call(this,1,2,3)
  - apply:fn.apply(this,[1,2,3])
  - bind:fn.bind(this)(1,2,3)

## call的实现
```javascript
Function.prototype.myCall=function(context=window,...rest){
    context.fn=this
    let result=context.fn(...rest)
    delete context.fn
    return result
}
```

## apply
```javascript
Function.prototype.myApply=function(context=window,params=[]){
    context.fn=this
    let result
    if(params.length){
        result=context.fn(...params)
    }else{
        result=context.fn()
    }
    delete context.fn
    return result
}
```

## bind
```javascript
Function.prototype.myBind=function(oThis){
    if(typeof this!=='function'){
        throw new TypeError('Function.prototype.bind-what is trying to be bound is not callable')
    }
    // 拿到参数
    let aArgs=Array.prototype.slice.call(arguments,1)
    let fToBind=this
    let fNOP=function(){}
    let fBound=function(){
        return fToBind.apply(
            this instanceof fNOP?this:oThis,
            // 拼接参数
            aArgs.concat(Array.prototype.slice.call(arguments))
        )
    }
    // 创建一个空对象，把控对象的原型指向调用的原型
    fNOP.prototype=this.prototype
    // 原型指向一个新的fNOP实例，完成了拷贝一个fNOP的prototype，也就是调用函数的prototype
    fBound.prototype=new fNOP()

    return fBound
}
```
参考：https://www.cnblogs.com/goloving/p/9380076.html