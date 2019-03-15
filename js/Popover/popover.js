/**
 * Created by Jai on 2017/11/30.
 * 1.将需要提示框的元素添加类class="pop_window",并在data-pop属性中添加提示框的内容,在data-color中可以自定义颜色，默认为#F44336
 * 如<div class="pop_window" data-pop="哲学复兴，不可避免" data-color="#f44336"></div>
 * 2.除此之外什么都不用做了
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
    "text!js/Popover/popovertpl.html",
    "css!js/Popover/popovercss.css",
    "css!js/IconFont/iconfont.css"
],function($,_,tpl){
    function render(){
        //循环遍历class="pop_window"的类
        var len=$($(".pop_window")).length;
        for(var v=0;v<len;v++){
            //为每一个div添加一个子元素
            var target=$(".pop_window").eq(v);
            var intxt=target.attr("data-pop");
            var p_color=target.attr("data-color")||"origin";
            var myhtml = _.template($(tpl).html())({
                innerColor:p_color,
                innerText:intxt
            });
        target.append(myhtml);
        }
        personaicss();
    }
    function personaicss(){
      var le=$(".div-pop").length;
      for(var g=0;g<le;g++){
          var tar=$(".div-pop").eq(g);
          var tar_color=tar.attr("data-col");
          if(tar_color==="origin"){}else{
              tar.css({
                  "background":tar_color
              });
              tar.siblings(".sjx").css({
                  "background":tar_color
              })
          }
      }
    }
    function startpop(options){
        render(options);
        //
        return this;
    }
    return{
        int:startpop
    }

});