"use strict";
/*
** 공통변수
*/
var WINDOW_WIDTH = $(window).width(),
    WINDOW_HEIGHT = $(window).height(),
    HTML = $('html');


$(document).ready(function () {
    /*
    ** header
    */
    // pc nav
    var $headerInner = $("#header .header_inner"),
        $navsubBg = $(".navsub_bg"),
        $navsub = $("#header .navsub");

    $headerInner.on({
        mouseenter: function () {
            $navsubBg.addClass("on");
            $navsub.addClass("on");
        },
        mouseleave: function () {
            $navsubBg.removeClass("on");
            $navsub.removeClass("on");
        },
    });

    // mo nav
    var $btnMoNav = $("#header .btn_mo_nav"),
        $moNav = $(".mo_nav"),
        $btnMoClose = $(".mo_nav .btn_nav_close"),
        $moMenu = $(".mo_menu > a:not(.no_child)");  //210831 수정

    $btnMoNav.on("click", function () {
        $moNav.stop(true, true).animate(
            {
                right: "0",
            }, 50);
            HTML.css({ overflow: "hidden" });
    });

    $btnMoClose.on("click", function () {
        $moNav.stop(true, true).animate(
            {
                right: "-100%",
            }, 50);
            HTML.css({ overflow: "visible" });
    });

    $moMenu.on("click", function (e) {
        e.preventDefault();
        $(this).parent().toggleClass("on");
        $(this).parent().siblings(".mo_menu").removeClass("on");
        $(this).siblings(".mo_submenu_box").stop(true, true).slideToggle();
        $(this).parent().siblings(".mo_menu").children(".mo_submenu_box").stop(true, true).slideUp();
    });

    $(window).on("resize", function () {
        if ($moNav.width() > 1024) {
            $moNav.css({
                "right": "-100%",
            });
            HTML.css({overflow: "visible"});
        }
    });
    

    /*
    ** scroll animation (wow.js)
    */
    function wow_init() {
        new WOW().init(wowOption);

        var wowOption = {
            boxClass: "wow",
            animateClass: "animated",
            mobile: false,
        };

        $(".wow_wrap").each(function () {
            // var $winH = $(window).height();
            $(this).find(".wow").each(function (index) {
                var up = (index + 1) * 0.1 + "s";
                $(this).attr("data-wow-delay", up);
            });
            // offset = $winH * 0.3;
            // $(this).find(".wow").attr("data-wow-offset", offset);
        });
    }
    wow_init();


    /*
    ** flow_text
    */
    var flowTextAnimate = function () {
        var $flowTextList = $(".flow_text_list"),
            txtBoxWid = $(".flow_text_list .flow_text_box").outerWidth();

        $flowTextList.animate(
            {
                left: txtBoxWid * -1,
            }, 10000, "linear", function () {
                $flowTextList.css("left", "0");
            }
        );
    };
    flowTextAnimate();
    setInterval(flowTextAnimate, 10000);


    /*
    ** pagination
    */
    var $firstPaging = $(".pagination ol li:first-child"),
        $lastPaging = $(".pagination ol li:last-child");

    if ($firstPaging.hasClass("current")) {
        $(".btn_page_prev, .btn_page_str").css({
            opacity: ".5",
        });
    } else if ($lastPaging.hasClass("current")) {
        $(".btn_page_next, .btn_page_end").css({
            opacity: ".5",
        });
    }


    /*
    ** con_grid : 1024이하 슬라이드
    */
    var $conGrid = $('.con_grid .con_grid_box');
    var slickFlag = true;

    if ( WINDOW_WIDTH <= 1024  && slickFlag === true) {
        conGridInit();
    }

   $(window).on('resize', function(){
       if ( $(this).outerWidth() <= 1024 ) {
           if (slickFlag === true)  {
               conGridInit();
           }
       } else {
           if ( $conGrid.hasClass('slick-initialized') ) {
               $conGrid.slick('unslick');
               slickFlag = true;
           }
       }
   });

   function conGridInit() {
       $conGrid.on('init reInit afterChange', function (event, slick, currentSlide, nextSlide) {
           var i = (currentSlide ? currentSlide : 0) + 1;
           $(this).siblings('.slide_control').find('.slick_paging').html('<em>' + i + '</em>' + '<span>/</span>' + slick.slideCount);
       });

       $conGrid.slick({
           centerMode: true,
           centerPadding: "10%",
           dots: false,
           arrow: false,
           prevArrow: null,
           nextArrow: null,
       });

       $conGrid.siblings('.slide_control').find('.btn_grid_prev').on('click', function () {
           $conGrid.slick('slickPrev');
       });
       $conGrid.siblings('.slide_control').find('.btn_grid_next').on('click', function () {
           $conGrid.slick('slickNext');
       });

       slickFlag = false;
   }


    /*
    ** lookbook
    */
    //lookbook tab
    var bgWhite = $('.lb_tab_item.on').hasClass('bgWhite');
    if( bgWhite === true ) {
        $('.lb_tab_item.on').parents('.lb_mo').css('background','#fff');
    } else {
        $('.lb_tab_item.on').parents('.lb_mo').css('background','#f5f5f5');
    }

    $('.lb_tab_item').on('click', function(){
        var idx = $(this).index();
        var bgWhite = $(this).hasClass('bgWhite');

        $('.lb_tab').each(function(){
            $(this).children('.lb_tab_item').eq(idx).addClass('on').siblings().removeClass('on');
        });
        $('.lb_tab_con').each(function(){
            $(this).children('.lb_tabCon_item').eq(idx).addClass('on').siblings().removeClass('on');
        });

        if( bgWhite === true ) {
            $(this).parents('.lb_mo').css('background','#fff');
        } else {
            $(this).parents('.lb_mo').css('background','#f5f5f5');
        }

        $('.lb_type').css({
            'visibility' : 'hidden',
            'animation-name' : 'none'
        }).removeClass('animated');

        wow_init();
    });

    //reponsive issue 대응 -- 모바일 창크기로 줄일때 슬라이드 텍스트먼저 노출되는 부분 감추기
    var delta = 50;
    var timer = null;
    $(window).on('resize', function(e){
        clearTimeout(timer);
        timer = setTimeout(function(){
            if ( $(window).width() <= 1024 ) {
                $('.lb_mo').css('opacity','1');
                $('.main_lb_mo').css('opacity','1');  //main lookbook
            }
        }, delta);

        if ( $(window).width() > 1024 ) {
            $('.lb_mo').css('opacity','0');
            $('.main_lb_mo').css('opacity','0');  //main lookbook
        }
    });

    //moblie ver slide
    $(".lb_mo_slide").each(function(){
        var $this = $(this);

        $(this).on('init reInit afterChange', function (event,slick,currentSlide,nextSlide) {
            var i = (currentSlide ? currentSlide : 0) + 1;
            $(this).siblings('.slide_control').find('.slick_paging').html('<em>' + i + '</em>' + '<span>/</span>' + slick.slideCount);
        });

        $(this).slick({
            centerMode: true,
            centerPadding: "90px",
            dots: false,
            arrow: false,
            prevArrow: null,
            nextArrow: null,
            responsive: [
                {
                    breakpoint: 540,
                    settings: {
                        centerPadding: "45px"
                    }
                }
            ]
        });

        $(this).siblings('.slide_control').find('.btn_lb_prev').on('click', function(){
            $this.slick('slickPrev');
        });
        $(this).siblings('.slide_control').find('.btn_lb_next').on('click', function(){
            $this.slick('slickNext');
        });
    });

    //lb_tupe_slide(PC)
    $('.lb_type_slide_box').on('init reInit afterChange', function (event,slick,currentSlide,nextSlide) {
        var i = (currentSlide ? currentSlide : 0) + 1;
        $('.lb_type_slide_paging').html('<em>' + i + '</em>' + '<span>/</span>' + slick.slideCount);
    });
    $('.lb_type_slide_box').slick({
        // touchMove: false
    });

    //lb_pop
    var $lbPop = $('.lb_pop'),
        $lbPoplb_tab1 = $('.lb_pop.lb_tab1'),
        $lbPoplb_tab2 = $('.lb_pop.lb_tab2'),
        $lbPopWrap = $('.lb_pop .lb_pop_wrap'),
        $lbBg = $('.lb_pop, .lb_bg'),
        $lbPopSlide = $('.lb_pop_slide');


    var slickActive = false;
    $('.lb_conWrap .img_box img:not(.noPop)').on('click', function(){    // pc
        var imgBoxIdx = $(this).data('idx'),
            imgTypelb_tab1 = $(this).parents('.lb_con').hasClass('lb_tab1'),
            imgTypelb_tab2 = $(this).parents('.lb_con').hasClass('lb_tab2');

        if ( imgTypelb_tab1 === false && imgTypelb_tab2 === false ) {
            $lbPop.addClass('on');
            $lbPopWrap.addClass('on');
            HTML.css({ overflow:'hidden'});
        } else {
            if ( imgTypelb_tab1 === true ) {
                $lbPoplb_tab1.addClass('on');
                $lbPopWrap.addClass('on');
                HTML.css({ overflow:'hidden'});
            } else {
                $lbPoplb_tab2.addClass('on');
                $lbPopWrap.addClass('on');
                HTML.css({ overflow:'hidden'});
            }
        }

        if ( slickActive === false ) {
            $lbPopSlide.slick();
            slickActive = true;
        }

        $lbPopSlide.slick('slickGoTo', imgBoxIdx, true);
    });

    $('.lb_mo_conWrap .img_box img:not(.noPop)').on('click', function(){    // mo
        var imgBoxIdx = $(this).data('idx'),
            imgTypelb_tab1 = $(this).parents('.lb_mo_con').hasClass('lb_tab1'),
            imgTypelb_tab2 = $(this).parents('.lb_mo_con').hasClass('lb_tab2');

        if ( imgTypelb_tab1 === false && imgTypelb_tab2 === false ) {
            $lbPop.addClass('on');
            $lbPopWrap.addClass('on');
            HTML.css({ overflow:'hidden'});
        } else {
            if ( imgTypelb_tab1 === true ) {
                $lbPoplb_tab1.addClass('on');
                $lbPopWrap.addClass('on');
                HTML.css({ overflow:'hidden'});
            } else {
                $lbPoplb_tab2.addClass('on');
                $lbPopWrap.addClass('on');
                HTML.css({ overflow:'hidden'});
            }
        }

        if ( slickActive === false ) {
            $lbPopSlide.slick();
            slickActive = true;
        }

        $lbPopSlide.slick('slickGoTo', imgBoxIdx, true);
    });

    //lookbook popup closing
    var lookBookPopClose = function() {
        $lbBg.on('click', function(e){
            if ( $(e.target).hasClass('lb_bg') ) {
                $lbPop.removeClass('on');
                HTML.css({ overflow:'visible'});
            }
        });
    }
    lookBookPopClose();

});


/**
scrollTop
**/
$(document).ready(function () {
    var btnScrollTop = function() {
        $(window).scroll(function() {
            if ($(this).scrollTop() > 500) {
                $('.btn_top').fadeIn();
            } else {
                $('.btn_top').fadeOut();
            }
        });

        $('.btn_top').click(function() {
            $('html, body').animate({
                scrollTop : 0
            }, 400);
            return false;
        });
    }
    btnScrollTop();
});


/*
** page_navi
*/
$(window).on("scroll resize", function () {
    if ( $('.page_navi').length > 0 && $('.page_visual').length > 0 && $('.header').length > 0 ) {
        var scrollTop = $(this).scrollTop(),
        $pageNavi = $('.page_navi'),
        pageVisualH = $('.page_visual').height(),
        fixH = $('.page_visual').offset().top + pageVisualH,
        headerH = $(header).outerHeight();

        if (scrollTop + headerH >= fixH) {
            $pageNavi.css({
                "position": "fixed",
                "top": headerH,
                "left": "0",
                "border-top": "1px solid #ebebeb"
            });
            $(".page_navi_blank").css({
                "display": "block",
                "height": $pageNavi.outerHeight(),
            });
        } else {
            $pageNavi.css({
                "position": "relative",
                "top": "0",
                "border-top": "none"
            });
            $(".page_navi_blank").css({
                "display": "none",
            });
        }
    }
});


/*
** input file
*/
$(document).ready(function(){
    var $fileTarget = $('.input_file .target');

    $fileTarget.on('change', function(){
        var fileName = $(this).val();
        var fileNameMatch = fileName.match(/[^\\/]*$/)[0];
        $(this).parents().find('.file_name').html(fileNameMatch);
    });
});


/*
** layout_tab
*/
$(document).ready(function(){
    var $layoutTab = $('.layout_tab'),
        $tabItem = $('.layout_tab .tab_item');

    if ( $layoutTab.length > 0 ) {
        $tabItem.on('click', function(){
            var idx = $(this).index();

            $tabItem.eq(idx).addClass('on').siblings().removeClass('on');
            $('.tabCon_wrap > div').eq(idx).addClass('on').siblings().removeClass('on');
        });
    }
});


/*
** customer
*/
$(document).ready(function(){
    //privacy_pop
    var privacyPopOpen = function() {
        $('.privacy_info_chk .btn_fullview').on('click', function(){
            $('.privacy_pop').addClass('on');
            HTML.css({ overflow:"hidden"});
        });
    }
    privacyPopOpen();

    var privacyPopClose = function() {
        $('.privacy_pop .pop_bg').on('click', function(e){
            if ( $(e.target).hasClass('pop_bg') ) {
                $('.privacy_pop').removeClass('on');
                HTML.css({ overflow:"visible"});
            }
        });
        $('.privacy_pop .privacy_pop_close').on('click', function(){
            $('.privacy_pop').removeClass('on');
            HTML.css({ overflow:"visible"});
        });
    }
    privacyPopClose();

    //custom scroll
    var $privacyPopCon = $('.privacy_pop .pop_con');
    $privacyPopCon.mCustomScrollbar({
        theme:"my-1"
    });
});


/*
** onair
*/
$(document).ready(function(){
    var $onAirSlide = $('.onair_view .view_slide'),
        $onAirBox = $('.onair_box');

    $onAirSlide.slick({
        adaptiveHeight: true,
        dots: false,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    centerPadding: "45px",
                    arrows: false,
                    dots: true
                }
            }
        ]
    });

    $onAirBox.on('click', function(){
        var idx = $onAirBox.index(this);
        var offsetTop = $('.page_navi_blank').offset().top;

        $onAirSlide.slick('slickGoTo', idx, true);
        $('html, body').animate({
            scrollTop : offsetTop + 100
        }, 400);
        return false;
    });
});


/*
** showroom
*/
$(document).ready(function(){
    var showroomSlide = $('.sr_con .sr_con_box .img_box.type_slide');
    showroomSlide.slick();
});






