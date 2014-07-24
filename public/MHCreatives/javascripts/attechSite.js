//<img id="hot" src="/images/hot.png" class="hot" onmouseover="HPROG.site.displayHot('true')" onmouseout="HPROG.site.displayHot('false')"></img>
HPROG.site = {};  

HPROG.site.toggleModal = function (display) {
  if (display) {
    $('#glass').css("visibility","visible");
  } else {
    $('#glass').css("visibility","hidden");
  }
  return false;
};

HPROG.site.displayContactBlock = function (display) {
  HPROG.site.toggleModal(display);
  if (display) {
    $('#contactBlk').css("visibility","visible");
  } else {
    $('#contactBlk').css("visibility","hidden");
  }
  return false;
};

HPROG.site.displayCompatBlock = function (display) {
  HPROG.site.toggleModal(display);
  if (display) {
    $('#compBlk').css("visibility","visible");
  } else {
    $('#compBlk').css("visibility","hidden");
  }
  return false;
};

HPROG.site.displayLogRegBox = function (display) {
  HPROG.site.toggleModal(display);
  if (display) {
    $('#logregArea').css("visibility","visible");
    $('#logBx').css("visibility","hidden");
    $('#regBx').css("visibility","hidden");
  } else {
    $('#logBx').css("visibility","hidden");
    $('#regBx').css("visibility","hidden");
    $('#logregArea').css("visibility","hidden");
  }
  return false;
};

HPROG.site.displayLogBox = function (display) {
  HPROG.site.toggleModal(display);
  HPROG.site.displayLogRegBox(display);
  if (display) {
    $('.reg').addClass("log").removeClass("reg");
    $('#logregTitle').html('Login');
    $('.logregButton').val("login");
    $('#logBx').css("visibility","visible");
  } else {
      
  }
  return false;
};

HPROG.site.displayRegBox = function (display) {
  HPROG.site.toggleModal(display);
  HPROG.site.displayLogRegBox(display);
  if (display) {  
    $('.log').addClass("reg").removeClass("log");
    $('#logregTitle').html('Register');
    $('.logregButton').val("submit");
    $('#regBx').css("visibility","visible");
  }
  return false;
};

HPROG.site.displayLinkPanel = function(ido, idc, open) {
  if (!open) {
    $(ido).css("display","none");
    $(idc).css("display","block");
  } else {
    $(idc).css("display","none");
    $(ido).css("display","block");
  }
}

HPROG.site.displayHot = function(ele, show) {
  if (show == "true") {
    $(ele).css("opacity","1");
  } else {
    $(ele).css("opacity",".4");
  }
  return false;
};

HPROG.site.callWebServ = function(var1, var2) {
  console.log( "Doing JSON get");
  //var pw = $.sha256('glm2424');
  $.getJSON("/attechWS/WebServ",{action:"1",uname:var1,pword:var2},
      HPROG.site.parseData)
};

HPROG.site.parseData = function(user) {
  $.each(user, function(key, val) {
    console.log( "user: " + val.fname + " : " + val.lname + " : " + val.city + " : " + val.country);
  });
}

HPROG.site.displayMessage = function (message)  {
  alert(message);
};