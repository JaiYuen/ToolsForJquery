/**
 * Created by Jai on 2017/11/27.
 * name.int({
* container
* data
* callback
* theme
* speed
* })
 * 1.container：组件父容器，默认为body
 * 2.！！组件需要显示的数据，务必按以下规则拼写
 * {[partitle:"",children:[
 * {text:'',url:''},{text:'',url:''},{text:'',url:''}...]
 * ],[partitle:"",children:[
 * {text:'',url:''},{text:'',url:''},{text:'',url:''}...]
 * ],[partitle:"",children:[
 * {text:'',url:''},{text:'',url:''},{text:'',url:''}...]
 * ],}
 * 3.theme:主题颜色，务必传入规范的颜色值
 * 4.speed：动画执行的速度，ms
 * 5.我们还提供了一个渲染完成的callback方法
 *
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
    "text!js/Collapser/Collapsertpl.html",
    "css!js/Collapser/Collapsercss.css"
],function($,_,tpl){
    var globaldata="";
    function init(options){
        var defaultData={
            container:"body",
            theme:"#f44336",
            callback:null,
            speed:300,
            data:null
        };
        globaldata = _.extend(defaultData, options);//整合数据
        showTpl();
    }
    function showTpl(){
        var data=globaldata.data;
        var html= _.template($(tpl).html(),data);
        $(globaldata.container).html(html);

        defaultJS();
    }

    function defaultJS(){
        var nowindex;
         $("#mega-coll").on("click",".inner-par",function(e){
           $(".coll-chil").slideUp(globaldata.speed);
             var index=$(e.currentTarget).attr("data-index");
             if(nowindex==index){
                 nowindex="";
             }else{
                 $(e.currentTarget).nextAll(".coll-chil").slideDown(globaldata.speed);
                 nowindex= $(e.currentTarget).attr("data-index");
             }
         });
        persontheme()
    }
    //自定义主题
    function persontheme(){
        if(globaldata.theme!=="#f44336"){
            $(".coll-par").css({
                "background":globaldata.theme
            })
        }
        if(typeof (globaldata.callback)=="function"){
            globaldata.callback();
        }
    }
    function startcoll(options){
        init(options);
    }
    return{
        int:startcoll
    }
});

