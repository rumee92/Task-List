"use strict";
/*
** 공통변수
*/
var WINDOW_WIDTH = $(window).width(),
    WINDOW_HEIGHT = $(window).height(),
    HTML = $('html');


$(document).ready(function(){
    /*
    ** main_visual
    */
    var $mainVisualSide = $('.main_visual_slide');

    $mainVisualSide.on('init reInit afterChange', function (event,slick,currentSlide) {
        var i = (currentSlide ? currentSlide : 0) + 1;
        $('.main_visual_paging').html('<em>' + i + '</em>' + '<span>/</span>' + slick.slideCount);
    })
        .slick({
            autoplay: true,
            autoplaySpeed: 3000,
            speed: 800,
            arrows: true,
            dots: false,
            pauseOnHover: false,
            pauseOnFocus: false,
            responsive: [
                {
                    breakpoint: 1024,
                    settings: {
                        arrows: false
                    }
                }
            ]
        })
        .on('afterChange',function(){
            $('.pro_bar').addClass('pro_ani');
        })
        .on('beforeChange',function(){
            $('.pro_bar').removeClass('pro_ani');
        })
        .on('touchstart', function(e) {
            $('.main_visual_slide').slick('slickPlay');
        });


    /*
    ** main_review
    */
    $('.main_review_slide').slick({
        slidesToShow: 3,
        centerPadding: "260px",
        dots: true,
        arrows: false,
        centerMode: true,
        autoplay: true,
        speed: 800,
        pauseOnHover: false,
        pauseOnFocus: false,
        autoplaySpeed: 3000,
        responsive: [
            {
                breakpoint: 1700,
                settings: {
                    centerPadding: "200px",
                }
            },
            {
                breakpoint: 1600,
                settings: {
                    centerPadding: "140px",
                }
            },
            {
                breakpoint: 1500,
                settings: {
                    slidesToShow: 2,
                    centerPadding: "260px",
                }
            },
            {
                breakpoint: 1400,
                settings: {
                    slidesToShow: 2,
                    centerPadding: "220px",
                }
            },
            {
                breakpoint: 1300,
                settings: {
                    slidesToShow: 2,
                    centerPadding: "190px",
                }
            },
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 2,
                    centerPadding: "150px",
                }
            },
            {
                breakpoint: 1140,
                settings: {
                    slidesToShow: 2,
                    centerPadding: "100px",
                }
            },
            {
                breakpoint: 1025,
                settings: {
                    slidesToShow: 1,
                    centerPadding: "10%",
                }
            }
        ]
    });

    var mainReviewSlideLength = $('.main_review_slide .slick-dots li').length,
        mainReviewSlideDotsWidth = (1 / mainReviewSlideLength) * 100 + "%";

    $('.main_review_slide .slick-dots li').css({
        "width": mainReviewSlideDotsWidth
    });

    $('.main_review_slide').on('breakpoint', function(event, slick){
        var mainReviewSlideLength = $('.main_review_slide .slick-dots li').length,
            mainReviewSlideDotsWidth = (1 / mainReviewSlideLength) * 100 + "%";

        $('.main_review_slide .slick-dots li').css({
            "width": mainReviewSlideDotsWidth
        });
    });


    /*
    ** main_onair
    */
    var $mainOnairSlide = $('.onair_list');

    if ( WINDOW_WIDTH <= 1024 ) {
        mainOnairInit();
    }

    $(window).on('resize', function(){
        if ( $(this).outerWidth() <= 1024 ) {
            mainOnairInit();
        } else {
            if ( $mainOnairSlide.hasClass('slick-initialized') ) {
                $mainOnairSlide.slick('unslick');
            }
        }
    });

    function mainOnairInit() {
        if ( !$mainOnairSlide.hasClass('slick-initialized') ) {
            $mainOnairSlide.slick({
                dots: false,
                arrows: false,
                infinite: false
            });
        }
    }


    /*
    ** main_sr_slide
    */
    $('.main_sr_slide').slick({
        dots: true,
        responsive: [
            {
                breakpoint: 1025,
                settings: {
                    dots: false
                }
            }
        ]

    });


    /*
    ** main_lb
    */
    var lbBgColor = ['#fffcfa', '#effff0', '#eefcff', '#fff6f8', '#f5fffd', '#fefff6', '#f2e9ef'],
        lbTxtColor = ['#d8b18e', '#7ac142', '#00afda', '#ffb6c7', '#b2e3da', '#c6d85c', '#b73c96'];

    //main_lb_pc
    $('.main_lb_pc .cate_list .cate_item a').on('mouseenter', function (){
        var index = $(this).parent().index();

        $(this).parent().addClass('on').siblings().removeClass('on');
        $('.main_lb').css('background-color',lbBgColor[index]);
        $('.cate_list .cate_item .tit').css('color',lbTxtColor[index]);
        $(this).parent().find('.wow').addClass('animate__fadeInUp animated');
    });

    $('.main_lb_pc .cate_list .cate_item a').on('mouseleave', function(){
        $(this).parent().find('.wow').removeClass('animate__fadeInUp animated');
    });


    //main_lb_mo_slide
    $('.main_lb_mo_slide').on('init', function(event, slick){
        $(slick.$slides).eq(0).find('.wow').addClass('animate__fadeInUp').css({
            "visibility":"visible",
            "animation-duration":"1s",
            "animation-fill-mode":"both"
        });
        $(window).on('load', function(){
            $(slick.$slides).eq(0).siblings().find('.wow').removeAttr('style').css({"visibility":"hidden"}).removeClass('animate__fadeInUp');
        });
    }).slick({
        arrows: false,
        dots: true,
        infinite: true

    });

    $('.main_lb_mo_slide').on('beforeChange', function(event, slick, currentSlide, nextSlide){
        $('.main_lb').removeAttr('style');
        $('.main_lb').css('background-color',lbBgColor[nextSlide]);
    });

    $('.main_lb_mo_slide').on('afterChange', function(event, slick, currentSlide){
        $(slick.$slides).eq(currentSlide).find('.wow').addClass('animate__fadeInUp').removeAttr('style').css({
            "visibility":"visible",
            "animation-duration":"1s",
            "animation-fill-mode":"both"
        });

        if ( slick.currentDirection == 0 ) {
            if ( currentSlide - 1 < 0 ) {
                $(slick.$slides).eq(slick.slideCount-1).find('.wow').removeAttr('style').css({"visibility":"hidden"}).removeClass('animate__fadeInUp');
            } else {
                $(slick.$slides).eq(currentSlide-1).find('.wow').removeAttr('style').css({"visibility":"hidden"}).removeClass('animate__fadeInUp');
            }
        } else {
            if ( currentSlide + 1 > 6 ) {
                $(slick.$slides).eq(0).find('.wow').removeAttr('style').css({"visibility":"hidden"}).removeClass('animate__fadeInUp');
            } else {
                $(slick.$slides).eq(currentSlide+1).find('.wow').removeAttr('style').css({"visibility":"hidden"}).removeClass('animate__fadeInUp');
            }
        }
    });


    /*
    ** main_function
    */
    
    /* 210825 수정 str */
    var fnBgColor = ['#f5fffd', '#fefff6', '#fffdf4', '#eefcff'],
        fnBgImg = ['../../resources/front/images/main/fn_bg2.png', '../../resources/front/images/main/fn_bg3.png', '../../resources/front/images/main/fn_bg1.png', '../../resources/front/images/main/fn_bg4.png'];
    
    /* 210825 수정 end */

    var $fnTabItem = $('.fn_tab .fn_tab_item'),
        $fnConItem = $('.fn_con .fn_con_item'),
        $mainFunction = $('.main_function');

    var tabInterval = setInterval(tabAuto, 3000);

    $fnTabItem.on('click', function(){
        var index = $(this).index();

        clearInterval(tabInterval);
        tabInterval = setInterval(tabAuto, 3000);

        $(this).addClass('active').siblings().removeClass('active');
        $mainFunction.css({
            'background-color':fnBgColor[index],
            'background-image':'url('+fnBgImg[index]+')'
        });
        $fnConItem.eq(index).addClass('active').siblings().removeClass('active');
    });

    function tabAuto(){
        var index = $('.fn_tab .fn_tab_item.active').index();

        $fnTabItem.eq(index).removeClass('active');
        $fnConItem.eq(index).removeClass('active');

        if ( index == 3 ) {
            $('.main_function').css({
                'background-color':fnBgColor[0],
                'background-image':'url('+fnBgImg[0]+')'
            });
            $fnTabItem.eq(0).addClass('active');
            $fnConItem.eq(0).addClass('active');
        } else {
            $mainFunction.css({
                'background-color':fnBgColor[index+1],
                'background-image':'url('+fnBgImg[index+1]+')'
            });
            $fnTabItem.eq(index+1).addClass('active');
            $fnConItem.eq(index+1).addClass('active');
        }
    }

    $('.showroom_box').on('click', function(){
        location.href = '/customer/showroom_2019.ls';
    });

});

