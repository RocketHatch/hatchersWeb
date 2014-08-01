HPROG = {};
HPROG.newreg = {};

$(document).ready(function(){

  $("#nconfirm").click(function(){ 
    HPROG.newreg.updateExDate($(this).attr('data'));
    return false;
  });

  $("#nBx").click(function(){ 
    window.location = "http://localhost:11329/MHCreatives/index.html"; // TODO need to adjust for run time link
  });
});

HPROG.newreg.updateExDate = function(mid, extendFor) {
  if (!extendFor) {        // default extention period is one year, but we may extend for n months in future
    extendFor = "1 Yr";    // an example of extending for 6 Months might look like "6 Mon"
  }
  console.log("extendFor: " + extendFor);
  var theDate = new Date();
  console.log("new Date: " + theDate);
  var units = extendFor.split(" ");
  console.log("units: " + units + " " + units[1] + " " + units[0]);
  if (units[1] === "Yr") {
    theDate.setFullYear(theDate.getFullYear() + parseInt(units[0]));
  } else {
    theDate.setMonth(theDate.getMonth() + parseInt(units[0]));
  }
  console.log("ex Date: " + theDate);  
  var data = {mid:mid,prop:'dateExpire',nuval:theDate};
  HPROG.ajax.updateMemeber(data); 
};