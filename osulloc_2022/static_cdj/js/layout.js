"use strict";

$(document).ready(function(){
  
  /* mo_nav */
  $('.cdj_mo_nav .mo_nav .mo_nav_list_dep1 .item_dep1 > .link_text:not(.no_fold)').on('click', function (e){
    e.preventDefault()
    $(this).toggleClass('on').siblings('.mo_nav_list_dep2').stop(true,true).slideToggle();
    $(this).parent().siblings().children('.mo_nav_list_dep2').stop(true,true).slideUp();
    $(this).parent().siblings().children('.link_text').removeClass('on');
  });
  
  // document ready
  header_fix();
  
  // window scroll
  $(window).on('scroll', function(){
    header_fix();
  });
  
  // top banner closed
  $('.main_top_banner_close').on('click', function(){
    $(this).parents('.main_top_banner').addClass('hidden');
    
    header_fix();
  });
  
  function header_fix(){
    var scrTop = $(window).scrollTop();
    var $header = $('.cdj_header');
    var $bnr = $('.main_top_banner');
    var bnrH = $bnr.outerHeight();
    var $main = $('main.main');
    
    if ( $main.hasClass('main_contents') ) {  // 메인페이지일때
      if ( $bnr.hasClass('hidden') ) {
        $header.addClass('fixed');
      } else {
        if ( scrTop > bnrH ) {
          $header.addClass('fixed');
        } else {
          $header.removeClass('fixed');
        }
      }
    } else {  // 서브페이지일때
      $header.addClass('fixed sub_header');
    }
  }
  
  $('.cdj_header .wrapper .nav .nav_list_dep1 .item_dep1').on('mouseenter',function (){
    if ( $(this).hasClass('no-child') ) {
      $('.dim_bg').stop(true,true).fadeOut(100);
    } else {
      $('.dim_bg').stop(true,true).fadeIn(100);
    }
  });
  $('.cdj_header .wrapper .nav .nav_list_dep1').on('mouseleave',function (){
    $('.dim_bg').stop(true,true).fadeOut(100);
  });
  
  /* header scroll */
  $(window).on('scroll', function (){
    if ( $('.cdj_renew .main_banner').length > 0 ) {
      var scrTop = $(window).scrollTop();
      var mainBanOffBottom = $('.cdj_renew .main_banner').offset().top + $('.cdj_renew .main_banner').outerHeight();
      
      if ( scrTop > mainBanOffBottom ) {
        $('.cdj_header').addClass('scroll');
      } else {
        $('.cdj_header').removeClass('scroll');
      }
    }
  });
  
  var $iconMoNav = $('.cdj_header .wrapper .inner_box .right_box .nav_util .item .nav_util_icon.icon_mo_nav');
  var $moNavClose = $('.cdj_mo_nav .mo_nav_header .mo_nav_close');
  
  $iconMoNav.on('click',function (){
    $('.cdj_mo_nav').addClass('on');
    $('html, body').addClass('bg_noScroll');
  });
  
  $moNavClose.on('click',function (){
    $('.cdj_mo_nav').removeClass('on');
    $('html, body').removeClass('bg_noScroll');
  });
  
  
});



$(document).ready(function(){
  /* 마이페이지 */
  
  /* 마이페이지 메인 - 네비게이션 */
  $('.cdj_renew .my_nav').on('mouseenter', function (){
    $('.cdj_renew .my_nav .nav_list_dep1 .item_dep1 .box').addClass('on');
    $('.cdj_renew .my_nav .my_nav_bg').addClass('on');
  });
  $('.cdj_renew .my_nav').on('mouseleave', function (){
    $('.cdj_renew .my_nav .nav_list_dep1 .item_dep1 .box').removeClass('on');
    $('.cdj_renew .my_nav .my_nav_bg').removeClass('on');
  });
  
  
  
  /* 마이페이지 메인 - 찜한 상품 */
  var myMainWishList = undefined;
  
  function myMainWishSwiper() {
    if ( $(".cdj_renew .wish_prd_wrap .prd_list_type1").length > 0 ) {
      var ww = $(window).outerWidth();
      
      if (ww < 1024 && myMainWishList == undefined) {
        myMainWishList = new Swiper(".cdj_renew .wish_prd_wrap .prd_list_type1", {
          slidesPerView: 3.2,
          spaceBetween: 12,
          simulateTouch: true,
          speed: 1000,
        });
      } else if (ww >= 1025 && myMainWishList != undefined) {
        myMainWishList.destroy();
        myMainWishList = undefined;
      }
    }
  }
  
  myMainWishSwiper();
  
  $(window).on('resize', function () {
    myMainWishSwiper();
  });
  
  
  /* 마이페이지 메인 - 히스토리 */
  var myMainHisList = undefined;
  
  function myMainHisSwiper() {
    if ( $(".cdj_renew .wish_prd_wrap .prd_list_type1").length > 0 ) {
      var ww = $(window).outerWidth();
      
      if (ww < 1024 && myMainHisList == undefined) {
        myMainHisList = new Swiper(".cdj_renew .his_prd_wrap .prd_list_type1", {
          slidesPerView: 3.2,
          spaceBetween: 12,
          simulateTouch: true,
          speed: 1000,
        });
      } else if (ww >= 1025 && myMainHisList != undefined) {
        myMainHisList.destroy();
        myMainHisList = undefined;
      }
    }
  }
  
  myMainHisSwiper();
  
  $(window).on('resize', function () {
    myMainHisSwiper();
  });
  
  
  /* 마이페이지 - 기간조회 */
  $('.cdj_renew .my_term_sort .btn_box .term_btn').on('click', function (){
    if ( $(this).hasClass('open') ) {
      $(this).addClass('on').siblings().removeClass('on').parents().find('.sel_box').addClass('on');
    } else {
      $(this).addClass('on').siblings().removeClass('on').parents().find('.sel_box').removeClass('on');
    }
  });
  
  
  /* 마이페이지 - 후기관리 */
  $('.cdj_renew .rev_point_info .tit').on('click', function (){
    $('.cdj_renew .rev_point_info .tit').toggleClass('on');
    $('.cdj_renew .rev_point_info .info_box').toggleClass('on');
  });
  
  
  /* 마이페이지 - 후기작성 60자 카운팅 */
  $('.review_text_area').on('keyup', function() {
    /*$('.text_cnt').html($(this).val().length+"/100");*/
    $('.text_cnt').html("<span>"+$(this).val().length+"</span>"+"/60");
    
    if($(this).val().length > 60) {
      $(this).val($(this).val().substring(0, 60));
      $('.text_cnt').html("60 / 60");
    }
  });
  
  
  /* 마이페이지 faq */
  $('.cdj_renew .my_cs_faq .faq_con .faq_list .item .faq_q').on('click', function (){
    $(this).parent().toggleClass('on').find('.faq_a').stop(true,true).slideToggle();
    $(this).parent().siblings().removeClass('on').find('.faq_a').stop(true,true).slideUp();
  });
  
  
  /* 마이페이지 - 헬프메세지 */
  $('.cdj_renew .my_info .box1 .grade .text .icon_grade_desc').on('mouseenter', function (){
    $('.cdj_renew .my_info .box1 .grade .text .my_help_box').addClass('on');
  });
  $('.cdj_renew .my_info .box1 .grade .text .icon_grade_desc').on('mouseleave', function (){
    $('.cdj_renew .my_info .box1 .grade .text .my_help_box').removeClass('on');
  });
  
  $('.cdj_renew .bt_info_wrap .vip_grade .info_list .item .sub_tit .my_help').on('mouseenter', function (){
    $('.cdj_renew .bt_info_wrap .vip_grade .info_list .item .sub_tit .my_help_box').addClass('on');
  });
  $('.cdj_renew .bt_info_wrap .vip_grade .info_list .item .sub_tit .my_help').on('mouseleave', function (){
    $('.cdj_renew .bt_info_wrap .vip_grade .info_list .item .sub_tit .my_help_box').removeClass('on');
  });
  
  
  /* 마이페이지 1:1상담 */
  $('.cdj_renew .my_cs_qna .my_qan_list .list .item').on('click', function (){
    $(this).addClass('on').siblings().removeClass('on');
  });
  
  
  /* 1:1상담 신청 2000자 카운팅 */
  $('.qna_text_area').on('keyup', function() {
    /*$('.text_cnt').html($(this).val().length+"/100");*/
    $('.text_cnt').html("<span>"+$(this).val().length+"</span>"+"/2000");
    
    if($(this).val().length > 2000) {
      $(this).val($(this).val().substring(0, 2000));
      $('.text_cnt').html("2000 / 2000");
    }
  });
  
  
  /* 마이페이지 - 멤버십 상단 탭 focusing */
  if ( $('.cdj_renew .my_mem_tab').length > 0 ){
    $('.cdj_renew .my_mem_tab .inner_box .tab_wrap .tab_box').each(function (){
      var boxWidth = $(this).width();
      var boxLength = $(this).children().length;
      var boxIndex = $(this).find('.on').index();
      
      $('.cdj_renew .my_mem_tab .inner_box .tab_wrap').scrollLeft((boxWidth/boxLength) * boxIndex);
    });
  }
  
  
  /* 마이페이지 - 이미지업로드 */
  if ( document.querySelector('.cdj_renew .my_img_uploader') ) {
    
    const imageList = document.querySelector(".cdj_renew .my_img_uploader .upload_box .list_box .img_list"); // 추가할 이미지 영역
    const count = document.querySelector(".cdj_renew .my_img_uploader .btn_box input[type='file'] + label .count .current"); // 첨부된 이미지 카운트
    const imageInput = document.querySelector(".cdj_renew .img_upload"); // 파일 input
  
  
    imageInput.addEventListener("change", (e) => {
      if ( imageInput.files ) { // input file 에 file 객체 유무 체크
        const fileLength = imageInput.files.length; // file 객체 갯수 체크
        const imageListItem = document.querySelectorAll(".cdj_renew .my_img_uploader .upload_box .list_box .img_list .img_item");
        let allowedExtensions = /(\.jpg|\.jpeg|\.png|\.gif)/i;
      
        if ( fileLength > 4 ) {
          e.preventDefault();
          alert('최대 4개까지만 첨부가능합니다.');
          return false;
        }
      
        if ( imageListItem.length > 0 ) {
          imageListItem.forEach(element => {
            element.remove();
          });
        }
      
        for (let i = 0; i < fileLength; i++) {
          if ( !allowedExtensions.exec(imageInput.files[i].name) ) {
            alert('이미지 파일만 첨부 가능합니다.');
            imageInput.value = '';
            return false;
          } else {
            const reader = new FileReader();
          
            reader.onload = (evt) => {
              let image = document.createElement("img"); // 이미지 객체 생성 ( = <img> )
              let imageItem = document.createElement("div"); // 이미지 아이템 객체 생성 ( = <div> )
              let deleteButton = document.createElement("button"); // 삭제 버튼 객체 생성 ( = <button> )
            
              // img_item 클래스 추가
              imageItem.classList.add("img_item");
              // 이미지에 첨부파일 경로 추가
              image.setAttribute("src", evt.target.result);
              // 버튼 속성 추가
              deleteButton.setAttribute("title", "첨부 이미지 삭제");
              deleteButton.setAttribute("class", "del_btn");
              //deleteButton.setAttribute("onclick", "imageDelete(this)");
              deleteButton.addEventListener("click", () => {
                deleteButton.parentElement.remove();
              
                const currentImageItem = imageList.querySelectorAll(".img_item");
                count.innerHTML = String(currentImageItem.length);
              });
            
              imageItem.append(image); // img_item 에 img append
              imageItem.append(deleteButton); // img_item 에 button append
              imageList.append(imageItem); // img_list 에 img_item append
            }
            reader.readAsDataURL(imageInput.files[i]); // reader.onload 에서 처리된 결과 출력
          }
        }
        count.innerHTML = String(fileLength); // count 에 저장
      }
    });
  }
  
  
  /* 티스톤 예약 취소 신청 직접입력 시 textarea 추가 */
  var teaStoneCancleMsg = $('.cdj_renew .tea_cancle_reason .con_box .right .form_box .inp_selectbox select');
  
  teaStoneCancleMsg.on('change', function (){
    if ( $(this).val() == 1) {
      $(this).parents('.form_box').find('.text_area').addClass('on');
    } else {
      $(this).parents('.form_box').find('.text_area').removeClass('on');
    }
  });
  
  /* 티스톤 예약 취소 신청 60자 카운팅 */
  $('.tea_cancle_text_area').on('keyup', function() {
    $('.text_cnt').html("<span>"+$(this).val().length+"</span>"+"/60");
    
    if($(this).val().length > 60) {
      $(this).val($(this).val().substring(0, 60));
      $('.text_cnt').html("60 / 60");
    }
  });
  
  
  
  /* 취소/반품/교환 신청 직접입력 시 textarea 추가 */
  var teaStoneCancleMsg = $('.cdj_renew .cre_reason .con_box .right .form_box .inp_selectbox select');
  
  teaStoneCancleMsg.on('change', function (){
    if ( $(this).val() == 1) {
      $(this).parents('.form_box').find('.text_area').addClass('on');
    } else {
      $(this).parents('.form_box').find('.text_area').removeClass('on');
    }
  });
  
  /* 취소/반품/교환 신청 60자 카운팅 */
  $('.cre_cancle_text_area').on('keyup', function() {
    $('.text_cnt').html("<span>"+$(this).val().length+"</span>"+"/60");
    
    if($(this).val().length > 60) {
      $(this).val($(this).val().substring(0, 60));
      $('.text_cnt').html("60 / 60");
    }
  });


  // 마이페이지 - 다다일상 관리 리스트 상세보기 버튼 클릭이벤트
  var $detailBtn = $(".cdj_renew .stnd_normal_wrap .list_wrap .list_item button.detail_btn");				
  $detailBtn.on('click', function () {

    if(!$(this).hasClass("on")){						
      $(this).addClass("on");
      $(this).parents(".list_item ").children(".detail_wrap").show().addClass("on");
    } else{
      $(this).removeClass("on");
      $(this).parents(".list_item ").children(".detail_wrap").hide().removeClass("on");
    }

  });
  
  
  
});
