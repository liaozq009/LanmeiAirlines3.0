
var LanmeiAirlinesCommon = {
	init:function(){
		this.navbarSilder();
		// this.citiesSelect();
		this.citiesSelect1();
		this.flightInfoSelect();
		this.getTop();
		this.otherEvent();
	},

	/* 导航菜单切换 */
	navbarSilder:function(){
		$('.LMCompanyInfo>ul>li').mouseover(function(e){
			$(this).children('a').addClass('active').siblings('li').children('a').removeClass('active');
			$(this).children('ul').show().siblings('li').children('ul').hide();
			$(this).children('ul').css('left',-$(this)[0].offsetLeft);
		});
		$('.LMCompanyInfo>ul>li').mouseout(function(e){
			$(this).children('a').removeClass('active');
			$(this).children('ul').hide();
		});
	},

	/* 城市选择 */
	citiesSelect:function(){
		var labelFromcity = new Array();
		labelFromcity ['热门城市'] = new Array(0,1,2,3);
		labelFromcity ['A-F'] = new Array(0,3,4,5,6,28,29);
		labelFromcity ['G-J'] = new Array(1,7,8,9,30,31,32,33,37,40);
		labelFromcity ['K-N'] = new Array(10,11,12,34,35,38);
		labelFromcity ['P-W'] = new Array(13,14,15,16,17,18,22,24,25,36);
		labelFromcity ['X-Z'] = new Array(2,19,20,21,26,27,39);
		labelFromcity ['国际城市'] = new Array(41,42,43,44,45,46,47,48,49);
		var hotList = new Array(14,15,16,17,18,19);
		$('#fromcity').querycity({'data':citysFlight,'tabs':labelFromcity,'hotList':hotList});
		$('#tocity').querycity({'data':citysFlightTo,'tabs':labelFromcity,'hotList':hotList});
	},

	/* 城市选择 版本1*/
	citiesSelect1:function(){
		// 点击空白隐藏
		$('html').click(function(){
			$('.selectAirCommon>div ul').hide();
			$('.selectAirCommon>div .inputDown').removeClass('active').siblings('.bottomLine').hide();
			$('.clear').hide(); //隐藏清楚按钮
		});

		var fromcityData = ['Phnom Penh, Cambodia (Pochentong - PNH)','Siem Reap, Cambodia (Siem Reap - REP)'];
		var tocityData = ['Phnom Penh, Cambodia (Pochentong - PNH)','Siem Reap, Cambodia (Siem Reap - REP)'];
		$.each(fromcityData,function(i,val){
			$('.fromcityMenu').append('<li><a href="#" title="'+val+'">'+val+'</a></li>');
		});
		$.each(tocityData,function(i,val){
			$('.tocityMenu').append('<li><a href="#" title="'+val+'">'+val+'</a></li>');
		}); 

		$('.selectAirCommon>div>div .inputDown').click(function(e){
			e.stopPropagation();
			if($(this).val()!==''){
				$(this).siblings('.clear').show();
				if (document.all && document.addEventListener && !window.atob) {
					$(this).siblings('.clear').hide();
				}else if (document.all && document.querySelector && !document.addEventListener) {
					$(this).siblings('.clear').hide();
				}else{
					$(this).siblings('.clear').show();
				}
			}else{
				$(this).siblings('.clear').hide();
			}
			
			$('.selectAirCommon>div>div .inputDown').removeClass('active').siblings('.bottomLine').hide();
			$(this).addClass('active').siblings('.bottomLine').show();
			$('.selectAirCommon>div>div ul').hide();
			$(this).siblings('ul').show();
		});

		$('.selectAirCommon>div>div ul').on('click','li a',function(e){
			e.preventDefault();e.stopPropagation();
			var val = $(this).html();
			$(this).parent().parent().hide().siblings('.bottomLine').hide().siblings('input').val(val);
			$('.selectAirCommon>div>div .inputDown').removeClass('active');
				// 自动获取焦点
				var inputId = $(this).parent().parent().siblings('input').attr('id'); 
				var focusInput = $(this).parent().parent().parent();
				if(inputId=='fromcity'){
					// $('#tocity').click();
					focusInput.siblings('.localSelectEnd').find('#tocity').click();
				}else if(inputId=='tocity'){
					// $('#timeFrom').click();
					focusInput.siblings('.timeSelectStart').find('#timeFrom').focus();
				}
			});

		// 清空输入框数据
		$('.clear').click(function(){
			$(this).siblings('input').val('');
		});

		// 模糊匹配
		$('.Autocomplete').keyup(function(event) {
			$(this).siblings('ul').empty();
			var getClass = $(this).siblings('ul').attr('class');
			var cityData;
			getClass=='fromcityMenu' ? cityData=fromcityData : cityData=tocityData;
			var currentVal = $(this).val().toLowerCase();
			var srdata = [];
			for (var i = 0; i < cityData.length; i++) {
				if (currentVal.trim().length > 0 && cityData[i].toLowerCase().indexOf(currentVal) > -1) {
					srdata.push(cityData[i]);
				}
			}
			var that = this;
			$.each(srdata,function(i,val){
				$(that).siblings('ul').append('<li><a href="#" title="'+val+'">'+val+'</a></li>');
			});
			if(currentVal===''){
				$.each(cityData,function(i,val){
					$(that).siblings('ul').append('<li><a href="#" title="'+val+'">'+val+'</a></li>');
				});
			}
		});
	},


	/* 航班基本信息选择 */
	flightInfoSelect:function(){
		/* 固定或无固定出发时间 */
		var departureDateSelect = function(){
			// $('.departureDate .nth-child1 b').show();
			$('.departureDate label i').click(function(){
				$(this).siblings('b').show().parent().siblings('label').children('b').hide();
			});
			$('.departureDate label span').click(function(){
				$(this).siblings('b').show().parent().siblings('label').children('b').hide();
			});
		};
		departureDateSelect();

		// 点击搜索   固定日期和无固定日期切换
		$('.searchAir a').click(function(e){
			e.preventDefault();
			$(this).addClass('active');
			var b = $('.departureDate label b').css('display');
			if(b=='block'){
				//window.location.href="LanmeiAirlinesSelectFlight.html";
			}else{
				//window.location.href="LanmeiAirlinesSelectDate.html";
			}
			// window.open('LanmeiAirlinesSelectDate.html');
		});

		/* 单程或双程选择 首页 */
		var selectWay = function(){
			$('.radioSelect i').click(function(){
				$(this).addClass('active').parent().siblings('label').children('i').removeClass('active');
				var selectWay = $(this).siblings('span').attr('data-way');
				if(selectWay=='Round Trip'){
					$('.timeSelectEnd').css('visibility','visible');
				}else if(selectWay=='One - way'){
					$('.timeSelectEnd').css('visibility','hidden');
				}else{
					//window.location.href="tpls/CN/LanmeiAirlinesMultiCities.html";
				}
			});
		};
		selectWay();


		/* 单程或双程选择 选择日期 */
		var selectDateWay = function(){ 
			// $('.selectWay a.nth-child1').addClass('active');
			// $('.timeSelectEnd').hide();
			$('.selectWay a').click(function(e){
				e.preventDefault();
				$(this).addClass('active').siblings('a').removeClass('active');
				var selectWay = $(this).attr('data-way');
				var dataMulti = $(this).attr('data-Multi');
				if(selectWay=='Round Trip'){
					$('.timeSelectEnd').css('visibility','visible');
					var timeToDate=$("#timeFrom").val();
					//alert(timeToDate);
					//$( "#timeTo" ).val(timeToDate);
					//$( "#timeTo" ).datepicker( "option", "minDate", timeToDate );
				  	//$( "#timeTo" ).datepicker( "option", "defaultDate", "+1d" );
					// window.location.href="LanmeiAirlinesSelectDate.html";
				}else if(selectWay=='One - way'){
					$('.timeSelectEnd').css('visibility','hidden');
					if(dataMulti=="true"){
						window.location.href=$(this).attr('href');
						//window.location.href="LanmeiAirlinesSelectDate.html";
					} 
				}else{
					if(dataMulti!="true"){
						window.location.href=$(this).attr('href');
						//window.location.href="LanmeiAirlinesMultiCities.html";
					} 
				}
			});
		};
		selectDateWay();

		/* 起始地点切换 */
		$('#localChangeImg').mouseover(function(){
			$(this).addClass('img02');
		}).mouseout(function(){
			$(this).removeClass('img02');
		});

		$('#localChangeImg').click(function(){
			// $(this).addClass('img02');
			var fromcity = $('#fromcity').val();
			var tocity = $('#tocity').val();
			var orgcity=$("#orgcityhidden").val();
			$("#orgcityhidden").val($("#dstcityhidden").val());
			$("#dstcityhidden").val(orgcity);
			$('#fromcity').val(tocity);
			$('#tocity').val(fromcity);
		});
		/* 乘客人数选择 */
		var AdultNum = 1;
		var ChildNum = 0;
		var InfantNum = 0;
		var layer_index=-1; 
		 
		var totalPeopleNum= $("#totalPeopleNum").val();
		var AdultSelect = function(){
			$('.AdultSelect .addArrow').click(function(){ 
//				var ChildNum = $('#Child').val();//获取小孩人数
				var AdultNum = parseInt($('#Adult').val());
				var ChildNum = parseInt($('#Child').val());
				if(ChildNum+AdultNum<totalPeopleNum){
					if(layer_index!= undefined && layer_index!=-1){
						layer.close(layer_index);
						layer_index=-1;
					}
					AdultNum++;
					$('#Adult').val(AdultNum);
				}else{
					layer_index=layer.tips('成人与儿童总计不超'+totalPeopleNum+'个!', '#Adult',{
						tips: [2, '#8ec060'],
						time: 3000
					});
				}
			});
			$('.AdultSelect .downArrow').click(function(){
//				$('#Adult').val()>=2 && AdultNum--;
//				$('#Adult').val(AdultNum);
				var AdultNum = parseInt($('#Adult').val());
				var ChildNum = parseInt($('#Child').val()); 
				if(AdultNum>1){
					if(layer_index!= undefined && layer_index!=-1){
						layer.close(layer_index);
						layer_index=-1;
					}
					AdultNum--;
					$('#Adult').val(AdultNum);
				}else{
					layer_index=layer.tips('成人数量不合法!', '#Adult',{
						tips: [2, '#8ec060'],
						time: 3000
					});
				}
			});
		};

		var ChildSelect = function(){
			$('.ChildSelect .addArrow').click(function(){ 
//				var AdultNum = $('#Adult').val();//获取成人人数
				var AdultNum = parseInt($('#Adult').val());
				var ChildNum = parseInt($('#Child').val());
				if(AdultNum+ChildNum<totalPeopleNum){
					if(layer_index!= undefined && layer_index!=-1){
						layer.close(layer_index);
						layer_index=-1;
					}
					ChildNum++;
					$('#Child').val(ChildNum);
				}else{
					layer_index=layer.tips('成人与儿童总计不超'+totalPeopleNum+'个!', '#Child',{
						tips: [2, '#8ec060'],
						time: 3000
					});
				}
			});
			$('.ChildSelect .downArrow').click(function(){ 
//				$('#Child').val()>=1 && ChildNum--;
//				$('#Child').val(ChildNum);
				var AdultNum = parseInt($('#Adult').val());
				var ChildNum = parseInt($('#Child').val());
				if(ChildNum>0){
					if(layer_index!= undefined && layer_index!=-1){
						layer.close(layer_index);
						layer_index=-1;
					}
					ChildNum--;
					$('#Child').val(ChildNum);
				}else{
					layer_index=layer.tips('儿童数量不合法!', '#Child',{
						tips: [2, '#8ec060'],
						time: 3000
					});
				}
			});
		};

		var InfantSelect = function(){
			$('.InfantSelect .addArrow').click(function(){
				InfantNum++;
				$('#Infant').val(InfantNum);
			});
			$('.InfantSelect .downArrow').click(function(){
				$('#Infant').val()>=1 && InfantNum--;
				$('#Infant').val(InfantNum);
			});
		};

		AdultSelect();
		ChildSelect();
		InfantSelect();
		// 重置输入框内容
		$('.resetBtn').click(function(){ 
			AdultNum = 1;
			ChildNum = 0;
			InfantNum = 0;

			var today=new Date();
			function timeResult(time){
				var y = time.getFullYear(); 
			    var m = time.getMonth()+1;//获取当前月份的日期 
			    var d = time.getDate(); 
			    m<10 && (m="0"+m);
			    d<10 && (d="0"+d);
			    return y+'-'+m+'-'+d;
			}
			
			$('#fromcity').val('');
			$('#tocity').val('');
			$('#timeFrom').val(timeResult(today));
			$('#timeTo').val('');
			$('#Cabin').val('Economy');
			$('#Adult').val('1');
			$('#Child').val('0');
			$('#Infant').val('0');
		});
	},

	/* 置顶按钮 */
	getTop:function(){
		var getBottom; 
		$(window).scroll(function() {
			getBottom = $(document).height() - $(window).height() - $(window).scrollTop();
			if(getBottom<320){
				$('.BackToTop').css('bottom',370-getBottom);
			}else{
				$('.BackToTop').css('bottom',70);
			}
		});

		$('.BackToTop').click(function(){
			$('html, body').animate({scrollTop:0}, 'slow');
		});

		$('.BackToTop').mouseover(function(event) {
			$(this).children('img').attr('src','http://'+window.location.host+'/lqWeb/lqweb/Lanmei_project/images/CN/ToTop-icon-active.png');
//			$(this).children('.img01').hide().siblings('.img02').show();
		}).mouseout(function(){
			$(this).children('img').attr('src','http://'+window.location.host+'/lqWeb/lqweb/Lanmei_project/images/CN/ToTop-icon.png');
//			$(this).children('.img02').hide().siblings('.img01').show();
		});
	},

	otherEvent:function(){
		/* 语言切换 */
		/*$('.languageBox').click(function(e) {
			e.stopPropagation();
			$('.languageDownMenu').show();
			$('.ENbottomLine').show();
			$('.languageSelect').addClass('active');
		});
		$('.languageBox>ul').on('click','li a',function(e){
			e.stopPropagation();
			var img = $(this).css('background-image');
			var span = $(this).children('span').html();
			$('.languageSelect').css('background-image',img);
			$('.languageSelect').children('span').html(span);
			$('.languageSelect').removeClass('active');
			$('.languageBox>ul').hide();
			$('.ENbottomLine').hide();
		});
		$('html').click(function(){
			$('.languageSelect').removeClass('active');
			$('.languageBox>ul').hide();
			$('.ENbottomLine').hide();
		});*/

		/* 文字滚动 */
		$(".line").slideUp();
	},
};

$(document).ready(function($) {
	LanmeiAirlinesCommon.init();
});


(function($){
	// 文字滚动
	$.fn.extend({
		"slideUp":function(value){
			
			var docthis = this;
			//默认参数
			value=$.extend({
				"li_h":"30",
				"time":2000,
				"movetime":1000
			},value);
			
			//向上滑动动画
			function autoani(){
				$("li:first",docthis).animate({"margin-top":-value.li_h},value.movetime,function(){
					$(this).css("margin-top",0).appendTo(".line");
				});
			}
			
			//自动间隔时间向上滑动
			var anifun = setInterval(autoani,value.time);
			
			//悬停时停止滑动，离开时继续执行
			$(docthis).children("li").hover(function(){
				clearInterval(anifun);			//清除自动滑动动画
			},function(){
				anifun = setInterval(autoani,value.time);	//继续执行动画
			});
		}	
	});
})(jQuery);