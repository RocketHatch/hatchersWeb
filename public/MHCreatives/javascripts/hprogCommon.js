/*
  * Copyright 2008, 2009, 2010 Mizar, LLC
  * 589 S Beach Road,
  * Point Roberts, Washington, 98281, U.S.A.
  * All Rights Reserved.
  *
  * This file is part of the HPROG Framework
  *
  * The Mizar Framework is free software: you can redistribute it and/or modify
  * it under the terms of the GNU Lesser General Public License as published
  * by the Free Software Foundation, either version 3 of the License, or
  * (at your option) any later version.
  *
  * The Mizar Framework is distributed in the hope that it will be useful,
  * but WITHOUT ANY WARRANTY; without even the implied warranty of
  * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
  * GNU Lesser General Public License for more details.
  *
  * A copy of the GNU Lesser General Public License is available in
  * Mizar Common/src/com/HPROG.  If not, see http://www.gnu.org/licenses/
  *
  * You may NOT remove this copyright notice; it must be retained in any modified 
  * version of the software.
  */
/**
 * @namespace This is the javaScript object that is intended to create the Mizar name space structure for HPROG packages
 *
 *  HPROG namespace is to contain javascript function and maitain varibale protected from and not interfering with other
 * packages
 *
 * The namesapce will be structured:
 *
 * HPROG.site
 * HPROG.ajax
 */
var HPROG = {
  isIE : (navigator.appVersion.indexOf("MSIE") !=  - 1), //
  OTHER : 0, MSIE : 1, FIREFOX : 2, CHROME : 3, SAFARI : 4, //
  
  /*
   * This method does not appear to have been used in some time.  
   * It does NOT replace af:showPopupBehavior rather it appears to be a method to launch a standalong dialog
   * wrapped in an <f:view> tag, which might very well be useful.
   */
  popUp : function (event) {
    var url = event.getSource().getProperty('url');
    var width = event.getSource().getProperty('width');
    if (!width) {
      width = 400;
    }
    var height = event.getSource().getProperty('height');
    if (!height) {
      height = 600;
    }
    var scrnPosLeft = event.getSource().getProperty('scrnPosLeft');
    if (!scrnPosLeft) {
      scrnPosLeft = 200;
    }
    var scrnPosTop = event.getSource().getProperty('scrnPosTop');
    if (!scrnPosTop) {
      scrnPosTop = 200;
    }
    window.open(url, '', 'toolbar=0,scrollbars=1,location=0,statusbar=0,menubar=0,resizable=0,width=' + width + ',height=' + height + ',left=' + scrnPosLeft + ',top=' + scrnPosTop);
  },
  isMSIE : function () {
    var isit = false;
    if (/MSIE (\d+\.\d+);/.test(navigator.userAgent)) {
      isit = true;
    }
    return isit;
  },
  isMSIE7 : function () {
    var is7 = false;
    var version = HPROG.msieVersion();
    if (version >= 7 && version < 8) {
      is7 = true;
    }
    return is7;
  },
  msieVersion : function () {
    var version = 0;
    if (/MSIE (\d+\.\d+);/.test(navigator.userAgent)) {
      version = new Number(RegExp.$1)// capture x.x portion and store as a number
    }
    return version;
  },
  msieLongVersion : function () {
    var version = 0;
    if (/MSIE (\d+)\.(\d+);/.test(navigator.userAgent)) {
      version = RegExp.$1 + "." + RegExp.$2;
      if ( RegExp.$1 == "7" && navigator.userAgent.indexOf("Trident") > -1){
        version = version + " Compatibility view";
      }
    }
    return version;
  },
  isFirefox : function () {
    var isit = false;
    if (/Firefox\/(\d+\.\d+)/.test(navigator.userAgent)) {
      isit = true;
    }
    return isit;
  },
  firefoxVersion : function () {
    var version = 0;
    if (/Firefox\/(\d+)\.(\d+)\.(\d+)/.test(navigator.userAgent)) {
      var n = RegExp.$1 + "." + RegExp.$2;
      version = new Number(n)// capture x.x portion and store as a number
    }
    return version;
  },
  firefoxLongVersion : function () {
    var version = 0;
    if (/Firefox\/(\d+)\.(\d+)\.(\d+)/.test(navigator.userAgent)) {
      version = RegExp.$1 + "." + RegExp.$2;
      if (RegExp.$3) {
        version = version + "." + RegExp.$3;
      }
    }
    return version;
  },
  isChrome : function () {
    var isit = false;
    if (/Chrome\/(\d+\.\d+)/.test(navigator.userAgent)) {
      isit = true;
    }
    return isit;
  },
  chromeVersion : function () {
    var version = 0;
    if (/Chrome\/(\d+)\.(\d+)\.(\d+)\.(\d+)/.test(navigator.userAgent)) {
      var n = RegExp.$1 + "." + RegExp.$2;
      version = new Number(n)// capture x.x portion and store as a number
    }
    return version;
  },
  chromeLongVersion : function () {
    var version = 0;
    if (/Chrome\/(\d+)\.(\d+)\.(\d+)\.(\d+)/.test(navigator.userAgent)) {
      version = RegExp.$1 + "." + RegExp.$2;
      if (RegExp.$3) {
        version = version + "." + RegExp.$3;
        if (RegExp.$4) {
          version = version + "." + RegExp.$4;
        }
      }
    }
    return version;
  },
  isSafari : function () {
    var isit = false;
    if (/Safari\/(\d+\.\d+)/.test(navigator.userAgent)) {
      isit = true;
    }
    return isit;
  },
  safariVersion : function () {
    var version = 0;
    if (/Version\/(\d+)\.(\d+)\.(\d+)/.test(navigator.userAgent)) {
      var n = RegExp.$1 + "." + RegExp.$2;
      version = new Number(n)// capture x.x portion and store as a number
    }
    return version;
  },
  safariLongVersion : function () {
    var version = 0;
    if (/Version\/(\d+)\.(\d+)\.(\d+)/.test(navigator.userAgent)) {
      version = RegExp.$1 + "." + RegExp.$2;
      if (RegExp.$3) {
        version = version + "." + RegExp.$3;
      }
    }
    return version;
  },
  browserName : function () {
    var name = null;
// LEAVE IN THIS DEBUGGING CODE because the future is uncertain and with every release we run the risk of changes to the userAgent syntax
//    name = navigator.appName;
//    // Chrome, Safari, Firefox : "Netscape"
//    // MSIE9_7 : "Microsoft Internet Explorer"
//    var codeName = navigator.appCodeName;
//    // Chrome, Safari, Firefox, MSIE9_7 : "Mozilla"
//    var version = navigator.appVersion;
//    // Firefox : "5.0 (Windows)";
//    // Chrome : "5.0 (Windows NT 6.1); WOW64) AppleWebKit/535.1 (KHTML, like Gecko) Chrome/14.0.835.186 Safari/535.1"
//    // Safari : "5.0 (Windows NT 6.1); WOW64) AppleWebKit/534.50 (KHTML, like Gecko) Version/5.0.1 Safari/533.17.8"
//    // MSIE9 :   "5.0 (compatible; MSIE 9.0; Windows NT 6.1; WOW64; Trident/5.0; SLCC2; .NET CLR 2.0.50727; .NET CLR 3.5.30729; .NET CLR 3.0.30729; Media Center PC 6.0; .NET4.0C; MS-RTC LM 8; .NET4.0E; BOIE9;ENUSMSNIP)"
//    // MSIE9-8 : "4.0 (compatible; MSIE 8.0; Windows NT 6.1; WOW64; Trident/4.0; SLCC2; .NET CLR 2.0.50727; .NET CLR 3.5.30729; .NET CLR 3.0.30729; Media Center PC 6.0; .NET4.0C; MS-RTC LM 8; .NET4.0E; BOIE9;ENUSMSNIP)"
//    // MSIE9-7 : "4.0 (compatible; MSIE 7.0; Windows NT 6.1; WOW64; SLCC2; .NET CLR 2.0.50727; .NET CLR 3.5.30729; .NET CLR 3.0.30729; Media Center PC 6.0; .NET4.0C; MS-RTC LM 8; .NET4.0E; BOIE9;ENUSMSNIP)"
//    // MSIE9c :  "4.0 (compatible; MSIE 7.0; Windows NT 6.1; WOW64; Trident/5.0; SLCC2; .NET CLR 2.0.50727; .NET CLR 3.5.30729; .NET CLR 3.0.30729; Media Center PC 6.0; .NET4.0C; MS-RTC LM 8; .NET4.0E; BOIE9;ENUSMSNIP)"
//    // MSIE7 : "4.0 (compatible; MSIE 7.0; Windows NT 5.1; .NET CLR 2.0.50727; .NET4.0C; .NET4.0E)"
//    var cookies = navigator.cookieEnabled;
//    // Firefox, Chrome, Safari, MSIE9_7 : true
//    var java = navigator.javaEnabled();
//    // Firefox, Chrome, Safari, MSIE9_7 : true
//    var platfrm = navigator.platform;
//    // Firefox, Chrome, Safari, MSIE9_7 : "Win32"
//    var agent = navigator.userAgent;
//    // Firefox : "Mozilla/5.0 (Windows NT 6.1; WOW64; rv:7.0.1) Gecko/20100101 Firefox/7.0.1"
//    // Chrome : "Mozilla/5.0 (Windows NT 6.1); WOW64) AppleWebKit/535.1 (KHTML, like Gecko) Chrome/14.0.835.186 Safari/535.1"
//    // Safari : "Mozilla/5.0 (Windows NT 6.1); WOW64) AppleWebKit/534.50 (KHTML, like Gecko) Version/5.0.1 Safari/533.17.8"
//    // MSIE9 :  "Mozilla/5.0 (compatible; MSIE 9.0; Windows NT 6.1; WOW64; Trident/5.0; SLCC2; .NET CLR 2.0.50727; .NET CLR 3.5.30729; .NET CLR 3.0.30729; Media Center PC 6.0; .NET4.0C; MS-RTC LM 8; .NET4.0E; BOIE9;ENUSMSNIP)"
//    // MSIE9-8: "Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 6.1; WOW64; Trident/4.0; SLCC2; .NET CLR 2.0.50727; .NET CLR 3.5.30729; .NET CLR 3.0.30729; Media Center PC 6.0; .NET4.0C; MS-RTC LM 8; .NET4.0E; BOIE9;ENUSMSNIP)"
//    // MSIE9-7: "Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 6.1; WOW64; SLCC2; .NET CLR 2.0.50727; .NET CLR 3.5.30729; .NET CLR 3.0.30729; Media Center PC 6.0; .NET4.0C; MS-RTC LM 8; .NET4.0E; BOIE9;ENUSMSNIP)"
//    // MSIE9c : "Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 6.1; WOW64; Trident/5.0; SLCC2; .NET CLR 2.0.50727; .NET CLR 3.5.30729; .NET CLR 3.0.30729; Media Center PC 6.0; .NET4.0C; MS-RTC LM 8; .NET4.0E; BOIE9;ENUSMSNIP)"
//    // MSIE7 :  "Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 5.1; .NET CLR 2.0.50727; .NET4.0C; .NET4.0E)"
//    var language = navigator.userLanguage;
//    // Firefox, Chrome, Safari : undefined
//    // MSIE9_7 : "en-us"

    if (HPROG.isMSIE()) {
      name = "MSIE";
    }
    else if (HPROG.isFirefox()) {
      name = "Firefox";;
    }
    else if (HPROG.isChrome()) {
      name = "Chrome";
    }
    else if (HPROG.isSafari()) {
      name = "Safari";
    }

    var ver = HPROG.browserVersion();
    var lver = HPROG.browserLongVersion();
    alert("Browser is "+name + " " + ver + " ("+lver+")");
    return name;
  },
  browserVersion : function () {
    var version = 0;
    if (HPROG.isMSIE()) {
      version = HPROG.msieVersion();
    }
    else if (HPROG.isFirefox()) {
      version = HPROG.firefoxVersion();
    }
    else if (HPROG.isChrome()) {
      version = HPROG.chromeVersion();
    }
    else if (HPROG.isSafari()) {
      version = HPROG.safariVersion();
    }
    return version;
  },
  browserLongVersion : function () {
    var version = null;
    if (HPROG.isMSIE()) {
      version = HPROG.msieLongVersion();
    }
    else if (HPROG.isFirefox()) {
      version = HPROG.firefoxLongVersion();
    }
    else if (HPROG.isChrome()) {
      version = HPROG.chromeLongVersion();
    }
    else if (HPROG.isSafari()) {
      version = HPROG.safariLongVersion();
    }
    return version;
  },
  // ToolTip functions
  // ToDo: still need work
  displayTip : function (me, offX, offY, content) {
    var tipO = me;
    // The TipBox element is in map.jspx
    tip_box_id = document.getElementById("TipBox");
    if (tip_box_id) {
      var x = HPROG.findPosX(me);
      var y = HPROG.findPosY(me);
      tip_box_id.style.left = String(parseInt(x - offX) + 'px');
      tip_box_id.style.top = String(parseInt(y + offY) + 'px');
      tip_box_id.innerHTML = content;
      tip_box_id.style.display = "block";
      tip_box_id.style.zIndex = "99999";
      tip_box_id.style.color = "#1e3ea5";
      tipO.onmouseout = HPROG.hideTip;
    }
  },
  hideTip : function () {
    if (tip_box_id) {
      tip_box_id.style.display = "none";
    }
  },
  findPosX : function (obj) {
    var curleft = 0;
    if (obj.offsetParent)
      while (1) {
        curleft += obj.offsetLeft;
        if (!obj.offsetParent)
          break;
        obj = obj.offsetParent;
      }
    else if (obj.x)
      curleft += obj.x;
    return curleft;
  },
  findPosY : function (obj) {
    var curtop = 0;
    if (obj.offsetParent)
      while (1) {
        curtop += obj.offsetTop;
        if (!obj.offsetParent)
          break;
        obj = obj.offsetParent;
      }
    else if (obj.y)
      curtop += obj.y;
    return curtop;
  },
  addCommas : function (nStr) {
    nStr += '';
    x = nStr.split('.');
    x1 = x[0];
    x2 = x.length > 1 ? '.' + x[1] : '';
    var rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1)) {
      x1 = x1.replace(rgx, '$1' + ',' + '$2');
    }
    return x1 + x2;
  },

};