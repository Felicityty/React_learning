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

```
npm start
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





