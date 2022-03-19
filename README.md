# jike-sdk Ⓙ Jike SDK

[![Unit Test](https://github.com/open-jike/jike-sdk/actions/workflows/unit-test.yml/badge.svg)](https://github.com/open-jike/jike-sdk/actions/workflows/unit-test.yml)
[![GitHub](https://img.shields.io/github/license/open-jike/jike-sdk)](https://github.com/open-jike/jike-sdk)
[![node-lts](https://img.shields.io/node/v-lts/jike-sdk)](https://www.npmjs.com/package/jike-sdk)
[![npm type definitions](https://img.shields.io/npm/types/jike-sdk)](https://www.npmjs.com/package/jike-sdk)
[![GitHub Repo stars](https://img.shields.io/github/stars/open-jike/jike-sdk?style=social)](https://github.com/open-jike/jike-sdk)
[![GitHub forks](https://img.shields.io/github/forks/open-jike/jike-sdk?style=social)](https://github.com/open-jike/jike-sdk)
[![Jike (followers)](https://img.shields.io/badge/dynamic/json?for-the-badge&logo=data%3Aimage%2Fpng%3Bbase64%2CiVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAEsmlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4KPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iWE1QIENvcmUgNS41LjAiPgogPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4KICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIgogICAgeG1sbnM6dGlmZj0iaHR0cDovL25zLmFkb2JlLmNvbS90aWZmLzEuMC8iCiAgICB4bWxuczpleGlmPSJodHRwOi8vbnMuYWRvYmUuY29tL2V4aWYvMS4wLyIKICAgIHhtbG5zOnBob3Rvc2hvcD0iaHR0cDovL25zLmFkb2JlLmNvbS9waG90b3Nob3AvMS4wLyIKICAgIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIKICAgIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIgogICAgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIKICAgdGlmZjpJbWFnZUxlbmd0aD0iMjAiCiAgIHRpZmY6SW1hZ2VXaWR0aD0iMjAiCiAgIHRpZmY6UmVzb2x1dGlvblVuaXQ9IjIiCiAgIHRpZmY6WFJlc29sdXRpb249IjcyLjAiCiAgIHRpZmY6WVJlc29sdXRpb249IjcyLjAiCiAgIGV4aWY6UGl4ZWxYRGltZW5zaW9uPSIyMCIKICAgZXhpZjpQaXhlbFlEaW1lbnNpb249IjIwIgogICBleGlmOkNvbG9yU3BhY2U9IjEiCiAgIHBob3Rvc2hvcDpDb2xvck1vZGU9IjMiCiAgIHBob3Rvc2hvcDpJQ0NQcm9maWxlPSJzUkdCIElFQzYxOTY2LTIuMSIKICAgeG1wOk1vZGlmeURhdGU9IjIwMjAtMDYtMTNUMDA6MzI6MjErMDg6MDAiCiAgIHhtcDpNZXRhZGF0YURhdGU9IjIwMjAtMDYtMTNUMDA6MzI6MjErMDg6MDAiPgogICA8eG1wTU06SGlzdG9yeT4KICAgIDxyZGY6U2VxPgogICAgIDxyZGY6bGkKICAgICAgc3RFdnQ6YWN0aW9uPSJwcm9kdWNlZCIKICAgICAgc3RFdnQ6c29mdHdhcmVBZ2VudD0iQWZmaW5pdHkgRGVzaWduZXIgMS44LjMiCiAgICAgIHN0RXZ0OndoZW49IjIwMjAtMDYtMTNUMDA6MzI6MjErMDg6MDAiLz4KICAgIDwvcmRmOlNlcT4KICAgPC94bXBNTTpIaXN0b3J5PgogIDwvcmRmOkRlc2NyaXB0aW9uPgogPC9yZGY6UkRGPgo8L3g6eG1wbWV0YT4KPD94cGFja2V0IGVuZD0iciI%2FPgLfemYAAAGCaUNDUHNSR0IgSUVDNjE5NjYtMi4xAAAokXWRu0sDQRCHPxM1opGIWliIBIlWKjFC0MYi4gvUIongq0kuLyGP4y5Bgq1gKyiINr4K%2FQu0FawFQVEEsbKwVrTRcM4lQoKYWWbn29%2FuDLuzYAkmlZRe64ZUOqv5J33OhcUlp+2Feuy00EVrSNHV2cBEkKr2eU+NGW%2F7zVrVz%2F1rTZGorkBNg%2FCoompZ4SnhmbWsavKOcLuSCEWEz4T7NLmg8J2ph0v8anK8xN8ma0H%2FGFhahJ3xCg5XsJLQUsLyclypZE75vY%2F5Ens0PR+Q2C3eiY6fSXw4mWacMbwMMiKzl348DMiKKvnuYv4cGclVZFbJo7FKnARZ+kTNSfWoxJjoURlJ8mb%2F%2F%2FZVjw15StXtPqh7Noz3HrBtQ2HLML6ODKNwDNYnuEyX8zOHMPwh+lZZcx2AYwPOr8paeBcuNqHjUQ1poaJkFbfEYvB2Cs2L0HYDjculnv3uc%2FIAwXX5qmvY24deOe9Y+QFEC2fWKEm0kwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAdZJREFUOI2llLFrU1EUh7%2FzXmLSFpIsUrDgYiFbBsGhTsFR6qjimsVd+s90KYib4uxasDgILnXJowrWYHEQadLaoeSdn8NLX26S9zTogwv3Xn5897vnPK4B6GujiVkP7CmwiVnMMp+UAp9Au0h7dnM0tAlsH4s6QLQUaAGMIz8EdSPMev8JAxGhqIOsZxq0+pi1%2FxGUjXytxDRojf9as%2Fo2VG8BcPrzFa34pASqtLJUA1YfwsoDAPaSuzxbf7xoByCLK8tdLc2Xv9LGrFkAlaAcGIbxfNvQdDnJKJgvAjUbntnLVaZ7mstVwlw5zALDAFJwaGWxsEXBad9KYTPAMjMBVoX4OgCXqZPKshqWiFSCes8W2+pQ68DqfajdBuDgW8qanU4hc83JDEvMFK9jG2+Y9JWTc+flkbPdfFd+5dww%2FJeuApfHnF8M+HJxg%2FffnY8%2FxmzVX3Bv5Xmh2dXc9Lk1RhZr7iSAg7NHvD17wka1z9baazZrHzCp2A6QlJqOWn1h7SJ9YbjHxIwLG7BQJimJsscRR0y7l+srg4WAuUwwHLRrShpNl+0bUSd718rr8wc7d%2FmhS93I2qNhZOoi35ErkSvFA5PQaM5OrlSuRPiOS91rd0bD31iIPlmy3nObAAAAAElFTkSuQmCC&label=%E4%B8%89%E5%92%B2%E6%99%BA%E5%AD%90%20%E5%8D%B3%E5%88%BB%E8%A2%AB%E5%85%B3%E6%B3%A8&labelColor=282c34&color=f7cf07&query=%24.data.totalSubs&url=https%3A%2F%2Fapi.spencerwoo.com%2Fsubstats%2F%3Fsource%3DjikeFollower%26queryKey%3D5C505995-681E-4C1E-AD4A-1CC683627B6E&longCache=true)](https://web.okjike.com/u/5C505995-681E-4C1E-AD4A-1CC683627B6E)

**本项目仅供学习交流使用，在使用过程中对你或他人造成的任何损失我们概不负责。**

## Features

- ⭐️ 同时支持 Node.js / 浏览器 / Deno
- 🦾 自带 TypeScript 类型声明

<details>
  <summary>API 列表</summary>

- 用户
  - [x] 获取用户信息
  - [x] 刷新 Access Token
  - [x] 发送登录验证码
  - [x] 短信登录
  - [x] 手机号与密码登录
  - [ ] 保存设备 Token
  - [x] 弹一弹头像
- 用户关系
  - [x] 获取关注列表
  - [x] 获取被关注列表
- 动态帖子
  - [x] 发送动态
  - [x] 获取动态详情
  - [x] 分享动态
  - [x] 点赞
  - [x] 取消点赞
- 动态广场
  - [x] 获取动态推荐
- 评论
  - [x] 获取评论
  - [x] 发送评论
  - [x] 点赞
  - [x] 取消点赞
- 动态
  - [x] 获取用户动态
  - [x] 获取关注动态
- 通知
  - [x] 获取通知列表
- 上传
  - [x] 获取上传 token
  - [x] 上传图片

</details>

## Installation

### Node.js

Node.js >= 14.15.0 (推荐 v14.17.0 以上)

```bash
npm i jike-sdk
```

#### ESM 导入

如果使用 ESM 方式导入，需要把 `package.json` 的 `type` 设置为 `module`，或将后缀名改为 `.mjs`。

```ts
// 自带 node-fetch
import { setApiConfig } from 'jike-sdk/node'

// 不带 node-fetch，需要自行 ployfill 或使用最新 Node.js
// import { api, setAccessToken, ApiClient } from 'jike-sdk'

setApiConfig({
  // ...
})
```

#### CJS 导入

```ts
;(async () => {
  const { setApiConfig } = await import('jike-sdk/node')
  setApiConfig({
    // ...
  })
})()
```

### Deno

```ts
import { setApiConfig } from 'https://cdn.skypack.dev/jike-sdk?dts'
```

### 浏览器

```ts
import { setApiConfig } from 'jike-sdk'
```

或使用 CDN 的方式加载（与 Deno 一致）

```html
<script type="module">
  import { setApiConfig } from 'https://cdn.skypack.dev/jike-sdk'
</script>
```

**由于 CORS 策略的原因，第三方网站无法直接请求外部服务器。但可以使用浏览器扩展的能力请求。**

## Usage

[API Reference](https://jike-sdk.surge.sh/)

```ts
import { setApiConfig, setAccessToken, api, ApiClient } from 'jike-sdk'

const apiConfig = {
  endpointId: 'jike',
  endpointUrl: '<jike-endpoint-url>', // 请自行替换
  bundleId: '<bundle-id>', // 请自行替换
  buildNo: '<build-no>', // 请自行替换
  userAgent: '<jike-sdk-user-agent>', // 请自行替换
  accessToken: '<access-token>', // 请自行替换
}
setApiConfig(apiConfig)

setAccessToken('update-access-token')
api.userRelation.getFollowingList('82D23B32-CF36-4C59-AD6F-D05E3552CBF3', {
  limit: 100,
})

// 或使用 ApiClient
const client = ApiClient(apiConfig)
client.users.profile()
```

## Alternatives

- [jike-cli](https://github.com/junbaor/jike-cli) - 即刻命令行客户端 (Java)
- [Jike Metro](https://github.com/Sorosliu1029/Jike-Metro) - 即刻 Ⓙ SDK (Python)
- [Jike-Bus](https://github.com/nondanee/Jike-Bus) - 🚍 即刻 Ⓙ SDK for Node.js
- [JIKEFM](https://github.com/0neSe7en/jikefm) - 即刻电台 📻 (Golang)
- [jikeme](https://github.com/findingsea/jikeme) - 命令行摸 🐟 工具 (Golang)

## License

[AGPL-3.0](./LICENSE) License © 2021-PRESENT [三咲智子](https://github.com/sxzz)
