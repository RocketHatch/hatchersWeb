app.controller("RCSController", function($scope, $http){

  $http.get('/get?collect=skills')
		.success(function(data) {
		    $scope.skillList = data['skills'];
			RCSData.skills = data['skills'];
			console.log(data);
		})
		.error(function(data) {
			console.log('Error: ' + data);
		});
		
  $http.get('/get?collect=members')
		.success(function(data) {
		    $scope.members = data['members'];
			RCSData.cMembers = shuffle(data['members']);
			console.log(data);
		})
		.error(function(data) {
			console.log('Error: ' + data);
		});

  //$scope.skillList = RCSData.skills;
  $scope.currentMember = null;
  $scope.curMemSkills = [];
 
  $scope.getSkills = function(list) {
    var skills = '';
	for (var i = 0; i < list.length; i++) {
	  key = list[i];	
      //console.log('got to loop ' + i + " : " + getSkillValue(key));	
      skills = skills + getSkillValue(key) + ", "; 
    };
	//console.log("Indexes : " + list); 
	return skills.slice(0,-2);
  };
  
  var getSkillValue = function(key) {
    //console.log('key ' + key);
    for (i = 0; i < RCSData.skills.length; i++) {	 
      if (RCSData.skills[i]._id == key) {
	    //console.log('key ' + key);
        return RCSData.skills[i].type;
      }
    }  
  };
  
  $scope.updateSkillList = function() {
    console.log("got to the skillList function... " + $scope.skillList.length);
    if ($scope.skillList.length < 1) {
	  $scope.skillList = RCSData.getAllSkills($scope.skillList);
	  $scope.$apply();
      //$scope.skillList = RCSData.skills; 
	  //console.log("now list length... " + $scope.skillList.length);
	}
	
  };
  
  $scope.updateMembers = function() {
    console.log("got to the members function... " + $scope.members.length);
    if ($scope.members.length < 1) {
	  $scope.members = RCSData.getAllMembers($scope.members);
	  $scope.$apply();
	  //$scope.members = RCSData.cMembers;
	  //console.log("now list length... " + $scope.members.length);
	}
	
  };
  
  $scope.updateFaces = function(skillId) {
    console.log('ready for list: sk' + skillId);
	if (skillId === 0) {
	  $scope.members = RCSData.cMembers;
	  RCSData.SlctdSkillList.clearSkillList();
	  return false;
	}
	var inList = RCSData.SlctdSkillList.ckForSkillInList(skillId);
	console.log("returned a: " + inList);
	if(!inList) {
	  RCSData.SlctdSkillList.addSkill(skillId);
	  console.log("adding skill: " + skillId);
	} else {
	  RCSData.SlctdSkillList.removeSkill(skillId);
	  console.log("removing skill: " + skillId);
	}
	if (skillId > 1) {
	  RCSData.MembersWSlctdSkills.GetMbrWSkills();
      $scope.members = RCSData.curMbrList;
	} 
  };

  $scope.setCurrentMember = function(member) {
    $scope.currentMember = member;
	RCSData.setCurrentMember(member);
	console.log("setting current member: " + member.skillList);
	$scope.curMemSkills = [];
	for (var i = 0; i < member.skillList.length; i++) {
	  key = member.skillList[i];	
      //console.log('got to loop ' + i + " : " + getSkillValue(key));	
      $scope.curMemSkills.push(getSkillValue(key)); 
    };
	console.log('got skills ' + $scope.curMemSkills);
  };  
});

  
  //$scope.memberFilterList = RCS.cMembers;

  /*


  $scope.typeRoute = function(desc,name,sub) {
    $scope.pJIG = [];
    if (name == "Joint Injury") {
      $scope.pJIG = desc;
    } else {
      $scope.pDesc = desc;
      $scope.injuryOf = name;    
      ORTHO.subEtiology = sub;
      $scope.injuryOfSubList = sub;
      ORTHO.currentEtiologyGroup = sub;
    }
  };

  $scope.jiRoute = function(desc, name) {
    //console.log("" + desc);
    $scope.pDesc = "Joint Injury - " + desc;
    $scope.injuryOf = name;
    //console.log("injuryOf = " + $scope.injuryOf);
  };
  
  $scope.clickedMap = function(anatomy,side) {
    $('.dynamic').empty();
    $('#choiceArea').empty();
    $('#intrmResults').empty();
    if (ORTHO.inSearch) {
      ORTHO.inSearch = false;     
    }
    if (anatomy === 'head' && !ORTHO.currentView.isHead) {
      changeHeadImage();
      ORTHO.setAnatomyView['head']();
       $(".tab").removeClass('active');
       $('#head').addClass('active');
    }
    if (anatomy === 'spine' && !ORTHO.currentView.isSpine) {
      changeSpineImage();
      ORTHO.setAnatomyView['spine']();
      $(".tab").removeClass('active');
      $('#spine').addClass('active');
    }         
    $scope.anatomicGroupList = $scope.anatomicGroups[anatomy];
    if ($scope.anatomicGroupList.indexOf("All Sites") < 0) {
      $scope.anatomicGroupList.push("All Sites");  //'Everybody gets an All Sites to include those non-classifiable datafields
    }
    if (ORTHO.currentView.isSpine)  { 
      if ($scope.anatomicGroupList.indexOf("All Appendicular") < 0) {    
          $scope.anatomicGroupList.push("All Appendicular");
      }
    }
    if (ORTHO.currentView.isOrgans) {
      ORTHO.currentEtiologyGroup.push('Internal Organs');
    }		
    ORTHO.currentAnatomyGroup = $scope.anatomicGroups[anatomy];
    ORTHO.side = side;
    ORTHO.navigation.check();
  };

  //$scope.twoThingsAtOnce = function(name1, name2) {
  //  console.log("Did two things at once... Hooray! " + name1 + " : " + name2);
  //};
  */



