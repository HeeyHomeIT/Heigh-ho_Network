$("#myCarousel").carousel();
var heeyhomeCarousel = {

    init: function () {
        heeyhomeCarousel.numberControl();
    },

    numberControl: function () {
        var _focus = $(".carousel-indicators li");
        var _number = $(".number_control li");
        var i = 0;
        setInterval(function () {
            for (i = 0; i < 5; i++) {
                if ($(_focus).eq(i).attr("class") == "active") {
                    $(_number).eq(i).addClass("active");
                    $(_number).eq(i).siblings().removeClass("active");
                }
            }
        }, 1);

    }
};
$(function () {

    heeyhomeCarousel.init();

});



