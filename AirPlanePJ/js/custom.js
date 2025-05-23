
$(document).ready(function(){
    $('.customer-logos').slick({
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 1500,
        arrows: false,
        dots: false,
        pauseOnHover: false,
        responsive: [{
            breakpoint: 992,
            settings: {
                slidesToShow: 3
            }
        },{
            breakpoint: 768,
            settings: {
                slidesToShow: 2
            }
        }, {
            breakpoint: 520,
            settings: {
                slidesToShow: 1
            }
        }]
    });
});
// youtube

    $(document).ready(function () {
  // Sidebar toggle
  $("#sidebarToggle").click(function () {
    $("#sidebar").toggleClass("d-none");
  });

  // Navigation click actions
  $(".menu-item").click(function () {
    const target = $(this).data("target");

    // Switch active class
    $(".menu-item").removeClass("active");
    $(this).addClass("active");

    // Hide all and show selected
    $(".page-section").addClass("d-none");
    $("#" + target).removeClass("d-none");
  });
});
