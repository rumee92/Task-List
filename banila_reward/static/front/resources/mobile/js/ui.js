/**
 리워드 프로그램
 **/

$(document).ready(function(){

    /* 프로필  SNS 등록 */
    $('.cocoSnsBox .inp_check input[type="checkbox"]').on('click', function() {
        $(this).closest('.item').find('.userText').stop(true,true).slideToggle(250);
        $(this).closest('.item').toggleClass('check');
    });

    /* 프로필 디폴트 이미지 선택 */
    $('#defaultImgSelect .defaultImgWrap .item').on('click', function (){
        $(this).addClass('on').siblings().removeClass('on');
    });

    /* 이미지 선택 방식 팝업 딤드 클릭시 팝업 닫힘  */
    $(document).on('click', function(e) {
        if (!$(e.target).closest('.lyPop').length) {
            $('#profileImgSelect').removeClass('open').fadeOut();
        }
    });

    /* coco pick 편집 - 코멘트 수정 직접 입력하기 */
    $('.cocoCommentEditPop .inp_select2 .selList li label').on('click', function () {
        if ( parseInt($(this).prev().val()) === 6 ) {
            $(this).closest('.lyBody').find('.selfInput').show();
        } else {
            $(this).closest('.lyBody').find('.selfInput').hide();
        }
    });

    /* coco pick 등록 - 토스트팝업 */
    var beforeCheckbox;
    $('.cocoPickRegistPop .cocoPdtList2 .listItem input[type="checkbox"]').on('click', function() {
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

    /* 코코프로필 - 페이지 스크롤 fix 효과 */
    if ( $('.cocoProfile').length > 0 ) {
        var $cocoInfoBox = $('.cocoProfile .infoBox');
        var cocoLastScrollTop = 0;
        var $cocoPickBox = $('.cocoProfile .cocoPickBox');
        var $cocoReviewBox = $('.cocoProfile .cocoReviewBox');
        var $rewardBanner = $('.cocoProfile .profileBottomBanner');

        if ( $('.cocoPickBox .pickAnchor').length ) {
            $cocoPickBox.addClass('hasAnchor');
        }

        $(window).on('scroll', function (e){
            var headerH = $('#header').outerHeight();
            var pageTop = $(this).scrollTop() + headerH + 8;
            var cocoPickBoxTop = $cocoPickBox.offset().top - 8;
            var cocoReviewBoxTop = $cocoReviewBox.offset().top;
            var rewardBannerTop = $rewardBanner.offset().top;
            var pageArray = [];

            pageArray.push({
                'top': $cocoPickBox.offset().top,
                'bottom': $cocoPickBox.offset().top + $cocoPickBox.outerHeight()
            });

            pageArray.push({
                'top': $cocoReviewBox.offset().top,
                'bottom': $cocoReviewBox.offset().top + $cocoReviewBox.outerHeight()
            });

            pageArray.push({
                'top': $rewardBanner.offset().top,
                'bottom': $rewardBanner.offset().top + $rewardBanner.outerHeight()
            });

            for (let i = 0; i < pageArray.length; i++) {
                if ( pageTop > pageArray[i].top && pageTop < pageArray[i].bottom ) {
                    if ( i === 0 ) {
                        $cocoReviewBox.removeClass('on');
                        $cocoPickBox.addClass('on').removeClass('prev');
                    } else if ( i === 1 ) {
                        $cocoPickBox.removeClass('on').addClass('prev');
                        $cocoReviewBox.addClass('on');
                        $('.cocoReviewBox .conTit').removeAttr('style');
                    }
                }
            }

            if ( pageTop < pageArray[0].top ) {
                $cocoPickBox.removeClass('on');
                $cocoReviewBox.removeClass('on');
            }

            if ( pageTop + 48 > pageArray[2].top ) {
                $('.cocoReviewBox .conTit').css({
                    'position':'absolute',
                    'top':'inherit',
                    'bottom':'0'
                });
            }

            /*if ( pageTop >= cocoPickBoxTop && pageTop < cocoReviewBoxTop) {
                $cocoPickBox.addClass('on').removeClass('prev');
                $cocoReviewBox.removeClass('on');
            } else if ( pageTop >= cocoReviewBoxTop && pageTop < rewardBannerTop) {
                $cocoPickBox.removeClass('on').addClass('prev');
                $cocoReviewBox.addClass('on');
            } else {
                $cocoPickBox.removeClass('on prev');
                $cocoReviewBox.removeClass('on');
            }*/
        });
    }

    /* 코코프로필 - sns아이콘 갯수에 따른 UI변경 */
    $(window).on('load', function(){
        var snsIconL = $('.cocoProfile .infoBox .snsIconWrap .item').length;

        if ( snsIconL == 1 ) {
            $('.cocoProfile .infoBox .snsIconWrap .item .itemIn').addClass('on');
        }
    });

    /* 코코프로필 - 닉네임 7글자수 제한 말줄임처리 */
    var cocoProfileNickName = $('.cocoProfile .infoBox .box1 .infoWrap .linkBox .address .userNickname').text();

    if (cocoProfileNickName.length > 7) {
        cocoProfileNickName = cocoProfileNickName.substring(0, 7) + "...";
    }
    $('.cocoProfile .infoBox .box1 .infoWrap .linkBox .address .userNickname').text(cocoProfileNickName);

    /* 코코프로필 코코픽 앵커 */
    var $cocoPickContentslist = $('.cocoPickBox .listWrap .list');
    $('.cocoPickBox .pickAnchor .item').on('click', function(){
        var idx = $(this).index();
        var topSpace = $('#header').outerHeight() + $('.cocoPickBox .conTit').outerHeight() + 24;
        var selectedListTop = $cocoPickContentslist.eq(idx).offset().top - topSpace;

        $('html, body').animate({scrollTop:selectedListTop});
    });



    $(window).on('scroll', function(){
        var scrTop = $(this).scrollTop();
        var listArray = [];

        $cocoPickContentslist.each(function(index, item){
            var topSpace = $('#header').outerHeight() + $('.cocoPickBox .conTit').outerHeight() + 25;
            var $item = $(item);

            listArray.push({
                'top': $item.offset().top - topSpace,
                'bottom': $item.offset().top + $item.outerHeight() - topSpace
            });
        });

        for (let i = 0; i < listArray.length; i++) {
            var top = listArray[i].top;
            var bottom = listArray[i].bottom;

            if ( scrTop >= top && scrTop < bottom ) {
                $('.cocoPickBox .pickAnchor .item').eq(i).addClass('on').siblings().removeClass('on');

                var center = $(window).width() / 2;
                var itemPos = $('.cocoPickBox .pickAnchor .item').eq(i).offset().left + ($('.cocoPickBox .pickAnchor .item').eq(i).width() / 2) + $('.cocoProfile .cocoPickBox .pickAnchor .list').scrollLeft() - 12;
                var scrollPos = itemPos - center;

                $('.cocoProfile .cocoPickBox.on .pickAnchor .list').stop().animate({ scrollLeft: scrollPos }, 500);

            }
        }



    });

    /* 코코프로필 코코픽 타이틀 툴팁 */
    var $toolTipCon = $('.cocoProfile .cocoPickBox .conTit .left .toolTipCon');

    $('.cocoProfile .cocoPickBox .conTit .left .btnTooltip').on('click', function (){
        $toolTipCon.fadeIn();
    });
    $('.cocoProfile .cocoPickBox .conTit .left .toolTipCon .btnClose').on('click', function (){
        $toolTipCon.fadeOut();
    });
    $(document).mouseup(function(e) {
        if (!$toolTipCon.is(e.target) && $toolTipCon.has(e.target).length === 0) {
            $toolTipCon.fadeOut();
        }
    });

    /* 코코프로필 코코픽 가격 툴팁 */
    var $priceToolTipCon = $('.cocoProfile .cocoPickBox .conBox3 .list .item .priceBox .box .boxItem2 .btnTooltip .toolTipCon');

    $('.cocoProfile .cocoPickBox .conBox3 .list .item .priceBox .box .boxItem2 .btnTooltip .button').on('click', function (){
        $priceToolTipCon.fadeIn();
    });
    $('.cocoProfile .cocoPickBox .conBox3 .list .item .priceBox .box .boxItem2 .btnTooltip .toolTipCon .btnClose').on('click', function (){
        $priceToolTipCon.fadeOut();
    });
    $(document).mouseup(function(e) {
        if (!$priceToolTipCon.is(e.target) && $priceToolTipCon.has(e.target).length === 0) {
            $priceToolTipCon.fadeOut();
        }
    });

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


    /* 코코프로필 상단 자기소개 펼침 */
    var introText = $('.cocoProfile .infoBox .box2 .userIntroWrap .introText');
    var btnTextMore = $('.cocoProfile .infoBox .box2 .userIntroWrap .btnTextMore');
    var introTextLineHeight = parseInt(introText.css('line-height')) * 2;

    if (introText[0].scrollHeight > introText.innerHeight()) {
        btnTextMore.css('display','block');
    }

    if (introText[0].scrollHeight <= introTextLineHeight) {
        introText.css('margin-bottom','12px');
    }

    $('.cocoProfile .infoBox .box2 .userIntroWrap .btnTextMore').on('click', function() {
        var $introText = $(this).prev('.introText');
        if ($introText.hasClass('on')) {
            $introText.removeClass('on');
            $(this).text('더 보기').removeClass('on');
        } else {
            $introText.addClass('on');
            $(this).text('접어보기').addClass('on');
        }
    });

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

/* 리워드 프로그램 소개 배너 */
function rewordBnrSlide() {
    if ( !$('.rewardProBanner .bnrSlide').hasClass('slick-initialized') ) {
        $('.rewardProBanner .bnrSlide').slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            dots: true,
            infinite: false,
            nextArrow: $('.rewardProBanner .btn_wrap #nextBtn'),
        });
    }
}

$(document).ready(function(){
    $('.rewardProBanner .bnrSlide').on('beforeChange', function (event, slick, currentSlide, nextSlide){
        var slideLength = slick.$slides.length;

        if ( nextSlide === slideLength - 1 ) {
            $('#rewardProBannerSlide .btn_wrap').hide();
            $('#rewardProBannerSlide .btn_wrap2').show();
        } else {
            $('#rewardProBannerSlide .btn_wrap').show();
            $('#rewardProBannerSlide .btn_wrap2').hide();
        }
    });
});

/* 리뷰 신고/차단 레이어 - 클릭 토글 */
/* 게시물 */
$(document).on('change', '.reviewBlockPopup .blockTab .tabCon .chkBox input[name="reviewReportBlock"]', function(){
    var title = $(this).attr('title');
    var $select = $(this).parents('.tabCon').find('.inp_select2'); // 신고하기 셀렉트 박스
    var $selectList = $(this).parents('.tabCon').find('.inp_select2 .selList'); // 신고하기 셀렉트 박스 리스트
    var $selectInput = $(this).parents('.tabCon').find('.inp_select2 ~ .selfInput'); // 직접 입력하기 textarea
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
    var $select = $(this).parents('.tabCon').find('.inp_select2'); // 신고하기 셀렉트 박스
    var $selectList = $(this).parents('.tabCon').find('.inp_select2 .selList'); // 신고하기 셀렉트 박스 리스트
    var $selectInput = $(this).parents('.tabCon').find('.inp_select2 ~ .selfInput'); // 직접 입력하기 textarea
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
$(document).on('click', '.reviewBlockPopup .inp_select2 .selList li label', function(){
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

    /*$linkShare.addClass('on');*/

    if ( title === "COCO 전용 링크 복사하기" ) {
        $linkShare.addClass('on').siblings().removeClass('on');
    } else if ( title === "일반 링크 공유하기" ) {
        $linkShare.addClass('on').siblings().removeClass('on');
    }
});

/* 코코 공유하기 버튼 - 제품상세 플로팅 */
$(window).scroll(function(){
    if ($(this).scrollTop() > 200){
        $('.footerFloation .btnCocoShare').fadeIn('swing');
    } else {
        $('.footerFloation .btnCocoShare').fadeOut('swing');
    }
    return false;
});

/* 정산 신청 팝업 - 230403수정 */
$(document).on('change', '.withdrawPopup select', function(){
    var withdrawOption = $(this).val();

    if ( withdrawOption === 'cash' ) {
        $('.withdrawPopup .boxWrap .boxItem').eq(1).addClass('on').siblings().removeClass('on');
        $('.withdrawPopup .withdrawInfoBox .boxItem').eq(1).addClass('on').siblings().removeClass('on');
    } else if ( withdrawOption === 'point' ) {
        $('.withdrawPopup .boxWrap .boxItem').eq(0).addClass('on').siblings().removeClass('on');
        $('.withdrawPopup .withdrawInfoBox .boxItem').eq(0).addClass('on').siblings().removeClass('on');
    }
});

/* 리워드 프로그램 소개 페이지 - 이용가이드 스크롤 */
$(window).on('load', function (){
    if ( $('.rewardPageWrap').length > 0 ) {

        var scrollT;
        var stepH = $('.rewardPageWrap .secTit').height() +  $('.rewardPageWrap .section .ibw img').height() + 40;

        $('.rewardPageWrap .section .scrollWrap').css('height',stepH*6);
        $('.rewardPageWrap .section .scrollWrap .step').css('height',stepH);
        $('.rewardPageWrap .section .scrollWrap .stickyWrap').css('height',stepH);

        $('.rewardPageWrap .section .scrollWrap .sect02 ul li a').on('click', function(){
            var secTop = $($(this).attr('href')).offset().top+20;
            $('html, body').animate({'scrollTop' : secTop});
            return false;
        });
        $(window).on('scroll resize', function(){
            navScroll();
        });
        function navScroll(){
            scrollT = $(window).scrollTop();
            navOnOff();
        }

        function navOnOff(){
            if (scrollT >= $('#step5').offset().top) {
                $('.scrollWrap .stickyWrap ul li').removeClass('on');
                $('.scrollWrap .stickyWrap ul .navi5').addClass('on');
                $('.scrollWrap .stickyWrap .imgWrap .ibw').removeClass('on');
                $('.scrollWrap .stickyWrap .imgWrap .ibw5').addClass('on');
            } else if (scrollT >= $('#step4').offset().top) {
                $('.scrollWrap .stickyWrap ul li').removeClass('on');
                $('.scrollWrap .stickyWrap ul .navi4').addClass('on');
                $('.scrollWrap .stickyWrap .imgWrap .ibw').removeClass('on');
                $('.scrollWrap .stickyWrap .imgWrap .ibw4').addClass('on');
            } else if (scrollT >= $('#step3').offset().top) {
                $('.scrollWrap .stickyWrap ul li').removeClass('on');
                $('.scrollWrap .stickyWrap ul .navi3').addClass('on');
                $('.scrollWrap .stickyWrap .imgWrap .ibw').removeClass('on');
                $('.scrollWrap .stickyWrap .imgWrap .ibw3').addClass('on');
            } else if (scrollT >= $('#step2').offset().top) {
                $('.scrollWrap .stickyWrap ul li').removeClass('on');
                $('.scrollWrap .stickyWrap ul .navi2').addClass('on');
                $('.scrollWrap .stickyWrap .imgWrap .ibw').removeClass('on');
                $('.scrollWrap .stickyWrap .imgWrap .ibw2').addClass('on');
            } else {
                $('.scrollWrap .stickyWrap ul li').removeClass('on');
                $('.scrollWrap .stickyWrap ul .navi1').addClass('on');
                $('.scrollWrap .stickyWrap .imgWrap .ibw').removeClass('on');
                $('.scrollWrap .stickyWrap .imgWrap .ibw1').addClass('on');
            }
        }

    }
});

/* 리워드 프로그램 소개 페이지 - qna */
$(document).on('click', '.rewardPageWrap .section .acco_box .list .item_box .q_box', function(){
    $(this).toggleClass('on').parents('.item_box').toggleClass('on').find('.a_box').stop(true,true).slideToggle(400);
});

/* 마이페이지 마이리워드 달력 직접 입력시 tab 활성화클래스 삭제 */
$(document).on('click', '.dateFilter .inp_date .inp_text input', function(){
    $('.dateFilter .tabType1 a').removeClass('current');
});

