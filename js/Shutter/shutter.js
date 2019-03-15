/**
 * Created by Jai on 2017/12/5.、
 * name.int({
 * container
 * data:[{
 * content:"there some text",
 * timeCurrent:"2017/12/5"/"nowcurrent"
 * },......]
 * delay:ms
 * theme
 * gotoload
 * reload
 * opentime
 * holdStop:
 * })
 * =下面是参数介绍==
 * container：父容器，默认为body，在默认情况下如无body标签,组件失效
 * data：以数组的方式传入，每个对象中有两个属性1.content：自定义显示的内容2.timeCurrent：时间栏，
 * 但你可以输入时间或任意的数据，或者输入“now_current”：此时我们会自动加载当前的日期(peking time,不包括时间戳)
 * delay：自定义切换的时间（毫秒），默认为2000
 * theme:自定义主题色，确保您输入的是有效的颜色值
 * goToLoad：即将开始切换时的回调函数，返回切换前的索引
 * hadLoad：当成功切换后的返回函数，2我们会返回切换后的显示索引
 * openTime:是否开启时间显示，默认为false,
 * holdStop:我们会在鼠标浮动时暂时停止循环，你也可以false禁用该功能
 * type:"kieru_hide"/"hide",两种切换模式，默认为“hide”
 * =下面使我们给你提供的命令==
 * .nextTo(index):强制跳入某一项，参数为空则跳入下一项
 * .rebuild()重新加载组件，参数同int，我们会保留原始参数或你覆盖之
 * .stopRoll()停止当前循环
 *
 */
require.config({
    paths: {
        "jquery": "js/jquery",
        "underscore": "js/underscore",
        "text": "js/require/requirejs-text/text",
        "css": "js/require/requirejs-css/css.min"
    }
});
define([
    "jquery",
    "underscore",
    "text!js/Shutter/shuttertpl.html",
    "css!js/Shutter/sguttercss.css",
    "css!js/IconFont/iconfont.css"
],function($,_,tpl){
    var globaldata="";
    function init(options){
        var defaultData={
            theme:"#f44336",
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
            }],
            delay:2000,
            goToLoad:null,
            hadLoad:null,
            container:"body",
            openTime:true,
            type:"hide"
        };
        globaldata = _.extend(defaultData, options);//整合数据
        //数据整合完毕，开始加载模板

        showTpl();
    }
    function showTpl(){
        if(!globaldata.data){
            alert("确保你的数据已定义或格式正确");
        }else{

            var hot_i="<i class='icon iconfont icon-BAI_xingxing'></i>";
            _.each(globaldata.data,function(item,index){
                if(item.hot=="true"){
                    item.content=item.content+"  "+hot_i
                }
            });
            var tdata={data:globaldata.data,timebox:globaldata.opentime};
            var html= _.template($(tpl).html(),tdata);
            $(globaldata.container).append(html);
            //这里开始先绑定一次时间
             once_default();
            //开始
            if(globaldata.type=="hide"){
                setInterval(function(){
                    if("function"===globaldata.goToLoad){
                        //获取其索引值
                        var target=$($(".outer-shutter")[0]);
                        var tar_index=target.attr("data-index");
                        globaldata.goToLoad();
                    }
                    heightRoll()
                },globaldata.delay)
            }else if(globaldata.type=="kieru_hide"){
                setInterval(function(){
                    if("function"===globaldata.goToLoad){
                        globaldata.goToLoad();
                    }
                    cloneRoll()
                },globaldata.delay)
            }

        }
    }
    function once_default(){

    }
    function heightRoll(){
        //利用缩减高度方式实现
        //++++++++++++++++++++++++++++++++++++++++++++++++++
        //先抓取第一个元素
        var JustOneDom=$($(".outer-shutter")[0]);
        //将其clone一次
        var NewAddDom=JustOneDom.clone();
        //执行动画，头发渐渐消失
        JustOneDom.animate({
            height:"0",
            padding:"0"
        },globaldata.delay,null,function(){
            //完毕后删除此节点，再将先前clone的甩到末尾
            JustOneDom.remove();
            $("#denim-shutter").append(NewAddDom);
        });
    }
    function cloneRoll(){
        //利用JQuery的clone()方法实现
        //++++++++++++++++++++++++++++++++++++++++++++++++++
        //先抓取第一个元素
        var JustOneDom=$($(".outer-shutter")[0]);
        //将其clone一次
        var NewAddDom=JustOneDom.clone();
        //然后将之删除，但保留他的盒子(删除其子元素)
        JustOneDom.children().remove();
        //执行动画，让原来的盒子慢慢消失
        JustOneDom.animate({
            height:"0",
            padding:"0"
        },globaldata.delay,null,function(){
           //完毕后删除此节点，再将先前clone的甩到末尾
           JustOneDom.remove();
           $("#denim-shutter").append(NewAddDom);
        });

    }
    function startshutter(options){
        init(options);
        //在这里增加方法
    }
    return{
        int:startshutter
    }
});

