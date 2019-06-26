# 头部主题切换组件
## 介绍
该组件提供`主题切换`功能，点击下拉列表项可进行切换，列表为`可选主题列表`  
## 参数
### 来源：
子项目的配置文件`local-data.ts`会merge合并全局配置文件`global-data.ts`  
### 结构：
```
const theme = {
    'default': 'default', // 默认主题
    'merge': false, // 是否合并系统预置主题
    'options' :{    // 可选主题列表
    },
    'systemTheme':{		// 系统预置主题列表
        black:'theme.black',
        red:'theme.red',
        blue:'theme.blue',
        cyan:'theme.cyan',
    }
}
```

## 规则：
1. 当 `merge`为`true`时,可选主题列表为：  
`options`主题列表`merge`合并`systemTheme`主题列表
2. 当 `merge`为`false`时,可选主题列表为：  
`options`的主题列表
3. 系统默认主题优先切换上次离开时选择的主题
3. 当 `可选主题列表`长度为`0`时：  
`不提供`切换主题功能，系统主题为`系统默认蓝色主题`
4. 当 `可选主题列表`长度为`1`时：  
`不提供`切换主题功能，系统主题为`可选主题列表中唯一的主题`
5. 当 `可选主题列表`长度大于`1`时：  
`提供`切换主题功能
	- 当 `default 在可选主题列表`中时，切换为`default主题`
	- 当 `default 不在可选主题列表`中时，提示`‘默认主题设置有误’`，切换为`可选主题列表的任意主题`  
