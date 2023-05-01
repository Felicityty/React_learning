# 01 - 搭建react项目

这个不管

```ruby
$ sudo npm install -g create-react-app
```

新建项目

```ruby
$  create-react-app project_name
```

安装react

```kotlin
npm init
npm install --save react react-dom
```

启动项目

```ruby
npm start
```



安装 ts

```ruby
sudo npm install -g typescript
```

查看版本

```ruby
tsc -v
```



先简单点儿，就这些呗～



# 02 - sandbox

## 👉 函数式组件



## 👉 步骤：

1、画出board和square

2、prop传值

3、添加click的事件

4、轮流

5、计算胜方

6、添加历史

7、实现撤回操作



## 👉 小难点1：

```react
<Square value={squares[0]} onSquareClick={handleClick(0)} />
```

```react
function handleClick(i) {
  // 已有棋子 或者 产生胜方
  if (squares[i] || calculateWinner(squares)) {
    return
  }
  // 将值传递给新数组 跟旧数组无关
  const nextSquares = squares.slice()
  if (xIsNext) {
    nextSquares[i] = 'X'
  } else {
    nextSquares[i] = 'O'
  }
  // onPlay(nextSquares)
  setSquares(nextSquares)
  setXIsNext(!xIsNext)
}
```

这里调用的 `handleClick` 函数中有 `setSquares` 改变了棋盘组件的状态，使整个棋盘组件再次重新呈现，就变成了一个无限循环

之前为啥没问题？

```react
function Square({ value, onSquareClick }) {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}
```

👉 这里 `onSquareClick={handleClick}` 是将 `handleClick` 函数作为 `props` 向下传递的

但是 `handleClick(0)` 中是立即调用了

我们希望的是作为一个props向下传递，但不调用

以下这种方法解决：

```react
<Square value={squares[0]} onSquareClick={() => handleClick(0)} />
```



## 👉 踩坑1：

```react
const [history, setHistory] = useState([Array(9).fill(null)])
```

这里面是数组，外面中括号得加上



## 👉 注意点1：

**构建动态列表时分配适当的键**

如果没有指定key，React会报错，默认使用数组索引作为key

密钥不需要是全局唯一的；它们只需要在组件及其同级组件之间是唯一的



# 03 - FilterableProductTable

![](https://react.dev/images/docs/s_thinking-in-react_ui_outline.png)

## 👉 写法1：

```react
function ProductRow({ product }) {
  const name = product.stocked ? product.name :
    <span style={{ color: 'red' }}>{product.name}</span>

  return (
    <tr>
      <td>{name}</td>
      <td>{product.price}</td>
    </tr>
  )
}
```

我的天呐这个写法，这里的{{}}不是语法规则啊



## 👉 prop & state：

- prop：传递的数据
- state：组件的内存

就是prop和data的感觉



react使用单向数据流

> 对于应用程序中的每个状态：
>
> 1. 识别基于该状态呈现某些内容的*每个组件。*
> 2. 找到它们最接近的公共父组件——在层次结构中位于它们之上的组件。
> 3. 🌟🌟🌟决定状态应该在哪里：
>    1. **通常，您可以将状态直接放入它们的共同父级中。**
>    2. **您还可以将状态放入其共同父级之上的某个组件中。**
>    3. **如果您无法找到一个组件，在这个组件中拥有状态是有意义的，请创建一个新组件，专门用于保存状态，并将其添加到公共父组件之上的层次结构中的某个位置。**
>

所以还需绑定反向数据流

如果不绑定，react会忽略输入



# 04 - 描述用户界面

### 1、组件

- **组件的名称必须以大写字母开头**，否则将无法运行！

- 用jsx语法中，return后不只一行，就要用括号括起来的

- 组件定义不可嵌套，数据传递用prop



### 2、导入导出

- 一个文件可导出多个组件

  ```react
  // 默认导出
  import Gallery from './Gallery.js';
  // 命名导出
  import { Profile } from './Gallery.js';
  ```

  

### 3、jsx

1）返回多个元素，使用单个父标记将它们包装起来

eg：`<> </>`

> #### 为什么需要包裹多个 JSX 标签？
>
> JSX 看起来像 HTML，但在底层它被转换为普通的 JavaScript 对象。
>
> 如果不将它们包装到数组中，则不能从函数返回两个对象。这解释了为什么你也不能返回两个 JSX 标签而不将它们包装到另一个标签或片段中。

2）关闭所有标签

3）camelCase大部分 天呐 我之前犯了大忌啊😱

4）[html -> jsx](https://transform.tools/html-to-jsx)



### 4、花括号

1） `“”` ：指定 字符串

2） `{}`：动态读取

> #### 在哪里使用花括号
>
> 1. **作为**直接在 JSX 标签内的文本：`<h1>{name}'s To Do List</h1>`有效，但`<{tag}>Gregorio Y. Zara's To Do List</{tag}>` 不会。
> 2. **作为**紧跟在`=`符号之后的属性：`src={avatar}`将读取`avatar`变量，但`src="{avatar}"`将传递字符串`"{avatar}"`。

3）`{{}}`

在 JSX 中传递一个 JS 对象，必须将对象包裹在另一对花括号中：`person={{ name: "Hedy Lamarr", inventions: 5 }}`

4）模版字符串拼接

`src={baseUrl + person.imageId + person.imageSize + '.jpg'}`

`src={baseUrl}{person.imageId}{person.imageSize}.jpg"` ❌

或者写成一个utils的函数也行

```react
export function getImageUrl(person, size = 's') {
  return (
    'https://i.imgur.com/' +
    person.imageId +
    size +
    '.jpg'
  );
}
```



### 5、父传子props

1）解构

```react
function Avatar({ person, size = 100 }) {
  // ...
}
```

2）将所有props转发给子组件

```react
function Profile(props) {
  return (
    <div className="card">
      <Avatar {...props} />
    </div>
  );
}
```

3）组件嵌套 - vue的插槽嘛

```react
import Avatar from './Avatar.js';

function Card({ children }) {
  return (
    <div className="card">
      {children}
    </div>
  );
}

export default function Profile() {
  return (
    <Card>
      <Avatar
        size={100}
        person={{ 
          name: 'Katsuko Saruhashi',
          imageId: 'YfeOqp2'
        }}
      />
    </Card>
  );
}
```

4）props是不可变的



### 6、条件渲染

1）if-else

但组件必须返回一些东西（null）

```react
function Item({ name, isPacked }) {
  if (isPacked) {
    return <li className="item">{name} ✔</li>;
  }
  return <li className="item">{name}</li>;
}
```

有点todolist的感觉哦

2）三元表达式

```react
function Item({ name, isPacked }) {
  return (
    <li className="item">
      {isPacked ? (
        <del>
          {name + ' ✔'}
        </del>
      ) : (
        name
      )}
    </li>
  );
}
```

嵌套jsx让代码更dry

3）&&

```react
function Item({ name, isPacked }) {
  return (
    <li className="item">
      {name} {isPacked && '✔'}
    </li>
  );
}
```

4）最灵活版 - 去增加一些变量

```react
function Item({ name, isPacked }) {
  let itemContent = name;
  if (isPacked) {
    itemContent = (
      <del>
        {name + " ✔"}
      </del>
    );
  }
  return (
    <li className="item">
      {itemContent}
    </li>
  );
}
```

5）字符串之间添加空格

`{' '}`



### 7、渲染列表

1）map

```react
const listItems = people.map(person =>
  <li key={person.id}>
    <img
      src={getImageUrl(person)}
      alt={person.name}
    />
    <p>
      <b>{person.name}</b>
        {' ' + person.profession + ' '}
        known for {person.accomplishment}
    </p>
  </li>
);
```

这里的箭头函数后面可以是一个父标签诶

如果忍不住外面加个花括号，别忘加return

2）片段列表

fragment 多个dom节点

```react
const listItems = people.map(person =>
  <Fragment key={person.id}>
    <h1>{person.name}</h1>
    <p>{person.bio}</p>
  </Fragment>
);
```

3）key

[`crypto.randomUUID()`](https://developer.mozilla.org/en-US/docs/Web/API/Crypto/randomUUID)

[`uuid`](https://www.npmjs.com/package/uuid)

4）foreach



### 8、保持组件纯净

React 提供了一种“严格模式”，在开发过程中它会调用每个组件的函数两次。**通过两次调用组件函数，严格模式有助于找到违反这些规则的组件。**

要选择进入严格模式，您可以将根组件包装到`<React.StrictMode>`





## 05 - 添加交互性

### 1、响应事件

1）事件传播 - 事件冒泡啦～

事件处理程序还将捕获来自您的组件可能具有的任何子组件的事件

所有事件都在 React 中传播，除了`onScroll`，它只适用于你附加的 JSX 标签

2）停止传播

事件处理程序接收一个**事件对象**作为它们唯一的参数。按照惯例，它通常被称为`e`，代表“事件”。您可以使用此对象来读取有关事件的信息

`e.stopPropagation()`

3）阻止默认事件

阻止提交表单后重新加载页面

```react
<form onSubmit={e => {
  e.preventDefault();
  alert('Submitting!');
}}>
  <input />
  <button>Send</button>
</form>
```

- [`e.stopPropagation()`](https://developer.mozilla.org/docs/Web/API/Event/stopPropagation) 停止触发附加到上述标签的事件处理程序。
- [`e.preventDefault()` ](https://developer.mozilla.org/docs/Web/API/Event/preventDefault) 阻止少数事件的默认浏览器行为。



### 2、state：组件的记忆

1）State 

2）Hook [`useState`](https://react.dev/reference/react/useState) 提供了这两件事：

1. 用于保留渲染之间数据的**状态变量**（否则每次都是从头渲染）
2. 一个**状态设置函数**，用于更新变量并触发 React 再次渲染组件

```react
const [index, setIndex] = useState(0);
```

3）hooks

**以`use`开头的函数只能在你的组件的顶层或你自己的钩子上调用。**

4）状态是孤立的和私有的

两次渲染同一个组件，每个组件都会有完全隔离的状态

改变一个其余一个不影响

5）若想同步，子组件移除状态，添加到最近公共父组件中去



### 3、渲染和提交

1）触发渲染

- 最初始的渲染

```react
const root = createRoot(document.getElementById('root'))
root.render(<Image />);
```

- 状态更新时重新渲染

  set函数触发

2）渲染组件

渲染是纯函数

- 相同的输入 相同的输出
- 只管自己的事

3）提交给dom

- **如果渲染结果与上次相同，React 不会触及 DOM**

- 初始渲染，使用`appendChild()`DOM API 将其创建的所有 DOM 节点放在屏幕上

4）浏览器渲染/绘制

渲染完成并且 React 更新 DOM 后，浏览器将重新绘制屏幕



### 4、state如同一张快照

1）设置state会触发渲染

> 当 React 重新渲染一个组件时：
>
> 1. React 会再次调用你的函数
> 2. 你的函数会返回新的 JSX 快照
> 3. React 会更新界面来匹配你返回的快照
>

2）**设置 state 只会为 \*下一次\* 渲染变更 state 的值**

一个 state 变量的值永远不会在一次渲染的内部发生变化， **即使其事件处理函数的代码是异步的**（加个setTimeOut也没用）

👉 原因：React 会等到事件处理函数中的 所有 代码都运行完毕再处理 state 更新 - **批处理**

3）**React 不会跨 \*多个\* 需要刻意触发的事件（如点击）进行批处理**

React 只会在一般来说安全的情况下才进行批处理。这可以确保，例如，如果第一次点击按钮会禁用表单，那么第二次点击就不会再次提交它。



### 5、把一系列 state 更新加入队列

1）在下次渲染前多次更新同一个 state

`setNumber(n => n + 1)` 这样传入一个根据队列中的前一个 state 计算下一个 state 的 *函数*，而不是像 `setNumber(number + 1)` 这样传入 *下一个 state 值* 【**更新函数**】

👉 告诉 React “用 state 值做某事”而不是仅仅替换它的方法。

> 1. React 会将此函数加入队列，以便在事件处理函数中的所有其他代码运行后进行处理
> 2. 在下一次渲染期间，React 会遍历队列并给你更新之后的最终 state

2）命名：

- state 变量的第一个字母

```react
setEnabled(e => !e);
setLastName(ln => ln.reverse());
```

- 使用完整的 state 变量

```react
setEnabled(enabled => !enabled)
setEnabled(prevEnabled => !prevEnabled)
```

3）🌟🌟🌟 总结：

- **set不会更改现有渲染中的变量，只会请求下一次渲染，改变下一次渲染的值**

- **在渲染前更新同一个state用事件处理函数**



### 6、更新状态中的对象

1）更新一个对象时，需要创建一个新对象（或复制一个现有对象），然后设置状态

2）突变：

更改对象本身的内容

```react
position.x = 5;
```

3）**将放入state的任何 JavaScript 对象视为只读**

如果不使用状态设置函数，React 并不知道对象发生了变化。所以 React 不会做任何响应

👉 **请创建一个\*新\*对象并将其传递给状态设置函数**

```react
onPointerMove={e => {
  setPosition({
    x: e.clientX,
    y: e.clientY
  });
}}
```

4）使用传播语法来创建对象的副本

```react
function handleChange(e) {
  setPerson({
    ...person,
    [e.target.name]: e.target.value
  });
}
```

- 传播语法很浅：它只复制一层深。

5）更新嵌套对象

```react
function handleImageChange(e) {
  setPerson({
    ...person,
    artwork: {
      ...person.artwork,
      image: e.target.value
    }
  });
}
```

6）嵌套很深，使用 [Immer](https://github.com/immerjs/use-immer)，保持更新处理程序简洁

useImmer

```react
updatePerson(draft => {
  draft.artwork.city = 'Lagos';
});
```

还挺绝









https://github.com/laoyutong/ts-react-todoList

https://github.com/gaoyixiang1/todolist







