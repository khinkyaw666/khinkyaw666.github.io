// assets/js/scripts.js
$(document).ready(function(){
  $('#flightSearchForm').on('submit', function(e){
    e.preventDefault();
    window.location.href = 'flights.html';
  });
});
