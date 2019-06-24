# S2(sill 2)

  一个基于[ng-alain](https://github.com/ng-alain/ng-alain/)（8.0.0-rc.0），具有多应用构建能力的脚手架模板。

## 说明

目前绝大多数基于Angular的模块或者脚手架都是单应用构建的，也就说说，一套代码仅能构建一份app，对于一个产品来说，可能根据功能组合不同形成不同版本，例如，完整版包含10个功能，标准版包含5个功能，简化版包含3个功能，
解决方案也有，比如说，将各个功能模块发布成node package，然后构建各版本的应用，或者通过大量的配置参数，从外部传入构建参数，从而达到构建指定版本，这两者各有各的好处，也各有各的坏处：方式一，模块依赖、设计、发布对团队要求较高，
模块更新需要所有产品同步更新，而且，需要逐一维护模块项目；方式二，大量的版本配置信息使得项目结构整体复杂度较高，同样的，对团队整体能力要求较高。

为了在复杂度和功能性之间找到一个平衡，S2借鉴java技术栈中maven/gradle的一些理念，将所有代码都放在一个工程中维护，适应绝大多数团队的开发模式（手动滑稽），业务功能模块可最高限度的复用，每个产品都是具体的独立的，
不需要维护复杂的配置信息，每个产品做好自己的配置版本开发就行。

[ng-alain](https://github.com/ng-alain/ng-alian)是一个优秀的基于[Angular](https://github.com/angular/angular) [ng-zorro-antd](https://github.com/NG-ZORRO/ng-zorro-antd) [@delon](https://github.com/ng-alain/delon)的脚手架，文档也比较丰富比较全面，
因此，S2选择基于它做了一些重构来达到多应用构建的能力，并且，以此为基础，提供一些我们团队研发过程中碰到的需求能力，力争提供一套扩展性、通用性、灵活性上找到最优方案。

殷切期盼各位开发者为本项目提出宝贵的意见与建议，共同发展S2。

## 目录结构

| 目录 | 说明 |
| --- | --- |
| build | 多应用构建脚本，由 [@wioo](https://github.com/wiootk) 贡献 |
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
