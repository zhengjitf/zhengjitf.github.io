---
title: Jest 系列之入门简介
date: "2020-01-01"
description: ""
tags: ["Jest", "Test"]
group: ["Jest", 0]
---

Jest 是 Facebook 出品的一个测试框架，相比其他测试框架，Jest 内置了断言、Mock、快照、测试覆盖率等常用功能，实现了开箱即用

## 环境配置

1. 安装依赖

```bash
yarn add --dev jest babel-jest @babel/core @babel/preset-env
```

2. 添加 `babel.config.js`

```js
// babel.config.js
module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          node: 'current',
        },
      },
    ],
  ],
};
```

3. 创建 `sum.test.js`

```js
const sum = (a, b) => a + b;

test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3);
});
```


4. 添加 `npm script`

```json
{
  "scripts": {
    "test": "jest"
  }
}
```
运行 `yarn test`，输出测试结果


## 基本用法
### 断言

> [更多用法](https://jestjs.io/docs/zh-Hans/expect)

```js
// 匹配基本类型
expect(1 + 2).toBe(3);

// 匹配引用类型的值
expect(data).toEqual({one: 1, two: 2});

// 匹配字符串
expect('team').not.toMatch(/I/);

// 数组元素
expect(['a', 'b']).toContain('a');

// 匹配错误
expect(compileAndroidCode).toThrow(Error);

// ...
```

### 异步代码测试
测试异步代码主要有以下方式：

**回调函数**：
```js
test('the data is peanut butter', done => {
  function callback(data) {
    expect(data).toBe('peanut butter');
    done();
  }

  fetchData(callback);
});
```
通过接收 `done` 参数，Jest 会等待 `done` 回调执行完成后，结束测试


**返回 Promise**：

```js
test('the data is peanut butter', () => {
  return fetchData().then(data => {
    expect(data).toBe('peanut butter');
  });
});

// 测试rejected的情况，需要添加expect.assertions来验证一定说的断言被调用
test('the fetch fails with an error', () => {
  expect.assertions(1);
  return fetchData().catch(e => expect(e).toMatch('error'));
});

```

**async/await**：
```js
test('the data is peanut butter', async () => {
  const data = await fetchData();
  expect(data).toBe('peanut butter');
});

test('the fetch fails with an error', async () => {
  expect.assertions(1);
  try {
    await fetchData();
  } catch (e) {
    expect(e).toMatch('error');
  }
});
```

**.resolves / .rejects**：
```js
test('the data is peanut butter', () => {
  return expect(fetchData()).resolves.toBe('peanut butter');
});

test('the fetch fails with an error', () => {
  return expect(fetchData()).rejects.toMatch('error');
});
```

### 前置钩子和后置钩子
Jest 提供了辅助函数，用于处理运行测试前的一些准备工作，和运行测试后的一些清理工作

**在所有测试运行前后只调用一次**：
- `beforeAll` 和 `afterAll`

**在每个测试运行前后都调用一次**：
- `beforeEach` 和 `afterEach`

```js
beforeAll(() => {
  console.log('before all');
});

afterAll(() => {
  console.log('after all');
});

beforeEach(() => {
  console.log('before each');
});

afterEach(() => {
  console.log('after each');
});

test('adds 1 + 2 to equal 3', () => {
  expect(1 + 2).toBe(3);
});


test('adds 3 - 2 to equal 1', () => {
  expect(3 - 2).toBe(1);
});
```


### Mock
在测试中，被测试的模块调用了外部服务时，我们可能并不关心内部调用方法的执行过程，只要求正确调用即可，像接口请求、数据库操作这种既耗时又不稳定，更显得有必要使用 Mock 模拟其实现

Jest 提供了比较全面的 Mock 功能：

- [Mock 函数](https://jestjs.io/docs/zh-Hans/mock-functions)
- [手动模拟](https://jestjs.io/docs/zh-Hans/manual-mocks)
- [模拟定时器](https://jestjs.io/docs/zh-Hans/timer-mocks)

```js
test('Mock Functions', () => {
  function forEach(items, callback) {
    for(let item of items) {
      callback(item)
    }
  }

  const mockCallback = jest.fn(x => 42 + x)
  forEach([0, 1], mockCallback)
  
  // 此mock函数被调用了两次
  expect(mockCallback.mock.calls.length).toBe(2)
  
  // 第一次调用函数时的第一个参数是0
  expect(mockCallback.mock.calls[0][0]).toBe(0)
  
  // 第二次调用函数时的第一个参数是1
  expect(mockCallback.mock.calls[1][0]).toBe(1)
  
  // 第一次函数调用的返回值是42
  expect(mockCallback.mock.results[0].value).toBe(42)
})
```

> [示例请点击]()

### 快照（Snapshot）
如果想确保 UI 不会有意外的改变，可以使用快照测试，用法很简单

```js
import React from 'react';
import Link from '../Link.react';
import renderer from 'react-test-renderer';

it('renders correctly', () => {
  const tree = renderer
    .create(<Link page="http://www.facebook.com">Facebook</Link>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
```
第一次运行测试时会生成快照，在以后的测试中会对比两者的内容是否一致

### 测试覆盖率
Jest 内置了测试覆盖率工具 [istanbul](https://istanbul.js.org/) ，添加 `--coverage` 参数，即可开启。在项目下会生成 `coverage/` 报告目录，报告中包含了测试覆盖率的各种详细指标

![](./coverage.png)

---
参考：
- [Jest Docs](https://jestjs.io/)
- [Jest Examples](https://github.com/facebook/jest/tree/master/examples)
- [javascript-testing-best-practices](https://github.com/goldbergyoni/javascript-testing-best-practices)