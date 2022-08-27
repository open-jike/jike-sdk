我们推荐使用 [pnpm](https://github.com/pnpm/pnpm) 作为包管理工具

## 1. 下载项目、安装依赖

```shell
git git@github.com:open-jike/jike-sdk.git
cd jike-sdk
pnpm install
```

## 2. 创建本地开发文件

- 新建 `playground/main.ts` 文件
- 编写代码，例如:

```ts
import { api, setApiConfig } from '../src'

setApiConfig({
  endpointId: 'jike',
  endpointUrl: '<jike-endpoint-url>', // 请自行替换
  bundleId: '<bundle-id>', // 请自行替换
  buildNo: '<build-no>', // 请自行替换
  userAgent: '<jike-sdk-user-agent>', // 请自行替换
  accessToken: '<access-token>', // 请自行替换
  appVersion: '<app-version>', // 请自行替换
  deviceId: '<device-id>', // 请自行替换
})

api.topics
  .getTabsSquareFeed('562dfeb0daf87d13002cad92', {
    limit: 10,
  })
  .then((res) => {
    console.log('请求成功', res.data.data)
  })
  .catch((err) => {
    console.log('请求错误', err)
  })
```

## 3. 运行本地开发文件

```shell
pnpm run dev
```

## 4. 测试

1. 新建 `tests/config.ts` 配置文件, 内容如下:

```ts
export const config = {
  endpointId: 'jike',
  endpointUrl: '<jike-endpoint-url>', // 请自行替换
  bundleId: '<bundle-id>', // 请自行替换
  buildNo: '<build-no>', // 请自行替换
  userAgent: '<jike-sdk-user-agent>', // 请自行替换
  accessToken: '<access-token>', // 请自行替换
  appVersion: '<app-version>', // 请自行替换
  deviceId: '<device-id>', // 请自行替换
}
```

2. 新建测试文件, 如 `tests/api/topics.test.ts`, 编写测试代码

3. 执行测试用例

```shell
pnpm run test

# 测试指定的测试文件, 如只测试新增的 topics.test.ts
pnpm run test topics
```
