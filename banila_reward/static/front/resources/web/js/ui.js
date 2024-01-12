/**
 리워드 프로그램
 **/

/* 프로필  SNS 등록 */
$(document).on('click', '.cocoSnsBox .inp_check2 input[type="checkbox"]', function(){
    $(this).closest('.item').find('.userText').stop(true,true).slideToggle(250);
    $(this).closest('.item').toggleClass('check');
});

/* 프로필 디폴트 이미지 선택 */
$(document).on('click', '.profileRegistPop .defaultImgWrap .item', function(){
    $(this).addClass('on').siblings().removeClass('on');
});

/* 프로필 등록 - 이미지 등록 */
$(document).on('change', '.profileRegistPop .uploadWrap .uploadBox .boxItem .inp_radio2 input[name="uploadSelect"]', function(){
    var title = $(this).attr('title');
    var $linkShare = $(this).parents('.boxItem');

    if ( title === "이미지 선택" ) {
        $linkShare.addClass('on').siblings().removeClass('on');
    } else if ( title === "사진 첨부" ) {
        $linkShare.addClass('on').siblings().removeClass('on');
    }
});

/* coco pick 편집 - 코멘트 수정 직접 입력하기 */
$(document).on('click', '.cocoCommentEditPop .inp_select .selList li label', function(){
    if ( parseInt($(this).prev().val()) === 6 ) {
        $(this).closest('.lyBody').find('.selfInput').show();
    } else {
        $(this).closest('.lyBody').find('.selfInput').hide();
    }
});

/* 리워드 프로그램 소개 배너 */
function rewordBnrSlide() {
    if ( !$('.rewardProBanner .bnrSlide').hasClass('slick-initialized') ) {
        $('.rewardProBanner .bnrSlide').slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            dots: true,
            arrows: true,
            infinite: false,
            prevArrow : "<button type='button' class='slick-prev'></button>",
            nextArrow : "<button type='button' class='slick-next'></button>"
        });
    }
}

$(document).ready(function(){
    $('.rewardProBanner .bnrSlide .item.one .btnNextS').click(function(){
        $('.rewardProBanner .bnrSlide').slick('slickNext');
    });

    $('.rewardProBanner .bnrSlide').on('beforeChange', function (event, slick, currentSlide, nextSlide){
        var slideLength = slick.$slides.length;

        if ( nextSlide === slideLength - 1 ) {
            $('#rewardProBannerSlide .btn_wrap').hide();
            $('#rewardProBannerSlide .btn_wrap2').show();
            $('.rewardProBanner .bnrSlide .slick-prev').show();
            $('.rewardProBanner .bnrSlide .slick-next').hide();
        } else if (nextSlide === 0) {
            $('.rewardProBanner .bnrSlide .slick-prev').hide();
            $('.rewardProBanner .bnrSlide .slick-next').hide();
        } else {
            $('#rewardProBannerSlide .btn_wrap').show();
            $('#rewardProBannerSlide .btn_wrap2').hide();
            $('.rewardProBanner .bnrSlide .slick-prev').show();
            $('.rewardProBanner .bnrSlide .slick-next').show();
        }
    });
});

/* coco pick 등록 - 토스트팝업 */
var beforeCheckbox;
$(document).on('click', '.cocoPickRegistPop .cocoPdtList2 .listItem input[type="checkbox"]', function(){
    if ( beforeCheckbox ) {
        if ( $(this)[0] !== beforeCheckbox[0] ) {
            $(".cocoToast").stop().fadeOut(0);
        }
    }

    if ($(this).is(":checked")) {
        $(".cocoToast").stop().fadeIn(500).text('COCO PICK에 추가되었습니다.');
    } else {
        $(".cocoToast").stop().fadeIn(500).text('COCO PICK에서 삭제되었습니다.');
    }

    beforeCheckbox = $(this);

    setTimeout(function(){
        $(".cocoToast").stop().fadeOut(500);
    }, 1000);
});

/* 코코프로필 자기소개 펼침 */
var introText = $('.cocoProfile .infoBox .box2 .userIntroWrap .introText');
var btnTextMore = $('.cocoProfile .infoBox .box2 .userIntroWrap .btnTextMore');
var introTextLineHeight = parseInt(introText.css('line-height')) * 2;

if (introText[0].scrollHeight > introText.innerHeight()) {
    btnTextMore.css('display','block');
}

$(document).on('click', '.cocoProfile .infoBox .box2 .userIntroWrap .btnTextMore', function(){
    var $introText = $(this).prev('.introText');
    if ($introText.hasClass('on')) {
        $introText.removeClass('on');
        $(this).text('더 보기').removeClass('on');
    } else {
        $introText.addClass('on');
        $(this).text('접어보기').addClass('on');
    }
});

/* 코코프로필 - sns아이콘 갯수에 따른 UI변경 */
var snsIconL = $('.cocoProfile .infoBox .box2 .snsIconWrap .item').length;

if ( snsIconL == 1 ) {
    $('.cocoProfile .infoBox .box2 .snsIconWrap .item').find('.itemIn').addClass('on');
}

/* 코코프로필 - 닉네임 7글자수 제한 말줄임처리 */
var cocoProfileNickName = $('.cocoProfile .infoBox .box1 .infoWrap .linkBox .address .userNickname').text();

if (cocoProfileNickName.length > 7) {
    cocoProfileNickName = cocoProfileNickName.substring(0, 7) + "...";
}
$('.cocoProfile .infoBox .box1 .infoWrap .linkBox .address .userNickname').text(cocoProfileNickName);

/* 코코프로필 코코픽 가격 툴팁 */
var $priceToolTipCon = $('.cocoProfile .cocoPickBox .conBox3 .list .item .priceBox .box .boxItem2 .btnTooltip .toolTipCon');

$(document).on('click', '.cocoProfile .cocoPickBox .conBox3 .list .item .priceBox .box .boxItem2 .btnTooltip .button', function(){
    $priceToolTipCon.fadeIn();
});
$(document).on('click', '.cocoProfile .cocoPickBox .conBox3 .list .item .priceBox .box .boxItem2 .btnTooltip .toolTipCon .btnClose', function(){
    $priceToolTipCon.fadeOut();
});

/* 코코프로필 코코픽 타이틀 툴팁 */
var $toolTipCon = $('.cocoProfile .cocoPickBox .conTit .toolTipCon');

$('.cocoProfile .cocoPickBox .conTit .btnTooltip').on('click', function (){
    $toolTipCon.fadeIn();
});
$('.cocoProfile .cocoPickBox .conTit .toolTipCon .btnClose').on('click', function (){
    $toolTipCon.fadeOut();
});

/* 코코프로필 정보영역, 탭 fixed */
var $cocoProfileInfoBox = $('.cocoProfile .infoBox');
var $cocoProfileTabBoxWrap = $('.cocoProfileWrap .tabBoxWrap');
var $cocoProfileTabBox = $('.cocoProfileWrap .tabBox');
var $cocoProfileTopBg = $('.cocoProfileWrap .topBg');
var $cocoPickBox = $('.cocoProfile .cocoPickBox');
var $cocoReviewBox = $('.cocoProfile .cocoReviewBox');

if ( $cocoProfileInfoBox.length > 0 && $cocoProfileTabBox.length > 0) {

    $(window).on('scroll', function (){
        var scrollTop = $(this).scrollTop() + $('#header .gnb').outerHeight();
        var tabBoxWrapBottom = $cocoProfileTabBoxWrap.offset().top + $cocoProfileTabBoxWrap.outerHeight();
        var topBgBottom = $cocoProfileTopBg.offset().top + $cocoProfileTopBg.outerHeight();
        var cocoReviewBoxBottom = $cocoReviewBox.offset().top + $cocoReviewBox.outerHeight();

        if ( scrollTop > $cocoProfileTopBg.offset().top ) {
            if ( scrollTop < tabBoxWrapBottom ) {
                $cocoProfileInfoBox.css('top', -114 + (scrollTop - $cocoProfileTopBg.offset().top));
            }
        } else {
            $cocoProfileInfoBox.removeAttr('style');
        }

        if ( scrollTop >= tabBoxWrapBottom ) {
            $cocoProfileInfoBox.addClass('floating').removeAttr('style');
        } else {
            $cocoProfileInfoBox.removeClass('floating');
        }

        if ( scrollTop >= topBgBottom ) {
            $cocoProfileTabBox.addClass('fixed');
        } else {
            $cocoProfileTabBox.removeClass('fixed');
        }

        if ( scrollTop >= cocoReviewBoxBottom ) {
            $cocoProfileTabBox.removeClass('fixed');
        }

    });
}

/* 코코프로필 탭 클릭시 해당 컨텐츠로 이동 */
$(document).on('click', '.cocoProfileWrap .tabBox .tab .tabItem a', function(e){
    e.preventDefault();

    var cocoProfileTopSpace = $('#header .gnb').outerHeight() + $('.cocoProfileWrap .tabBox').outerHeight();
    $('html,body').animate({scrollTop:$(this.hash).offset().top - cocoProfileTopSpace}, 600);
});

if ( $cocoPickBox.length > 0 ) {
    $(window).on('scroll', function(){
        var scrollTop = $(this).scrollTop() + $('#header .gnb').outerHeight() + $('.cocoProfileWrap .tabBox').outerHeight();
        var cocoPickBoxBottom = $cocoPickBox.offset().top + $cocoPickBox.outerHeight();
        var $cocoTabItem = $('.cocoProfileWrap .tabBox .tab .tabItem');

        if ( scrollTop < cocoPickBoxBottom ){
            $cocoTabItem.eq(0).addClass('on').siblings().removeClass('on');
        } else {
            $cocoTabItem.eq(1).addClass('on').siblings().removeClass('on');
        }
    });
}

/* 코코프로필 코치마크 */
var coachMarkWrapper = $('.profileCoachMarkWrap');
var coachMarks = coachMarkWrapper.find('.coachMark');
var currentCoachMark = 0;

coachMarks.hide();
coachMarks.eq(currentCoachMark).show();

coachMarkWrapper.on("click", ".btnNext", function() {
    coachMarks.eq(currentCoachMark).hide();
    currentCoachMark++;
    coachMarks.eq(currentCoachMark).show();
});

coachMarkWrapper.on("click", ".btnPrev", function() {
    coachMarks.eq(currentCoachMark).hide();
    currentCoachMark--;
    coachMarks.eq(currentCoachMark).show();
});

coachMarkWrapper.on("click", ".btnEnd", function() {
    coachMarkWrapper.hide().addClass('hidden');
    $('html').removeClass('coachMark-opened');
});

$(window).on('load', function(){
    if ( $('.profileCoachMarkWrap').length ) { // 마크업 노출 여부 체크
        if ( $('.profileCoachMarkWrap').hasClass('hidden') ) { // 코치마크 종료된 후
            $('html').removeClass('coachMark-opened');
        } else { // 코치마크 종료되지 않은 경우
            $('html').addClass('coachMark-opened');
        }
    }
});


/* 리워드 프로그램 소개 페이지 - 슬라이드 */
$(document).ready(function(){
    var rewardProgram_guide = $('.rewardProgram_guide .slide');
    rewardProgram_guide.slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        dots: true,
        arrows: false,
        infinite: true,
        autoplay: true,
        autoplaySpeed: 4000,
        fade: true,
        pauseOnHover: false,
        pauseOnFocus: false
    });

    rewardProgram_guide.on('wheel', function(e) {
        e.preventDefault();
        if (e.originalEvent.deltaY < 0) {
            $(this).slick('slickPrev');
        } else {
            $(this).slick('slickNext');
        }
    });
});

/* 리워드 프로그램 소개 페이지 - qna */
$(document).on('click', '.rewardPageWrap .section .acco_box .list .item_box .q_box', function(){
    $(this).toggleClass('on').parents('.item_box').toggleClass('on').find('.a_box').stop(true,true).slideToggle(400);
});

/* 리뷰 신고/차단 레이어 - 클릭 토글 */
/* 게시물 */
$(document).on('change', '.reviewBlockPopup .blockTab .tabCon .chkBox input[name="reviewReportBlock"]', function(){
    var title = $(this).attr('title');
    var $select = $(this).parents('.tabCon').find('.inp_select'); // 신고하기 셀렉트 박스
    var $selectList = $(this).parents('.tabCon').find('.inp_select .selList'); // 신고하기 셀렉트 박스 리스트
    var $selectInput = $(this).parents('.tabCon').find('.inp_select ~ .selfInput'); // 직접 입력하기 textarea
    var $box2Checkbox = $(this).parents('.tabCon').find('.box2 input:checkbox'); //  게시물 바로 차단하기 체크박스
    var $blockCheckBox = $(this).parents('.tabCon').find('.blockCheckBox');

    if ( title === "신고하기" ) {
        $select.removeClass('disabled');
        $box2Checkbox.attr('disabled','disabled');
        $blockCheckBox.removeClass('select');
    } else if ( title === "차단하기" ) {
        $select.addClass('disabled');
        $blockCheckBox.addClass('select');
        $selectList.hide();
        $selectInput.hide();
        $box2Checkbox.removeAttr('disabled').attr('checked', 'checked');
    }
});
/* 작성자 */
$(document).on('change', '.reviewBlockPopup .blockTab .tabCon .chkBox input[name="writerReportBlock"]', function(){
    var title = $(this).attr('title');
    var $select = $(this).parents('.tabCon').find('.inp_select'); // 신고하기 셀렉트 박스
    var $selectList = $(this).parents('.tabCon').find('.inp_select .selList'); // 신고하기 셀렉트 박스 리스트
    var $selectInput = $(this).parents('.tabCon').find('.inp_select ~ .selfInput'); // 직접 입력하기 textarea
    var $box2Checkbox = $(this).parents('.tabCon').find('.box2 input:checkbox'); //  게시물 바로 차단하기 체크박스
    var $blockCheckBox = $(this).parents('.tabCon').find('.blockCheckBox');

    if ( title === "신고하기" ) {
        $select.removeClass('disabled');
        $box2Checkbox.attr('disabled','disabled');
        $blockCheckBox.removeClass('select');
    } else if ( title === "차단하기" ) {
        $select.addClass('disabled');
        $blockCheckBox.addClass('select');
        $selectList.hide();
        $selectInput.hide();
        $box2Checkbox.removeAttr('disabled').attr('checked', 'checked');
    }
});

/* 리뷰 신고/차단 레이어 - 신고하기 직접 입력하기 */
$(document).on('click', '.reviewBlockPopup .inp_select .selList li label', function(){
    if ( parseInt($(this).prev().val()) === 6 ) {
        $(this).closest('.tabCon').find('.selfInput').show();
    } else {
        $(this).closest('.tabCon').find('.selfInput').hide();
    }
});

/* 코코 공유 레이어 */
$(document).on('change', '.cocoSharePopup .shareBox .linkShare input[name="cocoShareButton"]', function(){
    var title = $(this).attr('title');
    var $linkShare = $(this).parents('.linkShare');

    if ( title === "COCO 전용 링크 복사하기" ) {
        $linkShare.addClass('on').siblings().removeClass('on');
    } else if ( title === "일반 링크 공유하기" ) {
        $linkShare.addClass('on').siblings().removeClass('on');
    }
});

/* 정산 신청 팝업 - 230403수정 */
$(document).on('click', '.withdrawPopup .inp_select .selList li', function(){
    var withdrawOption = $(this).find('input').val();

    if ( withdrawOption === '현금' ) {
        $('.withdrawPopup .boxWrap .boxItem').eq(1).addClass('on').siblings().removeClass('on');
        $('.withdrawPopup .withdrawInfoBox .boxItem').eq(1).addClass('on').siblings().removeClass('on');
    } else if ( withdrawOption === '멤버십 포인트' ) {
        $('.withdrawPopup .boxWrap .boxItem').eq(0).addClass('on').siblings().removeClass('on');
        $('.withdrawPopup .withdrawInfoBox .boxItem').eq(0).addClass('on').siblings().removeClass('on');
    }
});

/* 마이페이지 마이리워드 달력 직접 입력시 tab 활성화클래스 삭제 */
$(document).on('click', '.mySearchBox .inp_wrap input', function(){
    $('.mySearchBox .dateTab ul li a').removeClass('current');
});

