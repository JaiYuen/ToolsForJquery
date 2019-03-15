# ToolsForJquery

------

此工具包含了一些开发中需要的基本插件：

## 简介：

使用jquery，采用require方式引入，使用underscore.js做了一些必要的数据处理，为做到易于使用，其中的插件只需要用户初始化时配置变量即可，详情可见代码注释。

### 1. modal（弹出对话框） 

| 参数名        |  值  |  介绍  |
| --------   | -----:  | :----:  |
| title     | string |   标题    |
| theme        |    string（"img/url" "color/#66ccff"）    |  主题  |
| button        |   boolen or string，default:true   |   是否启用底部按钮   |
| text        |    string    |  显示内容  |
| context        |    Html    |  显示结构  |
| delay        |    boolen or number,default:false     |  是否自动关闭  |
| container        |    default:$(body)    |  父容器  |
| cancle        |    function    |  关闭回调  |
| simple        |    function    |  极简模式  |

### 2. carousel(图片轮播)
| 参数名        |  值  |  介绍  |
| --------   | -----:  | :----:  |
| container     | \$(body) |  父元素    |
| auto        |    boolen default:true    |  是否自动播放  |
| speed        |   number default:2000(ms)  |   自动播放速率   |
| animate_speed        |    number default:500(ms)    |  动画切换速率  |
| cir_release        |   boolean default:true    |  是否开启底部计数点  |
| beforeChange        |    function(index)     |  切换之前的回调  |
| afterChange        |  function(index)    |  切换之后的回调  |
| next()       |    function    |  切换到下一张  |
| prev()        |    function    |  切换到上一张  |
| goTo()        |    function    |  切换到指定索引  |


### 3.collapse(折叠面板)
| 参数名        |  值  |  介绍  |
| --------   | -----:  | :----:  |
| data        |   /  |   数据源  |
| callback        |    Html    |  完成一次切换后的回调  |
| speed        |    number,default:300ms     |  切换速率  |
| container        |    default:$(body)    |  父容器  |

下面是data数据源试例
```javascript
 var data={data:[
            {partitle:"rolling one",children:[
                {text:"我们需要定义父元素",url:"#"},{text:"组件宽度会撑满父元素",url:"#"},{text:"为了不对其他元素影响，请务必设置父元素relative",url:"#"}
            ]},
            {partitle:"rolling two",children:[
                {text:"默认主题色为#f44336，我们也可以在theme中自定义",url:"#"},{text:"speed中可以调整动画时间",url:"#"},{text:"*********************",url:"#"}
            ]},
            {partitle:"rolling three",children:[
                {text:"我们还提供了一个返回方法",url:"#"},{text:"mega V1.0",url:"#"},{text:"**********************",url:"#"}
            ]},
            {partitle:"rolling four",children:[
                {text:"Jai-Yuen",url:"#"}
            ]}
        ]};
         var co=Collapser.int({
            container:".collapser-list",
            theme:"#66ccff",
            data:data,
            speed:200
        });
```


### 4. moment(日历选择)
| 参数名        |  值  |  介绍  |
| --------   | -----:  | :----:  |
| component        |Array： ["id","id","id","id"] | 需要此组件元素的id数组 |
| theme        |   string    |  主题色  |
| text_style        |    string default:'/'     | 点击回调，返回选择的字符串（包括你定义的分割符） |
| had_check        |    function()   |  父容器  |
| reload        |    function()   |  当你改变默认日期时的回调 |


### 5.steps(步骤条)
| 参数名        |  值  |  介绍  |
| --------   | -----:  | :----:  |
| container        |\$(body) | 父元素 |
| theme        |   string    |  主题色  |
| data        |    /     | 数据源 |
| defaultButton        |    boolean default:true  |是否开启可编辑模式 |
| data_store       |    boolean default:true  |是否开启前端数据存储机制,若需与后台交互，需关闭|
| direction        |    'vertical'\|'horizontal'  |方向,默认为水平(horizontal)|

下面是数据源试例
```javascript
data:[{title:"step1",detail:"洛水之波，沐浴人心",status:"finish"},
                  {title:"step2",detail:"小隙沉舟，同心方可勠力",status:"finish"},
                  {title:"step3",detail:"为天下苍生，自当化解私怨",status:"error"},
                  {title:"step4",detail:"以德报怨，怨消恨解",status:"wait"}]
```

### 6.easepage(分页插件)

| 参数名        |  值  |  介绍  |
| --------   | -----:  | :----:  |
| container        |\$(body) | 父元素 |
| theme        |   string    |  主题色  |
| search        |    boolean default:true    | 是否允许搜索框 |
| ellipsis        |    number  |自定义省略，默认情况下将展示前number（number=10）项 |
| language       |    'CHN'\|'ENG'\|'JAP'\|'FRE' default 'CHN' |通用语言|
| direction        |    'vertical'\|'horizontal'  |方向,默认为水平(horizontal)|
| params        |   object    |  请求的其他参数  |
| ajaxurl        |   string    |  请求的地址，必须  |
| type        |   'GET'\|'POST' default:'GET'   |  当成功翻阅时调用，返回值为成功页的索引  |
| newpageFn        |   function(index)    |  主题色  |
| loaded        |   function()    | 当成功加载时的回调|
| failedpage        |   function()    | 当翻阅失败时的返回，我们判断的依据是返回值的result(!==0)的值  |
| next()        | number\|'next'      |  执行跳页  |

### 7.tab(标签页)

| 参数名        |  值  |  介绍  |
| --------   | -----:  | :----:  |
| container        |\$(body) | 父元素 |
| theme        |   string    |  主题色  |
| content        |    object   | 内容 |
| titleClick        |  function(index) |点击tab的返回|
| refresh({content})       |    function()|重新加载组件,可选参数为content,其他参数同初始化参数|

### 8.oriImg(查看原图)

使用方法：
```javascript
/**
 * 1.当初始化时，需要确保使用者Dom加载完毕
 * 2.为img标签加上名为“ori_img”的类
 */
```

### 9.popover(气泡卡片)
使用方法：
```javascript
/**
 * Created by Jai on 2017/11/30.
 * 1.将需要提示框的元素添加类class="pop_window",并在data-pop属性中添加提示框的内容,在data-color中可以自定义颜色，默认为#F44336
 * 如<div class="pop_window" data-pop="哲学复兴，不可避免" data-color="#f44336"></div>
 * 2.除此之外什么都不用做了
 */
```
### 10.shutter(滚动文字面板)

| 参数名        |  值  |  介绍  |
| --------   | -----:  | :----:  |
| data        |/ | 数据源 |
| container        |\$(body) | 父元素 |
| theme        |   string    |  主题色  |
| delay        |    number default:2000(ms)   | 自定义切换的时间 |
| goToLoad        |  function(index) |即将开始切换时的回调函数，返回切换前的索引|
| hadLoad      |    function(index)|成功切换后的返回函数，我们会返回切换后的显示索引|
| openTime      |    boolean default:false|是否开启时间显示|
| holdStop      |     boolean default:true|是否开启鼠标浮动时暂时停止循环|
| nextTo(index)      |    method|强制跳入某一项，参数为空则跳入下一项|
| rebuild(object)     |    method|重新加载组件，参数同上，我们会保留原始参数或你覆盖之|
| stopRoll()      |    method|停止当前循环|

下面是数据源试例:

```javascript
 data:[{
                content:"其形也，翩若惊鸿，婉若游龙",
                timeCurrent:"2017/07/5",
                hot:"true"
            },{
                content:"荣耀秋菊，华茂春松",
                timeCurrent:"now_current"
            },{
                content:"仿佛兮若轻云之蔽月，飘摇兮若凌风之回雪",
                timeCurrent:"now_current",
                hot:"true"
            },
                {
                content:"芳泽无加，铅华弗御",
                timeCurrent:"now_current"
            },{
                content:"含辞未吐，气若幽兰",
                timeCurrent:""
            }]
```





