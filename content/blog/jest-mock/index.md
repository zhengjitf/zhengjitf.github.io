---
title: Jest 系列之 Mock
date: "2020-01-01"
description: ""
tags: ["Jest", "Test"]
group: ["Jest", 1]
---

在以下场景中，我们会使用到Mock功能：
1. 捕获函数的调用情况
2. 被测试的代码依赖其他服务的实现，但我们并不关心其实现过程，如：含复杂运算的函数方法、接口调用、数据库操作等
3. 模拟定时器函数

## API 概览
本文会提到的主要 API 如下：

- `jest.fn()`
- `jest.mock()`
- `jest.spyOn()`
- `jest.genMockFromModule()`

模拟定时器函数相关 API ：
- `jest.useFakeTimers()`
- `jest.runAllTimers()`
- `jest.runOnlyPendingTimers()`
- `jest.advanceTimersByTime (msToRun)`

## Mock函数
使用 `jest.fn()` 可以创建一个 mock 函数，我们可以指定 mock 函数的内部实现和返回值，通过 mock 函数上的 `.mock`属性，获取此函数如何被调用、调用时的返回值的信息

```js
const mockCallback = jest.fn(x => 42 + x);
forEach([0, 1], mockCallback);

// 此 mock 函数被调用了两次
expect(mockCallback.mock.calls.length).toBe(2);

// 第一次调用函数时的第一个参数是 0
expect(mockCallback.mock.calls[0][0]).toBe(0);

// 第二次调用函数时的第一个参数是 1
expect(mockCallback.mock.calls[1][0]).toBe(1);

// 第一次函数调用的返回值是 42
expect(mockCallback.mock.results[0].value).toBe(42);
```

[`jest.spyOn(object, methodName)`](https://jestjs.io/docs/zh-Hans/jest-object#jestspyonobject-methodname) 也可以生成 Mock 函数，类似于 `jest.fn()`

```js
jest.spyOn(object, methodName).mockImplementation(() => customImplementation)
```
等价于
```js
object[methodName] = jest.fn(() => customImplementation)
```

## 自动模拟模块
使用 `jest.mock(...)` 函数可以自动模拟引用的模块，如下我们来模拟 `axios` 模块，我们可为 `axios.get` 提供一个 `mockResolvedValue` ，它会返回假数据用于测试

```js
// users.test.js
import axios from 'axios';
import Users from './users';

jest.mock('axios');

test('should fetch users', () => {
  const users = [{name: 'Bob'}];
  const resp = {data: users};
  // 也可以使用 axios.get.mockImplementation(() => Promise.resolve(resp))
  axios.get.mockResolvedValue(resp);

  return Users.all().then(data => expect(data).toEqual(users));
});
```

## 手动模拟模块
编写手动模拟也是为了覆盖模块依赖，和自动模拟不同的是，手动模拟是通过在紧邻模块的 `__mocks__` 子目录中写入模块来定义的

- 模拟用户自定义模块，`__mocks__` 与该模块目录同级，需调用 `jest.mock('./moduleName')`
- 模拟 Node 模块，`__mocks__` 与 `node_modules` 同级，除模拟 Node 核心模块外，可不调用 `jest.mock('./moduleName')`

我们来看一个输出指定目录文件概览的例子，功能实现依赖了 `fs` 模块，对该模块进行测试时，对 `fs` 进行模拟

项目目录如下：
```
.
├── __mocks__
│   └── fs.js
├── src
│   ├── FileSummarizer.js
│   └── FileSummarizer.test.js
└── node_modules
```

```js
// src/FileSummarizer.js

const fs = require('fs');

function summarizeFilesInDirectorySync(directory) {
  return fs.readdirSync(directory).map(fileName => ({
    directory,
    fileName,
  }));
}

exports.summarizeFilesInDirectorySync = summarizeFilesInDirectorySync;
```

```js
// __mocks__/fs.js

const path = require('path');

const fs = jest.genMockFromModule('fs');

let mockFiles = Object.create(null);
function __setMockFiles(newMockFiles) {
  mockFiles = Object.create(null);
  for (const file in newMockFiles) {
    const dir = path.dirname(file);

    if (!mockFiles[dir]) {
      mockFiles[dir] = [];
    }
    mockFiles[dir].push(path.basename(file));
  }
}

function readdirSync(directoryPath) {
  return mockFiles[directoryPath] || [];
}

fs.__setMockFiles = __setMockFiles;
fs.readdirSync = readdirSync;

module.exports = fs;
```

```js
// src/FileSummarizer.test.js

jest.mock('fs');

describe('列出目录中的文件', () => {
  const MOCK_FILE_INFO = {
    '/path/to/file1.js': 'console.log("file1 contents");',
    '/path/to/file2.txt': 'file2 contents',
  };

  beforeEach(() => {
    require('fs').__setMockFiles(MOCK_FILE_INFO);
  });

  test('文件列表包含目录中的所有文件', () => {
    const FileSummarizer = require('../FileSummarizer');
    const fileSummary = FileSummarizer.summarizeFilesInDirectorySync(
      '/path/to',
    );

    expect(fileSummary.length).toBe(2);
  });
});
```

[`jest.genMockFromModule(moduleName)`](jest.genMockFromModule(moduleName)) 用于生成模块的 mock 版本，具有与原模块相同的结构

有时候我们需要在 `mock` 模块后，调用原模块的接口，可以使用 [`jest.requireActual(moduleName)`](https://jestjs.io/docs/zh-Hans/jest-object#jestrequireactualmodulename) 引用原模块

## 模拟定时器函数
原生的定时器函数(如：`setTimeout`, `setInterval`, `clearTimeout`, `clearInterval`)需要等待相应的延时，不是很方便测试，Jest 使用 `jest.useFakeTimers()` 模拟定时器函数，控制时间的流逝

```js
// timerGame.js

function timerGame(callback) {
  console.log('Ready....go!');
  setTimeout(() => {
    console.log("Time's up -- stop!");
    callback && callback();
  }, 1000);
}

module.exports = timerGame;
```

```js
// test/timerGame.test.js

jest.useFakeTimers();

test('waits 1 second before ending the game', () => {
  const timerGame = require('../timerGame');
  timerGame();

  expect(setTimeout).toHaveBeenCalledTimes(1);
  expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 1000);
});
```

### 快进时间
使用 `jest.runAllTimers()` 可以快进时间到定时器函数指定的时间，而 `jest.advanceTimersByTime(msToRun)` 可以快进用户指定的时间

```js
test('calls the callback after 1 second', () => {
  const timerGame = require('../timerGame');
  const callback = jest.fn();

  timerGame(callback);

  // 在这个时间点，定时器的回调不应该被执行
  expect(callback).not.toBeCalled();

  // “快进”时间使得所有定时器回调被执行
  // 等价于 jest.advanceTimersByTime(1000)
  jest.runAllTimers();

  // 现在回调函数应该被调用了！
  expect(callback).toBeCalled();
  expect(callback).toHaveBeenCalledTimes(1);
});
```

### 运行等待中的定时器
在循环定时器的场景下，我们不能使用 `jest.runAllTimers()`，会陷入死循环。`jest.runOnlyPendingTimers()` 可以只运行当前等待中的定时器

```js
// infiniteTimerGame.js

function infiniteTimerGame(callback) {
  console.log('Ready....go!');

  setTimeout(() => {
    console.log("Time's up! 10 seconds before the next game starts...");
    callback && callback();

    // Schedule the next game in 10 seconds
    setTimeout(() => {
      infiniteTimerGame(callback);
    }, 10000);
  }, 1000);
}

module.exports = infiniteTimerGame;
```

```js
// test/infiniteTimerGame.test.js

jest.useFakeTimers();

describe('infiniteTimerGame', () => {
  test('schedules a 10-second timer after 1 second', () => {
    const infiniteTimerGame = require('../infiniteTimerGame');
    const callback = jest.fn();

    infiniteTimerGame(callback);

    expect(setTimeout).toHaveBeenCalledTimes(1);
    expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 1000);

    jest.runOnlyPendingTimers();

    expect(callback).toBeCalled();

    expect(setTimeout).toHaveBeenCalledTimes(2);
    expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 10000);
  });
});
```


---
参考：
- [Jest Docs](https://jestjs.io/docs/zh-Hans/mock-functions)
- [Jest Examples](https://github.com/facebook/jest/tree/master/examples)

