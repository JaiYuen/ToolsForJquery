/**
 * Created by Jai on 2017/11/21.
 * name.int({
 * container
 * theme
 * background
 * })
 * 1.container:父容器
 * 2.
 * 3.在2的基础上，可以在background中设置背景颜色或背景图片
 * (color/16进制或rgb rgba;url/图片链接地址)
 * 4.我们还提供了一些hover样式：hoverpar：父title的hover;chilhover：子title的hover
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
    "text!js/Toptitle/titles.html",
    "css!js/Toptitle/style.css",
    "css!js/Toptitle/hover.css"
],function($,_,tpl){
    var globaldata="";
    //......................................................
    function inint(options){
        var defaultData={
            theme:"#F44336",
            background:"color/transparent",
            container:"body"
        };
        globaldata=_.extend(defaultData,options);
        showTitle();
    }

    function showTitle(){
    //我们先请求本地json
        $.get("js/Toptitle/title.json", function(result){
            //渲染模板-----------------------------------------------
            var data=JSON.parse(result);
            var len=data.data.length;
            var html= _.template($(tpl).html(),data);
            $(globaldata.container).html(html);
            personalStyle(len);
        });
    //模板加载完毕，开始设置用户自定义样式

    }
    function personalStyle(lens){
        //默认设置partitle的宽度
        var parwidth=Math.floor(100/lens);
        $(".partitle").css({
           "width":parwidth+"%"
        });
        //设置主题颜色
        if(globaldata.theme !=="#F44336"){
          $("#Jtitle").css({
              "border-bottom":"2px solid"+" "+globaldata.theme
          });
          $("#Jtitle .all_chititle").css({
              "border":"1px solid"+" "+globaldata.theme
          });
        }
        if(globaldata.background!=="color/transparent"){
            //判断是颜色值还是路径
            var kind=(globaldata.background.split("/"))[0];
            if(kind=="url"){
                 $("#Jtitle").css({
                     "background":(globaldata.background.split("/"))[1]
                 })
            }else if(kind=="color"){
                $("#Jtitle").css({
                    "background":"url"+"("+(globaldata.background.split("/"))[1]+")"
                })
            }

        }
    }
    function startTitle(options){
        inint(options);
    }
    return{
        int:startTitle
    }
});