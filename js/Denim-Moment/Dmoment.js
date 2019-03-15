/**
 * Created by Jai on 2017/12/12.
 * attention!!:Be Sure initialize this component after All Documents had be loaded.
 * 注意：请务必在所有需要此组件的元素加载完毕之后再初始化之
 * name.int({
 * component:["id","id","id","id"],
 * theme:
 * text_style:"default is / "or"which symbol you like"
 * reload:fn
 * had_check:fn
 * })
 * component:需要此组件元素的id数组
 * theme:你可以输入有效的颜色值来自定义主题色
 * text_style:显示年月日的分割方式默认为“/”如“2011/11/20”,你也可以定义你需要的字符改变之
 * had_check：点击回调，返回选择的字符串（包括你定义的分割符）
 * reload：当你改变默认日期时的回调
 */

require.config({
    paths: {
        "jquery": "js/jquery",
        "underscore": "js/underscore",
        "Moment": "js/Denim-Moment/Moment",
        "text": "js/require/requirejs-text/text",
        "css": "js/require/requirejs-css/css.min",
        "Mom-Lang": "js/Denim-Moment/Moment-Languages"
    }
});
define([
    "jquery",
    "underscore",
    "Moment",
    "Mom-Lang",
    "text!js/Denim-Moment/DmomentTpl.html",
    "css!js/Denim-Moment/Dmoment.css",
    "css!js/IconFont/iconfont.css"
], function ($, _, Moment, MomLang, tpl) {
    var globaldata = "";

    function init(options) {
        var defaultData = {
            container: "body",
            text_style: "/",
            had_check:null,
            reload:null,
            theme:"default"
        };
        globaldata = _.extend(defaultData, options);//整合数据
        //数据整合完毕，开始加载模板
        showTpl();
    }

    function showTpl(reload, re_Object, today) {//reload标志位为了判断是自动渲染的还是选择某一时刻渲染的，选择：true
        /*re_Object={
         Mouth_Time:(number)
         Year_Time:(number)
         我们仅仅需要你想表达的年份和月份就可以渲染出整个模板（月份=实际月份-1）
         }*/
        //1.获取当前月份和年份
        var checkMT = Mouth_Time = Moment().month();//用来检查当前月份
        var checkYT = Year_Time = Moment().year();//用来检查当前年份
        var Mouth_Time;
        var Year_Time;
        if (reload == true) {
            Mouth_Time = re_Object.Mouth_Time;//获取月份
            if (Mouth_Time == checkMT) {
                var MTT = true;
            }
        } else {
            Mouth_Time = Moment().month();//当前月份
            if (reload == "today") {
                var MTT = true;
            }
        }
        if (reload == true) {
            Year_Time = re_Object.Year_Time;//获取年份
            if (Year_Time == checkYT) {
                var YTT = true; //当MTT&&YTT===true时，表明回到了本尊此刻的年月，日期的显示就位今天，而不是默认的1号
            }
        } else {
            Year_Time = Moment().year();//当前年份
            if (reload == "today") {
                var YTT = true;
            }
        }
        var current_Mouth = checkMouthDays(Mouth_Time, Year_Time);//当前月份天数
        var pre_Mouth = checkMouthDays(Mouth_Time - 1 === -1 ? 11 : Mouth_Time - 1, Year_Time);//上月天数
        var next_Mouth = checkMouthDays(Mouth_Time + 1 === 12 ? 0 : Mouth_Time + 1, Year_Time);//下月天数

        //获取本月第一天的星期
        var date = new Date();
        date.setFullYear(Year_Time);
        date.setMonth(Mouth_Time);
        date.setDate(1);
        var ISO_first = date.getDay();
        //2.获取当前日期的星期，为了对应在图表中排序
        //日 一 二 三 四 五 六
        //0  1  2  3  4  5  6
        if (reload == true) {
            var ISO = ISO_first;
        } else {
            var ISO = Moment().day();
        }


        //做一个匹配
        var ISO_Object = ["日", "一", "二", "三", "四", "五", "六"];
        var ISO_Chinese = ISO_Object[ISO];
        //5.还有其他一些关键字
        var show_Object = letRoll_and_Array({
            mouth: current_Mouth,
            ISO_index: ISO_first,
            pre_Mouth: pre_Mouth,
            next_Mouth: next_Mouth,
            year: Year_Time
        });
        //4.组装参数
        var datas = {
            data: {
                ISO: ISO_Chinese,//汉字“星期X”
                ISO_index: ISO,//当前星期的索引,
                date: reload ? ((MTT && YTT ? Moment().date() : 1)) : Moment().date(),//日子
                year: Year_Time,//此时年份
                mouth_show: Mouth_Time,//X月
                mouth_pre_show: Mouth_Time - 1 === -1 ? 11 : Mouth_Time - 1,//上月
                mouth_next_show: Mouth_Time + 1 === 12 ? 0 : Mouth_Time + 1,//下月
                mouth: current_Mouth,//本月天数
                pre_mouth: pre_Mouth,//上月天数
                next_mouth: next_Mouth,//下月天数
                show_data: show_Object, //需要显示的行数和顺序数组
                pre_bubble: ISO_first,//本月第一天的星期索引，也可用作前一月泡泡的数目
                next_bubble: (function () {
                    //这里面我们会计算后月泡泡第一位的索引
                    var bubble = (ISO_first + current_Mouth - 1);
                    return bubble;
                })()

            }
        };
        console.log(datas.data.show_data);
        //数据都准备好了，开始渲染模板
        var html = _.template($(tpl).html(), datas);
        //为了保证框框的定位，我们先保证父元素reletive
        $(globaldata.container).parent().css({
            "position": "relative"
        });
        if (reload == true || reload == "today") {//如果是重新加载，我们要先把以前的去除掉-------------
            $(globaldata.container).parent().children("#D_moment").remove();
            $(globaldata.container).parent().append(html);
            $("#D_moment").css("display", "block");
        } else {
            $(globaldata.container).parent().append(html);
        }
        //模板渲染好了，开始绑定事件
        defaultJS();
    }

    function checkMouthDays(mouth, year) {
        var c_Year_Time = year;
        var mouthcount = mouth + 1;
        //建立两个数组，分别包含30,31的不同月
        var longMouth = [1, 3, 5, 7, 8, 10, 12];
        var days = "";
        if (mouthcount === 2) {
            if (Moment([c_Year_Time]).isLeapYear()) {
                days = 29
            } else {
                days = 28
            }
        } else {
            //在字典数组中去查询
            if (longMouth.indexOf(mouthcount, 0) == -1) {
                days = 30
            } else {
                days = 31
            }
        }
        return days;
    }

    function letRoll_and_Array(data) {
        var all_col = "";
        var top_count = data.mouth - (7 - data.ISO_index);
        var rol = parseInt(top_count / 7);
        var bottom_count = top_count - (7 * rol);
        if (bottom_count == 0) {
            all_col = rol + 1
        } else {
            all_col = rol + 2
        }
        console.log(all_col);
        //我们还需要一个顺序的数组
        var date_Array = [];
        var year_Array = [];
        //还需要两个标志位
        var check_pre = false;
        var check_next = false;
        //找到起始数字，前泡泡的位数就是ISO_index
        var firstcount = data.pre_Mouth - data.ISO_index + 1;
        for (var illi = 0; illi < all_col * 7; illi++) {
            if (check_pre == false) {
                if (firstcount === (data.pre_Mouth + 1)) {
                    firstcount = 1;
                    check_pre = true;
                    check_next = true;
                }
            }
            if (check_next == true) {
                if (firstcount === (data.mouth + 1)) {
                    firstcount = 1;
                }
            }
            date_Array.push(firstcount);
            firstcount = firstcount + 1;
        }
        //我们还需要此刻年份前后三年点的数组
        var three_years_ago = data.year - 3;
        for (var j = 0; j < 7; j++) {
            var pop = three_years_ago + j;
            if (pop == data.year) {
            } else {
                year_Array.push(pop);
            }
        }
        var return_data = {
            roll: all_col,
            dateArray: date_Array,
            yearArray: year_Array
        };
        console.log(return_data);
        return return_data;
    }

    function defaultJS() {
        $(".outer-box").off().on("click", ".icon_color", function (ev) {//点击箭头
            var ori_year;
            var ori_mouth;
            var re_Object = {};
            var status;
            //判断左右
            var target = $(ev.currentTarget);
            if (target.hasClass("right_icon")) {//右plus
                status = "plus";
            } else if (target.hasClass("left_icon")) {//左rev
                status = "rev";
            }
            ori_year = Number($(".now_year").attr("data-year"));
            ori_mouth = Number(target.attr("data-mon"));
            if (ori_mouth == "0" && status == "plus") {
                ori_year++;
            } else if (ori_mouth == "11" && status == "rev") {
                ori_year--;
            }
            re_Object.Mouth_Time = ori_mouth;
            re_Object.Year_Time = ori_year;
            showTpl(true, re_Object);
        });

        $(".children-year").off().on("click", function (ev) {//选择年份
            var targ = $(ev.currentTarget);
            var year_text = Number(targ.text());
            var moon_text = Number($(".moon-text").text()) - 1;
            var re_Object = {
                Mouth_Time: moon_text,
                Year_Time: year_text
            };
            if("function"===globaldata.reload){
                globaldata.reload();
            }
            showTpl(true, re_Object);
        });
        $(".children-moon").off().on("click", function (se) {//选择月份
            var targe = $(se.currentTarget);
            var moon_text = Number(targe.text()) - 1;
            var year_text = $(".year-text").text();
            var re_Object = {
                Mouth_Time: moon_text,
                Year_Time: year_text
            };
            if("function"===globaldata.reload){
                globaldata.reload();
            }
            showTpl(true, re_Object);
        });
        $(".icon_today").off().on("click", function (tt) {//回到今天
            if("function"===globaldata.reload){
                globaldata.reload();
            }
            showTpl("today", null, true);
        });
        $(".Dat").off().on("click", function (j) {//绑定选择日期事件
            var targe = $(j.currentTarget);
            var today_date = targe.text();
            var today_mon = targe.attr("data-mon");
            var today_year = targe.attr("data-year");
            var text_show = today_year + globaldata.text_style + today_mon + globaldata.text_style + today_date;
            try {
                $(globaldata.container).val(text_show);
                if("function"===globaldata.had_check){
                    globaldata.had_check(text_show);
                }
            }
            catch (error) {
                $(globaldata.container).text(text_show);
                if("function"===globaldata.had_check){
                    globaldata.had_check(text_show);
                }
            }

        });

        $(globaldata.container).on("click", function () {//显示
            $("#D_moment").show(500);
        });
        $('.cancel_box').off().on("click", function () {//关闭
            $("#D_moment").hide(500);
        });
        //$(globaldata.container)
        //事件绑定完毕，开始自定义主题
        judgementTheme();
    }
    function judgementTheme(){
         if(globaldata.theme=="default"){
             //根本没有自定义主题
         }else{
             //为美好的世界献上祝福
             var color=globaldata.theme;
             $(".outer-box").css({"border":"1px solid "+color});
             $(".children_moon_hov_box").css({"color":color});
             $(".active").css({"background":color});
             $(".icon_color").css({"color":color});
             $(".children_hov_box").css({"color":color});
             $(".icon_today").css({"color":color});
             $(".cancel_box").css({"background":color});
         }
    }

    //>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
    function startMoment(options) {
        init(options);
        //在这里增加方法
    }

    return {
        int: startMoment
    }

});