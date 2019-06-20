
var LanmeiAirlinesPassengerInfo = {
	init:function(){
		this.passengerInfoWrite();
		this.addEvend();
	},

	/* 乘客信息填写 */
	passengerInfoWrite:function(){
		// 点击展示下拉框
		$('.dropDownInput').click(function(e){
			e.stopPropagation();
			if($(this).hasClass("isCard")){
				console.log("身份证不能选国家");
			}else{
				$(this).toggleClass('active');
				$(this).siblings('ul').toggle();
				$(this).parent().siblings('div').children('ul').hide().siblings('b').hide();
				$(this).parent().siblings('div').children('input').removeClass('active');
			}
			
		});
		// 选择下拉框
		$('.dropDownUL a').click(function(e){
			e.preventDefault();e.stopPropagation();
			var val = $(this).html();
			$(this).parent().parent().siblings('input').val(val).removeClass('active');
			$(this).parent().parent().hide().siblings('b').hide();
		});
		// 输入框点击后特效 ---新增 LZQ 20190612
		$('.text-field-content .text-field-input').click(function(e) {
				e.stopPropagation();
		    $(this).siblings('.text-field-label').removeClass('float');
		});
		$('.text-field-content .text-field-input').focus(function(e) {
			e.stopPropagation();
			$(this).siblings('.text-field-label').removeClass('float');
		});
		// 兼容IE10
		$('.text-field-content .text-field-label').click(function(e) {
				e.stopPropagation();
		    $(this).removeClass('float');
		    $(this).siblings('.text-field-input').focus();
		});
		// 点击空白隐藏
		$('html').click(function(){
			//$('.PassengersContentCommon>div .dropDownInput').removeClass('active').siblings('ul').hide().siblings('.bottomLine').hide();
			$('.dropDownInput').removeClass('active').siblings('ul').hide();
			// 输入框input特效 ---新增 LZQ 20190612
			$.each($('.text-field-content .text-field-input'),function(index, el) {
				if($(el).val() == '') {
					$(this).siblings('.text-field-label').addClass('float');
				}
			});
		});

		// 输入框input如果有默认值，则小提示文字往上移动  LZQ 20190613
		$.each($('.text-field-content .text-field-input'),function(index, el) {
			if($(el).val() != '') {
				$(this).siblings('.text-field-label').removeClass('float');
			}
		});

		// 输入框正则验证 
		$('.PassengersContentCommon>div .importInput').focus(function(e){
			$(this).removeClass('inputRight').removeClass('inputError').addClass('inputWrite');
		});
		$('.PassengersContentCommon>div .importInput').blur(function(e){
			$(this).removeClass('inputWrite').addClass('inputRight');

		});

		// 展开或隐藏乘客信息 
		$('.PassengersTitleCommon').click(function(){
			$(this).next().slideToggle();
			$(this).children('i').toggleClass('img02');
		});
		
		$('div.agree span').click(function(){
			if( $("#newsChoice").is(':checked') )
				$("#newsChoice").attr("checked",false);
			else
				$("#newsChoice").attr("checked",true);
			
		});
	},

	/* 其他事件 */
	addEvend:function(){

		/* 乘客联系方式 */
		/*var contactPassengers = function(){
			$('.contactPassengers .nth-child1 b').show();
			$('.contactPassengers label i').click(function(){
				$(this).siblings('b').show().parent().siblings('label').children('b').hide();
			});
		};
		contactPassengers();*/
		
		//更改的begin
		var contactPassengers = function(){
			$('.contactPassengers .nth-child1 b').show();
			$('.contactPasMobile,.mobilePasTip').hide();
			
			$('.contactPassengers label i').click(function(){
				$(this).siblings('b').show().parent().siblings('label').children('b').hide();
				if($(this).parent().attr('data-info')=='yes'){
					$("#isvalidate").val("0");
					$('.contactPasMobile,.mobilePasTip').hide(300);
				}else{
					$("#isvalidate").val("1");
					$('.contactPasMobile,.mobilePasTip').show(300);
				}
			});
		};
		contactPassengers();
		//end
		// 点击NEXT的时候要做判断
/*		$('.nextBtn a').click(function(e){
			e.preventDefault();
			if($('.agree input').is(':checked')){
				//window.location.href="LanmeiAirlinesPay.html";
			}else{
				layer.open({
				  type: 1, //Page层类型
				  area: ['500px', '300px'],
				  title: false,
				  shadeClose: true, //点击遮罩关闭
				  shade: 0.6, //遮罩透明度
				  maxmin: false, //允许全屏最小化
				  anim: 1, //0-6的动画形式，-1不开启
				  content: '<div style="text-align:center;line-height:300px;font-size:20px">Please confirm that you have read the above</div>'
				});    
			}
		});*/
		
	}
};

$(document).ready(function($) {
	LanmeiAirlinesPassengerInfo.init();
});