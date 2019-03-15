/**
 * Created by Jai-Channel on 2017/12/25.
 * !important:我们为你提供了一个img.json的文件，你需要在之中配置正确的路径以及跳转地址等
 * name.int({
 * container
 * auto:Boolean
 * speed:ms
 * beforeChange:fn,
 * afterChange:fn
 * })
 * container:父元素，我们会撑满整个父元素，务必写死父元素的大小
 * auto:是否开启自动播放
 * speed：切换速率
 * animate_speed：切换动画速率
 * cir_release：是否开启计数点点联动
 * beforeChange:切换之前的回调，返回将要消失的索引
 * afterChange：切换之后的回调，返回最新出现的索引
 *
 * >>>>>>下面是我们提供的方法>>>>>>>>>>>>>>>>>>>
 *  next()切换到下一张
 *  prev()切换到上一张
 *  goTo("index")切换到指定面板
 * ####我们的组件可以放任意多的内容，没有一点点防备####
 * ####请尽情地使用它吧####
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
    "text!js/Denim-Carousel/D_carouseltpl.html",
    "css!js/Denim-Carousel/D_carouselcss.css",
    "css!js/IconFont/iconfont.css"
], function ($, _, tpl) {
    var globaldata = "";
    var accunt;
    var num = 0;
    var len;

    function init(options) {
        var defaultData = {
            container: "body",
            callback: null,
            changed: null,
            beforeChange:null,
            afterChange:null,
            auto: true,
            animate_speed: 500,
            small_window: false,
            small_window_release: true,
            speed: 2000,
            cir_release: true
        };
        globaldata = _.extend(defaultData, options);//整合数据
        showTpl();
    }

    function showTpl() {
        var data;
        //请求本地json
        $.get("js/Denim-Carousel/imgs.json",function (result) {
            //渲染模板-----------------------------------------------
            if ("object" == typeof result){
                data = result
            } else {
                data = JSON.parse(result);
            }
            //由于本人落后的机制，我需要将数组的最后一项放到第一项，保证第二项为肉眼可见的第一项
            var last_index=data.data.pop();
            data.data.unshift(last_index);
            //我们还要将一些渲染的关键参数附着在data上
            data.small = globaldata.small_window;
            data.cir = globaldata.cir_release;
            var html = _.template($(tpl).html(), data);
            $(globaldata.container).html(html);
            //这一次，我们重新定义small_window的宽度
            var leng = data.data.length;
            len = leng;
            //if(data.small==true){
            //   $(".small_window").css({
            //       "width":leng*200
            //   });
            //    //计算小窗口一排能排几个
            var see_width = $(globaldata.container).width();
            //    accunt=Math.floor(see_width/200)-1;
            //}
            //设置大窗口的宽度
            $(".wei_qiang").css({
                "width": see_width
            });
            $(".denim_cir").css({
                "width": (Number(see_width) - 30) / (len)
            });
            $(".flip_images").css({
                "width": see_width
            });
            $(".flip_images_wall").css({
                "width": see_width * 3,
                "left": -(see_width)
            });
            //模板渲染完毕，注册默认事件
            if (globaldata.auto == true) {
                auto_switch("auto_right");
            }
            defaultJS();
        });
    }

    function defaultJS() {//这是默认的绑定事件
        /*左右箭头的点击*/
        $(".right_arrow").off().on("click", function () {
            auto_switch("click_right");
        });
        $(".left_arrow").off().on("click",function(){
            auto_switch("click_left");
        });
        click_cir();
    }

    function auto_cir(index) {//图片与小圈圈的关联事件
        $(".denim_cir").removeClass("cir_active");
        var target = $(".denim_cir" + index);
        if (target.hasClass("cir_active")) {
        } else {
            target.addClass("cir_active");
        }
    }

    function click_cir(index){//小圈圈与图片的关联事件
        if(index){
            var quickieScroll=setInterval(function(){
                auto_big("plus",200);
                if($($(".wei_qiang")[1]).attr("data-index")==index){
                    clearInterval(quickieScroll);
                    return true;
                }
            },0)
        }else{
            $(".denim_cir").off().on("click",function(er){
                var ta=$(er.currentTarget);
                var cir_index=Number(ta.attr("data-index"));
                var parper_index=cir_index==Number(len)-1?0:cir_index+1;
                //得到与之配对的图片
                var pic_index=cir_index;
                if(parper_index==Number($($(".wei_qiang")[0]).attr("data-index"))+1){}else{
                    var quickieScroll=setInterval(function(){
                        auto_big("plus",200);
                        if($($(".wei_qiang")[1]).attr("data-index")==pic_index){
                            clearInterval(quickieScroll);
                            return true;
                        }
                    },0)
                }
            })
        }

    }
    function auto_switch(type) {//这是启动的所有开关事件
        var start_type = type;
        /*
         * type:auto_right默认自动向右
         * type:auto_left默认自动向左
         * type:click_right点击向右
         * type:click_left点击向左
         * type:small_click小窗口点击跳动
         * type:default重置
         */
        switch (start_type) {
            case "auto_right":
                setInterval(function () {
                    auto_big("plus");
                    //auto_small("plus");
                },globaldata.speed);
                break;
            case "auto_left":
                setInterval(function () {
                    auto_big("subtract");
                    //auto_small("subtract");
                },globaldata.speed);
                break;
            case "click_right":
                auto_big("plus");
                //auto_small("plus");
                break;
            case "click_left":
                auto_big("subtract");
                //auto_small("subtract");
                break;
        }
    }

    function auto_big(lr,speed) {//这是大窗口的执行动画
        //开始之前执行回调函数
        if("function"===typeof globaldata.beforeChange){
            var back_index=$($(".wei_qiang")[1]);
            globaldata.beforeChange(back_index);
        }
        //先抓取第一个元素和最后一个元素
        var JustFirstDom = $($(".wei_qiang")[0]);
        var JustEndDom = $($(".wei_qiang")[len - 1]);
        //将其克隆一次
        var CloneDom = JustFirstDom.clone(true);
        var CloneEDom = JustEndDom.clone(true);
        //执行动画，为美好的世界献上祝福
        //*********************************************
        if (lr == "plus") {
            JustFirstDom.animate({
                width: "0"
            }, speed?speed:globaldata.animate_speed, null, function () {
                //完毕后删除此节点，再将先前clone的甩到末尾
                var see_target=JustFirstDom.next().next();
                JustFirstDom.remove();
                $(".flip_images_wall").append(CloneDom);
                var index =see_target.attr("data-index")=="0"?len:see_target.attr("data-index");
                auto_cir(Number(index)-1);
                //回调函数
                if("function"===typeof globaldata.afterChange){
                    var back_index_b=$($(".wei_qiang")[1]);
                    globaldata.beforeChange(back_index_b);
                }
            })
        } else if (lr == "subtract") {
            /*因为我们是左浮动，所以此动画和之上有少许异同
            * 1.将克隆的对象width设置为0
            * 2.将之添加到队列第一位
            * 3.执行动画使width适应窗口
            * 4.移除队列最后一项
            * */
            CloneEDom.css({
                width:0
            });
            $(".flip_images_wall").prepend(CloneEDom);
            $($(".wei_qiang")[0]).animate({
                width:$(globaldata.container).width()
            },globaldata.animate_speed,null,function(){
                JustEndDom.remove();
                var see_pic=$($(".wei_qiang")[1]);
                var indexs=see_pic.attr("data-index")=="0"?len:see_pic.attr("data-index");
                auto_cir(Number(indexs)-1);
                //回调函数
                if("function"===typeof globaldata.afterChange){
                    var back_index_b_l=$($(".wei_qiang")[1]);
                    globaldata.beforeChange(back_index_b_l);
                }
            });

        }

    }

    function auto_small(lr) {//这是小窗口的执行动画
        if (lr == "plus") {
            num = num + 1
        } else if (lr == "subtract") {
            num = num - 1
        }
        if (num == -1) {//这是本来就在第一个硬要往前转动的情况
            $(".small_window").animate({
                left: accunt * 200
            }, 500, null, function () {
                var domarr = [];
                for (var n = 0; n < accunt; n++) {
                    var doms = $($(".small_wei_qiang")[len - n - 1]);
                    var clonedoms = doms.clone(true);
                    domarr.push(clonedoms);
                    doms.remove();
                }
                //把后accunt抓到前面来
                _.each(domarr, function (item) {
                    $(".small_window").prepend(item);
                });
                num = 0
            });
        }
        if (num == accunt) {//这时候说明我们需要转动小窗口了
            $(".small_window").animate({
                left: -accunt * 200
            }, 500, null, function () {
                var plusarr = [];
                for (var m = 0; m < accunt; m++) {
                    var tt = $($(".small_wei_qiang")[m]);
                    var clonett = tt.clone(true);
                    plusarr.push(clonett);
                    tt.remove();
                }
                //把前accunt个抓到后面去
                _.each(plusarr, function (item) {
                    $(".small_window").append(item);
                });
                num = 0;
            });


        }
    }
    /*###--Let's extend wishes for the beautiful world--###*/
    function startDC(options) {
        init(options);
        //加入next,prev,goTo方法
        this.next=function(){
            auto_switch("click_right");
        };
        this.prev=function(){
            auto_switch("click_left");
        };
        this.goTo=function(turnTo){
            click_cir(turnTo);
        };
        return this;
    }

    return {
        int: startDC
    }
});