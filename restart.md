# 1⃣️ React基础

## 01 - 编写示例

```html
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>hello_react</title>
</head>
<body>
	<!-- 准备好一个“容器” -->
	<div id="test"></div>

	<!-- 引入是要有顺序的 -->
	<!-- 1 引入react核心库 -->
	<script type="text/javascript" src="../js/react.development.js"></script>
	<!-- 2 引入react-dom，用于支持react操作DOM -->
	<script type="text/javascript" src="../js/react-dom.development.js"></script>
	<!-- 3 引入babel，用于将jsx转为js(es6转es5) -->
	<script type="text/javascript" src="../js/babel.min.js"></script>

	<script type="text/babel" > /* 此处一定要写babel，表示这里写的是jsx，并用babel来进行转换，浏览器只看得懂js */
		//1.创建虚拟DOM
		const VDOM = <h1>Hello,React</h1> /* 此处一定不要写引号，因为不是字符串，是虚拟dom，这里是jsx */
		//2.渲染虚拟DOM到页面
		ReactDOM.render(VDOM, document.getElementById('test'))
	</script>
</body>
</html>
```

运行后

浏览器的提示和警告意思👇

![image-20240312171536600](restart.assets/image-20240312171536600.png)



**为啥用jsx？👉 jsx解决的是创建虚拟dom太繁琐了的问题**

用jsx：（非常像直接写html标签，语法🍬）

其实还是靠babel翻译成了下面的那种写法浏览器才看得懂，但方便了我们

```js
<script type="text/babel" > /* 此处一定要写babel */
	//1.创建虚拟DOM
	const VDOM = (  /* 此处一定不要写引号，因为不是字符串 */
		<h1 id="title">
			<span>Hello,React</span>
		</h1>
	)
	//2.渲染虚拟DOM到页面
	ReactDOM.render(VDOM,document.getElementById('test'))
</script>
```

用js：

```js
<script type="text/javascript" > 
	//1.创建虚拟DOM
	// React.createElement创建的是虚拟dom，和document.createElement创建的是真实dom
	const VDOM = React.createElement('h1',{id:'title'},React.createElement('span',{},'Hello,React'))
	//2.渲染虚拟DOM到页面
	ReactDOM.render(VDOM,document.getElementById('test'))
</script>
```



## 02 - 虚拟dom和真实dom

关于虚拟DOM：

  1.本质是Object类型的对象（一般对象）

  2.虚拟DOM比较“轻”，真实DOM比较“重”，因为虚拟DOM是React内部在用，无需真实DOM上那么多的属性。

  3.虚拟DOM最终会被React转化为真实DOM，呈现在页面上。



ps：控制台打印出的真实dom是html标签的形式，看不出具体的类型，在console.log后面加一个debugger断点再去浏览器里看



## 03 - jsx语法规则

```js
<script type="text/babel" >
	const myId = 'aTgUiGu'
	const myData = 'HeLlo,rEaCt'

	//1.创建虚拟DOM
	const VDOM = (
		<div>
			<h2 className="title" id={myId.toLowerCase()}>
				<span style={{color:'white',fontSize:'29px'}}>{myData.toLowerCase()}</span>
			</h2>
			<h2 className="title" id={myId.toUpperCase()}>
				<span style={{color:'white',fontSize:'29px'}}>{myData.toLowerCase()}</span>
			</h2>
			<input type="text"/>
		</div>
	)
	//2.渲染虚拟DOM到页面
	ReactDOM.render(VDOM,document.getElementById('test'))

	/* 
			jsx语法规则：
					1.定义虚拟DOM时，不要写引号。
					2.标签中混入JS表达式时要用{}。
					3.样式的类名指定不要用class，要用className。
					4.内联样式，要用style={{key:'value'}}的形式去写。
					5.只有一个根标签
					6.标签必须闭合
					7.标签首字母
							(1).若小写字母开头，则将该标签转为html中同名元素，若html中无该标签对应的同名元素，则报错。
							(2).若大写字母开头，react就去渲染对应的组件，若组件没有定义，则报错。
		*/
</script>
```

**👉 标签中可以混入JS表达式时要用{}，而不是js语句**

一定注意区分：【js语句(代码)】与【js表达式】

​    1.表达式：一个表达式会产生一个值，可以放在任何一个需要值的地方

​          下面这些都是表达式：

​              (1). a

​              (2). a+b

​              (3). demo(1)

​              (4). arr.map() 

​              (5). function test () {}

​    2.语句(代码)：

​          下面这些都是语句(代码)：

​              (1).if(){}

​              (2).for(){}

​              (3).switch(){case:xxxx}



## 04 - 定义组件

### 函数式

```js
<script type="text/babel">
	//1.创建函数式组件
	function MyComponent(){
		console.log(this); // 此处的this是undefined，因为babel编译后开启了严格模式（禁止自定义组件的this指向window）
		return <h2>我是用函数定义的组件(适用于【简单组件】的定义)</h2>
	}
	//2.渲染组件到页面
	ReactDOM.render(<MyComponent/>,document.getElementById('test'))
	/* 
		执行了ReactDOM.render(<MyComponent/>.......之后，发生了什么？
				1.React解析组件标签，找到了MyComponent组件。
				2.发现组件是使用函数定义的，随后调用该函数，将返回的虚拟DOM转为真实DOM，随后呈现在页面中。
	*/
</script>
```

### 类的相关知识

1.类中的构造器不是必须要写的，要对实例进行一些初始化的操作，如添加指定属性时才必须写。

2.如果A类继承了B类，B类需要写到构造器，且A类中写了构造器，那么A类构造器中的super是必须要调用的。

3.类中所定义的方法，都放在了类的原型对象上，供实例去使用。

### 类

```js
<script type="text/babel">
	//1.创建类式组件，去继承React内置的类
	class MyComponent extends React.Component {
		render(){
			//render是放在哪里的？—— MyComponent的原型对象上，供实例使用。
			//render中的this是谁？—— MyComponent的实例对象 <=> MyComponent组件实例对象。
			console.log('render中的this:',this);
			return <h2>我是用类定义的组件(适用于【复杂组件】的定义)</h2>
		}
	}
	//2.渲染组件到页面
	ReactDOM.render(<MyComponent/>,document.getElementById('test'))
	/* 
		执行了ReactDOM.render(<MyComponent/>.......之后，发生了什么？
				1.React解析组件标签，找到了MyComponent组件。
				2.发现组件是使用类定义的，随后new出来该类的实例，并通过该实例调用到原型上的render方法。
				3.将render返回的虚拟DOM转为真实DOM，随后呈现在页面中。
	*/
</script>
```



👉 复杂组件和简单组件的区分

有状态 -> 复杂，无状态 -> 简单



## 05 - 原生事件绑定

```js
<script type="text/javascript" >
  // 1
	const btn1 = document.getElementById('btn1')
	btn1.addEventListener('click',()=>{
		alert('按钮1被点击了')
	})

	// 2
	const btn2 = document.getElementById('btn2')
	btn2.onclick = ()=>{
		alert('按钮2被点击了')
	}

  // 3
	function demo(){
		alert('按钮3被点击了')
	}
</script>
```



## 06 - state

🌟 **类中的方法默认开启了局部的严格模式**

```js
<script type="text/babel">
	//1.创建组件
	class Weather extends React.Component{
		
		//构造器调用几次？ ———— 1次
		constructor(props){
			console.log('constructor');
			super(props)
			//初始化状态
			this.state = {isHot:false,wind:'微风'}
			//解决changeWeather中this指向问题
			this.changeWeather = this.changeWeather.bind(this)
		}

		//render调用几次？ ———— 1+n次 1是初始化的那次 n是状态更新的次数
		render(){
			console.log('render');
			//读取状态
			const {isHot,wind} = this.state
			return <h1 onClick={this.changeWeather}>今天天气很{isHot ? '炎热' : '凉爽'}，{wind}</h1>
		}

		//changeWeather调用几次？ ———— 点几次调几次
		changeWeather(){
			//changeWeather放在哪里？ ———— Weather的原型对象上，供实例使用
      // 🌟 为什么changeWeather中的this为undefined？
			// 1 changeWeather是作为onClick的回调，这样写的话，不是通过实例调用，是直接调用
			// 2 类中的方法默认开启了局部的严格模式
			
			console.log('changeWeather');
			//获取原来的isHot值
			const isHot = this.state.isHot
			// ❗️严重注意：状态必须通过setState进行更新,且更新是一种合并，不是替换。
			this.setState({isHot:!isHot})
			console.log(this);

			//严重注意：状态(state)不可直接更改，下面这行就是直接更改！！！
			//this.state.isHot = !isHot //这是错误的写法
		}
	}
	//2.渲染组件到页面
	ReactDOM.render(<Weather/>,document.getElementById('test'))
			
</script>
```

👉 `this.changeWeather = this.changeWeather.bind(this)` 这句话的作用：

拿到了原型对象上的changeWeather方法，改变这个方法调用的this指向实例对象，从而生成一个新的方法changeWeather，再把它挂载到实例对象上

<img src="restart.assets/image-20240313145945145.png" alt="image-20240313145945145" style="zoom: 40%;" />

render里做的事情：

1、从状态里读东西

2、在页面上做展示



👉 简写：

用箭头函数就会去找外面的this，指向的是实例对象

```js
<script type="text/babel">
	//1.创建组件
	class Weather extends React.Component{
		//初始化状态
		state = {isHot:false,wind:'微风'}

		render(){
			const {isHot,wind} = this.state
			return <h1 onClick={this.changeWeather}>今天天气很{isHot ? '炎热' : '凉爽'}，{wind}</h1>
		}

		//自定义方法————要用赋值语句的形式+箭头函数
		changeWeather = () => {
			const isHot = this.state.isHot
			this.setState({isHot:!isHot})
		}
	}
	//2.渲染组件到页面
	ReactDOM.render(<Weather/>,document.getElementById('test'))		
</script>
```









