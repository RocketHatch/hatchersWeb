HPROG = {};
HPROG.reset = {};

$(document).ready(function(){

  $('.res').keyup(function() {
    if (HPROG.reset.confirmMatch()) {
	  $("#rpwsend").removeClass('unenabled').addClass('clickable');
	} else {
	  $("#rpwsend").addClass('unenabled').removeClass('clickable');
	}
  })
  $("#rpwcan").click(function(){
    window.location = "http://rockethatchers.us/index.html";
    return false;
  })
  $("#rpwsend").click(function(){ 
    HPROG.reset.pwUpdate($(this).attr('data'),$.sha256($("#rpwregpw").attr('value')));
    return false;
  })
})

HPROG.reset.confirmMatch = function() {
  console.log( "called"); 
  var match = $("#rpwregpw").attr('value') === $("#rpwcregpw").attr('value');
  console.log( "Words match: " + match );   
  return match;
};

HPROG.reset.pwUpdate = function(mid, reset) {
  var changed = false;
  var data = {mid:mid,prop:'data',nuval:reset};
  changed = HPROG.ajax.updateMemeber(data);
  if (changed) {
    console.log("Password changed");
    window.location = "http://rockethatchers.us/index.html";
  } else {
    console.log("Houston there is a problem!");  
  }
};	

/* 
  $("#pDone").click(function(){
     HPROG.site.displayContactBlock(false);
     return false;
  })
  $("#pgLogReg").live('click', function() {
    $('#logregarea').removeClass('register').addClass('login');
    HPROG.site.displayLogBox(true);
  })
    $("#logregcan").live('click', function() {
    HPROG.site.displayLogBox(false);
  })
  $('#logregsend').live('click', function() {
    if ($("#logreghead").html() === 'login') {
	  HPROG.site.doLogin($("#untxt").attr('value'),$.sha256($("#pwtxt").attr('value')));
	} else if ($("#logreghead").html() === 'register') {
	  var c = document.getElementById("canvas");
      var ctx = c.getContext("2d");
	  var img = document.getElementById("baseimg");
	  console.log("img = " + img);
	  HPROG.canvas.loadImage(img, ctx); 
    }	  
  })
  $('#logregjoin').live('click', function() {
    $('#logregarea').removeClass('login').addClass('register');
	HPROG.site.displayRegBox(true);
  })
  $('#messcan.fgtpw').live('click', function() {  
	HPROG.site.emailForgotMessage($("#frgtpw").attr('value'));
	HPROG.site.resetInputDialog();
  }) 
  $("#register").click(function(){
     HPROG.site.displayRegBox(true);
     return false;
  })
  $('.rhlink').click(function() {
   window.location = "http://www.rockethatch.org/#"+ $(this).html().toLowerCase();
  })
  $('#rtotopb').click(function() {
    window.location = "#top";
  })
  $("#photoBr").live('click', function(){
     $("#photobrws").trigger('click');
     return false;
  })
  $("#photoUp").live('click', function(){
     filelist= $("#upload-form-file");
	 for(var k in filelist[0])
       //HPROG.ajax.uploadImage(filelist[0]);
	   console.log(filelist[0]);
     return false;
  })
  $('.edit').live('click', function() {
    if ($(this).hasClass('inedit')) {  
      $(this).closest("div").find('.pfield').each(function() {
	    console.log( "The Edit: " + $(this).html() + 
		           " property: " + $(this).attr('data') );
	    HPROG.site.profileUpdate($(this).attr('data'),($(this).html()).replace(/"/g, ''));
      });
	  //console.log("Member obj: " + JSON.stringify(RCSData.curMember));
	  
	  $(this).closest("div").find('.pfield').attr("contenteditable", false);
	  $(this).removeClass('inedit')
	} else {
	  $(this).closest("div").find('.pfield').attr("contenteditable", true);
	  $(this).addClass('inedit')
	}
  })
  $("#pwreset").live('click', function() {
    HPROG.site.displayInputDialog("Your Email Address:", true);
  });
  $("#mtrig").live('click', function() {
    HPROG.site.displayMessage("SendMessage", true);
	console.log("To: " + $(this).attr('data'));
	$("#message").attr('data',$(this).attr('data'));
  });
  
  $("#pCompDone").click(function(){
     HPROG.site.displayCompatBlock(false);
     return false;
  })
  $(window).resize(function() {
    if (!$('#skillbar').hasClass('closed')) {
      var el = jQuery($("#skillbar"));
      $("#skillbar").height(HPROG.site.getDynHeight(el));
	}
	if ($('#pPage').hasClass('open')) {
	  sizeProPage();
	  //var elh = parseInt($("#proPct").css("height"), 10);
	  //console.log("picture height string = " + el);
	  //var h = parseInt(el, 10);
	  //console.log("picture height number = " + elh);
	  //$("#wlink").css('bottom',(226 - elh));
	}
  })
  $(".photoTile").on({
    'touchstart' : function(e) {
      //alert("picture touched"); 
    }
  })
  $(".photoTile").on({
	'hover' : function(e) {
	  //alert("picture has mouse in");
	}
  }) 

  if (window.history && window.history.pushState) {

    window.history.pushState('forward', null, './index.html');
	
    $(window).on('popstate', function() {
      //alert('Back button was pressed.');
	  HPROG.site.displayMessage("Forget Message", false);
	  HPROG.site.clearEMessage();
	  HPROG.site.togglePage($("#mPage"), $("#pPage"));
	  window.history.pushState('forward', null, './index.html');
    });
  }
}) 

*/
 

 