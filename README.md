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



