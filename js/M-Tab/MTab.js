/**
 * Created by Jai on 2017/11/27.
 *
 *
 * var modalname=name.int({
 * container:父容器，默认为body，我们会撑满你所规定的整个父元素，
 * 请务必将父元素定义为你想要的大小
 * 请确保顺序正确
 * content：{[{title:"",tpl:"html template"},{title:"",tpl:"html template"}...]},将需要展示的html内容顺序书写，
 * 关联顺序与title顺序一致
 * theme:可选参数，主题颜色,请务必输入有效的颜色值
 * callback:fn我们提供了一个组件加载完成的返回方法，
 * titleClick：fn(index)我们提供了一个点击title的返回方法，返回值为点击title的索引
 * modalname.refresh：({ modalname为当前组件的初始化名字，用于一一对应
 * content：我们也可以重新加载组件，可选参数为title与content
 * 其他参数同初始化参数
 * })
 * })
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
    "text!js/M-Tab/Tabtpl.html",
    "css!js/M-Tab/Tabcss.css"
],function($,_,tpl){
    var globaldata="";
    function init(options){
        var defaultData={
            container:"body",
            theme:"#f44336",
            callback:null,
            titleClick:null,
            content:{data:[{title:"title1",tpl:"<div>content1</div>"},{title:"title2",tpl:"<div>content2</div>"}]}
        };
        globaldata = _.extend(defaultData, options);//整合数据
        //数据整合完毕，开始渲染模板
        showTpl();
    }
    //重加载当前组件方法
    function refreshTpl(data){
        globaldata=_.extend(globaldata, data);
        showTpl();
    }
    function showTpl(){
        //渲染模板开始，第一步渲染顶部标题
        var data=globaldata.content;
        var html= _.template($(tpl).html(),data);
        $(globaldata.container).html(html);
        //顶部标题渲染完成，开始渲染下面的内容部分
        if(globaldata.content){
            var contentHtml="";
            for(var c=0;c<globaldata.content.data.length;c++){
                $(".js-content"+c).append(globaldata.content.data[c].tpl);
            }
        }else{
            alert("数据格式有误或根本不存在。")
        }
        //所有内容都渲染完毕，开始注册事件
        defaultJS();
    }
    function defaultJS(){
     $(".tab-title-nav").on("click",".tab-title",function(eve){
        var target=$(eve.currentTarget);
        var index=target.attr("data-pindex");
         var len=$(".tab-content-child").length;
         for(var l=0;l<len;l++){
             if($(".tab-content-child").eq(l).hasClass("tab-hide")){
             }else{
                 $(".tab-content-child").eq(l).addClass("tab-hide");
                 $(".js-triangle"+l).addClass("tab-hide")
             }
         }
         $(".js-content"+index).removeClass("tab-hide");
         $(".js-triangle"+index).removeClass("tab-hide");
         if(typeof (globaldata.titleClick)=="function"){
             globaldata.titleClick(index);
         }
     });
        //执行自定义回调函数
        if(typeof (globaldata.callback)=="function"){
            globaldata.callback();
        }
        //事件绑定完毕，开始定制主题色
        personalTheme();

    }
    function personalTheme(){
        if(globaldata.theme){
            $(".tab-title").css({
                "background":globaldata.theme
            });
            $(".tab-title-nav").css({
                "background": "-webkit-linear-gradient(left,"+globaldata.theme+", rgba(0,0,0,0))",
                "background": "-o-linear-gradient(right, "+globaldata.theme+", rgba(0,0,0,0))",
                "background": "-moz-linear-gradient(right,"+ globaldata.theme+", rgba(0,0,0,0))",
                "background": "linear-gradient(to right,"+globaldata.theme+ ", rgba(0,0,0,0))"
            })

        }
    }
    function starttab(options){
        init(options);
        //为返回的值增加一个重加载方法
        this.refresh=function(redata){
            refreshTpl(redata);
        };
        return this;
    }
    return{
        int:starttab
    }

});

