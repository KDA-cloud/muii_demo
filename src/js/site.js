$(document).ready(function () {

	$(".slider").slider({
		tooltip: 'always',
		tooltip_position:'bottom'
	});

	$(function () {
	  $('[data-toggle="tooltip"]').tooltip({
	  	container: '.creditSimulator .details'
	  });
	});
	
	$('.showpassword').on('click', function(){
  
	  if($(this).prev('input.text').attr('type') == 'password'){
	    $(this).prev('input.text').prop("type", "text");
	  }
	  else{
	    $(this).prev('input.text').prop("type", "password");
	  }
	  
	  return false;
	});
});


