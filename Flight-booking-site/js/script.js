$(document).ready(function () {
  $('#searchForm').on('submit', function (e) {
    e.preventDefault();
    alert('Searching flights...');
  });

  $('button').click(function () {
    $('button').removeClass('active');
    $(this).addClass('active');
  });
});

  $(document).ready(function() {
    $('.flight-listing').on('click', function() {
      $(this).toggleClass('open');
      $(this).next('.flight-details').slideToggle();
    });
  });


// explore city js
document.querySelectorAll('.card').forEach((el, i) => {
    el.style.animationDelay = el.parentElement.style.animationDelay;
  });


