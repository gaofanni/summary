# koa2
> 新的web框架，致力于成为web应用和api开发领域的一个更小、更富有表现力、更健壮的基石。  
> 亮点：**async函数**，丢弃回调函数，有力的增强错误处理。并且**没有捆绑任何中间件**，而是提供了一套优雅的方法，快速有效的编写服务端应用程序。

## middleware
 - 每收到一个http请求，koa都会通过app.use()注册的async函数，并传入ctx和next参数
 - 顺序很重要，调用app.use()的顺序决定了middleware的顺序
 - 对于await next(),如果一个middleware没有调用，则后续的middleware不再执行

```javascript
app.use(async (ctx,next)=>{
    if(await cehckUserPermission(ctx)){
        await next()
    }else{
        // 不会执行后续的middleware了
        ctx.response.status=403
    }
})
```
### 原理
```javascript
    // 执行app.use时
    use(fn){
        this.middleware.push(fn);
        // 为了链式调用
        return this
    }

    // koa处理middleware数组
    const fnMiddleware=compose(this.middleware)
    return fnMiddleware(ctx).then(handleResponse).catch(onerror)
    
    // compose处理了middleware数组，得到函数fnMiddleware
    // fnMiddleware是一个promise

    //compose精简版
    function compose(middleware){
        return function(context,next){
            return dispatch(0)
            function dispatch(i){
                let fn=middleware[i]
                if(!fn)return Promise.resolve()
                return fn(context,function next(){
                    return dispatch(i+1)
                })
            }
        }
    }
```

### bodyparser实现
> 将请求的查询字符串转换成对象，挂在`ctx.request.body`上
```javascript
module.exports=function bodyParser(){
    return async (ctx,next)=>{
        // await一系列处理，再执行next
        await new Promise(resolve=>{
            let dataArr=[]
            ctx.req.on('data',data=>dataArr.push(data));
            ctx.req.on('end',()=>{
                let contentType=ctx.get('Content-type');
                let data=Buffer.concat(dataArr).toString()
                if(contentType=='application/x-www-form-urlencoded'){
                    ctx.request.body=querystring.parse(data)
                }else if(contentType=='application/json'){
                    ctx.request.body=JSON.parse(data)
                }
                resolve()
            })
        })
        await next()
    }
}
```

## 与express的对比
> - express主要基于connect中间件框架，功能丰富，随取随用，**框架自身封装了大量便利的功能**，比如路由，视图处理等待。
> - koa主要基于中间件框架，自身没有集成太多功能，大部分功能需要用户自身require中间件去解决
> - 基于es6 generator特性的中间件机制，**解决了长期诟病的callback hell和麻烦的错误处理**的问题。
> - express更为成熟，资料丰富