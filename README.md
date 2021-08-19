# ASF-Tools

#### 介绍
小工具1.0前端仓库
#### 项目安装

```
npm install
```

#### 启动
```
npm run serve  热启动 -默认浏览器打开
```

#### 项目打包
```
npm run build
```


#### Commit提交规范

##### Header Header 部分只有 1 行，格式为 < type > : < subject >。

###### type 用于说明提交的类型： 

1. Feat：增加**新**功能
2. Fix：问题**修复** 
3. Style：只修改了**样式**，即不影响业务逻辑功能等
4. UpDate :  更新原有代码，例如优化性能、 需求变更等

###### subject 用于说明提交内容：

1. 简要概括即可
2. 使用中文


#### 文件夹结构

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

