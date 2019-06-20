var url = $("#localurl").val();
var sslBaseUrl = $("#sslBaseUrl").val();
var LanmeiAirlinesMultiCities = {
	init:function(){
		initSelect($("#fromcity").siblings("ul.fromcityMenu"));
		initSelect($("#tocity").siblings("ul.tocityMenu"));
		this.addLocaSelect();
		this.addEvend();
		$('.addLocaSelect').click();
		$('.addLocaSelect').click();
		this.selectEvend();
		this.selectPeople();
		
	},

	/* 人数选择 */
	selectPeople:function(){
		var $adultResult = $('.js-p-adult>span');
		var $childResult = $('.js-p-child>span');
		var $infantResult = $('.js-p-infant>span');

		// 点击展示选择人数框
		$('.js-people-select').click(function(e) {
			e.stopPropagation();
			$('.selectAirCommon>div>div .downMenu-com').hide();
			$(this).siblings('.downMenu-com').show();
		});
		// 阻止冒泡
		$('.downMenu-com').click(function(e) {
			e.stopPropagation();
		});
		// 点击空白隐藏
		$('html').click(function(){
			$('.downMenu-com').hide();
		});

		// 设置默认值
		var adultDefault = 3;
		var childDefault = 3;
		$('.js-p-adult span').html(adultDefault);
		$('.js-s-adult').find('.adult-num').html(adultDefault);
		$('.js-p-child span').html(childDefault);
		$('.js-s-child').find('.child-num').html(childDefault);

		if(Number(adultDefault) > 1) {
			$('.js-adult-sub').removeClass('off-sub-operation');
		}
		if(Number(childDefault) > 0) {
			$('.js-child-sub').removeClass('off-sub-operation').parent().removeClass('disable');
		}
		if(Number(adultDefault) + Number(childDefault) > 7) {
			$('.js-child-add').addClass('off-add-operation');
			$('.js-adult-add').addClass('off-add-operation');
		}

		// 成人
		var adult = function(){
			$('.js-adult-add').click(function(){
				var childNum = $(this).parents('.js-s-adult').siblings('.js-s-child').find('.child-num').html();//获取小孩人数
				var adultNum = $(this).siblings('span').html();;//获取成人人数
				if(parseInt(childNum)+parseInt(adultNum)<8){
					adultNum++;
					$(this).siblings('span').html(adultNum);
					$adultResult.html(adultNum); //动态赋值
					$('#Adult').val(adultNum); // 给成人input赋值
					adultNum==2 && $(this).siblings('.sub-people').removeClass('off-sub-operation');
				}else{
					$(this).addClass('off-add-operation');
				}
			});
			$('.js-adult-sub').click(function(){
				$(this).siblings('.add-people').removeClass('off-add-operation');
				var adultNum = $(this).siblings('span').html();;//获取成人人数
				adultNum--;
				if(adultNum<2){
					adultNum=1;
					$(this).addClass('off-sub-operation');
				}
				$(this).siblings('span').html(adultNum);
				$adultResult.html(adultNum); //动态赋值
				$('#Adult').val(adultNum); // 给成人input赋值
			});
		};

		// 小孩
		var child = function(){
			$('.js-child-add').click(function(){
				var adultNum = $(this).parents('.js-s-child').siblings('.js-s-adult').find('.adult-num').html();//获取小孩人数
				var childNum = $(this).siblings('span').html();;//获取成人人数
				if(parseInt(childNum)+parseInt(adultNum)<8){
					childNum++;
					$(this).siblings('span').html(childNum);
					$childResult.html(childNum); //动态赋值
					$('#Child').val(childNum); // 给儿童input赋值
				}else{
					$(this).addClass('off-add-operation');
				}

				if(childNum==1){
					$(this).siblings('.sub-people').removeClass('off-sub-operation');
					$(this).parent().removeClass('disable');
				}
			});
			$('.js-child-sub').click(function(){
				$(this).siblings('.add-people').removeClass('off-add-operation');
				var childNum = $(this).siblings('span').html();;//获取成人人数
				childNum--;
				if(childNum<1){
					childNum=0;
					$(this).addClass('off-sub-operation');
					$(this).parent().addClass('disable');
				}
				$(this).siblings('span').html(childNum);
				$childResult.html(childNum); //动态赋值
				$('#Child').val(childNum); // 给儿童input赋值
			});
		};

		// 婴儿
		var infant = function(){
			$('.js-infant-add').click(function(){
				infantNum++;
				$(this).siblings('span').html(infantNum);
				$infantResult.html(infantNum); //动态赋值
				if(infantNum==1){
					$(this).siblings('.sub-people').removeClass('off-sub-operation');
					$(this).parent().removeClass('disable');
				}
			});
			$('.js-infant-sub').click(function(){
				infantNum--;
				if(infantNum<1){
					infantNum=0;
					$(this).addClass('off-sub-operation');
					$(this).parent().addClass('disable');
				}
				$(this).siblings('span').html(infantNum);
				$infantResult.html(infantNum); //动态赋值
			});
		};
		adult();
		child();
		infant();

		/* 人数提示 */
		var showAdultTip = 0;
		var showChildTip = 0;
		var showInfantTip = 0;
		var screenWidth = window.screen.width;
		var tipFn = function(className,content,showTip){
			$(className).mouseenter(function(event) {
				if(screenWidth>767){
					showTip = layer.tips(content, className,{
						tips: [2, '#8ec060'],
						time: 0
					});
				}else{
					showTip = layer.tips(content, className,{
						tips: [3, '#8ec060'],
						time: 0
					});
				}
			}).mouseleave(function(event) {
				layer.close(showTip);
			});
		};
		tipFn('.adult-tip', '成人', showAdultTip);
    tipFn('.child-tip', '截止至上一次飞行日期，未满12岁的乘客被视为儿童。7岁以上的儿童在父母同意的情况下可独自搭乘飞机。', showChildTip);
    tipFn('.infant-tip', '出生满7天以及未满2岁的乘客被视为婴儿', showInfantTip);
	},

	addLocaSelect:function(){
		// 删除一行
		$('.local_timeSelect').on('click','.js-multi-delete',function(){
			$(this).parent('.local_timeSelectList').remove();
			// 重置序号
			$.each($('.local_timeSelect>div'),function(idx,val){
				$(val).children('.serialNum').html(idx+1);
			});
			// 隐藏删除按钮
			if($('.local_timeSelect>div').length<=1) {
				$('.js-multi-delete').hide();
			}
		});
		$('.addLocaSelect').click(function(){
			// 显示删除按钮
			$('.js-multi-delete').show();
			// 获取多段个数
			var curNum = $('.local_timeSelect>div').length+1;
			if(curNum > 6 ){
				tipContext("最多只能添加6个航段");
				return false;
			}
			//lqweb/Lanmei_project/images/CN/slideUp-icon.png
			var addSelectChild = '<div class="local_timeSelectList1 local_timeSelectList">'+
					'<div class="serialNum">'+curNum+'</div>'+
					'<div class="localSelectStart">'+
						'<input type="text" autocomplete="off" class="fromcityinput inputDown Autocomplete" id="fromcity'+curNum+'" value="" placeholder="出发地" title="1">'+
						'<i class="img01 localChangeImg"></i>'+
						'<input name="orgcity'+curNum+'" type="hidden"/>'+
						'<ul class="fromcityMenu" >'+
						'</ul>'+
					'</div>'+
					'<div class="localSelectEnd">'+
						'<input type="text" autocomplete="off" class="tocityinput inputDown Autocomplete" id="tocity'+curNum+'" value="" placeholder="目的地" title="1">'+
						'<input name="dstcity'+curNum+'" type="hidden"/>'+
						'<ul class="tocityMenu">'+
						'</ul>'+
					'</div>'+
					'<div class="timeSelectStart">'+
						'<input type="text" id="timeFrom'+curNum+'" class="timeFrom" name="departureDate'+curNum+'" placeholder="日期" readonly>'+
					'</div>'+
					'<div class="timeSelectEnd" style="display: none;">'+
						'<p><img src="'+sslBaseUrl+'lqweb/Lanmei_project/images/EN/departureDate2.png"><span>到达日期</span></p>'+
						'<input type="text" id="timeTo'+curNum+'" class="timeTo" name="from" readonly>'+
					'</div>'+
					'<div class="multi-delete js-multi-delete"></div>'+
				'</div>';
			
			$('.local_timeSelect').append(addSelectChild);
			
			//给ul添加选择项
			initSelect($("#fromcity"+curNum).siblings("ul.fromcityMenu"));
			initSelect($("#tocity"+curNum).siblings("ul.tocityMenu"));
			
			//添加下拉框事件，append之后需要重新绑定事件
			LanmeiAirlinesMultiCities.selectEvend();
			// 调用日期插件
			$('#timeFrom'+curNum+'').dateSelect({
				'timeFrom': 'timeFrom'+curNum+'',
				'timeTo': 'timeTo'+curNum+'',
			});
			$("#timeFrom"+curNum).val("");
		});
	},
	
	/* 其他事件 */
	addEvend:function(){
		// 点击查询
		$('.searchAir a').click(function(){
			$(this).addClass('active');
			if( ($("#fromcity").val() ) == ""){
				$("#orgcity").val("");
			}
			if( ($("#tocity").val() ) == ""){
				$("#dstcity").val("");
			}
			var Cabin  = $("#Cabin").val();
			var orgcity  = $("#orgcity").val();
			var dstcity  = $("#dstcity").val();
			var timeFrom = $("#timeFrom").val();
			
			if(orgcity.length==0){
				tipContext("请选择出发地");
				$("#fromcity").focus();
				$(this).removeClass('active');
				return false;
			}
			if(dstcity.length==0){
				tipContext("请选择目的地");
				$("#tocity").focus();
				$(this).removeClass('active');
				return false;
			}
			var date = new Date().format("yyyy-MM-dd");
			if( timeFrom < date ){
				tipContext("不能查询该天航班");
				$("#timeFrom").focus();
				$(this).removeClass('active');
				return false;
			}
			
			var check = true;
			$("div.local_timeSelectList").each(function(index) {
				if(index > 0 ){
					var curr_fromcity = $(this).children("div.localSelectStart").children("input.fromcityinput").val();
					var curr_city = $(this).children("div.localSelectEnd").children("input.tocityinput").val();
					var curr_departureDate = $(".timeFrom").eq(index).val();
					
					var prev_fromcity = $("div.local_timeSelectList").eq(index-1).children("div.localSelectStart").children("input.fromcityinput").val();
					var prev_city = $("div.local_timeSelectList").eq(index-1).children("div.localSelectEnd").children("input.tocityinput").val();
					var prev_departureDate = $(".timeFrom").eq(index-1).val();
					
					if( curr_departureDate !="" && curr_departureDate < prev_departureDate){//时间字符串可以直接比较大小
						tipContext("前一航段出发时间不能晚于后一航段");
						$(".timeFrom").eq(index).focus();
						$("div.searchAir a").removeClass('active');
						check = false;
						return false;
					}
					
					if(curr_fromcity !="" || curr_city!="" || curr_departureDate != "" ){
						if(prev_fromcity =="" || prev_city =="" || prev_departureDate == "" ){
							tipContext("前一航段输入不能存在空值");
							$("div.local_timeSelectList").eq(index-1).children("div.localSelectStart").children("input.fromcityinput").focus();
							$("div.searchAir a").removeClass('active');
							check = false;
							return false;
						}
						if(curr_fromcity =="" ){
							tipContext("出发地不能为空");
							$(this).children("div.localSelectStart").children("input.fromcityinput").focus();
							$("div.searchAir a").removeClass('active');
							check = false;
							return false;
						}
						if(curr_city =="" ){
							tipContext("目的地不能为空");
							$(this).children("div.localSelectEnd").children("input.tocityinput").focus();
							$("div.searchAir a").removeClass('active');
							check = false;
							return false;
						}
						
						if(curr_departureDate =="" ){
							tipContext("出发日期不能为空");
							$("div.searchAir a").removeClass('active');
							check = false;
							return false;
						}
					}
				}
			});
			if( check == false ) 
				return false;
			$("#sureDate").val("1");
			$("#tripTypehidden").val("MT");
			$("#pageConstant").val("2");
			$("#searchform").submit();
		});

		/* 起始地点切换 */
		$('.selectAirCommon').on('mouseover','.localChangeImg',function(){
			$(this).addClass('img02');
		}).on('mouseout','.localChangeImg',function(){
			$(this).removeClass('img02');
		});

		$('.selectAirCommon').on('click','.localChangeImg',function(){
			var $fromcity = $(this).siblings('input.Autocomplete');
			var $tocity = $(this).parent().siblings('.localSelectEnd').find('input.Autocomplete');
			var fromcity = $fromcity.val();
			var tocity = $tocity.val();
			$fromcity.val(tocity);
			$tocity.val(fromcity);
			
			var $fromThreeCode = $(this).siblings('input[type="hidden"]');
			var $toThreeCode = $(this).parent().siblings('.localSelectEnd').find('input[type="hidden"]');
			var fromThreeCode = $fromThreeCode.val();
			var toThreeCode = $toThreeCode.val();
			$fromThreeCode.val(toThreeCode);
			$toThreeCode.val(fromThreeCode);
			
		});
		$('ul#CabinMenu li a').click(function(){
			var val = $(this).html();
			var id  = $(this).attr("id");
			$("#cabinType").val(id);
			$(this).parent().parent().siblings("input").val(val);
		});
		$('ul#CurrencySelect li a').click(function(){
			var val = $(this).html();
			$(this).parent().parent().siblings("input").val(val);
		});
/*		$('.clear').click(function(){
			initSelect($(this).siblings("ul"));
		});*/
		
		$(".selectWay a").click(function(e){
		    var type=$(this).attr("id"); 
		   // var cls = $(this).attr("class");
		    $("#sureDate").val("");
		    $("#tripTypehidden").val(type);
	        $("#takeoffDate").val($("#timeFrom").val());
	        var returndate=$("#returnDate").val();
	    	var reg=new RegExp("null",""); 
	   		returndate=returndate.replace(reg,$("#timeFrom").val()); 
	   		$("#returnDate").val(returndate);
	        if("RT" === type)
	        {   
	        	doCheck(type);
	        	/* window.onbeforeunload = function() {
	        		//alert(1111111111);
	        		return 123;
	        	} */
	        	//--------------验证码 end---------------------
	        	//alert(11111111111111);
	        	//$("#searchform").submit();
	        }else if("OW" === type){
	        	//alert(11111111111111);
	       		//$("#searchform").submit();
	        	doCheck(type);
	        }else {
	        	 
	        }    
		 });

		// 日期选择
		$('#timeFrom').dateSelect({
			'timeFrom': 'timeFrom',
			'timeTo': 'timeTo',
		});
			
	},
	//下拉框事件
	selectEvend : function() {
		$('.Autocomplete').keyup(on_keyup);
		//输入框值改变时，需要重新选择
		$('.Autocomplete').change(function () {
			$(this).attr("title","0");	
		});
		//
		$('.Autocomplete').blur(function () {
			var isNeedSelect =  $(this).attr("title");
			if(isNeedSelect == "0"){
				$(this).val("");
				$(this).siblings("input[type=hidden]").val("");
			}
		}); 
		//输入框为空时重置下拉选择项
		$('.Autocomplete').focus(function () {
			var val =  $(this).val();
			if(val ==""){
				initSelect($(this).siblings("ul"));
			}
		}); 
	}
};

function citySelect(obj) {
	//<input name="dstcity" type="hidden" id="dstcityhidden"/>
	var threeCode = $(obj).attr("id");
	var val = $(obj).html();
	$(obj).parent().parent().siblings("input[type='hidden']").val(threeCode);//ul->input[dstcity]
	$(obj).parent().parent().siblings("input.Autocomplete").val(val);
	var abc = $(obj).parent().siblings("input");
	var fromcity = $("#fromcity").val();
	var orgcityhidden = $("#orgcityhidden").val();
	
	//标记该输入框已经选择
	$(obj).attr("title","1");
};

var on_keyup = function(){
	$(this).siblings('ul').empty();
	var getClass = $(this).siblings('ul').attr('class');
	var currentVal = $(this).val().toLowerCase();
	var obj = $(this).siblings('ul');
	$(".citysHidden").each(function(){
		var threeCode=$(this).attr("id");
	    var showName=$(this).val();
	    if (currentVal.trim().length > 0 && showName.toLowerCase().indexOf(currentVal) > -1) {
	    	obj.append("<li><a href='javascript:void(0)' onclick='citySelect(this)'  title='"+showName+"' id='"+threeCode+"'>"+showName+"</a></li>");
	    }
		if(currentVal.trim().length == 0 ){
	    	obj.append("<li><a href='javascript:void(0)' onclick='citySelect(this)'  title='"+showName+"' id='"+threeCode+"'>"+showName+"</a></li>");
		}
    });
};
String.prototype.trim = function() {
	  return this.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
};
var initSelect = function(obj){
	obj.empty();
	$(".citysHidden").each(function(){
	    var threeCode=$(this).attr("id");
	    var showName=$(this).val();
	    obj.append("<li><a href='javascript:void(0)' onclick='citySelect(this)'  title='"+showName+"' id='"+threeCode+"'>"+showName+"</a></li>");
	});
};

$(document).ready(function($) {
	LanmeiAirlinesMultiCities.init();
	defalt_value();
	
});
Date.prototype.format = function(fmt) { 
    var o = { 
       "M+" : this.getMonth()+1,                 //月份 
       "d+" : this.getDate(),                    //日 
       "h+" : this.getHours(),                   //小时 
       "m+" : this.getMinutes(),                 //分 
       "s+" : this.getSeconds(),                 //秒 
       "q+" : Math.floor((this.getMonth()+3)/3), //季度 
       "S"  : this.getMilliseconds()             //毫秒 
   }; 
   if(/(y+)/.test(fmt)) {
           fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length)); 
   }
    for(var k in o) {
       if(new RegExp("("+ k +")").test(fmt)){
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
        }
    }
   return fmt; 
};

function doCheck(type) {
	var btnVal = "search";
	$.ajax({
		type:"POST",
		url:url+"/servlet/GetVertifyCode",
		data:{'option':'isNeed','btnVal':btnVal},
		dataType:"text",
		success:function(data) {
			if ("false" == data) {
				$("#pageConstant").val("2");
				$("#searchform").submit();
			} else if ("true" == data) {
				var timestamp = (new Date()).valueOf();
				var notice = "请输入验证码";
				var btnN = "确定";
				var errortips = "验证码错误,请重新输入";
				layer.open({
					type:1,
					area:['300px','210px'],
					title:[notice,'height:35px;'],
					shadeClose: true, //点击遮罩关闭
				 	shade: 0.6, //遮罩透明度
				 	maxmin: false, //允许全屏最小化
				 	anim: -1, //0-6的动画形式，-1不开启
				 	content:"<div style='text-align:center;height:75px;'><img id='vertifyCodePic' onclick='refreshAll()' src='"+url+"/servlet/GetVertifyCode?option=getVertifyCode&timestamp="
				 			+timestamp+"'/>" + "</div></br>"
				 			+"<div style='text-align:center'><input style='height:25px;border:1px solid #c8cccf;' type='text' id='vertifyCodeTemp' name='vertfyCodeTemp' required  lay-verify='required' placeholder='输入验证码' autocomplete='off' class='layui-input'><font id='appendFont' style='color:#FF0000;'></font></div>",
				 	btn: [btnN],
				 	btnAlign: 'c', //按钮居中
				 	yes: function(index, layero){
				 		$.ajax({
				 			type:"POST",
				 			url:url+"/servlet/GetVertifyCode",
				 			data:{'option':'checkCode','vertifyCode':$("#vertifyCodeTemp").val()},
				 			dataType:"text",
				 			success:function(data) {
				 				if ("success" == data) {
			 						$("#btnVal").val(btnVal);
			 						$("#vertifyCode").val($("#vertifyCodeTemp").val());
			 						$("#pageConstant").val("2");
			 						$("#searchform").submit();
							 	    layer.close(index);
				 				} else {
				 					$(".layui-layer-title").text("").append("<font id='vertifytip' style='color:#FF0000;'>"+errortips+"</font>");
				 					refresh();
				 				}
				 			}
				 		});
				 		
				 	  },
					success: function(layero, index){
						//弹窗成功后的回调,按回车提交验证码
							$("#vertifyCodeTemp").focus();
							$("#vertifyCodeTemp").keydown(function(event){
								//.layui-layer-btn0
								if (event.keyCode == 13) {
									$(".layui-layer-btn0").click();
								}
							});
						 },
					end: function(layer,index) {
						if("RT" == type) {
							$("#RT").attr("class","RoundTrip");
							$("#MT").attr("class","Stopover active");
						}
						if("OW" == type) {
							$("#OW").attr("class","OneWay nth-child1");
							$("#MT").attr("class","Stopover active");
						}
					}
				});
			}
		}
	});
}
function refreshAll() {
	$("#vertifytip").remove();
    $(".layui-layer-title").text("请输入验证码");
	refresh();
}
function refresh() {
	$("#vertifyCodeTemp").val("");
	$("#vertifyCodeTemp").focus();
	var timestamp = (new Date()).valueOf(); 
	$("#vertifyCodePic").attr("src",url+"/servlet/GetVertifyCode?option=getVertifyCode&timestamp="+timestamp);
}
