 /* 页面交互公共效果 */
 // placeholder
 (function (win, $) {
     if (!window.Util) {
         window.Util = {};
     }

     $.extend(Util, {
         placeholder: function () {
             // console.log("placeholder加载了");
             if (!('placeholder' in document.createElement('input'))) {
                 $('input[placeholder],textarea[placeholder]').each(function () {
                     var that = $(this),
                         text = that.attr('placeholder');
                     if (that.val() === "") {
                         that.val(text).addClass('placeholder');
                     }
                     that.focus(function () {
                             if (that.val() === text) {
                                 that.val("").removeClass('placeholder');
                             }
                         })
                         .blur(function () {
                             if (that.val() === "") {
                                 that.val(text).addClass('placeholder');
                             }
                         })
                 });
             }
         }
     });
 }(this, jQuery));
 // 加载头尾代码片段
 (function (win, $) {

     var Include = function (cfg) {
         this.cfg = cfg;

         this._init();
     };

     Include.prototype = {
         constructor: Include,

         _init: function () {
             var c = this.cfg;

             if (c.async !== false) c.async = true;

             this.$container = $('#' + c.id);
         },

         fetch: function () {
             var c = this.cfg,
                 self = this;

             return $.ajax({
                 url: c.src,
                 type: 'GET',
                 dataType: 'html',
                 async: c.async,
                 success: function (html) {
                     self.$container.html(html);

                     c.onload && c.onload(html);
                 }
             });
         }
     };
     
     //获取当前页面地址
     var nowurl = window.location.href;
     //var xnml = nowurl.split("/")[3];
	 var xnml="";
     if(xnml == ""){
    	 xnml = "hubei"
     };
     
     // 需要引入的代码片段
     var includes = [{
         id: 'header',
         src: '/'+xnml+'/header.inc.html',
         onload: function () {
             // console.log('...header loaded...');
             Util.placeholder();
             $(".tabview").each(function (index, el) {
                 new TabView({
                     dom: el,
                     activeCls: 'cur',
                     itemClick: function (index) {}
                 });
             });
         }
     }, {
         id: 'footer',
         src: '/'+xnml+'/footer.inc.html',
         onload: function () {
             // console.log('...footer loaded...');
             //自定义下拉菜单select，注意：下方js要在渲染完select内容后执行
             $(".ewb-select").chosen({
                 disable_search_threshold: 16,
                 inherit_select_classes: true
             });
         }
     }, {
         id: 'pingtai',
         src: '/'+xnml+'/pingtai.inc.html',
         onload: function () {
             
         }
     }
     ];

     $.each(includes, function (i, cfg) {
         if ($('#' + cfg.id).length) {
             new Include(cfg).fetch();
         }
     });

 }(this, jQuery));


 //其他公用js
 (function (win, $) {
	 
 }(this, jQuery));
 
function OpenSelect(val){
	window.location.href=val;
}
 
