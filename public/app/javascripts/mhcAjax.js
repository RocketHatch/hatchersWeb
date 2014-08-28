HPROG.ajax = {
  taIndex : -1,
  taEle : null,
  httpReq : null,
  url : '/',
  curContent : ""
};

HPROG.ajax.initReqObj = function() {
  if (window.XMLHttpRequest) {
    HPROG.ajax.httpReq = new XMLHttpRequest();
  } else {
    HPROG.displayMessage("This site only supports Firefox and Chrome browsers", true);
  }
};

HPROG.ajax.prepQuery = function(memberData) {
  //might need this intermediate step, not sure yet
   console.log("member data: " + memberData);
   HPROG.ajax.insertMemeber(memberData) ;  
};

HPROG.ajax.insertMemeber = function(data) {
  var dataS = JSON.stringify(data);
  console.log( "The data to send: " + dataS);
   
  $.ajax({
    type: 'POST',
    url: '/register',
    data: dataS,
    xhrField: { withCredentials: true },
    success: function(validationResp) {
      console.log("data received: " + validationResp.message);
	  if (validationResp.nid) {
	    console.log('OK, now the new member is added, and an email sent... ' +
		            'time to up load image, with the name of the "nid" (new id)');
	  }
      if (validationResp.message) {       
        HPROG.site.displayMessage(validationResp.message, true);;
      }     
    }
  });
};

HPROG.ajax.updateMemeber = function(data) {
  var dataS = JSON.stringify(data);
  var changed = false;
  console.log( "The data sent: " + dataS);
  $.ajax({
    type: 'POST',
    url: '/updateDB',
    data: dataS,
    xhrField: { withCredentials: true },
    success: function(validationResp) {
      //console.log("data received: " + validationResp.length + " at column: " + column);
      if (validationResp.message) {       
        HPROG.site.displayMessage(validationResp.message, true);
      }
      changed = true;	  
    }
  });
  return true;
};

HPROG.ajax.sendEmailMessage = function(data) {
  var dataS = JSON.stringify({usermess:data});
  var ret;
  console.log( "The data sent: " + dataS);
  $.ajax({
    type: 'POST',
    url: '/send',
    data: dataS,
    xhrField: { withCredentials: true },
    success: function(validationResp) {
      console.log("data received: " + validationResp['message']);  
	  //HPROG.site.clearEMessage();
	  HPROG.site.resetInputDialog();
	  if (validationResp.message) {
	    console.log("data received 2: " + validationResp['message']);
	    HPROG.site.displayMessage(validationResp.message, true);
	  }	  
    },
	error: function(validationResp) {
      console.log("error received: " + validationResp['message']);
	  HPROG.site.displayMessage("Message Not Sent", false);
      HPROG.site.clearEMessage();	  
      if (validationResp.message) {       
        HPROG.ajax.parseData(validationResp);
	  }     
    }
  });
};

HPROG.ajax.uploadImage = function(form) {
  //------------------------------------------
  //------------------------------------------
  console.log( "The data sent: " + form.files[0].size);
  console.log( "The data sent: " + form.files[0].name);
  //var fd = new FormData(form[0]);
  var fd = new FormData();    
  fd.append( 'file', form.files[0]);
  $.ajax({
    //beforeSend: function (xhr) {
        //xhr.setRequestHeader("Cache-Control", "no-cache");
        //xhr.setRequestHeader("X-File-Name", form[0].files[0].name);
    //    xhr.setRequestHeader("content-length", form[0].files[0].size);
    //    xhr.setRequestHeader("content-type", "multipart/form-data");
    //},  
    url: '/upimage',
    data: fd,
    contentType: false,
    processData: false,
    type: 'POST',
	//contentType: "multipart/form-data",
	//contentLength: form[0].files[0].size,
    //headers: {
    //           "X-File-Name" : form[0].files[0].name,
    //           "X-File-Size" : form[0].files[0].size
    //          },
    success: function(validationResp) {
      console.log('Image uploaded - ' + validationResp);
    },
	error: function(XMLHttpRequest, textStatus, errorThrown) {
      alert( "ERROR: " + textStatus + " : " + errorThrown );
      //alert( textStatus );
      //alert( errorThrown );
    }
  });
  return false;
};


HPROG.ajax.parseData = function(jObj) {
  console.log("will parse data" + jObj); 
  Object.keys(jObj).forEach(function (key) {
    console.log("Key: " + key + " Value: " + jObj[key]);
  });
  if (Object.keys(jObj)[0] == 'skills') {
    RCSData.skills = jObj['skills'];
  } else if (jObj['members']) {
    RCSData.cMembers = jObj['members'];
  }	
};
    
HPROG.ajax.prepMessageData = function() {
};

/*
HPROG.ajax.mdbget = function(collection) {
  //console.log( "Doing JSON get logout");
  var data = {collect:collection};
  $.getJSON("/get",data,HPROG.ajax.wrap); 
};

HPROG.ajax.wrap = function(data) {
  console.log("Is skills: " + (data['collect'] == "skills") + " : " + data['collect']);
  HPROG.ajax.parseData(data);
};
*/