var app = angular.module('mhcApp',[]);

/*
app.controller('RCSController', function($scope, $http) {
  $http.get('/get?collect=skills')
       .then(function(res){
          $scope.skillList = res.data; 
          console.log("--------Got skills " + res.data);		  
        });
});
app.controller('RCSController', function($scope, $http) {
  $http.get('/get?collect=members')
       .then(function(res){
          $scope.members = res.data; 
          console.log("--------Got members " + res.data);		  
        });
});
*/

app.run(function(Session) {}); //bootstrap the session

app.factory('Session',function($http) {
  var Session = {
    //data: {id:'larry01'},
    //saveSession: function() {  },
    //updateSession: function() {
    //  Session.data = $http.get('session.json').then(function(r) {return r.data;});
    //}
  };
  //Session.updateSession();
  return Session; 
});








