# ASF-Tools
小工具

### 项目安装

```
npm install
```

### 启动
```
npm run serve  热启动 -默认浏览器打开
```

### 项目打包
```
npm run build
```


### 提交规范

Header Header 部分只有 1 行，格式为<type>: <subject>。

type 用于说明提交的类型 subject 用于概括提交内容。

1. feat：新功能（feature） 
2. fix：问题修复 
3. style：调整格式（不影响代码运行）
4. upDate :  更新代码 



### 文件夹结构

```
├─public
│          
└─src	
    │  App.vue
    │  main.js
    │  
    ├─assets				静态文件
    │  ├─css
    │  ├─fonts  
    │  ├─img      
    │  ├─js		
    │  │      
    │  └─json
    │          
    ├─components
    ├─layout				导航栏
    │      
    ├─plugins				第三方插件
    |
    ├─router				路由
    │
    ├─store
    │
    ├─utils					工具函数 
    |
    └─views
        ├─checkArticle 		枝网查重
        |
        ├─emojis    		表情包页面
        |
        ├─fanQuery     		粉丝查询
        |
        ├─part        		成分姬
        |
        ├─randomVideo  		随机溜冰
        |
        ├─streamArchives  	直播归档 
        |
        ├─Timeline     		大事件时间线   
        |
        └─wordCloud			词云
                    



```

