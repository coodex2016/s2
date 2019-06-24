# S2

一个基于ng-alain（8.0.0-rc.0），具有多应用构建能力的脚手架模板。

## 目录结构

| 目录 | 说明 |
| --- | --- |
| build | 多应用构建脚本 |
| src | 源码目录 |
| -- @concrete | 后台接口服务模块，由[concrete](https://github.com/coodex2016/concrete.coodex.org)生成，非必须。TODO 使用npm package管理 |
| -- commons | 通用组件、服务、指令等，与业务功能无关 |
| -- globals | 跨模块（参见modules）复用服务、组件、指令、模块依赖等，例如跨模块复用的数据类型、功能等 |
| -- modules | 业务模块，每个业务模块对应一个导航菜单项和一系列功能界面 |
| -- products | 各个产品的根目录 |
| -- styles | 皮肤的样式（less）目录。TODO 补充theme |
| proxy.config.template.json | 不要修改，复制为`proxy.config.json`(不会被纳入git管理)，需要调试时，修改新文件即可 |

## 基于ng-alain的改造

- step 1 基于ng-alain结构改造
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
- step 2 多应用构建
  - `ng add ngx-build-plus@^8.0.0` 添加 `ngx-build-plus^8.0.0` 插件，用于。。。。
  - `scripts`目录中相关脚本，TODO: 注释
- step 3 最小化应用 TODO: 脚本化
  - products/demoApp，参见表一
  - modules/demo-module
  - cp src/commons/layout src/commons/s2/layout
  - new src/globals/global_data.ts // 用来定义全局常量，各产品可选择性覆盖，参考[local-data.ts](src/products/demoApp/local-data.ts)
  - TODO 完善
  - 实践建议：
    - git clone depth=1
    - remove src/products/ngAlainApp
    - remove src/commons/layout
    
  
### 表一

| 文件 | 作用 |
| --- | --- |
| main.ts | app 入口文件 |
| app.module.ts | app 应用的根模块，负责引入所需的Module |
| app.component.ts | app 应用的根组件 |
| routes.module.ts | app 根路由 |  
| delon.modules.ts | delon 相关设置，用于@delon模块组件及服务的设置 |
| local-data.ts | 本产品的常量设置，可对[global-data.ts](src/globals/global-data.ts)的部分内容产品化覆盖 |


## change logs

- 增加 `npm i --save @types/lodash` 支持object merge，用来进行globalData和localData的合并
