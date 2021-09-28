# 这里是question的回答

## Question

### 通过常识/查阅相关资料可以知道, canvas 标签是有width和height属性的, 而 css 中, 我们也可以给 canvas 设置width和height, 那么它们有什么不同呢? 如果把它们设置了不一样的值又会发生甚么呢? 请谈谈你的理解

> 一个是设置画布宽高，另一个是设置canvas元素的宽高。二者不同应该会让canvas元素在页面中占据的宽高与画布的实际宽高不一致

### 假如说, 你的 canvas 的 id 属性被赋值为了"my-canvas", 那么const myCanvas = document.getElementById('my-canvas')这里的myCanvas这个变量的类型是什么?getContext是什么类型的方法?为什么我们可以调用myCanvas.getContext()?

> 类型是个函数？ 传递一个画布的维度参数，表示用来绘制的环境类型的环境。因为画布需要一个设定维度参数？

### 你知道 setInterval 函数吗? 它是做什么的? 为什么做动画的时候常用 requestAnimationFrame 而不是使用 setInterval 每隔多少 ms 触发一次呢? 谈谈你的理解

>它会以固定的时间间隔，重复运行一段代码。setInterval会造成时间间隔跳过，或者时间间隔可能小于定时调用代码的时间。
