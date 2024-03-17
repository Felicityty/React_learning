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



## 07 - props

❗️ 只读不能改

```js
<script type="text/babel">
	//创建组件
	class Person extends React.Component{
		render(){
			// console.log(this);
			const {name,age,sex} = this.props
			return (
				<ul>
					<li>姓名：{name}</li>
					<li>性别：{sex}</li>
					<li>年龄：{age+1}</li>
				</ul>
			)
		}
	}
	//渲染组件到页面
	ReactDOM.render(<Person name="jerry" age={19}  sex="男"/>,document.getElementById('test1'))
	ReactDOM.render(<Person name="tom" age={18} sex="女"/>,document.getElementById('test2'))

	const p = {name:'老刘',age:18,sex:'女'}
	// console.log('@',...p);
	// ReactDOM.render(<Person name={p.name} age={p.age} sex={p.sex}/>,document.getElementById('test3'))
	ReactDOM.render(<Person {...p}/>,document.getElementById('test3'))
</script>
```

👉 这里的 {...p} 不是js中 p2={...p} 复制对象的意思(这是一个新语法)，而是babel+react的情况下，{}代表里面可以放js表达式，并且可以做对象展开，仅在标签属性下可以】
ps：如果只是js的话，{...p}是会报错的(展开运算符不能展开对象)

👉 给prop加上{}就可以传递数字了



引入 - 新增

![image-20240315154548165](restart.assets/image-20240315154548165.png)

**对props增加限制：**

```js
<script type="text/babel">
	//创建组件
	class Person extends React.Component{
		render(){
			// console.log(this);
			const {name,age,sex} = this.props
			//props是只读的
			//this.props.name = 'jack' //此行代码会报错，因为props是只读的
			return (
				<ul>
					<li>姓名：{name}</li>
					<li>性别：{sex}</li>
					<li>年龄：{age+1}</li>
				</ul>
			)
		}
	}
	//对标签属性进行类型、必要性的限制
	Person.propTypes = {
		name:PropTypes.string.isRequired, //限制name必传，且为字符串
		sex:PropTypes.string,//限制sex为字符串
		age:PropTypes.number,//限制age为数值
		speak:PropTypes.func,//限制speak为函数
	}
	//指定默认标签属性值
	Person.defaultProps = {
		sex:'男',//sex默认值为男
		age:18 //age默认值为18
	}
	//渲染组件到页面
	ReactDOM.render(<Person name={100} speak={speak}/>,document.getElementById('test1'))
	ReactDOM.render(<Person name="tom" age={18} sex="女"/>,document.getElementById('test2'))

	const p = {name:'老刘',age:18,sex:'女'}
	// console.log('@',...p);
	// ReactDOM.render(<Person name={p.name} age={p.age} sex={p.sex}/>,document.getElementById('test3'))
	ReactDOM.render(<Person {...p}/>,document.getElementById('test3'))

	function speak(){
		console.log('我说话了');
	}
</script>
```



加上 `static`，属性就不加给类的实例对象，而是加给类本身了

👉 简写：

```js
<script type="text/babel">
	//创建组件
	class Person extends React.Component{

		constructor(props){
			//构造器是否接收props，是否传递给super，取决于：是否希望在构造器中通过this访问props
			// console.log(props);
			super(props)
			console.log('constructor',this.props);
		}

		//✅ 对标签属性进行类型、必要性的限制
		static propTypes = {
			name:PropTypes.string.isRequired, //限制name必传，且为字符串
			sex:PropTypes.string,//限制sex为字符串
			age:PropTypes.number,//限制age为数值
		}

		//✅ 指定默认标签属性值
		static defaultProps = {
			sex:'男',//sex默认值为男
			age:18 //age默认值为18
		}
		
		render(){
			// console.log(this);
			const {name,age,sex} = this.props
			//props是只读的
			//this.props.name = 'jack' //此行代码会报错，因为props是只读的
			return (
				<ul>
					<li>姓名：{name}</li>
					<li>性别：{sex}</li>
					<li>年龄：{age+1}</li>
				</ul>
			)
		}
	}

	//渲染组件到页面
	ReactDOM.render(<Person name="jerry"/>,document.getElementById('test1'))
</script>
```



🙆‍♂️ 总结一下：

<img src="restart.assets/image-20240315163046498.png" alt="image-20240315163046498" style="zoom:40%;" />

1、constructor构造函数可以不传，上图中仅用于的两种情况都可以用其余方式解决

- 直接给state赋值
- 赋值语句+箭头函数

2、写了constructor构造函数必须里面加上super，并且super中写上props，否则会出现图中的问题

👉 **构造器是否接收props，是否传递给super，取决于：是否希望在构造器中通过this访问props**，这种情况几乎没有，所以开发中都不写



**函数式组件使用props：**

```js
<script type="text/babel">
	//创建组件
	function Person (props){
		const {name,age,sex} = props
		return (
				<ul>
					<li>姓名：{name}</li>
					<li>性别：{sex}</li>
					<li>年龄：{age}</li>
				</ul>
			)
	}
	Person.propTypes = {
		name:PropTypes.string.isRequired, //限制name必传，且为字符串
		sex:PropTypes.string,//限制sex为字符串
		age:PropTypes.number,//限制age为数值
	}
	//指定默认标签属性值
	Person.defaultProps = {
		sex:'男',//sex默认值为男
		age:18 //age默认值为18
	}
	//渲染组件到页面
	ReactDOM.render(<Person name="jerry"/>,document.getElementById('test1'))
</script>
```



## 08 - refs

### 1 字符串（不推荐）

官方不推荐，效率不高，但确实方便，16.x的都还在用

```js
<script type="text/babel">
	//创建组件
	class Demo extends React.Component{
		//展示左侧输入框的数据
		showData = ()=>{
			const {input1} = this.refs
			alert(input1.value)
		}
		//展示右侧输入框的数据
		showData2 = ()=>{
			const {input2} = this.refs
			alert(input2.value)
		}
		render(){
			return(
				<div>
					<input ref="input1" type="text" placeholder="点击按钮提示数据"/>&nbsp;
					<button onClick={this.showData}>点我提示左侧的数据</button>&nbsp;
					<input ref="input2" onBlur={this.showData2} type="text" placeholder="失去焦点提示数据"/>
				</div>
			)
		}
	}
	//渲染组件到页面
	ReactDOM.render(<Demo a="1" b="2"/>,document.getElementById('test'))
</script>
```

### 2 回调函数（用内联）

回调函数直白来说：

- 你定义的函数
- 你没调用
- 这个函数最终执行了

取名ref后，react会帮你调用的，还把ref当前所处节点传进去了

```js
<script type="text/babel">
	//创建组件
	class Demo extends React.Component{
		//展示左侧输入框的数据
		showData = ()=>{
			const {input1} = this
			alert(input1.value)
		}
		//展示右侧输入框的数据
		showData2 = ()=>{
			const {input2} = this
			alert(input2.value)
		}
		render(){
			return(
				<div>
					// 拿到节点c(currentNode)，把这个节点放在了组件实例对象自身上，并取名input1
					<input ref={c => this.input1 = c } type="text" placeholder="点击按钮提示数据"/>&nbsp;
					<button onClick={this.showData}>点我提示左侧的数据</button>&nbsp;
					<input onBlur={this.showData2} ref={c => this.input2 = c } type="text" placeholder="失去焦点提示数据"/>&nbsp;
				</div>
			)
		}
	}
	//渲染组件到页面
	ReactDOM.render(<Demo a="1" b="2"/>,document.getElementById('test'))
</script>
```

👉 关于回调ref中回调执行次数的问题：

<img src="restart.assets/image-20240315190617408.png" alt="image-20240315190617408" style="zoom:45%;" />

class绑定函数的意思是，给它拎出来个函数的感觉

每次更新都会重新调一次render，发现你写了ref，ref中的回调函数是一个新的函数，所以需要先清空旧的（置为null），再去设置新的

定义成**类绑定函数**方式 -> 它就知道每次渲染的函数是一样的了

真是开发中直接写内联就行了，这种差别无关紧要

```js
<script type="text/babel">
	//创建组件
	class Demo extends React.Component{

		state = {isHot:false}

		showInfo = ()=>{
			const {input1} = this
			alert(input1.value)
		}

		changeWeather = ()=>{
			//获取原来的状态
			const {isHot} = this.state
			//更新状态
			this.setState({isHot:!isHot})
		}

		saveInput = (c)=>{
			this.input1 = c;
			console.log('@',c);
		}

		render(){
			const {isHot} = this.state
			return(
				<div>
					<h2>今天天气很{isHot ? '炎热':'凉爽'}</h2>
					{/* <input ref={(c)=>{this.input1 = c;console.log('@',c);}} type="text"/><br/><br/> */}
					<input ref={this.saveInput} type="text"/><br/><br/>
					<button onClick={this.showInfo}>点我提示输入的数据</button>
					<button onClick={this.changeWeather}>点我切换天气</button>
				</div>
			)
		}
	}
	//渲染组件到页面
	ReactDOM.render(<Demo/>,document.getElementById('test'))
</script>
```



### 3 createRef（最推荐）

myRef 是通过createRef创建出来的一个容器，会把ref所在的节点放到容器里

```js
<script type="text/babel">
	//创建组件
	class Demo extends React.Component{
		/* 
			React.createRef调用后可以返回一个容器，该容器可以存储被ref所标识的节点,该容器是“专人专用”的
			*/
		myRef = React.createRef()
		myRef2 = React.createRef()
		//展示左侧输入框的数据
		showData = ()=>{
			alert(this.myRef.current.value);
		}
		//展示右侧输入框的数据
		showData2 = ()=>{
			alert(this.myRef2.current.value);
		}
		render(){
			return(
				<div>
					{/* myRef 是通过createRef创建出来的一个容器，会把ref所在的节点放到容器里 */}
					<input ref={this.myRef} type="text" placeholder="点击按钮提示数据"/>&nbsp;
					<button onClick={this.showData}>点我提示左侧的数据</button>&nbsp;
					<input onBlur={this.showData2} ref={this.myRef2} type="text" placeholder="失去焦点提示数据"/>&nbsp;
				</div>
			)
		}
	}
	//渲染组件到页面
	ReactDOM.render(<Demo a="1" b="2"/>,document.getElementById('test'))
</script>
```



## 09 - 事件处理

(1).通过onXxx属性指定事件处理函数(注意大小写)

​    a.React使用的是自定义(合成)事件, 而不是使用的原生DOM事件 ————————为了更好的兼容性

​    b.React中的事件是通过事件委托方式处理的(委托给组件最外层的元素) ————————为了的高效

(2).通过event.target得到发生事件的DOM元素对象 ————————不要过度使用ref【发生事件的元素正好是要操作的元素，就可以省略ref，用event.target拿】



## 10 - 受控？

非受控：现用现取

```js
<script type="text/babel">
	//创建组件
	class Login extends React.Component{
		handleSubmit = (event)=>{
			event.preventDefault() //阻止表单提交
			const {username,password} = this
			alert(`你输入的用户名是：${username.value},你输入的密码是：${password.value}`)
		}
		render(){
			return(
				<form onSubmit={this.handleSubmit}>
					用户名：<input ref={c => this.username = c} type="text" name="username"/>
					密码：<input ref={c => this.password = c} type="password" name="password"/>
					<button>登录</button>
				</form>
			)
		}
	}
	//渲染组件
	ReactDOM.render(<Login/>,document.getElementById('test'))
</script>
```

受控：随着输入维护状态，有点像vue的双向数据绑定（v-model就是v-bind + @change的语法糖）【推荐（省略ref）】

```js
<script type="text/babel">
	//创建组件
	class Login extends React.Component{

		//初始化状态
		state = {
			username:'', //用户名
			password:'' //密码
		}

		//保存用户名到状态中
		saveUsername = (event)=>{
			this.setState({username:event.target.value})
		}

		//保存密码到状态中
		savePassword = (event)=>{
			this.setState({password:event.target.value})
		}

		//表单提交的回调
		handleSubmit = (event)=>{
			event.preventDefault() //阻止表单提交
			const {username,password} = this.state
			alert(`你输入的用户名是：${username},你输入的密码是：${password}`)
		}

		render(){
			return(
				<form onSubmit={this.handleSubmit}>
					用户名：<input onChange={this.saveUsername} type="text" name="username"/>
					密码：<input onChange={this.savePassword} type="password" name="password"/>
					<button>登录</button>
				</form>
			)
		}
	}
	//渲染组件
	ReactDOM.render(<Login/>,document.getElementById('test'))
</script>
```



## 12 - 高阶函数 柯里化

**高阶函数：**如果一个函数符合下面2个规范中的任何一个，那该函数就是高阶函数。

​        1.若A函数，接收的参数是一个函数，那么A就可以称之为高阶函数。

​        2.若A函数，调用的返回值依然是一个函数，那么A就可以称之为高阶函数。

​        常见的高阶函数有：Promise、setTimeout、arr.map()等等

**函数的柯里化：**通过函数调用继续返回函数的方式，实现多次接收参数最后统一处理的函数编码形式。 

```js
function sum(a){
	return(b)=>{
		return (c)=>{
			return a+b+c
		}
	}
}
```

```js
<script type="text/babel">
	//创建组件
	class Login extends React.Component{
		//初始化状态
		state = {
			username:'', //用户名
			password:'' //密码
		}

		//保存表单数据到状态中
		saveFormData = (dataType)=>{
			return (event)=>{
				this.setState({[dataType]:event.target.value})
			}
		}

		//表单提交的回调
		handleSubmit = (event)=>{
			event.preventDefault() //阻止表单提交
			const {username,password} = this.state
			alert(`你输入的用户名是：${username},你输入的密码是：${password}`)
		}
		render(){
			return(
				<form onSubmit={this.handleSubmit}>
					用户名：<input onChange={this.saveFormData('username')} type="text" name="username"/>
					密码：<input onChange={this.saveFormData('password')} type="password" name="password"/>
					<button>登录</button>
				</form>
			)
		}
	}
	//渲染组件
	ReactDOM.render(<Login/>,document.getElementById('test'))
</script>
```

这里的saveFormData函数实际上就是高阶函数，并运用了柯里化

`用户名：<input onChange={event => this.saveFormData('username',event) } type="text" name="username"/>` 变成这种也ok，不用柯里化和高阶函数，以前我都这么写的诶



## 13 - 生命周期

### 1 引入

<img src="restart.assets/image-20240316225326427.png" alt="image-20240316225326427" style="zoom: 50%;" />

这个警告还真挺常见的，之前遇到好像就没管诶😂

不能再已被卸载的组件上执行状态的更新 👉 在组件要被卸载之前的生命周期函数中，销毁掉定时器

生命周期回调函数 <=> 生命周期钩子函数 <=> 生命周期函数 <=> 生命周期钩子

### 2 旧

![image-20240316235439669](restart.assets/image-20240316235439669.png)

```js
<script type="text/babel">
	/* 
			1. 初始化阶段: 由ReactDOM.render()触发---初次渲染
								1.	constructor()
								2.	componentWillMount()
								3.	render()
								4.	componentDidMount() =====> 常用
												一般在这个钩子中做一些初始化的事，例如：开启定时器、发送网络请求、订阅消息
			2. 更新阶段: 由组件内部this.setSate()或父组件render触发
								1.	shouldComponentUpdate()
								2.	componentWillUpdate()
								3.	render() =====> 必须使用的一个
								4.	componentDidUpdate()
			3. 卸载组件: 由ReactDOM.unmountComponentAtNode()触发
								1.	componentWillUnmount()  =====> 常用
												一般在这个钩子中做一些收尾的事，例如：关闭定时器、取消订阅消息
	*/
	//创建组件
	class Count extends React.Component{

		//构造器
		constructor(props){
			console.log('Count---constructor');
			super(props)
			//初始化状态
			this.state = {count:0}
		}

		//加1按钮的回调
		add = ()=>{
			//获取原状态
			const {count} = this.state
			//更新状态
			this.setState({count:count+1})
		}

		//卸载组件按钮的回调
		death = ()=>{
			ReactDOM.unmountComponentAtNode(document.getElementById('test'))
		}

		//强制更新按钮的回调
		force = ()=>{
			this.forceUpdate()
		}

		//组件将要挂载的钩子
		componentWillMount(){
			console.log('Count---componentWillMount');
		}

		//组件挂载完毕的钩子
		componentDidMount(){
			console.log('Count---componentDidMount');
		}

		//组件将要卸载的钩子
		componentWillUnmount(){
			console.log('Count---componentWillUnmount');
		}

		//控制组件更新的“阀门”
		shouldComponentUpdate(){
			console.log('Count---shouldComponentUpdate');
			return true
		}

		//组件将要更新的钩子
		componentWillUpdate(){
			console.log('Count---componentWillUpdate');
		}

		//组件更新完毕的钩子
		componentDidUpdate(){
			console.log('Count---componentDidUpdate');
		}

		render(){
			console.log('Count---render');
			const {count} = this.state
			return(
				<div>
					<h2>当前求和为：{count}</h2>
					<button onClick={this.add}>点我+1</button>
					<button onClick={this.death}>卸载组件</button>
					<button onClick={this.force}>不更改任何状态中的数据，强制更新一下</button>
				</div>
			)
		}
	}
	
	//父组件A
	class A extends React.Component{
		//初始化状态
		state = {carName:'奔驰'}

		changeCar = ()=>{
			this.setState({carName:'奥拓'})
		}

		render(){
			return(
				<div>
					<div>我是A组件</div>
					<button onClick={this.changeCar}>换车</button>
					<B carName={this.state.carName}/>
				</div>
			)
		}
	}
	
	//子组件B
	class B extends React.Component{
		//组件将要接收新的props的钩子(第一次不算)
		componentWillReceiveProps(props){
			console.log('B---componentWillReceiveProps',props);
		}

		//控制组件更新的“阀门”
		shouldComponentUpdate(){
			console.log('B---shouldComponentUpdate');
			return true
		}
		//组件将要更新的钩子
		componentWillUpdate(){
			console.log('B---componentWillUpdate');
		}

		//组件更新完毕的钩子
		componentDidUpdate(){
			console.log('B---componentDidUpdate');
		}

		render(){
			console.log('B---render');
			return(
				<div>我是B组件，接收到的车是:{this.props.carName}</div>
			)
		}
	}
	
	//渲染组件
	ReactDOM.render(<Count/>,document.getElementById('test'))
	ReactDOM.render(<A/>,document.getElementById('test'))
</script>
```

### 3 新

所有带will的钩子都需要加上UNSAFE_，除了componentWIllUnmount

**新旧对比：**废弃了3个，新增了两个（用的场景也极为罕见）

![image-20240317003411757](restart.assets/image-20240317003411757.png)

```js
<script type="text/babel">
	//创建组件
	class Count extends React.Component{
		/* 
			1. 初始化阶段: 由ReactDOM.render()触发---初次渲染
							1.	constructor()
							2.	getDerivedStateFromProps 
							3.	render()
							4.	componentDidMount() =====> 常用
										一般在这个钩子中做一些初始化的事，例如：开启定时器、发送网络请求、订阅消息
			2. 更新阶段: 由组件内部this.setSate()或父组件重新render触发
							1.	getDerivedStateFromProps
							2.	shouldComponentUpdate()
							3.	render()
							4.	getSnapshotBeforeUpdate
							5.	componentDidUpdate()
			3. 卸载组件: 由ReactDOM.unmountComponentAtNode()触发
							1.	componentWillUnmount()  =====> 常用
										一般在这个钩子中做一些收尾的事，例如：关闭定时器、取消订阅消息
		*/
		//构造器
		constructor(props){
			console.log('Count---constructor');
			super(props)
			//初始化状态
			this.state = {count:0}
		}

		//加1按钮的回调
		add = ()=>{
			//获取原状态
			const {count} = this.state
			//更新状态
			this.setState({count:count+1})
		}

		//卸载组件按钮的回调
		death = ()=>{
			ReactDOM.unmountComponentAtNode(document.getElementById('test'))
		}

		//强制更新按钮的回调
		force = ()=>{
			this.forceUpdate()
		}
		
		//若state的值在任何时候都取决于props，那么可以使用getDerivedStateFromProps
		static getDerivedStateFromProps(props,state){
			console.log('getDerivedStateFromProps',props,state);
			return null
		}

		//在更新之前获取快照
		getSnapshotBeforeUpdate(){
			console.log('getSnapshotBeforeUpdate');
			return 'atguigu'
		}

		//组件挂载完毕的钩子
		componentDidMount(){
			console.log('Count---componentDidMount');
		}

		//组件将要卸载的钩子
		componentWillUnmount(){
			console.log('Count---componentWillUnmount');
		}

		//控制组件更新的“阀门”
		shouldComponentUpdate(){
			console.log('Count---shouldComponentUpdate');
			return true
		}

		//组件更新完毕的钩子
		componentDidUpdate(preProps,preState,snapshotValue){
			console.log('Count---componentDidUpdate',preProps,preState,snapshotValue);
		}
		
		render(){
			console.log('Count---render');
			const {count} = this.state
			return(
				<div>
					<h2>当前求和为：{count}</h2>
					<button onClick={this.add}>点我+1</button>
					<button onClick={this.death}>卸载组件</button>
					<button onClick={this.force}>不更改任何状态中的数据，强制更新一下</button>
				</div>
			)
		}
	}
	
	//渲染组件
	ReactDOM.render(<Count count={199}/>,document.getElementById('test'))
</script>
```

**static getDerivedStateFromProps** 可以对比props和state，当xxx情况下选择return谁，就会以谁为主

返回null就无影响

**getSnapshotBeforeUpdate** return的东西叫快照，它会作为componentDidUpdate的第三个参数，就相当于记录了一下组建更新之前的东西（eg：当前浏览器的视口宽度、之前列表的高度等），看你想传啥都行

【这两个钩子的用途都很罕见，但第二个比第一个有意义一点】

getSnapshotBeforeUpdate 案例👇

```js
<script type="text/babel">
	class NewsList extends React.Component{

		state = {newsArr:[]}

		componentDidMount(){
			setInterval(() => {
				//获取原状态
				const {newsArr} = this.state
				//模拟一条新闻
				const news = '新闻'+ (newsArr.length+1)
				//更新状态
				this.setState({newsArr:[news,...newsArr]})
			}, 1000);
		}

		getSnapshotBeforeUpdate(){
			return this.refs.list.scrollHeight
		}

		componentDidUpdate(preProps,preState,height){
			this.refs.list.scrollTop += this.refs.list.scrollHeight - height
		}

		render(){
			return(
				<div className="list" ref="list">
					{
						this.state.newsArr.map((n,index)=>{
							return <div key={index} className="news">{n}</div>
						})
					}
				</div>
			)
		}
	}
	ReactDOM.render(<NewsList/>,document.getElementById('test'))
</script>
```

最常用的钩子没变，废弃三个，新增的也不常用，需要特殊的场景

![image-20240318004454952](restart.assets/image-20240318004454952.png)









