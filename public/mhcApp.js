var server = require('server');
var config = require('config.json');
var session = require('session');
var router = require('router');
var requestHandlers = require('requestHandlers');
var message = require('sendNotification');
var testUpdate = require('mdbactions');

var CHECKLISTMINUTES = 5;

var handle = {};
handle['/'] = requestHandlers.start;
handle['/login'] = requestHandlers.login;
handle['/register'] = requestHandlers.register;
handle['/filter'] = requestHandlers.filter;
handle['/edit'] = requestHandlers.edit;
handle['/upimage'] = requestHandlers.upimage;
handle['/get'] = requestHandlers.get;
handle['/send'] = requestHandlers.send;
handle['/updateDB'] = requestHandlers.updateDB;
handle['/rdata'] = requestHandlers.reset;
//var sessions = new Array();

server.start(router.route, handle);
console.log("host and port in config.json is: " + config.host + " : " + config.port);
console.log("MetroHuntsville Creative WEB Site up and running!");
setInterval(function(){session.purgeSessions()},(CHECKLISTMINUTES*60*1000));
	

/*//--- Test stuff --------------------------------------- */
//testUpdate.updateMemberDoc();
//message.send('lmason@HungryProgrammer.com','another test','well you got it again');
//testData.getData();
//console.log ('Get a session: ' + session.getSession().id);
//console.log ('Get a session: ' + session.getSession().id);
//console.log ('Get a session: ' + session.getSession().id);
//var s = session.listSessions();
//var sid = s[1].id;
//console.log('the list: ' + s);
//for (var i=0;i<s.length;i++) {
//  console.log('In list: ' + s[i].id.com2);
//}
//session.deleteSession(null, 1);
//var s = session.listSessions();
//console.log ('Got a session: ' + s[1].id.com2 + ' : ' + session.getSession(sid).id.com2);

//----------------------------------------------------------------------------------


