/**
 * Created by jAi on 2017/11/22.
 * name.simple("sometext")
 * name.int({
 * container:
 * theme:
 * buttom:
 * text:
 * content:
 * title:
 * delay:
 * })
 * 1.我们可以在theme中定义主题颜色或者主题背景:"color/16 rgba rgb"
 *   或"img/'url'",请务必带上斜杠前的字段
 * 2.button:是否允许默认按钮:false 或者 "标题/标题",请务必按格式输入
 * 3.text:内容框显示的文字
 * 4.context:务必输入正确的html格式，将紧接着text内容显示
 * 5.title:标题
 * 6.delay:ms/false 是否为自动关闭模式，若开启则输入毫秒数
 * 7.container:父容器，默认为body
 * 8.cancle：我们提供了容器关闭后的返回方法
 * 9.我们也可以使用极简模式：name.simple("显示的内容")，如同browser自带的alert
 */
require.config({
    paths: {
        "jquery": "js/jquery",
        "underscore": "js/underscore",
        "text": "js/require/requirejs-text/text",
        "css": "js/require/requirejs-css/css.min",
    }
});
define([
    "jquery",
    "underscore",
    "text!js/AlertIJ/alertij.html",
    "css!js/AlertIJ/alertij.css",
    "css!js/AlertIJ/hover.css"
], function ($, _, tpl) {
    var globaldata = "";

    function inint(options, kind) {
        var defaultData = {
            container: "body",
            callback: null,
            delet: null,
            text:null,
            title:"Attention！",
            cancle: null,
            delay: false,
            button: false,
            content:null
        };
        globaldata = _.extend(defaultData, options);//整合数据
        if(kind=="simple"){
            globaldata={
                container:"body",
                title:"Attention！",
                delay:2000,
                button:"cancle",
                content:null,
                text:options
            }
        }
        showTpl("normal");
    }

    //-----------------------------------------------------
    function showTpl(model) {

        if (model == "normal") {
            var nhtml = _.template($(tpl).html())({
                title: globaldata.title,
                rightbot: "CANCEL",
                leftbot: "YES",
                text: globaldata.text
            });
            $(globaldata.container).append(nhtml);
            //渲染样式
            userTheme();

        } else if (model == "simple") {
            console.log("it's simple");

        }
        ArisAnimatin();

        //绑定事件
        defaultJS();
    }

    //-----模板加载完毕后执行登场动画--------------------
    function ArisAnimatin() {
        //本体
        $("#alertij").addClass("isopen");
        //背景
        var bgHtml="<div class='bgij'></div>";
        $("body").append(bgHtml);
        setTimeout(function () {
            $("#alertij").css("transform", "rotateX(0)").removeClass("isopen");
        }, 1000);
        if (globaldata.delay) {
            setTimeout(function () {
                GeminiAnimation();
            }, globaldata.delay)
        }
    }
    //------绑定事件-------------------------
    function defaultJS() {
        $(".js-cancel").off().on("click", function () {
            GeminiAnimation();
            if (typeof(globaldata.cancle) == "function") {
                globaldata.cancle();
            }
        });
        $(".js-sure").off().on("click",function(){
            if (typeof(globaldata.sure) == "function") {
                globaldata.sure();
            }
        })
    }
    //-------点击按钮执行退场动画-----------------
    function GeminiAnimation() {
        $("#alertij").addClass("ishide");
        setTimeout(function () {
            $("#alertij").remove();
        }, 1000);
        //完成后直接删除整个组件
        $(".bgij").remove();
    }
    //---------用户自定义主题等样式-------------------------
    function userTheme() {
        //color
        if (globaldata.theme) {
            $(".titleij").css({
                "color": globaldata.theme
            });
            $(".defaultbot").css({
                "background": globaldata.theme
            })
        }
        //botton
        if (globaldata.button !== false&&globaldata.button!=="cancle") {
            var arrayB = globaldata.button.split('/');
            $(".js-sure").text(arrayB[0]);
            $(".js-cancel").text(arrayB[1]);
        }else if(globaldata.button=="cancle"){
            $(".defaultbot").remove();
        }
        //title&text
        $(".titleij").text(globaldata.title);
        //如果没有自定义内容，直接将之删除
       if(globaldata.text==null){
           $(".textij").remove();
       }
       if(globaldata.content!==null){
           $(".contentij").html(globaldata.content)
       }
    }
    function startIJ(options) {
        inint(options, "normal");
    }
    function startSIJ(text) {
        inint(text, "simple");
    }
    return {
        int: startIJ,
        simple: startSIJ
    }
});



