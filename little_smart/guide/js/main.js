"use strict";
/* 
** 공통변수
*/
var WINDOW_WIDTH = $(window).width(),
    WINDOW_HEIGHT = $(window).height(),
    HTML = $('html');


$(document).ready(function(){
    

   


});

//visual 높이
var headerH = $('#header').outerHeight();
    
$(window).on('load resize', function(){
    $('.main_visaul .visual_slide_item').css('height', WINDOW_HEIGHT - headerH);
});