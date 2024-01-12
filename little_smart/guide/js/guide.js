/**
컨텐츠영역 공통
**/
$(function(){
	$('.uinav a').click(function(){
		var tar = $(this).attr('href');
		var tarPos = $(tar).offset().top;
			tarPos = tarPos - $('.uinav').outerHeight();
		$('html, body').animate({'scrollTop':tarPos}, 300);
		return false;
	});
	$('#uiwrap .moreBox .btnMore').click(function(){
		$(this).next('xmp').stop().slideToggle(200);
	});
});

/**
스타일가이드_PC
**/
/* 체크박스 */
$(document).on('click', '.checkType label', function (){
	if ($(this).parent().hasClass('readOnly')){return false;}
	if ($(this).parent().hasClass('disabled')){return false;}
	
	var tar = $(this).parent().find('input');
	var chk = tar.prop('checked');
	var grpNm = tar.attr('name');


	if ($(this).parent('.checkType').hasClass('allChk')){ // 전체동의
		var chkStatus = tar.prop('checked');
		$("input:checkbox[name=" + grpNm + "]").each(function() {
			if (chkStatus) {
				$(this).closest(".checkType").removeClass("checked");
				$(this).prop("checked",false);
			} else {
				$(this).closest(".checkType").addClass("checked");
				$(this).prop("checked",true);
			}
		});
	} else {
		if ($(this).parent().hasClass('checked')) {
			$("input:checkbox[name=" + grpNm + "]").each(function() {
				$(this).closest('.checkType.allChk').removeClass('checked');;
				$(this).closest('.checkType.allChk input').prop("checked",false);
			});
			$(this).parent().removeClass('checked');
			tar.prop("checked",false);
		} else {
			$(this).parent().addClass('checked');
			tar.prop("checked",true);
		}
	}
	console.log(tar.prop('checked'));
	return false;
});
/* 라디오버튼 */
$(document).on('click', '.radioType input', function (){
	if ($(this).parent().hasClass('readOnly')){return false;}
	if ($(this).parent().hasClass('disabled')){return false;}
	var grpNm = $(this).attr("name");
	$("input:radio[name=" + grpNm + "]").each(function() {
		$(this).closest(".radioType").removeClass("checked");
    	$(this).prop("checked",false);
	});
	$(this).parent().addClass("checked");
    $(this).parent().find("input").prop("checked",true);
});

$(function(){
	//셀렉트바 초기 선택 표기
	$('.selectType').each(function(){
		var txt_value = $(this).find('.selList input[checked=checked]').next('label').text();
		if (txt_value != '') {
			$(this).find('.selList label').parents('.selectType').find('.title').text(txt_value);
		}
	});
});