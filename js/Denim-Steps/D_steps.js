/**
 * Created by Jai-Channel on 2017/12/27.
 * name.int({
 * container:
 * data:{data:[
 * {title:"",detail:"",status；"wait /process/ finish/ error"}
 * ],...}
 * theme:主题色，务必输入正确的颜色值，默认为#66ccff
 * defaultButton:是否开启默认按钮(若开启则默认为用户可以编辑,我们将在进度条上触发该事件);
 * data_store:是否开启前端数据存储机制,默认为开启(针对本地使用非常棒)，若你需与后台交互，建议关闭此功能
 * modification:是否开启编辑文字(若开启，文字一旦改变则为永久改变)
 * direction:方向。竖直（"vertical"）或水平（"horizontal"）,默认为水平
 * })
 * ----下面是我们提供的方法--------
 *goTo(choice:0,1,2...)改变到达的步骤
 *changeStatus(index,status)
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
    "text!js/Denim-Steps/D_stepstpl.html",
    "css!js/Denim-Steps/D_stepscss.css",
    "css!js/IconFont/iconfont.css"
],function($,_,tpl){
 var see_window="";
 var data_length="";
 var globaldata="";
 var selectbot="";
    function init(options){
        var defaultData={
            theme:"#66ccff",
            //data:{
            //    data:[{title:"step1",detail:"洛水之波，沐浴人心",status:"finish"},
            //        {title:"step2",detail:"小隙沉舟，同心方可勠力",status:"finish"},
            //        {title:"step3",detail:"为天下苍生，自当化解私怨",status:"error"},
            //        {title:"st                                                                              ep4",detail:"怠慢之处，还望包涵",status:"wait"}
            //    ]
            //},
            data:{
              data:[{title:"step1",detail:"洛水之波，沐浴人心",status:"finish"},
                  {title:"step2",detail:"小隙沉舟，同心方可勠力",status:"finish"},
                  {title:"step3",detail:"为天下苍生，自当化解私怨",status:"error"},
                  {title:"step4",detail:"以德报怨，怨消恨解",status:"wait"}]
            },
            container:"body",
            defaultButton:true,
            modification:true,
            direction:"horizontal",//水平
            current:null,
            callback:null,
            data_store:true
        };
        globaldata = _.extend(defaultData, options);//整合数据
        data_length=globaldata.data.data.length;
        //数据整合完毕，开始加载模板
        showTpl();
    }
    function showTpl(){
        //判断我们到底是取缓存还是用现成的数据
        var get_save_data=JSON.parse(localStorage.getItem("D_step_data"));
        if(get_save_data){
            globaldata=get_save_data;
        }
        if(!globaldata.data){
            alert("确保你的数据已定义或格式正确");
        }else{
            //我们还要向data中填充一些关键数据
            var Tpl_data=globaldata.data;
            Tpl_data.modification=globaldata.modification;//编辑
            Tpl_data.defaultButton=globaldata.defaultButton;//默认按钮
            Tpl_data.direction=globaldata.direction;//方向

            var html= _.template($(tpl).html(),Tpl_data);
            $(globaldata.container).html(html);
            //模板加载完毕，我们还要得到一个贼吉尔关键的参数
            see_window=$(globaldata.container).width();
            //然后进行一些样式的适应
            settingCss()
        }
    }
    function settingCss(){
        $(".step_wall").css({
            width:Math.floor(see_window/data_length)-15
        });
        $(".step_line").css({
            width:(Math.floor(see_window/data_length))-40,
            left:-(((Math.floor(see_window/data_length))-34)/2)
        });
        //基础样式设置完成，开始匹配状态样式
        personalCss()
    }
    function personalCss(new_index){
        if(!new_index){
            for(var k=1;k<data_length;k++){
                var targets=$($(".wall-bamboo")[k]);
                var t_status=targets.attr("data-status");
                var t_index=targets.attr("data-index");
                var t_target=$(".step_line"+t_index);
                switch (t_status) {
                    case "error":
                        t_target.css({
                           background:"#f5222d"
                        });
                        break;
                    case "finish":
                        t_target.css({
                            background:"#1aaf7a"
                        });
                        break;
                    case "wait":
                        t_target.css({
                            background:"#d4d5d5"
                        });
                        break;
                    case "process":
                        t_target.css({
                            background:"#d4d5d5"
                        });
                        break;
                }
            }
        }
       defaultJS();
    }
    function defaultJS(){
        //1.点击状态提示语呼出默认按钮
        if(globaldata.defaultButton==true){
            $(".pop_alert").off().on("click",function(e){
                $(".select_button").css({
                   display:"block"
                }).animate({
                    top:"10%"
                },400,null,function(){
                     //正常呼出后开始给默认按钮绑定事件
                    //为了避免重复绑定浪费，我们用了一个很狗逼的标志位
                        selectbot=$(e.currentTarget).attr('data-index');
                        defaultJs_select_but();
                });
                var tar=$(e.currentTarget);
            })
        }
        //2.绑定双击修改title或details内容按钮

    }
    function defaultJs_select_but(selectside){
        $(".s_b_s").off().on("click",function(se){
            var targ=$(se.currentTarget);
            var status_text=targ.text();
            //var ind=targ.attr("data-index");
            $(".select_button").animate({
               top:"0"
            },400,null,function(){
            }).css({
                display:"none"
            });
            console.log(globaldata);
            /*
            我们接下来要做一件大事，
            将数据整合重新渲染，并且存入缓存（需要开通此功能）
            */
             globaldata.data.data[selectbot].status=status_text;
             if(globaldata.data_store==true){
                 var save_data=JSON.stringify(globaldata);
                 localStorage.setItem("D_step_data",save_data);
             }
             showTpl();

        })
    }
    function start_step(options){
        init(options);
        //在这里增加方法
        this.goTo=function(index){
            //若将某一项直接设置为以完成，则她之前的项都必须为已完成
            for(var o=0;o<index+1;o++){
                globaldata.data.data[o].status="finish"
            }
            if(globaldata.data_store==true){
                localStorage.setItem("D_step_data",JSON.stringify(globaldata));
            }
            showTpl();
        };
        this.changeStatus=function(index,statuss){
            //若使用此方法强制改变状态，我们将不会从现实情况考虑逻辑的合理性
            if(index>(globaldata.data.data.length-1)||index<0){
                console.log("你输入的参数不对，fn:changeStatus(index)")
            }else{
                globaldata.data.data[index].status=statuss;
                if(globaldata.data_store==true){
                    localStorage.setItem("D_step_data",JSON.stringify(globaldata));
                }
                showTpl();
            }

        };
        return this;
    }
    return{
        int:start_step
    }
});