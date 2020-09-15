$(function () {
    $(window).scroll(function () {
        if ($(window).scrollTop() >= 20) {
            $(".top-nav").addClass("scrolled-bg");
        } else {
            $(".top-nav").removeClass("scrolled-bg");
        }
    });
});

$(".testimonials__wrapper").slick({
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 3,
    responsive: [
        {
            breakpoint: 992,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 2,
                arrows: false,
            },
        },
        {
            breakpoint: 550,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
                arrows: false,
            },
        },
    ],
});

$(function () {
    var current_progress = 0;
    var interval = setInterval(function () {
        current_progress += 10;
        $("#dynamic")
            .css("width", current_progress + "%")
            .attr("aria-valuenow", current_progress)
            .text(current_progress + "% Complete");
        if (current_progress >= 100) clearInterval(interval);
    }, 400);
});
