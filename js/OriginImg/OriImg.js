/**
 * Created by Jai on 2017/12/20.
 * 1.当初始化时，需要确保使用者Dom加载完毕
 * 2.为img标签加上名为“ori_img”的类
 * 3.剩下的就不用管了
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
    "text!js/OriginImg/oriimgtpl.html",
    "css!js/OriginImg/oriimgcss.css",
    "css!js/IconFont/iconfont.css"
],function($,_,tpl){

//    绝对位置坐标：
//
//复制代码 代码如下:
//
//        $("#elem").offset().top
//    $("#elem").offset().left
//    相对父元素的位置坐标：
//
//复制代码 代码如下:
//
//    $("#elem").position().top
//    $("#elem").position().left

//    position() 方法返回匹配元素相对于父元素的位置（偏移）。
//
//该方法返回的对象包含两个整型属性：top 和 left，以像素计。


    function render(){
        //循环遍历class="ori_img"的类
        var len=$($(".ori_img")).length;
        //获取图片的原始大小
        for(var v=0;v<len;v++){
            //为每一个div添加一个子元素
            var target=$(".ori_img").eq(v);
            var img_side=target.attr("src");
            var myhtml = _.template($(tpl).html())({
                img:img_side,
                version:v
            });
            target.parent().append(myhtml);
            //我们还需要知道图片的原始大小
            var big_target=$(".imageV"+v);
            var ori_width=Number(big_target.width());
            var ori_height=Number(big_target.height());
            //获得宽和高的比例
            //var proportion=ori_width/ori_height;
            //判断原始的大小，使之比例缩小1/2或1/3
            var sizeObj={
                width:(ori_width>1080||ori_height>720)?ori_width*(1/3):ori_width*(1/2),
                height:(ori_width>1080||ori_height>720)?ori_height*(1/3):ori_height*(1/2)
            };
            //给他们定位,我们是想要原始大小的图片左上角居中于小图片
            var top=target.position().top;
            var left=target.position().left;

            big_target.css({
                "width":sizeObj.width,
                "height":sizeObj.height

            });
            $(".Denim-position"+v).css({
                "top":top-sizeObj.height,
                "left":left+((target.width())*1/2)
            })
        }
        //模板渲染完毕 我们开始定义事件
        defaultJS();
    }
    function defaultJS(){

    }
    function startOri(options){
        render(options);
        //
        return this;
    }
    return{
        int:startOri
    }
});