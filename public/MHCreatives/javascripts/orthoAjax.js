ORTHO.ajax = {
  taIndex : -1,
  taEle : null,
  httpReq : null,
  url : '/',
  curContent : ""
};

ORTHO.ajax.initReqObj = function() {
  if (window.XMLHttpRequest) {
    ORTHO.ajax.httpReq = new XMLHttpRequest();
  } else {
    ORTHO.displayMessage("This site only supports Firefox and Chrome browsers", true);
  }
};

ORTHO.ajax.prepQuery = function(data, column) {
  //might need this intermediate step, not sure yet
   //console.log("data: " + data.col + ": " + data.val + "  Column:" + column);
   ORTHO.ajax.getQuery(data, column) ;  
};

ORTHO.ajax.getQuery = function(data, column) {
  var dataS = JSON.stringify(data);
  //console.log( "The data sent: " + dataS);
  $.ajax({
    type: 'POST',
    url: '/dbCall',
    data: dataS,
    xhrField: { withCredentials: true },
    success: function(validationResp) {
      //console.log("data received: " + validationResp.length + " at column: " + column);
      if (validationResp.message || (validationResp[0])[column]) {       
        ORTHO.ajax.parseData(validationResp, column, true);
      } else if ((validationResp[0])[column] == null && column != 'done') {  
        ORTHO.navigation.check(column, null);
      }else if ((validationResp[0])['ICD 10'] != null) {
        ORTHO.ajax.parseCode(validationResp);
      } else {
        //console.log("data in " + column + "is null: " + validationResp.length);
        ORTHO.navigation.check(column, null);
      }
    }
  });
};

ORTHO.ajax.parseData = function(jObj, valKey, isPost) {
  if (isPost && valKey) {
    if (jObj && jObj.message) {
	  ORTHO.site.displayMessage(jObj.message);
	  return;
	}
    if (jObj[0] && (jObj[0])['7th']) {
      ORTHO.ajax.parseCode(jObj);
      return;
    }    
    var i=0;
    //var sort;
    var sortLists = {
    A1: [],
    A2: [],
    T1: [],
    T2: [],
    DND: [],
    FB: [],
    '7th': []
    };
    
   $('#choiceArea').empty();
    var tmpList = [];
    var obj;
    $.each(jObj, function(key, val) {
      $.each(val, function(key, dbval) {
        //console.log("data received: key:" + key + " val: " + val[key]);
        if (tmpList.indexOf(val[valKey]) < 0) {
          obj = {cval:val[valKey],sort:val['SortOrder']};
          tmpList.push(val[valKey]);
          sortLists[valKey].push(obj); 
        }
      });
    });
    for (var i = 0; i < (sortLists[valKey]).length; i++) {
      $('#choiceArea').append('<div id="result'+(i)+'" data="'+valKey+'" class="option '+(sortLists[valKey])[i].sort+'">'+ (sortLists[valKey])[i].cval + '</div>'); 
   }      
 
  } else {
    //$.each(jObj, function(key, val) {
    //  console.log("data received: key:" + key + " val: " + val);
    //});
    if (typeof jObj.sid == 'object') {
      ORTHO.setSession(jObj);
    } else {
      //console.log("Logout message");
      ORTHO.setSession(null);
    }
  }
};

ORTHO.ajax.parseCode = function(jObj) {
  var i=0;
  $('#choiceArea').empty();
  if (jObj.length == 1) {
    ORTHO.site.displayCodeObj(jObj);
  } else if (jObj.length > 1) {
    $.each(jObj, function(key, val) {   
      //console.log("data received: Code: " + val['7th'] + " Long Text: " + val['7thLongText']  + " ICD Code: " + val['ICD 10']  )  ;
      $('#choiceArea').append('<div id="result'+(i++)+'"data="'+val['ICD 10']+ '|' + val['Long Descriptor'] + '" class="option final">'+ val['7th'] + ' ' +  val['7thLongText'] + '</div>');  
    });
  }    
};

ORTHO.ajax.prepMessageData = function() {
};