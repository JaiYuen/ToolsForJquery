/**
 * Created by JAI on 2017/11/20.
 * 1.name.init({
 * container
 * auto:Boolean
 * speed:ms
 *
 * })
 * 2.在imgs.json中可以配置图片的位置以及该图片的跳转链接
 * 3.我们提供了2个返回函数（1.当组件第一次加载完 2.当图片切换时）
 * 4.auto:设置为false或毫秒数（毫秒数默认为自动轮播）
 * 5.anime_speed:切换动画的速率
 *
 */
require.config({
    paths: {
        "jquery":"js/jquery",
        "underscore": "js/underscore",
        "text":"js/require/requirejs-text/text",
        "css":"js/require/requirejs-css/css.min",
        "owl":"js/Carousel/owlCarousel"
    }
});
define([
    "jquery",
    "underscore",
    "text!js/Carousel/carouseltpl.html",
    "owl",
    "css!js/Carousel/style.css"
],function($, _,tpl,owlc){
    var globaldata="";
    function inint(options){
        var me=this;
        var defaultData={
            container:"body",
            callback:null,
            changed:null,
            auto:1000,
            anime_speed:1000
        };
        globaldata=_.extend(defaultData,options);//整合数据
        showTpl();
    }

    function showTpl(){
        //请求本地json
        $.get("js/Carousel/imgs.json", function(result){
            //渲染模板-----------------------------------------------
            var data=JSON.parse(result);
            var html=_.template($(tpl).html(),data);
            $(globaldata.container).html(html);
            //模板渲染完毕，注册默认事件
            defaultJS();
        });
    }

    function defaultJS(){
        var primary = $("#carousel");
        var secondary = $("#thumbnails");
        primary.owlCarousel({
            singleItem             : true,
            slideSpeed             : globaldata.anime_speed,
            pagination             : false,
            afterAction            : syncPosition,
            autoPlay:globaldata.auto,
            responsiveRefreshRate  : 200,
            navigation             : true,
            navigationText        : ["",""],
            afterInit:globaldata.callback,
            afterMove:globaldata.changed,

        });

        secondary.owlCarousel({
            items                 : 7,
            itemsDesktop          : [1200,8],
            itemsDesktopSmall     : [992,7],
            itemsTablet           : [768,6],
            itemsMobile           : [480,4],
            pagination            : false,
            responsiveRefreshRate : 100,
            navigation            : true,
            navigationText        : ["",""],
            afterInit             : function(el) {
                el.find(".owl-item").eq(0).addClass("synced");
            }
        });

        function syncPosition(el) {
            var current = this.currentItem;
            secondary.find(".owl-item").removeClass("synced").eq(current).addClass("synced");
            if (secondary.data("owlCarousel") !== undefined) {
                center(current);
            }
            $('.current-item').html(this.owl.currentItem + 1);
            $('.max-items').html(this.owl.owlItems.length);

        }

        secondary.on("click", ".owl-item", function(e) {
            e.preventDefault();
            var number = $(this).data("owlItem");
            primary.trigger("owl.goTo",number);
        });

        function center(number) {
            var sync2visible = secondary.data("owlCarousel").owl.visibleItems;
            var num = number;
            var found = false;
            for (var i in sync2visible) {
                if (num === sync2visible[i]) {
                    var found = true;
                }
            }

            if (found===false) {
                if (num>sync2visible[sync2visible.length-1]) {
                    secondary.trigger("owl.goTo", num - sync2visible.length+2);
                } else{
                    if (num - 1 === -1) {
                        num = 0;
                    }
                    secondary.trigger("owl.goTo", num);

                }
            } else if (num === sync2visible[sync2visible.length-1]) {
                secondary.trigger("owl.goTo", sync2visible[1]);
            } else if (num === sync2visible[0]) {
                secondary.trigger("owl.goTo", num-1);
            }

        };

        $( ".collapse-button" ).click(function() {
            var thumbnailsWrapper = $('.thumbnails-wrapper');
            if(thumbnailsWrapper.position().top < thumbnailsWrapper.parent().height() - 1){
                thumbnailsWrapper.animate({bottom: '-' + thumbnailsWrapper.outerHeight() +'px'});
                thumbnailsWrapper.find('.icon').addClass('-flip');
            }
            else {
                thumbnailsWrapper.animate({bottom: '0'});
                thumbnailsWrapper.find('.icon').removeClass('-flip');
            }
        });
    }
    function startCarousel(options){
        inint(options);
    }

    return{
        int:startCarousel
    }
});