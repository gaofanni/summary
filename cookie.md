# cookie
> 为了让服务器知道n个请求是来自同一浏览器，每次新用户请求时，就加上一个独一无二的身份标识，下次访问时，会带上身份标识。  
> cookie是个很小的文本文件，浏览器储存在用户机器上的，是纯文本没有可执行代码。

## 类型
按照过期时间分为两类
- 会话cookie
  - 临时cookie，用户退出浏览器，会话cookie就会被删除
- 持久cookie
  - 存储在硬盘中，保留时间更长，关闭浏览器，重启电脑，仍然会存在，通常是持久性的cookie会维护某一个用户周期性访问浏览器的配置文件或登陆信息
  - 设置一个特定的过期时间`Expires`或者有效期`Max-Age`
    - `Set-Cookie:id=xxx;Expires=Wed,21 Oct 2019 07:28:00 GMT;`

## 属性
- 控制哪些站点可以看到那个cookie，只有domain的访问才会发送cookie，别的不会
  - `Set-Cookie:name="xx";domain="xxx.com"`
- path
  - `Set-cookie:id='1222';domain="xx.com"`xx.com设置了cookie
  - `Set-cookie:user='3444';domain="xx.com";path=/user/`xx.com/user/设置了cookie
  - xx.com/other/访问就会获得`id=1222`
  - xx.com/user/访问就会获得`id=1222;user=3444`
- secure
  - 只有https协议加密情况才会发送，但也不是最安全的，所以敏感信息不应该用cookie传输

## 操作
```java
// 禁止js操作cookie，避免跨域脚本xxs攻击，cookie是httpOnly
document.cookie=''
```

## session
> 服务端使用的一种记录客户端状态的机制，相比cookie简单，相应也增加服务端的存储压力。 
> 各用户的session彼此独立，互不可见
- 生命周期
  - 为了获得更高的存取速度，一般把session放在内存里，每个用户都有独立的session，如果过于复杂会导致内存溢出，因此应该尽量精简。
- 有效期
  - 为了防止内存溢出，服务器会把长时间没有活跃的session从内存删除
- session对浏览器的要求
  - 虽然session保存在服务器，对客户端是透明的，但是仍然需要客户端浏览器的支持，因为session需要使用cookie作为识别标志。http协议是无状态的，session不能根据http连接来判断是否为同一客户，因此服务器向客户端发送一个名为`JSESSIONID`的`cookie`，它的值胃该`session`的`id`，`session`根据`cookie`来识别是否为同一用户
  - 同一机器的两个浏览器窗口访问会生成两个不同的session，一个浏览器内不同窗口共享一session

## token
> 服务端生成一串字符串，作为客户端请求的标识。当用户第一次登录后，服务端生成一个token将此返回给客户端，之后客户端请求header将会带着token，无需再带上用户名和密码，这样服务端就不需要保存session id了，只要生成token，验证token，用cpu换取存储空间。

## localstorage
- 生命周期：永久
- 存放数据大小：5mb
- 与服务端通信：仅在客户端中保存，不参与和服务端的通信

## 劫持cookie不劫持token的原因
传统的cookie保持的sessionid，是有状态的，验证记录或者会话需要一直在服务端和客户端保持。token是无状态的，服务端只判断token是否有效，通常设计过有效时间来确保不会被劫持。所以劫持cookie比劫持token更有效，毕竟cookie在某种情况可以一直使用下去，token不行。

