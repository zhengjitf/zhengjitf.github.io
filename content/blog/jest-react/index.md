---
title: Jest 系列之 React 组件测试
date: "2020-01-01"
description: ""
tags: ["Jest", "Test", "React"]
group: ["Jest", 2]
---

# 单元测试

**选型**: `Jest` + `Enzyme` + `@testing-library/react-hooks`

Enzyme 是 Airbnb 开源的 React 测试工具库库，它功能过对官方的测试工具库 ReactTestUtils 的二次封装，提供了一套简洁强大的 API，并内置 Cheerio，实现了 jQuery 风格的方式进行 DOM 处理

以 [CRA](https://github.com/facebook/create-react-app) 脚手架生成的项目为例，[CRA](https://github.com/facebook/create-react-app) 已配置好 Jest 测试环境，这里我们选用 React 测试库 `Enzyme`，添加即可

```bash
yarn add --dev enzyme enzyme-adapter-react-16 jest-enzyme
```

## Enzyme三种渲染方式
- `shallow`：浅渲染
- `mount`：全渲染
- `render`：静态渲染

### 浅渲染（shallow）
将组件渲染成虚拟DOM对象，只渲染第一层，不会渲染子组件，支持 `componentDidMount` 、 `componentDidUpdate`、`useEffect`等

```js
import React from 'react';
import { shallow } from 'enzyme';

import MyComponent from './MyComponent';
import Foo from './Foo';

test('<MyComponent /> 会渲染三个<Foo/>', () => {
  const wrapper = shallow(<MyComponent />)
  expect(wrapper.find(Foo).length).toBe(3)
})
```
[`shallow`](https://airbnb.io/enzyme/docs/api/shallow.html) 方法返回的包装对象有以下常用方法：
- `find(selector)`：根据 selector 查找节点，selector 可以是 CSS 选择器、组件的构造函数、组件的 displayName、组件的 prop、节点的属性
- `text()`：返回当前节点的文本字符串
- `html()`：返回当前节点的 html 字符
- `props()`：返回当前组件的所有 prop
- `prop(key)`：返回当前组件的指定 prop
- `state([key])`：返回根组件的（指定）state
- `simulate(event[, data])`：模拟当前节点上的事件
- `setState(nextState[, callback])`：调用根组件实例上的 `setState()`
- `setProps(nextProps[, callback])`：设置根组件上的 props，并重新渲染

### 完全渲染（mount）
将组件渲染加载成真实的 `DOM` ，可以用来测试 `DOM` 相关的交互，以及父子组件之间的交互。用到了 jsdom 来模拟浏览器环境

```js
// Counter.js

import React, { useState } from 'react'

export const Count = (props) => {
  return (
    <span>当前数字：{props.number}</span>
  )
}

const Counter = () => {
  const [count, setCount] = useState(0)

  const handleClick = () => {
    setCount(count + 1)
  }

  return (
    <div>
      <button 
        onClick={handleClick}
        data-test="btn"
      >
        点击计数
      </button>
      <Count number={count}/>
    </div>
  )
}

export default Counter
```

```js
// Counter.test.js

import React, { Component } from 'react'
import { mount } from 'enzyme'
import Counter, { Count } from './Counter'

test('点击计数按钮后，计数文案显示正常', () => {
  const wrapper = mount(<Counter />)

  const btn = wrapper.find('[data-test="btn"]')
  btn.simulate('click')

  const countComp = wrapper.find(Count)
  expect(countComp.text()).toBe('当前数字：1')
})
```

[`mount`](https://airbnb.io/enzyme/docs/api/mount.html) 方法返回的包装对象包含的方法与 `shallow` 基本相同

### 静态渲染（render）
将 React 组件渲染成静态的 HTML 字符串， 然后使用 `Cheerio` 库解析该字符串，返回一个 `Cheerio` 的实例包装对象，可以用来分析组件的 HTML 结构

```js
import React from 'react'
import { render } from 'enzyme'
import PropTypes from 'prop-types'

describe('<Foo />', () => {
  test('renders three `.foo-bar`s', () => {
    const wrapper = render(<Foo />)
    expect(wrapper.find('.foo-bar').length).toBe(3)
  })

  test('rendered the title', () => {
    const wrapper = render(<Foo title="unique" />)
    expect(wrapper.text()).toBe('unique')
  })

  test('renders a div', () => {
    const wrapper = render(<div className="myClass" />)
    expect(wrapper.html()).toMatch(/div/)
  })

  test('can pass in context', () => {
    function SimpleComponent(props, context) {
      const { name } = context
      return <div>{name}</div>;
    }
    SimpleComponent.contextTypes = {
      name: PropTypes.string,
    }

    const context = { name: 'foo' }
    const wrapper = render(<SimpleComponent />, { context })
    expect(wrapper.text()).toBe('foo')
  })
})
```
`render` 方法返回的包装对象包含的方法参照 [Cheerio Api](https://github.com/cheeriojs/cheerio#api)

## 🌰

### 组件快照测试

```js
test('render a label', () => {
  const wrapper = shallow(<Label>Hello World！</Label>)
})
```

### 模拟事件

```js
// Counter.js

export default function Counter() {
  const [count, setCount] = useState(0)

  return (
    <div>
      计数：<span data-test="count">{ count }</span>
      <button data-test="btn" onClick={() => setCount(count + 1)}> + </button>
    </div>
  )
}
```

```js
// Counter.test.js

test('点击按钮，count加1', () => {
  const wrapper = shallow(<Counter />)

  const increaseBtn = wrapper.find('[data-test="btn"]')
  increaseBtn.simulate('click')

  expect(wrapper.find('[data-test="count"]').text()).toBe('1')
})
```

### 测试hooks
我们使用官方的 [`@testing-library/react-hooks`](https://github.com/testing-library/react-hooks-testing-library) 进行 hooks 测试

主要 API：
- `renderHook`：渲染钩子函数
- `act`：确保在进行任何断言之前，与这些“单元”相关的所有更新都已处理并应用于 DOM

**基本使用**：

```js
// useCounter.test.js

import { renderHook, act } from '@testing-library/react-hooks'
import useCounter from './useCounter'

describe('测试 useCounter', () => {
  test('初始状态正常', () => {
    const { result } = renderHook(() => useCounter())
    expect(result.current.count).toBe(0)
    expect(typeof result.current.increment).toBe('function')
  })

  test('调用 increment，count更新', () => {
    const { result } = renderHook(() => useCounter(100))

    act(() => {
      result.current.increment()
    })

    expect(result.current.count).toBe(101)
  })
})
```

**依赖 context 的情况**：

需要传递一个 Provider 包装器给 `renderHook` 的 `wrapper` 参数

```js
// useCounterWithContext.js

import React, { useState, useContext, useCallback } from 'react'

export const CounterStepContext = React.createContext(1)

export const CounterStepProvider = ({ step, children }) => (
  <CounterStepContext.Provider value={step}>{children}</CounterStepContext.Provider>
)

const useCounterWithContext = (initialValue = 0) => {
  const [count, setCount] = useState(initialValue)
  const step = useContext(CounterStepContext)
  const increment = useCallback(() => setCount(n => n + step), [step])
  const reset = useCallback(() => setCount(initialValue), [initialValue])
  return { count, increment, reset }
}

export default useCounterWithContext
```

```js
// useCounterWithContext.test.js

import React from 'react'
import { renderHook, act } from '@testing-library/react-hooks'
import useCounterWithContext, { CounterStepProvider } from './useCounterWithContext'

describe('测试 useCounterWithContext', () => {
  test('加减步调为2时', () => {
    const wrapper = ({ children }) => <CounterStepProvider step={2}>{children}</CounterStepProvider>
    const { result } = renderHook(() => useCounterWithContext(), { wrapper })

    act(() => {
      result.current.increment()
    })

    expect(result.current.count).toBe(2)
  })
})
```

**异步操作**：

`renderHook` 返回的对象中包含一个 `waitForNextUpdate` 异步方法，我们可以等待该方法执行完成（即完成了一次重新渲染），再进行断言

```js
// useAsyncCounter.js

import React, { useState, useContext, useCallback } from 'react'

const useAsyncCounter = (initialValue = 0) => {
  const [count, setCount] = useState(initialValue)
  const increment = useCallback(() => setCount((x) => x + 1), [])
  const incrementAsync = useCallback(() => setTimeout(increment, 100), [increment])
  return { count, increment, incrementAsync }
}

export default useAsyncCounter
```

```js
// useAsyncCounter.test.js

import { renderHook, act } from '@testing-library/react-hooks'
import useAsyncCounter from './useAsyncCounter'

describe('测试useAsyncCounter', () => {
  test('incrementAsync方法调用正常', async () => {
    const { result, waitForNextUpdate } = renderHook(() => useAsyncCounter())

    result.current.incrementAsync()

    await waitForNextUpdate()

    expect(result.current.count).toBe(1)
  })
})
```

# E2E
**选型**: `Jest` + `Cypress`