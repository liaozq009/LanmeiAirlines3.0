
$(document).ready(function($) {
  var $header = '<div class="header-wrap">'+
    '<a href="http://lanmeiairlines.com/index_cn.html?lang=cn" class="h-logo-wrap"></a>'+
    '<div class="h-right"> '+
      '<div class="h-phone js-h-phone"> '+
      '<div class="phone-menu js-phone-menu"> '+
        '<h2>24小时客服电话:</h2> '+
        '<p class="p1">+855 23981363</p> '+
      '</div> '+
      '</div> '+
      '<div class="h-lang js-h-lang"> '+
      '<p class="js-choose-lang"></p> '+
      '<div class="lang-menu js-lang-menu"> '+
        '<h2>选择语言:</h2> '+
        '<a href="http://lanmeiairlines.com?lang=en" class="lang-en" data="en">English</a> '+
        '<a href="http://lanmeiairlines.com?lang=cn" class="lang-zh" data="zh">简体中文</a> '+
      '</div> '+
      '</div> '+
    '</div> '+
  '</div>';

  var $footer = '<p class="lm-logo"></p>'+
    '<p class="facebook"> <a href="https://www.facebook.com/lanmeiairlines/" class="a1 icon-facebook"></a> <a href="http://weibo.com/lanmeiair" class="icon-weibo"></a> </p> '+
    '<p class="f-email"><img src="http://b2c.lanmeiairlines.com/lqWeb/lqweb/common/images/CN/icon-email.png" class="icon-email" /><span>lm-ec@lanmeiairlines.com</span></p> '+
    '<p class="f-local"> <img src="http://b2c.lanmeiairlines.com/lqWeb/lqweb/common/images/CN/icon-location.png" class="icon-location" /> <a href="https://goo.gl/maps/7pyBze8BFe52" target="_Blank">柬埔寨金边市俄罗斯大道575号</a> </p>'+ 
    '<p class="copyright">&copy; Copyright 2017 澜湄航空 粤 <a href="http://www.miitbeian.gov.cn" target="_Blank" rel="nofollow">ICP-17005494-1</a></p>';
  
	$('.lm-header').html($header);
	$('.lm-footer').html($footer);
});