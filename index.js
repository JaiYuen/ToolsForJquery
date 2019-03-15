/**
 * Created by Jai on 2017/11/17.
 */
require.config({
    paths: {
        "JQ": "js/jquery",
        "UNDER": "js/underscore",
        "carousel":"js/Carousel/carousel",
        "titleMod":"js/Toptitle/titles",
        "alertij":"js/AlertIJ/alertij",
        "collapser":"js/Collapser/Collapser",
        "mtab":"js/M-Tab/MTab",
        "spy":"js/Scrollspy/scrollspy",
        "pop":"js/Popover/popover",
        "page":"js/EasePage/easepage",
        "shutter":"js/Shutter/shutter",
        "Dmoment":"js/Denim-Moment/Dmoment",
        "Ori":"js/OriginImg/OriImg",
        "Denim-Coursel":"js/Denim-Carousel/D_carousel",
        "Denim-steps":"js/Denim-Steps/D_steps"
    }
});
require([
    "carousel",
    "titleMod",
    "alertij",
    "collapser",
    "mtab",
    "spy",
    "pop",
    "page",
    "shutter",
    "Dmoment",
    "Denim-Coursel",
    "Denim-steps",
    "Ori",
    "JQ",
    "UNDER"
], function (Carousel,Title,AlertIJ,Collapser,Tab,Spy,Pop,Pager,Shutter,Dmoment,DenimCoursel,Denimsteps,Ori) {
    function onshow() {
        $(".js-AJ").on("click",function(){
            //弹窗组件，完全体*************************
            AlertIJ.int({
                    cancle:callback,
                    theme:"#66CCFF",
                    title:"ass we can",
                    //button:"JJJ/KKK",
                    content:html,
                    sure:change,
                    container:".AJ-list"
                });
        });
        //动画菜单组件,很难受有问题*************************
        //Menu.int({
        //    title: ["F", "P", "V", "S", "F"],
        //    isshow: true,
        //    reshow: false,
        //    href: ["#", "#", "#", "#", "#"],
        //    container: ".top_list",
        //    callback: function () {
        //        alert("compeleted")
        //    }
        //});
        //轮播组件,也有问题，最后来弄*****************************
        //var t=Carousel.int({
        //    container:".carousel_list",
        //    callback:callback,
        //    auto:1000,
        //    anime_speed:1000,
        //    changed:change
        //});
        //顶部菜单组件**************************
        var u=Title.int({
            container:".title_list"
            //background:"color/#66ccff",
            //theme:"#666666"
        });
        var html= _.template($('#inner-template').html());
        //弹窗组件，完全体*************************
        //var k=AlertIJ.int({
        //    cancle:callback,
        //    //theme:"#66CCFF",
        //    title:"ass we can",
        //    //button:"JJJ/KKK",
        //    content:html,
        //    sure:change
        //});
        //弹窗组件，极简版****************************
        //var g=AlertIJ.simple("simple box")
        //折叠collapse*****************************
        var data={data:[
            {partitle:"rolling one",children:[
                {text:"我们需要定义父元素",url:"#"},{text:"组件宽度会撑满父元素",url:"#"},{text:"为了不对其他元素影响，请务必设置父元素relative",url:"#"}
            ]},
            {partitle:"rolling two",children:[
                {text:"默认主题色为#f44336，我们也可以在theme中自定义",url:"#"},{text:"speed中可以调整动画时间",url:"#"},{text:"*********************",url:"#"}
            ]},
            {partitle:"rolling three",children:[
                {text:"我们还提供了一个返回方法",url:"#"},{text:"mega V1.0",url:"#"},{text:"**********************",url:"#"}
            ]},
            {partitle:"rolling four",children:[
                {text:"Jai-Yuen",url:"#"}
            ]}
        ]};
         var co=Collapser.int({
            container:".collapser-list",
            theme:"#66ccff",
            data:data,
            speed:200
        });
        //
        //Tab""""""""""""""""""""""""""""""""""""""""""""""""""""""
        var tt=Tab.int({
            container:".tab-list",
            theme:"#66ccff"
        });
        //console.log(tt);
        //tt.refresh({
        //  content:{data:[{title:"title3",tpl:"<div>content3</div>"},{title:"title4",tpl:"<div>content4</div>"}]}
        //})
        //监听#############################################
        var ss=Spy.int({
            theme:"#66ccff",
            position:"right",
            Spyclick:callback,
            data:{data:[{"title":"example_1","url":"https://www.baidu.com/","icon":"icon-BAI-shezhi"},{"title":"example_2","url":"#","icon":"icon-BAI-gengduo"}]}
        });
        ss.hide();
        ss.show();

        //页数##########################################
        var zz=Pager.int({
            url:"js/EasePage/jsonData/pagejson.json",
            container:".page-list",
            theme:"#66ccff",
            params:{},
            loaded:function(){
                //提示组件，保证其在页面所有元素加载完毕后才初始化**********************
                Pop.int()
            }
        });
        //Next Door*************************************
        var df=Shutter.int({
            container:".shutter-list"
        });
        //Moment>>>>>>>>>>>>>>>>>>>>>>>>>>>>
        var oo=Dmoment.int({
            container:".timepicker",
            theme:"#66ccff"
        });
        //Ori>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
        var kk=Ori.int();
        //DC>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
        var dc=DenimCoursel.int({
            container:".Dcar-list"
        });
        //steps----------------------------------------
        var ds=Denimsteps.int({
            container:".Steps-list",
            //pop-------------------------
            callback:function(){
            }
        });
    }
    //检测回调是否成功的一些函数
    function callback(returnData){
        console.log("had loaded");
        console.log(returnData);
    }
    function change(){
        console.log("changed")
    }
    onshow();

});