# 主题服务

## 介绍
  
该服务为应用提供多主题皮肤的换肤功能，默认提供了四种主题：蓝色（默认）、红色、青色、黑色  

## 原理  

该服务动态替换根元素（app-root）的class来达到动态换肤的效果  

## 使用

1.   组件ts文件注入依赖文件  
    ```
    constructor(protected themeService:ThemeService) { }
    ```
2.   组件模板html文件调用服务切换主题  
    ```
     <button (click)="themeService.changeTheme('black')">黑色主题</button>
    ```

## 拓展主题 

1. 添加主题，获取要修改的主题参数：  
    参照[主题系统](https://ng-alain.com/theme/getting-started/zh)修改主题参数:
    [全局参数](https://ng-alain.com/theme/global/zh)、
    [默认布局](https://ng-alain.com/theme/default/zh)、
    [全屏布局](https://ng-alain.com/theme/fullscreen/zh)
2. 新建主题文件`src/styles/theme.[主题名].less`  
    ```less
    // #region PLACEHOLDER, IMPORTANT: don't remove
    .theme-[主题名] {
      @import "./styles.less";
    // 上一步获取到的主题参数
    }
    // #endregion
    ```
3. 将该主题添加编译,修改`angular.json`  
    ```json
    "build": {                    
        "options": {                        
            "styles": [
               ...
                "src/styles/theme.[主题名].less"
            ],                        
        },
       
    },               
    "test": {
        "options": {                        
            "styles": [
               ...
                "src/styles/theme.[主题名].less"
            ]
        }
    }
    ```
*[主题名]：为将要使用的主题代码，字母全小写*

