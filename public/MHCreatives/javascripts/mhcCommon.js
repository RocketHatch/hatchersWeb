var TIMEOUTMINUTES = 15;
var WARNINGMINUTES = 2;
var MHC = {  
  totimer: TIMEOUTMINUTES*60*1000,
  warningtime: WARNINGMINUTES*60*1000,
  
  currentView: {
    faces: true
  },
    
  session: {
    sessionId: null,
    memeber: null,  
    userRole: "",
	sessionTimeOut: null,
	warningTimeOut: null
  },
  //inSeach: false,   
  //resetSearch: function(data) {
    //
  //},

  setSession: function(data) {
    if (data != null) {
      MHC.session.sessionId = data.sid;
      MHC.session.member = data.member;
      MHC.session.userRole = data.role;
	  MHC.session.sessionTimeOut = data.sessionTimeOut;
    } else {
      MHC.session.sessionId = null;
      MHC.session.member = null;
      MHC.session.userRole = "";
	  MHC.session.sessionTimeOut = null;
    }
  },
    
  schedule: {
    start: function(handle, message, timeout, callback) {
	  console.log(message + " : " + timeout);
	  handle = setTimeout(callback, timeout);
	  return handle;
	},
    reset: function(handle, message, timeout, callback) {
	  console.log(message + " : " + timeout);
      clearTimeout(handle);
      return setTimeout(callback, timeout);	  
    },
	clear: function(handle, message) {
	  console.log(message);
      clearTimeout(handle);
      return false;	  
    }
  },
  
  createCookie: function(name,value,days) {
    if (days) {
      var date = new Date();
      date.setTime(date.getTime()+(days*24*60*60*1000));
      var expires = "; expires="+date.toGMTString();
    }
    else var expires = "";
    document.cookie = name+"="+value+expires+"; path=/";
  },

  readCookie: function(name) {
    var nameEQ = name+"=";
    var ca = document.cookie.split(';');
    for (var i=0;i<ca.length;i++) {
      console.log("result?: " + ca[i]);
    }
    return ca[1].substring(ca[1].indexOf('='));
  }
};
