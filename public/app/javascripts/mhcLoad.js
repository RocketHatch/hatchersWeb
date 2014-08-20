//var eventc = "#376700";
//var placec = "#e39b0f";
//var facec = "#ad3939";
var map;
var eData = [
  new google.maps.LatLng(34.736227, -86.733427),
  new google.maps.LatLng(34.723835, -86.771697),
  new google.maps.LatLng(34.684600, -86.729300)
];
var heatmap;

$(document).ready(function(){
  // read text entries from xml file
  //$scope.updateSkillList();
  //$scope.updateMembers();
  $('.lnavcat').css('cursor', 'pointer');
  $('.mapButton').css('cursor', 'pointer');
  $('#sk0').addClass('active');
  
  $("#contact").click(function(){
    HPROG.site.displayContactBlock(true);
    return false;
  }) 
  $("#pDone").click(function(){
     HPROG.site.displayContactBlock(false);
     return false;
  })
  $(".lgcmd").live('click', function() {
    $('#logregarea').removeClass('register').addClass('login');
    HPROG.site.displayLogBox(true);
  })
  $(".procmd").live('click', function() {    
    HPROG.site.displaypdmenu($(this).attr('id'));
  })
  $(".mcmd").live('click', function() {
    HPROG.site.displaypdmenu($(this).attr('id'));
  })

  $("#logregcan").live('click', function() {
    $('#logregarea').removeClass('login').removeClass('register');
	$('#logregsend').addClass('unenabled');
    HPROG.site.displayLogBox(false);
  })
  $('#logregsend').live('click', function() {
    if ($(this).hasClass('unenabled')) {
	  return false;
	}
    if ($("#logreghead").html() === 'login') {
	  HPROG.site.doLogin($("#untxt").attr('value'),$.sha256($("#pwtxt").attr('value')));
	} else if ($("#logreghead").html() === 'register') {
	  var c = document.getElementById("canvas");
      var ctx = c.getContext("2d");
	  var img = document.getElementById("baseimg");
	  var skills = [];
	  $("#nmSkills").find('.active').each(function() {
	    skills.push(parseInt($( this ).attr('data')));
	  });
	  //console.log("skills = " + skills);
	  //console.log("img = " + img);
      //HPROG.canvas.loadImage(img, ctx);		  
      HPROG.site.addMemberToDB($("#regeml").attr('value'),
	                           $("#regfn").attr('value'), 
							   $("#regln").attr('value'),
                               skills,							   
							   $("#regtag").attr('value'), 
							   $("#regweb").attr('value'), 
							   $.sha256($("#regpw").attr('value')));  
    }
    $(this).addClass('unenabled');	
  })
  $('#logregjoin').live('click', function() {
    HPROG.site.displayMessage(testorMessage(),true);
    $('#logregarea').removeClass('login').addClass('register');
	//HPROG.site.displayMessage("This function only works for testing team members",true);
	//HPROG.site.displayInputDialog("Alpha Test Code", true);
	HPROG.site.displayRegBox(true);
  })
  
  $('#frgtpw').live('keyup', function() {  
	if (HPROG.site.validateEMail($(this).attr('value'))) {
	  $('#messsend').removeClass('unenabled');
	} else {
	  $('#messsend').addClass('unenabled');
	}
  })
  
  $('#inputarea').live('keyup', function() {
	if (HPROG.site.validateLogReg()) {
	  $('#logregsend').removeClass('unenabled');
	} else {
	  $('#logregsend').addClass('unenabled');
	}
  })
  
  $('#reg').live('keyup', function() {  
	if (HPROG.site.validateEMail($(this).attr('value'))) {
	  $('#messsend').removeClass('unenabled');
	} else {
	  $('#messsend').addClass('unenabled');
	}
  })  
  $('#messsend.fgtpw').live('click', function() {
    if (!$(this).hasClass('unenabled')) {  
	  HPROG.site.emailForgotMessage($("#frgtpw").attr('value'));
	}
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
  $("#regpfn").live('click', function(){
     $("#photoBr").trigger('click');
     return false;
  })
  $("#photoUp").live('click', function(){
     filelist= $("#upload-form-file");
	 for(var k in filelist[0])
       //HPROG.ajax.uploadImage(filelist[0]);
	   console.log(filelist[0]);
     return false;
  })
  // test -----------------------------------
  $("#photobrws").live('change', function() {
    var file = this.files[0]; //we can retrive the file array.
	console.log('just got file name ' + JSON.stringify(file));
    // alert(file.type); if you want to check image type, uncomment this line. 
    // alert(file.size); if you want to check the image size, uncomment this line.   
    $("#regpfn").attr('value',file.name);
    var reader = new FileReader();

    // file.target.result holds the DataURL which
    // can be used as a source of the image:  

    //imgpreview is the id of the img tag where you want to display the image  
    reader.onload = function(file){
        $('#baseimg').attr('src',  file.target.result);
    };

    // Reading the file as a DataURL. When finished,
    // this will trigger the onload function above:  
    reader.readAsDataURL(file); 
  })
  //------------------------------------------
  $("#plogregDone").click(function(){
     HPROG.site.displayLogBox(false);
     return false;
  })
  $(".cover").live({
      mouseenter : function(){
	    $(this).find(".idplate").addClass("slide").find(".ptxt").css("visibility","visible");
      }, 
	  mouseleave : function() {
      $(this).find(".idplate").removeClass("slide").find(".ptxt").css("visibility","hidden");
      }
  })
  
  $("#tigb").live('click', function(){
     /*
     if (!$('#rhmenuback').hasClass('lslide')) {
	   $('#rhmenuback').addClass('lslide');
	   $('#touchMenuBar').addClass('lslide');
	 } else {
	   $('#rhmenuback').removeClass('lslide');
	   $('#touchMenuBar').removeClass('lslide');
	 }
	 */
	 if ($('#rhmenuback').hasClass('closed')) {       
        $('#rhmenuback').animate({left:"0"},"slow");
		$('#touchMenuBar').animate({left:"205px"},"slow");
        $('#rhmenuback').removeClass("closed");        
      } else {
        $('#rhmenuback').animate({left:"-200px"},"slow");
		$('#touchMenuBar').animate({left:"5px"},"slow");
        $('#rhmenuback').addClass("closed");
      }
     return false;
  });
  
  $('.edit').live('click', function() {	  
    $(this).closest("div").find('.pfield')
	  .removeClass('clickable')
	  .attr('disabled',false)
	  //.attr('placeholder','')
	  .attr('value',$(this).attr('data'));
	$('.bio').find('.edit').css('display','none');
    $(this).closest("div").find('.editing').css('display','inline-block');
	
  })

  $('.editing').live('click', function() {
    if ($(this).hasClass('save')) {  
      $(this).closest("div").find('.pfield').each(function() {
	    console.log( "The new value: " + $(this).attr("value") + 
		             " property: " + $(this).attr('data') );
	    HPROG.site.profileUpdate($(this).attr('data'),($(this).attr("value").replace(/"/g, '')));
		HPROG.site.refreshProfile();
      });	  
	} 	  
    $(this).closest("div").find('.pfield').attr('disabled', true).attr('value','');
	$(this).closest("div").find('.editing').css('display','none');
	$(".bio").find('.edit').css('display','inline-block');
	if ($(this).closest("div").hasClass('mylnk')) {
	  $(this).closest("div").find('.pfield').addClass('clickable');
	}
  })
  
  $(".smLogos.smedia").live('click', function() {
    if ($(this).attr('data')) {
	  //console.log($(this).attr('data'));
	  window.open($(this).attr('data'));
	  //console.log($(this).attr('member'));
      //HPROG.ajax.prepQuery($(this).attr('member'));	  
    }
  });

    $("#gitlnk").live('click', function() {
    if ($(this).attr('data')) {
	  //console.log($(this).attr('data'));
	  window.open($(this).attr('data'));
	  //console.log($(this).attr('member'));
      //HPROG.ajax.prepQuery($(this).attr('member'));	  
    }
  });
  
  $("#mlnwrap").live('click', function() {
    console.log("Clicked the member's link: " + $('#mlntxt').attr('data'));
    if ($('#mlntxt').attr('data') && $('#mlntxt').hasClass('clickable')) {
	  console.log("Clicked the member's link: " + $('#mlntxt').attr('data'));
	  window.open($('#mlntxt').attr('data'));
	  //console.log($(this).attr('member'));
      //HPROG.ajax.prepQuery($(this).attr('member'));	  
    }
  });
   $("#pwreset").live('click', function() {
    HPROG.site.displayInputDialog("Your Email Address:", true);
  });
  $("#mtrig").live('click', function() {
    HPROG.site.displayMessage("SendMessage", true);
	console.log("To: " + $(this).attr('data'));
	$("#message").attr('data',$(this).attr('data'));
  });
  
  $("#messcan.msg").live('click', function() {
    $('#mtxt').css('top','10px');
	$('#gitlnk').remove();
    HPROG.site.displayMessage("Forget Message", false);
	
  });
  $("#messcan.fgtpw").live('click', function() {
    HPROG.site.displayMessage("Forget Message", false);
	HPROG.site.resetInputDialog();
  });  
  $("#messsend.msg").live('click', function() {
    HPROG.site.sendEMessage($('#message').attr('data'));
  });
  
  $(".idplate").live('click', function() {
    /*if ($(this).attr('data')) {
	  //console.log($(this).attr('data'));
	  window.open($(this).attr('data'));
	  console.log($(this).attr('member'));
      //HPROG.ajax.prepQuery($(this).attr('member'));	  
    }*/
	//angular.element('#bodycontainer').scope().setCurrentMember($(this).attr('member'));
	if (! $('#skillbar').hasClass('closed')) {
	  $("#sklhead").trigger('click'); 
    }
	var mem = JSON.parse($(this).attr('member'));
	console.log("member id = " + mem._id);	
    HPROG.site.togglePage($("#pPage"), $("#mPage"), true, ckCurUserIsCurMem(mem._id));   	
  })
  $("#about").click(function(){
     $("#pVersion").html(navigator.appVersion);
     HPROG.site.displayCompatBlock(true);
     return false;
  })
  $('#sklhead').click(function() {
    el = jQuery('#skillbar')
	var height = HPROG.site.getDynHeight(el);
	console.log("Height = " + height);

	if ($(el).hasClass('closed')) { 
	  $(el).removeClass("closed");
      $('#skills').find('.skilltag').css('visibility','visible');
      $(el).animate({height:height},"slow");		
    } else {
      $(el).animate({height:"25px"},"slow", function() {
    // Animation complete.
	    $(el).addClass("closed");
        $('#skills').find('.skilltag').css('visibility','hidden');
      });	     		
	}
    var n = ( $('#skillbar').find('.active').length );
	if (n < 1) {
	     $("#sk0").trigger('click');
	}
  })
  $(".skilltag").live('click', function(){
     // TODO this click should go away and the tags highlight state
	 // should be kept insync by using the current select skill list
	 // see rcsDMods.js
	 console.log("pushed button with id = " + $(this).attr('id'));
	 if ($(this).attr('id') == 'sk0') {
	   console.log("pushed the all button");
       $('#skillbar').find('.active').removeClass('active'); 	 
       $(this).addClass('active');	
     } else if (! $(this).hasClass('active')) {
	   $(this).addClass('active');
       $('#sk0').removeClass('active');		   
	 } else {
	   $(this).css("backgroud",'#009ccc');
	   if (!$(this).hasClass('profile')) {
	     $(this).removeClass('active');
	   }
	   var n = ( $('#skillbar').find('.active').length );
	   if (n < 1) {
	     $("#sk0").trigger('click');
	   }
	 } 
     return false;
  })
  $("#pCompDone").click(function(){
     HPROG.site.displayCompatBlock(false);
     return false;
  })
  $(".mlcentered a:link").click(function(e){
     e.stopPropagation();
     return true;
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
	  HPROG.site.resetEditing();
	  HPROG.site.togglePage($("#mPage"), $("#pPage"));
	  window.history.pushState('forward', null, './index.html');
    });
  }
}) 
/*
function drawImage(imageObj) {
        var canvas = document.getElementById('myCanvas');
        var context = canvas.getContext('2d');
        var imageX = 69;
        var imageY = 50;
        var imageWidth = imageObj.width;
        var imageHeight = imageObj.height;

        context.drawImage(imageObj, imageX, imageY);

        var imageData = context.getImageData(imageX, imageY, imageWidth, imageHeight);
        var data = imageData.data;

        // iterate over all pixels
        for(var i = 0, n = data.length; i < n; i += 4) {
          var red = data[i];
          var green = data[i + 1];
          var blue = data[i + 2];
          var alpha = data[i + 3];
        }

        // pick out pixel data from x, y coordinate
        var x = 20;
        var y = 20;
        var red = data[((imageWidth * y) + x) * 4];
        var green = data[((imageWidth * y) + x) * 4 + 1];
        var blue = data[((imageWidth * y) + x) * 4 + 2];
        var alpha = data[((imageWidth * y) + x) * 4 + 3];
        
        // iterate over all pixels based on x and y coordinates
        for(var y = 0; y < imageHeight; y++) {
          // loop through each column
          for(var x = 0; x < imageWidth; x++) {
            var red = data[((imageWidth * y) + x) * 4];
            var green = data[((imageWidth * y) + x) * 4 + 1];
            var blue = data[((imageWidth * y) + x) * 4 + 2];
            var alpha = data[((imageWidth * y) + x) * 4 + 3];
          }
        }
      }
      var imageObj = new Image();
      imageObj.onload = function() {
        drawImage(this);
      };
      imageObj.src = 'http://www.html5canvastutorials.com/demos/assets/darth-vader.jpg';
*/

function sizeProPage(est) {
  if ($(window).width() < 796) {
    $("#mname").css('top','');
    $("#tag").css('top','');
    $("#psbar").css('top','');
    $("#rhbar").css('top','');
    $("#smbar").css('top','');
    $("#wlink").css('top','');    
	return false;
  }
  var elh = parseInt($("#proPct").css("height"), 10);
  if (est) {
    elh = est;
  }  
  $("#proBio").css('height',elh+'px');
  $("#mname").css('top',-(elh*.05)+'px');
  $("#tag").css('top',(elh*.12)+'px');
  $("#psbar").css('top',(elh*.25)+'px');
  $("#rhbar").css('top',(elh*.42)+'px');
  $("#smbar").css('top',(elh*.65)+'px');
  $("#wlink").css('top',(elh*.9)+'px');
}

function initializeMap() {
  var mapOptions = {
    center: new google.maps.LatLng(34.7300, -86.5850),
    zoom: 11,
    //mapTypeId: google.maps.MapTypeId.ROADMAP
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };
  //map = new google.maps.Map(document.getElementById("map-canvas"),
  //  mapOptions);
    
  //var pointarray = new google.maps.MVCArray(eData);

  //heatmap = new google.maps.visualization.HeatmapLayer({
  //  data: pointarray
  //});

  //heatmap.setMap(map);
} 

function testorMessage() {
  $("#mtxt").css('top','10px');
  $("<div id='gitlnk' class='clickable' data='http://github.com/RocketHatch/hatchersWeb'>github.com/RocketHatch/hatchersWeb</div>").appendTo( $("#messTxt") );
  return "This application is in development. Joining as an alpha testor is by innvitation. " +
               "If you are interested in joining the testing and/or development team check our Github " +
               "page at:" 			   
}

//function linkIn(event) { HPROG.site.displayLink(event.target, 'true'); };
//function linkOut(event) { HPROG.site.displayLink(event.target, 'false'); };



 

 