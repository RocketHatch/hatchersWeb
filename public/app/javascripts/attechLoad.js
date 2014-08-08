function hotIn(event) { HPROG.site.displayHot(event.target, 'true'); };
function hotOut(event) { HPROG.site.displayHot(event.target, 'false'); };

$(document).ready(function(){
  // read text entries from xml file
  $.get('/resources/tex.xml', function(data) {
    $(data).find('entry').each(function() {
      var $entry = $(this);
      var $addhtm = '';
      $entry.find('para').each(function() {
        $addhtm += '<p>'+$(this).text()+'<p>';
      });        
      $('#'+$entry.attr('placeid')).html($addhtm);     
    })
  })
  $(".mlcentered").click(function(){ 
      //alert("div got click");  
      if (! $(this).hasClass('inTrig')) {
        $(".active").toggle('explode').toggleClass("active");
        $(this).removeClass('inTrig');
      }
      $(".mlcentered").removeClass("inTrig");
      $(this).addClass("inTrig");
      $(".paneltxt").css("display","none"); 
      $(this).children(".paneltxt").css("display","block");  
      $(this).children(".panel").slideToggle('down').toggleClass("active"); 
      $(".active").children(".paneltxt").css("display","block");       
      return false;
  })
  $("#rslidetrig").click(function(){
      var closing = false;
      if ($(this).hasClass('closed')) {       
        $('.lpanel.right').animate({width:"750px"},"slow");
        $(this).removeClass("closed");        
      } else {
        closing = true;
        $('.lpanel.right').animate({width:"0"},"slow");
        $(this).addClass("closed");
      }
      //$("#linksPanel").toggle('slow').toggleClass("active").css("display","block");
      HPROG.site.displayLinkPanel($('#openm2'),$('#closem2'),closing);      
      return false;
  })
  $("#lslidetrig").click(function(){
      var closing = false;
      if ($(this).hasClass('closed')) {       
        $('.lpanel.left').animate({left:"0"},"slow");
        $(this).removeClass("closed");        
      } else {
        closing = true;
        $('.lpanel.left').animate({left:"-280px"},"slow");
        $(this).addClass("closed");
      }
      //$("#linksPanel").toggle('slow').toggleClass("active").css("display","block");
      HPROG.site.displayLinkPanel($('#openm1'),$('#closem1'),closing);      
      return false;
  })  
  $("#contact").click(function(){
     HPROG.site.displayContactBlock(true);
     return false;
  }) 
  $("#pDone").click(function(){
     HPROG.site.displayContactBlock(false);
     return false;
  })
  $("#login").click(function(){
     HPROG.site.displayLogBox(true);
     return false;
  })
   $("#register").click(function(){
     HPROG.site.displayRegBox(true);
     return false;
  })
  $("#plogregDone").click(function(){
     HPROG.site.displayLogBox(false);
     return false;
  })  
  $("#about").click(function(){
     $("#pVersion").html(navigator.appVersion);
     HPROG.site.displayCompatBlock(true);
     return false;
  })
  $("#pCompDone").click(function(){
     HPROG.site.displayCompatBlock(false);
     return false;
  })
  $("#Button1").click(function() {
    var id = $("#TextBox1").val();
    var id2 = $.sha256('glm2424');
    console.log( "string " + id2);
    $("#TextBox1").val(id2);
    HPROG.site.callWebServ('glm',id2);
  })
  $(".mlcentered a:link").click(function(e){
     e.stopPropagation();
     return true;
  })  
});

$(function() {
  if (HPROG.isIE == true) {
    $("#pVersion").html(navigator.appVersion);
    $("#pWarn").css('visibility','visible');
    HPROG.site.displayCompatBlock(true);
  }
});


//$(function() {  
//  $(".mitem").hover(hotIn,hotOut);  
//});  