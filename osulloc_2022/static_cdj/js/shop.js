"use strict";

/* shop - 우측 결제정보 fixed */
var subLayoutTop;
var subLayoutBottom;


$(window).on('load', function(){
  if ( $('.cdj_renew .sub_layout').length > 0 ) {
    subLayoutTop = $('.cdj_renew .sub_layout').offset().top;
    subLayoutBottom = $('.cdj_renew .sub_layout').offset().top + $('.cdj_renew .sub_layout').outerHeight();
  }
});

$(document).ready(function(){
  var scrBtmBreak = true;
  
  $(window).on('resize', function(){
    if ( $('.cdj_renew .sub_layout').length > 0 ) {
      subLayoutTop = $('.cdj_renew .sub_layout').offset().top;
      subLayoutBottom = $('.cdj_renew .sub_layout').offset().top + $('.cdj_renew .sub_layout').outerHeight();
    }
  });
  
  var winW = $(window).outerWidth();
  var threshold = (winW>1280)?100:68;
  var contentTop = $(window).scrollTop() + threshold;
  var scrBtm = $(window).scrollTop() + $('.cdj_renew .sub_layout .price_info').outerHeight() + 200;
  var cartPriceTop = $(window).scrollTop() - subLayoutTop + threshold;
  
  if ( contentTop > subLayoutTop  ) {
    $('.cdj_renew .sub_layout .shop_price_info').addClass('fixed');
    
    if (scrBtm >= parseInt($('#new_footer').offset().top)) {
      $('.cdj_renew .sub_layout .shop_price_info').addClass('fixed_bottom');
      
      if ( scrBtmBreak ) {
        $('.cdj_renew .sub_layout .shop_price_info').css({top:parseInt(cartPriceTop)});
        scrBtmBreak = false;
      }
    } else {
      $('.cdj_renew .sub_layout .shop_price_info').removeClass('fixed_bottom').removeAttr('style');
      scrBtmBreak = true;
    }
  } else {
    $('.cdj_renew .sub_layout .shop_price_info').removeClass('fixed');
  }
  
  $(window).on('scroll', function(){
    var winW = $(this).outerWidth();
    var threshold = (winW>1280)?100:68;
    var contentTop = $(this).scrollTop() + threshold;
    var scrBtm = $(this).scrollTop() + $('.cdj_renew .sub_layout .shop_price_info .price_info').outerHeight() + 200;
    var cartPriceTop = $(this).scrollTop() - subLayoutTop + threshold;
    
    if ( contentTop > subLayoutTop  ) {
      $('.cdj_renew .sub_layout .shop_price_info').addClass('fixed');
      
      if (scrBtm >= parseInt($('#new_footer').offset().top)) {
        $('.cdj_renew .sub_layout .shop_price_info').addClass('fixed_bottom');
        
        if ( scrBtmBreak ) {
          $('.cdj_renew .sub_layout .shop_price_info').css({top:parseInt(cartPriceTop)});
          scrBtmBreak = false;
        }
      } else {
        $('.cdj_renew .sub_layout .shop_price_info').removeClass('fixed_bottom').removeAttr('style');
        scrBtmBreak = true;
      }
    } else {
      $('.cdj_renew .sub_layout .shop_price_info').removeClass('fixed');
    }
  });
  
});


/* shop - 아코디언 레이아웃부분 */
/* 페이지 로딩 후 초기 셋팅 */
function setOrderAccordion($elem) {
  if ( $elem.length > 0 ) {
    var $THIS = $elem;
    var $conBox = $THIS.next('.con_box'); /* 컨텐츠 박스 */
    var $item = $conBox.find('.list_item'); /* 리스트 아이템 */
    var itemHeight = $item.first().outerHeight(); /* 리스트 아이템 1개 높이 (첫번째 아이템만 체크) */
    var conBoxPaddingTop = parseInt($conBox.css('padding-top').replace('px','')); /* Padding Top */
    var conBoxPaddingBottom = parseInt($conBox.css('padding-bottom').replace('px','')); /* Padding Bottom */
    var conBoxPadding = conBoxPaddingTop + conBoxPaddingBottom; /* Padding */
  
    $conBox.css({'max-height':(itemHeight + conBoxPadding)});
  }
}

/* 리사이징 될 경우 */
function resizeOrderAccordion($elem) {
  var $THIS = $elem;
  var MO_CHK = $(window).outerWidth() <= 1024; /* 모바일 체크 */
  var prdChk = $THIS.parent().hasClass('order_prd'); /* 주문상품 체크 */

  if ( prdChk ) { /* 주문상품 리스트인 경우 */
    var $conBox = $THIS.next('.con_box'); /* 컨텐츠 박스 */
    var $listBox = $conBox.find('.order_list_box'); /* 리스트 박스 */
    var listBoxLength = $listBox.length; /* 리스트 박스 갯수 */
    var listPaddingBottom = parseInt($listBox.css('padding-bottom').replace('px','')) * listBoxLength; /* 각 리스트 박스의 전체 Padding Bottom */
    var $item = $conBox.find('.list_item'); /* 리스트 아이템 */
    var itemHeight = $item.first().outerHeight(); /* 리스트 아이템 1개 높이 (첫번째 아이템만 체크) */
    var itemLength = $item.length; /* 리스트 아이템 갯수 */
    var $order_prd_title = $('.accordion_layout.order_prd .con_box .order_prd_title'); /* 주문상품 타이틀 */
    var titleHeight = MO_CHK ? $order_prd_title.length * 41 : $order_prd_title.length * 32.5;  /*  타이틀 높이 = 타이틀 갯수 * 타이틀 높이 */
    var conBoxPaddingTop = parseInt($conBox.css('padding-top').replace('px','')); /* Padding Top */
    var conBoxPaddingBottom = parseInt($conBox.css('padding-bottom').replace('px','')); /* Padding Bottom */
    var conBoxPadding = conBoxPaddingTop + conBoxPaddingBottom; /* Padding */
    var conBoxHeight = (itemHeight * itemLength) + titleHeight + conBoxPadding + listPaddingBottom;
    /* 컨텐츠 전체 높이 = (아이템 높이 * 아이템 갯수) * 타이틀 전체 높이 + 컨텐츠 박스 Padding + 리스트 박스 Padding */

    if ( $THIS.hasClass('on') ) {
      $conBox.css({'max-height':conBoxHeight});
    } else {
      $conBox.css({'max-height':(itemHeight + conBoxPadding)});
    }
  }
}

var resize_breaker = true; /* 리사이징 1번만 감지 되도록 변수 생성 */

$(window).on('resize', function(){
  if ( resize_breaker ) {
    resize_breaker = false;

    setTimeout(function(){
      resizeOrderAccordion($('.cdj_renew .accordion_layout.order_prd .subject_box'));

      resize_breaker = true;
    }, 300);
  }
});

$(document).ready(function(){
  var $accoSubjectBox = $('.cdj_renew .accordion_layout:not(.no_fold) .subject_box');

  setOrderAccordion($('.cdj_renew .accordion_layout.order_prd .subject_box')); /* 주문상품 아코디언 셋팅 */

  $accoSubjectBox.on('click', function () {
    var $THIS = $(this);
    var MO_CHK = $(window).outerWidth() <= 1024; /* 모바일 체크 */
    var prdChk = $THIS.parent().hasClass('order_prd'); /* 주문상품 체크 */

    if ( prdChk ) { /* 주문상품 리스트인 경우 */
      var $conBox = $THIS.next('.con_box'); /* 컨텐츠 박스 */
      var $listBox = $conBox.find('.order_list_box'); /* 리스트 박스 */
      var listBoxLength = $listBox.length; /* 리스트 박스 갯수 */
      var listPaddingBottom = parseInt($listBox.css('padding-bottom').replace('px','')) * listBoxLength; /* 각 리스트 박스의 전체 Padding Bottom */
      var $item = $conBox.find('.list_item'); /* 리스트 아이템 */
      var itemHeight = $item.first().outerHeight(); /* 리스트 아이템 1개 높이 (첫번째 아이템만 체크) */
      var itemLength = $item.length; /* 리스트 아이템 갯수 */
      var $order_prd_title = $('.accordion_layout.order_prd .con_box .order_prd_title'); /* 주문상품 타이틀 */
      var titleHeight = MO_CHK ? $order_prd_title.length * 41 : $order_prd_title.length * 32.5;  /*  타이틀 높이 = 타이틀 갯수 * 타이틀 높이 */
      var conBoxPaddingTop = parseInt($conBox.css('padding-top').replace('px','')); /* Padding Top */
      var conBoxPaddingBottom = parseInt($conBox.css('padding-bottom').replace('px','')); /* Padding Bottom */
      var conBoxPadding = conBoxPaddingTop + conBoxPaddingBottom; /* Padding */
      var conBoxHeight = (itemHeight * itemLength) + titleHeight + conBoxPadding + listPaddingBottom;
      /* 컨텐츠 전체 높이 = (아이템 높이 * 아이템 갯수) * 타이틀 전체 높이 + 컨텐츠 박스 Padding + 리스트 박스 Padding */

      if ( $THIS.hasClass('on') ) {
        $conBox.css({'max-height':(itemHeight + conBoxPadding)});

        $THIS.removeClass('on');
      } else {
        $conBox.css({'max-height':conBoxHeight});

        $THIS.addClass('on');
      }
    } else { /* 주문상품 리스트가 아닌 경우 */
      $THIS.toggleClass('on').next('.con_box').toggle();
    }
  });
});


/* shop - 하단 결제 fixed 버튼 */
$(window).on('scroll', function (){
  var scrBottom = $(window).scrollTop() + $(window).outerHeight();
  var winW = $(this).outerWidth();
  var footerOffTop = $('#new_footer').offset().top + 250;
  var bottomFixedBtn = $('.cdj_renew .bottom_fixed_btn');
  
  if ( winW < 1024 ) {
    if ( scrBottom >  footerOffTop ){
      bottomFixedBtn.fadeOut();
    } else  {
      bottomFixedBtn.fadeIn();
    }
  }
});



$(document).ready(function(){
  
  /* shop - 결제수단선택 */
  var paymentItem = $('.cdj_renew .payment_info .payment_list .item');
  
  paymentItem.on('click',function (){
    $(this).addClass('on').siblings().removeClass('on');
  });
  
  // input radio 선택 값에 따라 변경
  $('input[name="paymentType"]').on('change', function(){
    /*var method = $(this).val();*/
    var methodId = $(this).attr("id");
    var method = $("label[for='"+methodId+"']").text();

    $('.payment_item').hide();
    $('#payment_txt').text(method);

    switch (method) {
      case '신용카드':
        $('#payment_card').show();

        break;
      case '무통장 입금':
        $('#payment_deposit').show();
        
        $('input[name="cash_receipts_typeA"]').on('change', function(){
          var radio_value = $(this).val();
          
          $('#payment_txt').text(method+'/'+radio_value);
        });
  
        // 신용카드 선택항목 전부 해제
        clearCreditSelect();
        
        break;
      case '계좌이체':
        $('#payment_transfer').show();
  
        $('input[name="cash_receipts_typeB"]').on('change', function(){
          var radio_value = $(this).val();
    
          $('#payment_txt').text(method+'/'+radio_value);
        });
  
        // 신용카드 선택항목 전부 해제
        clearCreditSelect();

        break;
      default:
  
        // 신용카드 선택항목 전부 해제
        clearCreditSelect();
        
        break;
    }
  });
  
  /* 무이자 할부 관련 */
  $('.cdj_renew .payment_info .payment_con .payment_item .no_interest').on('click', function (){
    $('.cdj_renew .no_interest_con').show();
    $('.cdj_renew .no_interest_con_dim').show();
  });
  
  $('.cdj_renew .no_interest_con .top_box .no_pop_close').on('click', function (){
    $('.cdj_renew .no_interest_con').hide();
    $('.cdj_renew .no_interest_con_dim').hide();
  });
  
  // 커스텀 드롭박스(셀렉트박스) 드롭 다운
  $('.custom_select_box .select_area').on('click', function(){
    $(this).siblings('.dropdown_area').stop(true,true).toggle();
    $(this).parents('.custom_select_wrap').toggleClass('active');
    $(this).parents('.custom_select_box').toggleClass('active');
  });
  
  // 커스텀 드롭박스(셀렉트박스) 항목 선택 시 적용
  $('.dropdown_box input[type="radio"]').on('change', function(){
    /*var radio_value = $(this).val();*/
    var radioValueId = $(this).attr("id");
    var radio_value = $("label[for='"+radioValueId+"']").text();
    var $select_area = $(this).parents('.custom_select_box').find('.select_area');
    var $dropdown_area = $(this).parents('.dropdown_area');
    
    $select_area.text(radio_value).addClass('selected');
    $dropdown_area.stop(true,true).toggle();
  
    $(this).parents('.custom_select_wrap').removeClass('active');
    $(this).parents('.custom_select_box').removeClass('active');
  });
  
  // 커스텀 드롭박스 중 할부기간 선택 후 텍스트 적용
  $('input[name="cardQuota"]').on('change', function(){
    var type = $('#payment_card_select .select_area').text();
    var install = $('#installment_select .select_area').text();
    
    $('#payment_txt').text(type+'/'+install);
  });
  
  // 신용카드 선택항목 전부 해제
  function clearCreditSelect() {
    $('.custom_select_box .select_area').text('선택').removeClass('selected');
    $('.dropdown_box input[type="radio"]').prop('checked', false);
  }
});

$(document).ready(function(){
  /* shop - email직접입력 시 input 추가 */
  var tableEmailselect = $('.table_type_write .email .inp_selectbox select');
  
  tableEmailselect.on('change', function (){
    if ( $(this).val() == 1) {
      $(this).parents('.email_box').addClass('input');
      $(this).parents('.email_box').find('.add_email').addClass('on');
    } else {
      $(this).parents('.email_box').removeClass('input');
      $(this).parents('.email_box').find('.add_email').removeClass('on');
    }
  });
  
  /* shop - 배송요청사항 직접입력 시 input 추가 */
  var deliveryMsg1 = $('.cdj_renew .delivery_info1 .delivery_msg .inp_selectbox select');
  
  deliveryMsg1.on('change', function (){
    if ( $(this).val() == 1) {
      $(this).parents('.delivery_msg').find('.add_msg').addClass('on');
    } else {
      $(this).parents('.delivery_msg').find('.add_msg').removeClass('on');
    }
  });
  
  var deliveryMsg2 = $('.cdj_renew .delivery_info2 .delivery_msg .inp_selectbox select');
  
  deliveryMsg2.on('change', function (){
    if ( $(this).val() == 1) {
      $(this).parents('.delivery_msg').find('.add_msg').addClass('on');
    } else {
      $(this).parents('.delivery_msg').find('.add_msg').removeClass('on');
    }
  });
});


/* shop - 주문고객정보 하단 보더 */
$(document).ready(function(){
  var orderCustomerInfoSubject = $('.cdj_renew .accordion_layout.order_customer_info .subject_box');
  
  orderCustomerInfoSubject.on('click', function (){
    if ( $(this).hasClass('on') ) {
      $('.cdj_renew .accordion_layout.shipping_address_info .subject_box').css({'border-color':'#333'});
    } else {
      $('.cdj_renew .accordion_layout.shipping_address_info .subject_box').css({'border-color':'#E6E6E6'});
    }
  });
});


/* shop - 뷰티포인트 부분 */
$(document).ready(function(){
  $('.cdj_renew .sale_point_info .icon_bp').on('click', function(){
    $('.cdj_renew .sale_point_info .bp_con_bg').fadeToggle();
  });
  
});


$(document).ready(function(){
  /* 선물하기 메세지 카드 */
  if ( $('.cdj_renew .gifts_msg_card_thumb').length > 0 && $('.cdj_renew .gifts_msg_card_img').length > 0 ) {
    var gift_swiper_thumb; // 썸네일 슬라이드
    var gift_swiper_big; // 메인 슬라이드
  
    function thumbSwiperInit_PC() {
      gift_swiper_thumb = new Swiper(".cdj_renew .gifts_msg_card_thumb", {
        spaceBetween: 12,
        slidesPerView: 5,
        freeMode: true,
        watchSlidesProgress: true,
        allowTouchMove: false
      });
    }
  
    function thumbSwiperInit_MO() {
      gift_swiper_thumb = new Swiper(".cdj_renew .gifts_msg_card_thumb", {
        spaceBetween: 12,
        slidesPerView: 4.5,
        freeMode: true,
        watchSlidesProgress: true
      });
    }
  
    function mainSwiperInit() {
      gift_swiper_big = new Swiper(".cdj_renew .gifts_msg_card_img", {
        spaceBetween: 40,
        navigation: {
          nextEl: ".cdj_renew .gifts_msg_card_img .swiper-button-next",
          prevEl: ".cdj_renew .gifts_msg_card_img .swiper-button-prev",
        },
        thumbs: {
          swiper: gift_swiper_thumb,
        },
      });
    }
  
    function swiperInit() {
      if ( $(window).outerWidth() > 1024 ) { // PC
        if ( gift_swiper_thumb === undefined && gift_swiper_big === undefined ) {
          thumbSwiperInit_PC();
          mainSwiperInit();
        } else {
          gift_swiper_thumb.destroy(true, true);
          gift_swiper_big.destroy(true, true);
        
          thumbSwiperInit_PC();
          mainSwiperInit();
        }
      } else { // 모바일
        if ( gift_swiper_thumb === undefined && gift_swiper_big === undefined ) {
          thumbSwiperInit_MO();
          mainSwiperInit();
        } else {
          gift_swiper_thumb.destroy(true, true);
          gift_swiper_big.destroy(true, true);
          thumbSwiperInit_MO();
          mainSwiperInit();
        }
      }
    }
  
    swiperInit();
  
    var swiperResizeBreak = true;
  
    $(window).on('resize', function(){
      if ( swiperResizeBreak ) {
        swiperResizeBreak = false;
      
        setTimeout(function(){
          swiperInit();
        
          swiperResizeBreak = true;
        }, 200);
      }
    });
  }
  
  
  /* 메세지 카드 100자 카운팅 */
  $('.cart_msg_text').on('keyup', function() {
    /*$('.text_cnt').html($(this).val().length+"/100");*/
    $('.text_cnt').html("<span>"+$(this).val().length+"</span>"+"/100");
    
    if($(this).val().length > 100) {
      $(this).val($(this).val().substring(0, 100));
      $('.text_cnt').html("100 / 100");
    }
  });
  
});



/* 선물 추천 페이지 */
$(document).ready(function(){
  var giftsNavSwiper = undefined;
  
  function giftsinitSwiper() {
    var ww = $(window).outerWidth();
    
    if ( $(".cdj_renew .gifts_nav_slide").length > 0 ) {
      if (ww < 1024 && giftsNavSwiper == undefined) {
        giftsNavSwiper = new Swiper(".gifts_nav_slide", {
          slidesPerView: 4.2,
          spaceBetween: 0,
          simulateTouch: true,
          speed: 1000,
        });
      } else if (ww >= 1025 && giftsNavSwiper != undefined) {
        giftsNavSwiper.destroy();
        giftsNavSwiper = undefined;
      }
    }
  }
  
  giftsinitSwiper();
  
  $(window).on('resize', function () {
    giftsinitSwiper();
  });
  
  
  /*$(".cdj_renew .gifts_nav_wrap .gifts_nav_slide .gifts_nav_slide_wrapper .item .item_link").on('click', function(e){
    e.preventDefault();
    $(this).addClass('on').parents('.item').siblings().find('.item_link').removeClass('on');
    $('html,body').animate({scrollTop:$(this.hash).offset().top - 150}, 700);
  });*/
  
  
  $(".cdj_renew .gifts_nav_wrap .gifts_nav_slide .gifts_nav_slide_wrapper .item").on('click', function(e){
    e.preventDefault();
    var navIdx = $(this).index();
    var giftsSecIdxTop = $('.cdj_renew .gifts_container .gifts_sec').eq(navIdx).offset().top;
    
    /*$(this).addClass('on').siblings().removeClass('on');*/
    $('body, html').animate({ scrollTop: giftsSecIdxTop - 140 }, 700);
  });
  
  if ( $('.cdj_renew .gifts_container .gifts_sec').length > 0 ) {
    var giftsSecOffset = [];
  
    $(window).on('scroll', function(){
      var scrTop = $(this).scrollTop() + $("#cdj_header").outerHeight() + $('.cdj_renew .gifts_navigation').outerHeight();
    
      $('.cdj_renew .gifts_container .gifts_sec').each(function(index){
        var $this = $(this);
      
        giftsSecOffset[index] = {
          bottom: $this.offset().top + $(this).outerHeight(),
          top: $this.offset().top
        }
      });
    
      for ( var i=0; i<giftsSecOffset.length; i++ ) {
        var $navItem = $(".cdj_renew .gifts_nav_wrap .gifts_nav_slide .gifts_nav_slide_wrapper .item");
        
        if ( scrTop < giftsSecOffset[0].top ) {
          $navItem.removeClass('on');
        } else if ( scrTop > giftsSecOffset[giftsSecOffset.length - 1].bottom ) {
          $navItem.removeClass('on');
        } else {
          if ( scrTop > giftsSecOffset[i].top && scrTop < giftsSecOffset[i].bottom ) {
            $navItem.eq(i).addClass('on');
            $navItem.not($navItem.eq(i)).removeClass('on');
          }
        }
      }
    });
  }
  
  
  $(window).on('scroll', function() {
    if ( $('.cdj_renew .gifts_navigation').length > 0 ) {
  
      var scT = $(window).scrollTop() + $('#cdj_header').outerHeight();
      var giftsNavOff = $('.cdj_renew .gifts_navigation').offset().top;
  
      if ( scT >= giftsNavOff ) {
        $('.cdj_renew .gifts_nav_wrap').addClass('fixed');
        $('.cdj_renew .gifts_nav_blank').addClass('show').height($('.cdj_renew .gifts_nav_wrap').outerHeight());
      }
      else {
        $('.cdj_renew .gifts_nav_wrap').removeClass('fixed');
        $('.cdj_renew .gifts_nav_blank').removeClass('show');
      }
      
    }
  });
  
  
  var giftsPrdSlide = new Swiper('.cdj_renew .prd_slideban', {
    slidesPerView: 2,
    spaceBetween: 20,
    loop: true,
    speed: 1000,
    autoplay: {
      delay: 3500,
      disableOnInteraction: false,
    },
    navigation: {
      nextEl: ".cdj_renew .gifts_container .gifts_typeB .gifts_slide_next",
      prevEl: ".cdj_renew .gifts_container .gifts_typeB .gifts_slide_prev",
    },
    pagination: {
      el: '.cdj_renew .gifts_container .gifts_typeB .gifts_slide_pagination',
      type: 'bullets',
      clickable: true
    },
    breakpoints: {
      1024: {
        slidesPerView: 1.01,
        spaceBetween: 12,
        centeredSlides: true
      },
    },
  });
  
});
