/**
 * Created by Jai on 2017/11/29.
 * var modelname=name.int({
 * position:
 * callback:
 * Spyclick:
 * data:{data:[{title,url,background},...]}
 * theme；主题颜色
 * })
 * 我们在初始化时需要设置以下参数：
 * 1.position:/left/right;相对于浏览器视窗的定位，并且居中，默认为right
 *   很遗憾，在非默认的position情况下，并不能提供title动画
 * 2.callback:fn()我们还提供了一个组件渲染完成的回调方法
 * 3.Spyclick：fn(index)点击回调，返回值为索引（上=>下）
 * 5.data：数据，每一项可以包含以上参数，或为空[{},{}.{}],如若为空，你区别他们的方式只提供索引
 * 6.modelname.hide(index)显示/隐藏方法，index：某项的索引string，若为空则显示/隐藏整个组件
 * 7.modelname.show(index)同上
 * 8.theme:主题颜色
 * 9.你也可以通过modelname.reload({参数同上})来重新加载当前组件
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
    "text!js/Scrollspy/scrollspytpl.html",
    "css!js/Scrollspy/scrollspycss.css",
    "css!js/IconFont/iconfont.css"
],function($,_,tpl){
    var globaldata="";
    function init(options){
        var defaultData={
            position:"right",
            theme:"#f44336",
            callback:null,
            Spyclick:null,
            data:null,
            kind:"col",
            container:"body"

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

        var data=globaldata.data;
        if(!data){
            alert("并没有合适的数据--Scrollspy")
        }else{
            var html= _.template($(tpl).html(),data);
            $(globaldata.container).append(html);
            //默认样式渲染完毕，渲染自定义样式
            personalCss();
        }

    }
    function personalCss(){
        //position,theme
        if(globaldata.position=="left"){
            //1.调整位置到左边
            $("#scrollspy").removeClass("all-box-default").addClass("all-box-change").css({
                "border-radius": " 0 8px 8px 0 "
            });
            //2.改变标题栏的动画
            $(".animtebox").css({
                "border-radius": "0 11px 11px 0 ",
                "left": "50px"
            });
            $(".chilspy:hover .animtebox").css({

            "animation":"changeshow .5s forwards",
            "-webkit-animation":"changeshow .5s forwards"
            });

        }
        if(globaldata.theme!=="#f44336"&&globaldata.theme!==undefined){
            $("#scrollspy").css({
                "border":"2px solid"+globaldata.theme
            });
            $(".chilspy").css({
                "background":globaldata.theme
            });
            $(".animtebox").css({
                "background":globaldata.theme
            })
        }
        //开始注册方法
        defaultJS();

    }
    function defaultJS(){
        //先定义两个回调函数
        if(typeof(globaldata.callback)=="function" ){
            globaldata.callback();
        }
        if(typeof (globaldata.Spyclick)=="function"){
            $("#scrollspy").on("click",".chilspy",function(eve){
                var target=$(eve.currentTarget);
                var index=target.attr("data-index");
                globaldata.Spyclick(index);
                //如果是顶部按钮，将还会绑定一个滚动方法
                if(index=="default-gotop"){
                    $("html,body").animate({
                        scrollTop: ($("body").offset().top )
                    }, 400);
                }
            })
        }
        $("#scrollspy").on("click",".animtebox",function(e){
           var tar= $(e.currentTarget);
           var url=tar.attr("data-url");
           if(url&&url!=="#"){
               window.open(url);
           }

        });

    }
    function startspy(options){
        init(options);
        //加入hide,show,reload方法
        this.hide=function(index){
           if(index!==undefined){
               if(typeof(index)=="string" ){
                   index=Number(index);
               }//判断index的类型，我们需要的是number
               $(".chilspy").eq(index+1).hide();
           }else{
               $("#scrollspy").hide(1000);
           }
        };
        //--------------------------------------
        this.show=function(index){
            if(index!==undefined){
                if(typeof(index)=="string" ){
                    index=Number(index);
                }//判断index的类型，我们需要的是number
                $(".chilspy").eq(index+1).show();
            }else{
                $("#scrollspy").show(1000);
            }
        };
        this.reload=function(redata){
            //我们依然可以在这里定义各种参数，且此时的优先级会高于
            //第一次初始化时的参数
                refreshTpl(redata);
        };
        return this;
    }
    return{
        int:startspy
    }
});