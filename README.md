# vue-eb-calendar

> 我的自制Vue日历插件，希望通过对此插件的开发，加深自己对Vue的使用。

## 插件的使用

### 安装

```bash
# 安装
npm install vue-eb-calendar --save

# 使用
import vueEbCalendar from 'vue-eb-calendar'

Vue.use(vueEbCalendar)

<vue-eb-calendar></vue-eb-calendar>
```



![默认](https://github.com/jiadaoka/vue-eb-calendar/blob/master/eb-001.PNG)



### 显示与隐藏

| 参数     | 类型 | 备注                                                         |
| -------- | ---- | ------------------------------------------------------------ |
| dateShow | prop | （可选）默认为true，类型为Boolean。控制插件的显示和隐藏。    |
| on-clone | 事件 | 当插件中的相应按钮被点下时，触发此事件。主要用于改变isShow的值。 |

### 插件的功能

| 参数      | 类型 | 备注                                                         |
| --------- | ---- | ------------------------------------------------------------ |
| valueDate | prop | （可选）默认为true，类型为Boolean。控制插件是否展示触发on-clone事件的元素。 |
| toDay     | prop | （可选）默认为true，类型为Boolean。控制插件是否开启时钟效果。 |
| yearMax   | prop | （可选）默认为true，类型为Boolean。控制日历的最大年份。      |
| yearMin   | prop | （可选）默认为true，类型为Boolean。控制日历的最小年份。      |
| output    | 事件 | 当日期被选择日期，插件带着日期触发此事件。                   |

> 若yearMax和yearMin只有一个被设置时，则从yearMax（yearMin）向前（后）算49年，作为未被设置的yearMin（yearMax）的值。
>
> 若两个都没有被设置，则从当前年份向前算24年作为yearMin的值，向后算25年作为yearMax的值。
>
> 若设置后yearMin的值比yearMax大，则无法生成年份列表。



## 文件目录结构


```bash
│  .babelrc				# ES6语法编译配置
│  .editorconfig		# 代码格式通用配置
│  .gitignore			# git上传文件配置
│  eb-001.PNG			# 插件实际效果截图
│  index.html			# 主页模板
│  package.json			# 项目基本信息
│  README.md			# 项目说明
│  v2-0601f0082cad2114446150cdfa42aec5_hd.jpg	# 网上找到的，按此图设计插件
│  webpack.config.js	# webpack配置
│      
├─dist	# 发行版本文件夹
│      vue-eb-calendar.js		# 发行版本核心JS
│      vue-eb-calendar.js.map	# map文件
│      
├─node_modules			
│                  
└─src	# 开发文件夹
    │  App.vue	# 开发根Vue
    │  main.js	# 开发主入口
    │  
    └─lib	# 开发时项目文件夹
        │  calendar.vue			# 组件
        │  index.js				# 项目入口
        │  vue-eb-calendar.vue	# 项目根Vue
        │  
        └─components	# 组件
                select.vue		# 组件
```



## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build
```

For detailed explanation on how things work, consult the [docs for vue-loader](http://vuejs.github.io/vue-loader).
"# vue-eb-calendar" 
