"use strict";

$(document).ready(function (){

    //datepicker
    $.datepicker.setDefaults({
        dateFormat: 'yy.mm.dd',
        showOtherMonths: true
    });

    $('#datepicker_str').datepicker();
    $('#datepicker_end').datepicker();

});
