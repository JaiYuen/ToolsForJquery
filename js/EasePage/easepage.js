/**
 * Created by Jai on 2017/12/4.
 * name.int({
 *   container:
 *   theme:
 *   search:
 *   ellipsis:
 *   language；
 *   params:
 *   ajaxurl：
 *   type：
 *   newpageFn：
 *   loaded：
 *   failedpage：
 *   check:
 * })
 * container；父容器，默认为body，在默认情况下如无body标签,组件失效
 * theme:主题色，你可以变换为你喜爱的颜色
 * search：是否允许搜索框
 * ellipsis：自定义省略，默认情况下将展示前x（x=10）项，你可以定义x的值来改变之
 * language:通用语言，我们提供了4种语言格式"CHN","ENG","JAP","FRE",默认为汉语(CHN)
 * params:你需要请求的参数
 * ajaxurl：请求的地址，必须
 * type:请求类型，默认为"GET"
 * =下面是我们提供的返回函数==
 * 1.newpageFn:当成功翻阅时调用，返回值为成功页的索引
 * 2.loaded：当成功加载时的返回
 * 3.failedpage:当翻阅失败时的返回，我们判断的依据是返回值的result的值
 * 4.name.next(y/“next”)执行跳页，next为下一页，或者自定义y
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
    "text!js/EasePage/easepagetpl.html",
    "alertij",
    "css!js/EasePage/easepagecss.css",
    "css!js/IconFont/iconfont.css"
],function($,_,tpl,Aj){
    var globaldata="";
    var pageIndex="";
    function init(options){
        var defaultData={
            theme:"#f44336",
            newpageFn:null,
            loaded:null,
            params:null,
            failedpage:null,
            container:"body",
            search:true,
            ellipsis:20,
            language:"CHN",
            type:"GET"
        };
        globaldata = _.extend(defaultData, options);//整合数据
        //数据整合完毕，开始执行请求
        Ajax_get_data();
        //showTpl();
    }
    function Ajax_get_data(page){
        //检测需要的数据
         var A_url=globaldata.url;
         var A_params=globaldata.params;
         if(page!==undefined){
             A_params.pageindex=page
         }
        if(A_params&&A_url){
            $.ajax({
                data:A_params,
                url:A_url,
                type:globaldata.type,
                timeout:15000,
                success:function(result,status,xhr){
                    //请求得到数据，开始渲染模板
                       //转一下数据格式
                     if('string'===typeof(result)){
                         result=JSON.parse(result)
                     }
                       if(result.result==0&&result.data){
                           var show;
                           pageIndex=result.data.pageInfo.pageIndex;//将当前页的索引刷新
                           var pageAll=Math.ceil((result.total)/(result.data.pageInfo.pageSize));
                           if(globaldata.ellipsis){
                               show=globaldata.ellipsis;
                           }else{
                               show=pageAll;
                           }
                           //比较定义数目与总的数目，定义数目的显示并不能超过总的数目，
                           //当超过时将之取等
                           if(show>pageAll){
                               show=pageAll
                           }
                           var tpldata={
                               data:{
                                  acceptsearch:globaldata.search,//是否需要搜索框
                                  showNum:show,//定义需要显示的数目
                                  all_page:pageAll,//总的数目
                                  nowpage:pageIndex//当前数目
                               }
                           };
                           var html= _.template($(tpl).html(),tpldata);
                           $(globaldata.container).html(html);
                           //模板渲染完毕，开始定义自定义数据和样式
                           percss()
                       }else{
                        globaldata.failedpage();
                    }
                },
                complete:function(){
                    //在提示框初始化之前定义好data-color的值
                    if(globaldata.theme!=="#f44336"){
                      var tlen=$(".js-theme").length;
                      for(var e=0;e<tlen;e++){
                          $($(".js-theme")[e]).attr("data-color",globaldata.theme);
                      }
                    }

                    if("function"===typeof(globaldata.loaded)){
                        globaldata.loaded()
                    }
                }
            })
        }else{
            alert("数据不完整，我们无法开始");
        }
    }
    function showTpl(){

    }
    function percss(){
        //theme:
        if(globaldata.theme!=="#f44336"){
            $(".easebox").css({
                "border": "1px solid"+""+globaldata.theme
            }); //边框
            $(".easebox-active").css({
                "background":globaldata.theme
            });//激活样式的背景
            $(".mysearch").css({
                "border": "1px solid"+""+globaldata.theme
            });//输入框边框
            $(".go_search").css({
                "background":globaldata.theme
            });//跳转按钮的背景

        }
        //language

        //**************************
        //这里还有一小块
        //**************************
        //所有样式已经完毕，开始绑定事件
        defaultJS();
    }
    function defaultJS(){
        $("#easepage").on("click",".easebox",function(eve){//绑定按钮跳转
           var target=$(eve.currentTarget);
           var symbol=target.attr("data-page");
           if(symbol=="plus"){
               pageIndex=pageIndex+1;
           }else if(symbol=="subtraction"){
               pageIndex=pageIndex-1;
           }else{
               pageIndex=Number(symbol)
           }
            Ajax_get_data(pageIndex);
        });
        $("#easepage").on("click",".go_search",function(evve){//绑定输入跳转
              var target=$(evve.currentTarget);
              var Jump_value=target.prev(".mysearch").children(".js-mysearch").val();
              JumpToNextPage(Jump_value,"frompage");
        });
        if("function"===typeof (globaldata.newpageFn)){
            globaldata.newpageFn();
        }
        //newpageFn
    }
    function JumpToNextPage(y,road){
        //确定y的数据格式^[0-9]*$
        var reg = /^[0-9]*$/;
        if (!reg.test(y)) {
            if(road=="frompage"){
                Aj.simple("请输入数字哦，蟹蟹！")
            }else if(road=="fromFn"){
                Aj.simple("请传入数字哦，蟹蟹！")
            }
        }else{
            y=Number(y);
            pageIndex=y;
            Ajax_get_data(y)
        }
    }
    function startpage(options){
        init(options);
        //在这里增加方法
        this.next=function(op){
            if(op=="next"){
                pageIndex=pageIndex+1;
                Ajax_get_data(pageIndex);
            }else{
                JumpToNextPage(op,"fromFn")
            }
        };
        return this;
    }
    return{
        int:startpage
    }
});