"use strict";

/* prd_rolling_text02 */
$(document).ready(function(){
  
  if (_Device.type == 0) {	//웹
    
    $('.prd_rolling_text02 .rolling_wrap').each(function (){
      var boxWidth = $(this).find('.rolling_box').eq(0).outerWidth();
      var duration = boxWidth/100;
      
      $(this).css({
        "width":boxWidth,
        "animation-duration":duration+"s"
      }).addClass('animated');
    });
    
  } else {	//태블릿/모바일
    
    $('.prd_rolling_text02 .rolling_wrap').each(function (){
      var boxWidth = $(this).find('.rolling_box').eq(0).outerWidth();
      var duration = boxWidth/100 + 4;
      
      $(this).css({
        "width":boxWidth,
        "animation-duration":duration+"s"
      }).addClass('animated');
    });
    
  }
});


/* prd_color_type01 */
$(document).ready(function(){
  
  $('.prd_color_type01 .color_thumb').slick({
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 4,
    arrows: true,
    prevArrow: $('.color_pager .prev'),
    nextArrow: $('.color_pager .next'),
    /*responsive: [
      {
        breakpoint: 740,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4
        }
      }
    ]*/
  });
  $(document).on('click', '.prd_color_type01 .color_thumb .slick-slide', function(){
    var prdColor = $(this).parents('.prd_color_type01');
    var slideIndex = $(this).attr('data-slick-index');
    prdColor.find('.chk').remove();
    $(this).find('.img_box').append('<span class="chk"></span>');
    prdColor.find('.color_box .color_item').hide();
    prdColor.find('.color_box .color_item').eq(slideIndex).show();
    
  });
  
});


/* 마이팔레트 컬러맵 모달팝업 */
$(document).ready(function(){
  
  var $mapBtn = $(".my_color_map .map_btn"),
    $clrListBox = $(".my_color_map_modal .color_list"),
    $mapTit = $(".my_color_map_modal .color_map_tit"),
    $mapTxt01 = $(".my_color_map_modal .text01"),
    $mapTxt02 = $(".my_color_map_modal .color_list > li .text02"),
    $mapModal = $(".my_color_map_modal"),
    $modalClose = $(".my_color_map_modal .close_btn");
  var colorInfo = [
    ["마이 아이섀도우 #베이스", "아이 메이크업의 기초를 다져주는 베이스 컬러", ["(아이 프라이머)<br>뽀오얀 살결", "(쉬머 2)<br>베이지 튜튜", "(매트 3)<br>손 끝에 봄", "(매트 4)<br>수줍은 안개꽃"]],
    ["마이 아이섀도우 #스타일링", "눈가에 컬러감을 줄 수 있는 포인트 컬러", ["(쉬머 18)<br>장미가 지는 시간", "(쉬머 20)<br>햇살 담은 자두", "(쉬머 21)<br>꽃갈피 일기장", "(쉬머 24)<br>해변의 불꽃놀이", "(쉬머 25)<br>낭만의 장미정원", "(매트 29)<br>아기 진달래", "(매트 30)<br>말린 장미 꽃잎", "(매트 32)<br>흩날리는 살구꽃", "(매트 33)<br>쌉쌀한 자몽사탕", "(매트 34)<br>볼 빨간 튤립", "(글리터 11)<br>별에게 가는 길", "(글리터 12)<br>석양에 물든 바다", "(글리터 13)<br>노을 지는 하늘", "(글리터 14)<br>홍시 냠냠", "(글리터 15)<br>춤추는 단풍잎", "(글리터 16)<br>찬란한 백일홍"]],
    ["마이 아이섀도우 #컨투어링", "눈가에 음영을 줄 수 있는 베이직한 뉴트럴 컬러", ["(쉬머 7)<br>소곤소곤 별", "(매트 9) 폭신<br>폭신 캐시미어", "(매트 10)<br>갓 구운 보리빵", "(매트 11)<br>말린 살구 꽃잎", "(매트 14)<br>호수에 비친 노을", "(매트 19)<br>밤 맛 마카롱", "(매트 20)<br>단풍나무 숲", "(매트 23)<br>겨울 봉숭아물", "(글리터 2)<br>틈새로 스민 햇살", "(글리터 3)<br>황금 오렌지밭", "(글리터 4)<br>밀려오는 봄 햇살", "(글리터 6)<br>한조각 티라미수", "(글리터 8)<br>별빛 부스러기"]],
    ["마이 아이섀도우 #디파이닝", "눈가에 윤곽을 주어 또렷한 눈매를 만들어 주는 라이너 컬러", ["(매트 36)<br>초콜릿 봉봉"]],
    ["마이 블러셔", "중간~진한 색감의 뽀샤시한 컬러들로 생기 발색", ["3 노을 물든<br>수국", "5 햇살 가득<br>장미", "6 곱게 말린<br>장미", "9 볼 빨간<br>동백꽃", "10 발그레<br>분홍 수국", "11 꿈꾸는<br>프리지아", "18 크림 가득<br>메리골드", "19 말린 장미<br>부케"]],
    ["마이 블러셔 [베일]", "물든 듯 말갛고 투명한 #수채화 발색", ["(베일 1)<br>살구빛 코랄", "(베일 2)<br>복숭아 코랄", "(베일 3)<br>발그레 코랄"]],
    ["마이 하이라이터", "과하지 않고 은은한 진주빛 광채", ["1 별빛 가득 새벽", "2 꽃비 내린 아침"]],
    ["마이 컨투어링", "자연스럽게 구운 듯 내추럴 음영 컨투어링", ["2 쌉싸름한<br>진저쿠키", "3 단짠단짠<br>피넛쿠키"]]
  ];
  
  $mapBtn.each(function(index,v){
    $(this).on({
      click: function(){
        //COLOR MAP 모달창 show
        $mapModal.show();
        
        // top_box 영역
        $mapTit.text(colorInfo[index][0]);
        $mapTxt01.text(colorInfo[index][1]);
        
        // 항목 개수
        var num = colorInfo[index][2].length;
        
        //항목 개수만큼 li 생성
        for(var i=0; i<=num-1; i++){
          $clrListBox.append("<li><img src='' alt='이니스프리 - 마이 팔레트 COLOR MAP'><p class='text02 mt5 m_lsm70'></p></li>");
        }
        
        // color_list_box 영역 (이미지 + 텍스트)
        $(".my_color_map_modal .color_list > li").each(function(j,v){
          $(".my_color_map_modal .color_list > li").eq(j).children("img").attr('src' , "https://images.innisfree.co.kr/kr/ko/upload/pdtDetailNew/makeup/color/myPalette/my_color_map/map0" + (index+1) + "/color" + (j+1) + ".png");
          $(".my_color_map_modal .color_list > li").eq(j).children(".text02 ").html(colorInfo[index][2][j]);
        });
      }
    });
  });
  
  //COLOR MAP 모달창 hide
  $modalClose.click(function(){
    $mapModal.hide();
    $clrListBox.empty();
  });
  
});


