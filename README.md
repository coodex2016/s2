# S2

一个基于ng-alain（8.0.0-rc.0），具有多应用构建能力的脚手架模板。

## 目录结构

| 目录 | 说明 |
| --- | --- |
| src | 源码目录 |
| -- @concrete | 后台接口服务模块，由[concrete](https://github.com/coodex2016/concrete.coodex.org)生成，非必须。TODO 使用npm package管理 |
| -- commons | 通用组件、服务、指令等，与业务功能无关 |
| -- globals | 跨模块（参见modules）复用服务、组件、指令、模块依赖等，例如跨模块复用的数据类型、功能等 |
| -- modules | 业务模块，每个业务模块对应一个导航菜单项和一系列功能界面 |
| -- environments | 环境变量，包括运行环境相关定义 |
| -- products | 各个产品的根目录 |
| -- styles | 皮肤的样式（less）目录。TODO 补充theme |

## 基于ng-alain的改造

- step 1
  - mv src/app/\[core, layout, shared\]/i18n to src/commons/
  - mv src/commons/core/startup to src/app/core
  - modify src/commons/core/index.ts
  ```ts
  // 将startup.service移除通用部分
  // export * from './startup/startup.service';
  ```
  - [package.json](package.json)增加代理配置 `--proxy-config proxy.config.json`
  - mv src/app src/products/ngAlainApp // 调整成目标架构
  - modify angular.json的入口点

