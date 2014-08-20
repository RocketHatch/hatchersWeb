HPROG.site = {};  

HPROG.site.toggleModal = function (display) {
  show = ($('#logregarea').css("display")==='block'||$('#messageArea').css("visibility")==='visible')
  if (show) {
    $('#glass').css("visibility","visible");
  } else {
    $('#glass').css("visibility","hidden");
  }
  return false;
};

HPROG.site.togglePage = function (pgOn, pgOff, proPage, userIsCurrentMember) {
  var ww = $(window).width();
  var cpc = proPage ? 'profile' : 'main';
  $(pgOn).css("display","block").toggleClass('open'); 
  $(pgOff).css("display","none").toggleClass('open');
  $('#pageFooter').removeClass().addClass(cpc);
  if (userIsCurrentMember && proPage) {
    $(pgOn).addClass('editable');
	$('.edit').css('display','inline-block');
	if (RCSData.getCurrentMember()) {
	  console.log("Have current member: " + JSON.stringify(RCSData.getCurrentMember()));
	}
  } else {
    $(pgOn).removeClass('editable');
	$('.edit').css('display','none');
  }
  var est = (ww*.3) + 7;
  sizeProPage(est);
};

HPROG.site.getDynHeight = function (el) { 
  var elem = el.clone().css({"height":"auto","visibility":"hidden"}).appendTo("body");
  var height = elem.css("height");
  elem.remove();
  return height;
};

//HPROG.site.toggleModal = function (display) {
//  HPROG.site.visible(display, '#glass');
//};

HPROG.site.displayMessageBlock = function (display) {
  HPROG.site.visible(display, '#messageArea');
  if (display) {
    $('#messageArea').css("z-index","110").css('visiblity','visible').css('display','block');    
  } else {
    $('#messageArea').css("z-index","0").css('visiblity','hidden').css('display','none');
     
  }  
};

HPROG.site.displayMessage = function (message, show)  {
  if (typeof show =='undefined') show = true;
  console.log("in the display message function: " + message);
  //if (show || (!show && !$('logregarea').css('display') === 'none')) {
  //  HPROG.site.toggleModal(show);
  //}
  $('#msgBx').css('display','table');
  $('#inpBx').css('display','none');
  HPROG.site.displayMessageBlock(show);
  $('#mtxt').html(message);
  HPROG.site.toggleModal(show);
};

HPROG.site.visible = function(display, elementId) {
  if (display) {
    $(elementId).css("visibility","visible");
  } else {
    $(elementId).css("visibility","hidden");
  }
  return false;
};
 
HPROG.site.sendEMessage = function(recip) {
  console.log("Recipient: " + recip);
  var smess = new sendMessage(recip,{fname:$('#mfname').attr('value'),lname:$('#mlname').attr('value')},
                              $('#mphone').attr('value'),$('#memail').attr('value'),$('#sendtxt').attr('value'));
  console.log("Message obj: " + smess + " : " + smess.name.fname + " : " + smess.txt);
  HPROG.ajax.sendEmailMessage(smess);  
}; 

HPROG.site.emailForgotMessage = function (emailAddr)  {
  console.log("Change Password for user " + emailAddr);
  var smess = new sendMessage(emailAddr,null,null,null,"Reset Data");
  console.log("Message obj: " + smess + " : " + smess.resip + " : " + smess.txt);
  HPROG.ajax.sendEmailMessage(smess);  
}

HPROG.site.clearEMessage = function() {
  $('.minput').attr('value','');
};

// -- Not used function as yet, to be reused or cleaned out -- /
HPROG.site.displayContactBlock = function (display) {
  if (display) {
    $('#contactBlk').css("visibility","visible");
  } else {
    $('#contactBlk').css("visibility","hidden");
  }
  HPROG.site.toggleModal(display);
  return false;
};

HPROG.site.displayCompatBlock = function (display) { 
  if (display) {
    $('#compBlk').css("visibility","visible");
  } else {
    $('#compBlk').css("visibility","hidden");
  }
  HPROG.site.toggleModal(display);
  return false;
};

HPROG.site.displayLogBox = function (display) {
  if (display) {
    $("#logregarea").css('display','block');
	$("#log").css('display','block');
	$("#reg").css('display','none');
	$("#nmSkills").css('display','none');
	$("#logreghead").html('login');
	$("#logregsend").html('submit');
	//$(".mJoin").css('visibility','visible');
    $('.mJoin').css('display','block');	
  } else {
    $("#logregarea").css('display','none').removeClass('login');
    $("#picarea").css('display','none');	
  }
  HPROG.site.toggleModal(display);
  return false;
};

HPROG.site.displayRegBox = function (display) {
  if (display) {  
	$("#log").css('display','none');
	$("#reg").css('display','block');
	$("#nmSkills").css('display','block');
	$("#logreghead").html('register');
    $("#picarea").css('display','inline-block');
    $('.mJoin').css('display','none');	
  }
  HPROG.site.toggleModal(display);  
  return false;
};

HPROG.site.displayInputDialog = function (message, show)  {
  if (typeof show =='undefined') show = true;
  console.log(message);
  $("#logregarea").css('display','none');
  $('#msgBx').css('display','none');
  $('#messageArea').addClass('fpw');
  $("#msghead").html('reset password');
  $(".mDone").removeClass('msg').addClass('fgtpw');
  $("#messsend").html('submit');
  $("#messcan").html('cancel');
  $('#inpBx').css('display','table');
  HPROG.site.displayMessageBlock(show);
  $('#frgtpw').attr('placeholder',message);
  HPROG.site.toggleModal(show);
};

HPROG.site.resetInputDialog = function ()  {
  $("#messageArea").css('display','none');
  $('#msgBx').css('display','none');
  $('#messageArea').removeClass('fpw');
  $("#msghead").html('message');
  $("#messcan").html('ok').addClass('msg').removeClass('fgtpw');
  $(".mDone").removeClass('fgtpw').addClass('msg');
  HPROG.site.toggleModal(false);
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

HPROG.site.displayLink = function(ele, show) {
  if (show == "true") {
    $(ele).css("cursor","pointer");
    alert("in");
  } else {
    $(ele).css("cursor","default");
    alert("out");
  }
  return false;
};

HPROG.site.profileUpdate = function(property, nuval) {
  var member = RCSData.getCurrentMember();
  if (!nuval) {
    return;
  }
  console.log("data: " + property + " : " + nuval); 
  if (member) {
    console.log("This is current member: " + JSON.stringify(RCSData.getCurrentMember()));
	if (property.substr(0,4) === "http") {
	  property = 'url';
	}
	var curVal = property.substr(0,4) === "name" ? (member['name'])[property] : member[property];
	console.log("curVal: " + curVal + " - nuval: " + nuval);
	if ( curVal && curVal.toLowerCase() === nuval.toLowerCase()) {
	  console.log("No change to property " + property);
    } else {
      console.log("Field changed doing update -> " );
      if (property.substr(0,4) === "name") {
        member.name[property.substr(5)] = nuval;
      } else {	  
	    member[property] = nuval; //TODO move this to after confirmation of db update
	  }
	  var data = {sid:MHC.session.sessionId,prop:property,nuval:nuval};
      HPROG.ajax.updateMemeber(data); 
    }
  }	
};

HPROG.site.resetEditing = function() {
  // TODO do a test if there is an open edited field; show popup warning with buttons to save or cancel
  $("#pPage").find('.editing').css('display','none').closest("div")
      .find('.pfield').attr('disabled', true).attr('value','');
  $("#pPage").find('.edit').css('display','none');  
  $("#pPage").find('.mylnk').find('.pfield').addClass('clickable');
}

HPROG.site.refreshProfile = function() {
  var member = RCSData.getCurrentMember();
  $("#mfname").attr("placeholder",member.name.fname.toLowerCase());
  $("#mlname").attr("placeholder",member.name.lname.toLowerCase());
  $("#tagfld").attr("placeholder",member.tagline.toLowerCase());
  $("#mlntxt").attr("placeholder",member.url.toLowerCase());
  $("#mlntxt").attr("data",member.url.toLowerCase());
}

HPROG.site.doLogin = function(un, pw) {
  //console.log( "Doing JSON get login");
  var data = {uname:un,pword:pw};
  $.getJSON("/login",data,HPROG.site.tidyLogin);
};

HPROG.site.logoutWarning = function() {
  HPROG.site.displayMessage("Due to inactivity you will be logout in two minutes!<p/>Click to stay logged on", true)
  HPROG.session.warningTimeOut = HPROG.schedule.start(HPROG.session.warningTimeOut, '2 minute warning started', HPROG.warningtime, function() {
    $('#logout').trigger('click')
  });
};

HPROG.site.doLogout = function() {
  //console.log( "Doing JSON get logout");
  if (HPROG.session.sessionId != null) {
    //console.log( "sessionId: " + ORTHO.session.sessionId.com1);
    var data = {com1:HPROG.session.sessionId.com1,com2:HPROG.session.sessionId.com2};
    $.getJSON("/logout",data,HPROG.site.tidyLogin); 
  } else {
    //ORTHO.site.displayLogBox(true);	
  }
  //location.reload();
};

HPROG.site.tidyLogin = function(data) {
  HPROG.ajax.parseData(data, null, false);
     if (typeof data.sid == 'object') {
      HPROG.site.logSuccess(data);
      HPROG.site.displayLogBox(false);
      if (data.message != null) {
        HPROG.site.displayMessage(data.message + " You are logged in as: " +
                MHC.session.member.name.fname + " " + MHC.session.member.name.lname, true);
      }
    } else if (data.message) {
       HPROG.site.displayMessage(data.message);
    } else {
	  MHC.setSession(null);
      //location.reload();    
    }
};

HPROG.site.logSuccess = function(data) {
  var sess = {sid: data.sid, member: data.member, role: "", 
              sessionTimeOut: MHC.schedule.start(MHC.session.sessionTimeOut, 'Timer started', MHC.totimer, function() {
                                HPROG.site.logoutWarning();
                              })
		     };
  MHC.setSession(sess);
  $('#tmlp').html(MHC.session.member.name.fname + " " + MHC.session.member.name.lname)
            .removeClass('lgcmd').addClass('profile');
  return false;
}

HPROG.site.addMemberToDB = function(email, fn, ln, skills, tagline, url, data) {
  console.log('ready to add: ');
  var nMember = new Member(email, {fname:fn, lname:ln}, skills, tagline, url, data);
  console.log('the member: ' + JSON.stringify(nMember));
  HPROG.ajax.insertMemeber(nMember);
}

HPROG.site.parseData = function(user) {
  $.each(user, function(key, val) {
    console.log( "user: " + val.fname + " : " + val.lname + " : " + val.city + " : " + val.country);
  });
}

HPROG.site.validateEMail = function(expr) {
  var pattern = /^[-!#$%&\'*+\/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&\'*+\/0-9=?A-Z^_a-z{|}~])*@[a-zA-Z](-?[a-zA-Z0-9])*(\.[a-zA-Z](-?[a-zA-Z0-9])*)+$/
  return pattern.test(expr);
}

HPROG.site.validateLink = function(expr) {
var pattern = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/
  return pattern.test(expr);
}

HPROG.site.validateLogReg = function() {
  var retval = false;
  var lst = [];
  if ($('#logregarea').hasClass('login')) {
    lst = HPROG.site.validateLoginForm();
	//console.log("Login form fields: " + lst);
  } else if ($('#logregarea').hasClass('register')) {
    lst = HPROG.site.validateRegForm();
	//console.log("Register form fields: " + lst);
  }
  return lst.length === 0;
}

HPROG.site.validateLoginForm = function() {
  var listInvalid = [];
  if (!$('#untxt').attr('value') || ! HPROG.site.validateEMail($('#untxt').attr('value'))) {
	listInvalid.push("uid");
  }
  if (!$('#pwtxt').attr('value')) {
    listInvalid.push("password");
  }
  return listInvalid;    
} 

HPROG.site.validateRegForm = function() {
  var listInvalid = [];
  if (!$('#regfn').attr('value') && !($('#regln').attr('value'))) {
	listInvalid.push("name");
  }
  if (! HPROG.site.validateEMail($('#regeml').attr('value'))) {
	listInvalid.push("uid");
  }
  if ($('#regweb').attr('value')) {
    if(! HPROG.site.validateLink($('#regweb').attr('value'))) {
	  listInvalid.push("link");
	}
  }
  if (!$('#regpw').attr('value') || $('#regpw').attr('value') !== $('#cregpw').attr('value')) {
	listInvalid.push("password");
  }
  if (!$('#regcode').attr('value') || $.sha256($('#regcode').attr('value')) !== '58c37f448816d73a87e14bd72d944af9da100e31addd893f512b3d118f32e14a') {
	listInvalid.push("access");
  }
  return listInvalid;  
}
//HPROG.site.displayMessage = function (message)  {
//  alert(message);
//};
/* ---------------- Trash to be cut -----------------------
HPROG.site.callWebServ = function(var1, var2) {
  var data = {val1:"hello", val2:{val3:"world"}};
  var dataS = JSON.stringify(data);   // stringify from object
  $.ajax({
    url:"/",
    type:"POST",
    data:dataS,       //using dataType String
    success:function (res)
    {
      //var json = JSON.parse(res);
      //console.log(json);  //{ val1: 'hello', val2: { val3: 'world' } }  <-- parsed JSON Object looks great!!
      console.log('This is the response ' + res);
      console.log(res.val1);  //good bye
      console.log(res.val2);  //{ val3: 'larry' }
      console.log(res.val2.val3);  //larry
    }
  });
  console.log(dataS);
};

HPROG.site.callWebService = function(var1, var2) {
  var data = {val1:"hello", val2:{val3:"world"}};
  var dataS = JSON.stringify(data);   // stringify from object
  console.log( "Doing JSON get");
  
  $.getJSON("/",dataS,
      HPROG.site.parseData)
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

-------------------------------------------------------------*/