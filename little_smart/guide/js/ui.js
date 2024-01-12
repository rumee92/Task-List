/**
디바이스체크
**/
_Device={};_Device.smartphone=false;_Device.tablet=false;_Device.type=0;_Device.os=0;function checkDevice(){if(navigator.userAgent.match(/Android/)!=null){if(navigator.userAgent.match(/mobile|Mobile/)!=null){_Device.type=2}else{_Device.type=1}_Device.os=0}else{var minSiteWidth=480;var maxSiteWidth=1024;var w=($(window).width()<window.screen.width)?$(window).width():window.screen.width;if(navigator.userAgent.match(/iPhone|iPad|iPod/)!=null){_Device.os=1}else{_Device.os=2}if(navigator.userAgent.match(/webOS|iPhone|iPad|iPod|BlackBerry/)!=null){if(w<=minSiteWidth||(navigator.userAgent.match(/iPhone|iPod|BlackBerry/)!=null&&navigator.platform.match(/iPad/)==null)){_Device.type=2}else{_Device.type=1}}else{_Device.type=0}}if(_Device.type==2){_Device.tablet=false;_Device.smartphone=true}else if(_Device.type==1){_Device.tablet=true;_Device.smartphone=false}else{_Device.smartphone=_Device.tablet=false}}_Browser={};function browserDetect(){_Browser.ie6=false;_Browser.ie7=false;_Browser.ie8=false;_Browser.ie9=false;_Browser.ie10=false;_Browser.ie11_over=false;_Browser.msie=false;_Browser.mozilla=false;_Browser.safari=false;_Browser.chrome=false;_Browser.version=0;_Browser.name="etc";var objappVersion=navigator.appVersion;var objAgent=navigator.userAgent;var objbrowserName=navigator.appName;var objfullVersion=''+parseFloat(navigator.appVersion);var objBrMajorVersion=parseInt(navigator.appVersion,10);var objOffsetName,objOffsetVersion,ix;var iev=0;var ieold=(/MSIE (\d+\.\d+);/.test(navigator.userAgent));var trident=!!navigator.userAgent.match(/Trident\/7.0/);var rv=navigator.userAgent.indexOf("rv:11.0");if(ieold)iev=new Number(RegExp.$1);if(navigator.appVersion.indexOf("MSIE 10")!=-1)iev=10;if(trident&&rv!=-1)iev=11;if(iev!=0||(objOffsetVersion=objAgent.indexOf("MSIE"))!=-1){_Browser.name="Microsoft Internet Explorer";_Browser.msie=true;_Browser.version=iev;if(_Browser.version<7){_Browser.ie6=true}else if(_Browser.version<8){_Browser.ie7=true}else if(_Browser.version<9){_Browser.ie8=true}else if(_Browser.version<10){_Browser.ie9=true}else if(_Browser.version<11){_Browser.ie10=true}else{_Browser.ie11_over=true}}else{if((objOffsetVersion=objAgent.indexOf("Chrome"))!=-1){_Browser.chrome=true;objbrowserName="Chrome";objfullVersion=objAgent.substring(objOffsetVersion+7)}else if((objOffsetVersion=objAgent.indexOf("Firefox"))!=-1){_Browser.mozilla=true;objbrowserName="Firefox"}else if((objOffsetVersion=objAgent.indexOf("Safari"))!=-1){_Browser.safari=true;objbrowserName="Safari";objfullVersion=objAgent.substring(objOffsetVersion+7);if((objOffsetVersion=objAgent.indexOf("Version"))!=-1)objfullVersion=objAgent.substring(objOffsetVersion+8)}else if((objOffsetName=objAgent.lastIndexOf(' ')+1)<(objOffsetVersion=objAgent.lastIndexOf('/'))){objbrowserName=objAgent.substring(objOffsetName,objOffsetVersion);objfullVersion=objAgent.substring(objOffsetVersion+1);if(objbrowserName.toLowerCase()==objbrowserName.toUpperCase()){objbrowserName=navigator.appName}}if((ix=objfullVersion.indexOf(";"))!=-1)objfullVersion=objfullVersion.substring(0,ix);if((ix=objfullVersion.indexOf(" "))!=-1)objfullVersion=objfullVersion.substring(0,ix);objBrMajorVersion=parseInt(''+objfullVersion,10);if(isNaN(objBrMajorVersion)){objfullVersion=''+parseFloat(navigator.appVersion);objBrMajorVersion=parseInt(navigator.appVersion,10)}_Browser.name=objbrowserName;_Browser.version=objBrMajorVersion}}checkDevice();browserDetect();
// 디바이스체크 Pc = 0, Tablet = 1, Mobile = 2
// console.log(_Device.type);


/**
IE 버전체크
**/
function GetIEVersion() {
	var sAgent = window.navigator.userAgent;
	var Idx = sAgent.indexOf("MSIE");

	// If IE, return version number.
	if (Idx > 0) 
		return parseInt(sAgent.substring(Idx+ 5, sAgent.indexOf(".", Idx)));

	// If IE 11 then look for Updated user agent string.
	else if (!!navigator.userAgent.match(/Trident\/7\./)) 
		return 11;

	else
		return 100; //It is not IE
}
// console.log(GetIEVersion());


/**
LOADING
**/
/* [로딩바 호출] */
function loadingShow() {
	$('.loadingArea').show();
}

/* [로딩 바 숨김] */
function loadingHide() {
	$('.loadingArea').fadeOut(250);
}


/**
scrollTop
**/
function scrollSet(scrollPo){
	$('html, body').animate({'scrollTop' : $(scrollPo).offset().top},200);
}


/**
tabType
**/
$(document).on('click', '.tabType li a', function(){
	/* [SCROLL] */
	if ($(this).parents('.tabType').hasClass('scroll'))
	{
		scrollSet($(this).attr('href'));
		$(this).parent().siblings().removeClass('on');
		$(this).parent().addClass('on');
		return false;
	}
	/* [SHOW HIDE] */
	else if ($(this).parents('.tabType').hasClass('switch'))
	{
		$('.'+$(this).parents('.tabType').attr('id')).hide();
		$($(this).attr('href')).show();
		$(this).parent().siblings().removeClass('on');
		$(this).parent().addClass('on');
		return false;
	}
	/* [NOLINK] */
	else if ($(this).parents('.tabType').hasClass('no_link'))
	{
		$(this).parents('.tabType').find('li').removeClass('on');
		$(this).parents('li').addClass('on');
		return false;
	}
});


/**
selectType
**/
$(document).on('click', '.selectType .title', function(){
	if ($(this).parent('.selectType').hasClass('disabled')) {return false;}

	var target = $(this).parent();

	if (target.hasClass('open')) {
		$(this).siblings('.selList').stop().animate({'maxHeight' : 0+'px'}, 250, 'easeOutCubic');
		setTimeout(function(){
			target.find('.selList').hide();
			target.removeClass('open');
		},250);			
	} else {
		//$('.selectType.open .title').click();
		$(this).parent('.selectType').addClass('open');
		$(this).siblings('.selList').show();
		$(this).siblings('.selList').stop().animate({'maxHeight' : 250+'px'}, 500, 'easeOutCubic');
	};
});

$(document).on('click', '.selectType .selList label', function (){
	/*
	var disabled = $(this).prev('input').prop('disabled');
	if (disabled) {return false}
	*/

	var txt_value = $(this).text();
	var target = $(this).parents('.selectType');
	target.find('.title').text(txt_value);
	target.find('input').removeAttr('checked');
	$(this).prev('input').attr('checked','checked');
	$(this).parents('.selList').stop(true, false).animate({'maxHeight' : 0+'px'}, 250, 'easeOutCubic');
	setTimeout(function(){
		target.removeClass('open');
		target.find('.selList').hide();
	},250);
});

$(document).on('mouseleave', '.selectType', function(){
	var _target = $(this);
	_target.find('.selList').stop(true, false).animate({'maxHeight' : 0+'px'}, 250, 'easeOutCubic');
	setTimeout(function(){
		_target.removeClass('open');
		_target.find('.selList').hide();
	},250);
});


/**
IFRAME HEIGHT
**/
function autoResize(target)
{
	var iframeHeight= (target).contentWindow.document.body.scrollHeight;
	(target).height=iframeHeight;
}