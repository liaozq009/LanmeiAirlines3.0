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
		
	},

	addLocaSelect:function(){
		// 删除一行
		$('.subLocaSelect').click(function(){
			var divNum = $('.local_timeSelect>div').length;
			if(divNum>1){
				$('.local_timeSelect>div').eq(-1).remove();
			}
		});
		$('.addLocaSelect').click(function(){
			// 获取多段个数
			var curNum = $('.local_timeSelect>div').length+1;
			if(curNum > 6 ){
				tipContext("You can only add up to 6 flights");
				return false;
			}
			//lqweb/Lanmei_project/images/CN/slideUp-icon.png
			var addSelectChild = '<div class="local_timeSelectList1 local_timeSelectList">'+
					'<div class="serialNum">'+curNum+'</div>'+
					'<div class="localSelectStart">'+
						'<p><img src="'+sslBaseUrl+'lqweb/Lanmei_project/images/EN/originStart2.png"><span>From</span></p>'+
						'<input type="text"  autocomplete="off" class="fromcityinput inputDown Autocomplete" id="fromcity'+curNum+'" placeholder="-Choose-" title="1">'+
						'<img src="'+sslBaseUrl+'lqweb/Lanmei_project/images/EN/downArrow.png">'+
						'<span class="clear">X</span>'+
						'<i class="img01 localChangeImg"></i>'+
						'<b class="bottomLine"></b>'+
						'<input name="orgcity'+curNum+'" type="hidden"/>'+
						'<ul class="fromcityMenu" >'+
						'</ul>'+
					'</div>'+
					'<div class="localSelectEnd">'+
						'<p><img src="'+sslBaseUrl+'lqweb/Lanmei_project/images/EN/originEnd2.png"><span>To</span></p>'+
						'<input type="text" class="tocityinput inputDown Autocomplete" id="tocity'+curNum+'" placeholder="-Choose-" title="1" autocomplete="off">'+
						'<img src="'+sslBaseUrl+'lqweb/Lanmei_project/images/EN/downArrow.png">'+
						'<span class="clear">X</span>'+
						'<b class="bottomLine"></b>'+
						'<input name="dstcity'+curNum+'" type="hidden"/>'+
						'<ul class="tocityMenu">'+
						'</ul>'+
					'</div>'+
					'<div class="timeSelectStart">'+
						'<p><img src="'+sslBaseUrl+'lqweb/Lanmei_project/images/EN/departureDate2.png"><span>Departure Date</span></p>'+
						'<input type="text" id="timeFrom'+curNum+'" class="timeFrom" name="departureDate'+curNum+'" placeholder="-Choose-" readonly>'+
						'<img src="'+sslBaseUrl+'lqweb/Lanmei_project/images/EN/downArrow.png">'+
					'</div>'+
						'<div class="timeSelectEnd" style="display: none;">'+
						'<p><img src="'+sslBaseUrl+'lqweb/Lanmei_project/images/EN/departureDate2.png"><span></span></p>'+
						'<input type="text" id="timeTo'+curNum+'" class="timeTo" name="from" readonly>'+
						'<img src="'+sslBaseUrl+'lqweb/Lanmei_project/images/EN/downArrow.png">'+
					'</div>'+
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
				tipContext("Please choose the departure city!");
				$("#fromcity").focus();
				$(this).removeClass('active');
				return false;
			}
			if(dstcity.length==0){
				tipContext("Please choose the destination city!");
				$("#tocity").focus();
				$(this).removeClass('active');
				return false;
			}
			
			var date = new Date().format("yyyy-MM-dd");
			if( timeFrom < date ){
				tipContext("Ticket of thisDay is not available");
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
						tipContext("The previous flight period can not be later than the later flight ");
						//$(".timeFrom").eq(index).focus();
						$("div.searchAir a").removeClass('active');
						check = false;
						return false;
					}
					
					if(curr_fromcity !="" || curr_city!="" || curr_departureDate != "" ){
						if(prev_fromcity =="" || prev_city =="" || prev_departureDate == "" ){
							tipContext("the previous flight  can not  empty");
							$("div.local_timeSelectList").eq(index-1).children("div.localSelectStart").children("input.fromcityinput").focus();
							$("div.searchAir a").removeClass('active');
							check = false;
							return false;
						}
						if(curr_fromcity =="" ){
							tipContext("Origin cannot be empty");
							$(this).children("div.localSelectStart").children("input.fromcityinput").focus();
							$("div.searchAir a").removeClass('active');
							check = false;
							return false;
						}
						if(curr_city =="" ){
							tipContext("Destination cannot be empty");
							$(this).children("div.localSelectEnd").children("input.tocityinput").focus();
							$("div.searchAir a").removeClass('active');
							check = false;
							return false;
						}
						
						if(curr_departureDate =="" ){
							tipContext("Departure date cannot be empty");
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
		    $("#sureDate").val("");
	        $("#tripTypehidden").val(type);
	        if("RT" === type)
	        {
	        	doCheck(type);
	        	//$("#searchform").submit();
	        }else if("OW" === type){
	        	doCheck(type);
	       		//$("#searchform").submit();
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
				var notice = "Enter the verification code";
				var btnN = "Confirm";
				var errortips = "Code error, please re-enter";
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
				 			+"<div style='text-align:center'><input style='height:25px;border:1px solid #c8cccf;' type='text' id='vertifyCodeTemp' name='vertfyCodeTemp' required  lay-verify='required' placeholder='Enter here' autocomplete='off' class='layui-input'><font id='appendFont' style='color:#FF0000;'></font></div>",
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
    $(".layui-layer-title").text("Enter the verification code");
	refresh();
}
function refresh() {
	$("#vertifyCodeTemp").val("");
	$("#vertifyCodeTemp").focus();
	var timestamp = (new Date()).valueOf(); 
	$("#vertifyCodePic").attr("src",url+"/servlet/GetVertifyCode?option=getVertifyCode&timestamp="+timestamp);
}

