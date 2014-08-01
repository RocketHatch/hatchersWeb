var RCSData = {
  curMember : null,
  curSklList : [],
  curMbrList : [],  
  skills : [], 
  cMembers : [],
			 
			 SlctdSkillList : { 
               getCurrentList : function() {
                 return RCSData.curSklList;
               },
               addSkill : function(sklId) {
                 RCSData.curSklList.push(sklId);
               },
               removeSkill : function(sklId) {
                 var indx = RCSData.curSklList.indexOf(sklId);
                 RCSData.curSklList.splice(indx, 1);
               },
               clearSkillList : function() {
                 RCSData.curSklList = [];
               },
			   ckForSkillInList : function(sklId) {
                 //for (var i = 0; i < RCSData.curSklList.length; i++) {
	             //  if (RCSData.curSklList[i]).id == sklId) {
				 //    return true;
				 //  }
	             //}
				 return RCSData.curSklList.indexOf(sklId) > -1 ;
               },
               printList : function() {
                 for (var i = 0; i < RCSData.curSklList.length; i++) {
	               console.log("this is my print statement: " + i + " " + RCSData.curSklList[i]);
	             }
               }  
             },
             
             MembersWSlctdSkills : {
                GetMbrWSkills : function(){
				  RCSData.curMbrList = [];
				  console.log("call to GetMbrWSkills: cleared list:" + RCSData.curMbrList);
				  RCSData.cMembers.forEach(function(entry) {
				    //console.log("checking : " + entry.email);
				    if (RCSData.checkSkills(entry)) {
                      console.log("This member added: " + entry.email);
					  RCSData.curMbrList.push(entry);
				    }
                  });
				  console.log("new list complete: " + RCSData.curMbrList);
				}  				
             },
			 
  checkSkills : function(member) {
    var memIn = false;
    for (var i = 0; i < member.skillList.length && !memIn; i++) {
	  memIn = (RCSData.curSklList.indexOf(member.skillList[i]) > -1) ? true : false;   
    }
    return memIn;	
  },
  
  setCurrentMember : function(member) {
    console.log("setting current member in model: " + JSON.stringify(member));
    RCSData.curMember = member;
  },
  getCurrentMember : function() {
    console.log("getting current member:");
    return RCSData.curMember;
  }  
};

function Member(emid,name,skills,tagline,url,data) {
  this.uid = emid;
  this.name = name;
  this.skillList = skills;
  this.tagline = tagline;
  this.data = data;
  this.url = url;
  this.lastLogon = null;
  this.dateCreate = null;
  this.dateExpire = null;
};

function sendMessage(recip,name,phone,email,txt) {
  this.recip = recip;
  this.name = name;
  this.phone = phone;
  this.email = email;
  this.txt = txt;
  this.confirmed = false;
  this.crTime = null;
};

function ckCurUserIsCurMem(curMemeberId) {
  var ret = false;
  if (MHC.session.member) {
	ret = (curMemeberId === MHC.session.member._id);
  }
  return ret;
};

function shuffle(array) {
  var m = array.length, t, i;

  // While there remain elements to shuffle…
  while (m) {

    // Pick a remaining element…
    i = Math.floor(Math.random() * m--);

    // And swap it with the current element.
    t = array[m];
    array[m] = array[i];
    array[i] = t;
  }

  return array;
}

/* mongoDB insert script 
db.members.insert(
    [{_id: "anne.condit@me.com", name: {fname : "Anne", lname : "Condit"},
      skillList:[10,2,7],tagline:"anne tag",data:"dataA",url:"http://www.danslalunedesigns.com/",lastLogon:"5-7-14"},
    {_id: "bryan.powell@me.com",name: {fname : "Bryan", lname : "Powell"},
      skillList:[4,22,7],tagline:"bryan tag",data:"dataB",url:"https://twitter.com/bryanp",lastLogon:"5-7-14"},
    {_id: "tarra.anzalone@me.com",name: {fname : "Tarra", lname : "Anzalone"},
      skillList:[10,19,2],tagline:"tarra tag",data:"dataA",url:"http://hellotarra.com/",lastLogon:""},
    {_id: "rob.adams@me.com",name: {fname : "Rob", lname : "Adams"},
      skillList:[5,12,4],tagline:"rob tag",data:"dataB",url:"http://mindgearlabs.com/",lastLogon:""},
    {_id: "christi.jackson@me.com",name: {fname : "Christi", lname : "Jackson"},
      skillList:[1,13,2],tagline:"Christi tag",data:"dataA",url:"http://twitter.com/ilovevcsi",lastLogon:""},
    {_id: "antonio.montoya@me.com",name: {fname : "Antonio", lname : "Montoya"},
      skillList:[7,2,19],tagline:"Antonio tag",data:"dataB",url:"http://antoniomontoya.com/",lastLogon:""},
    {_id: "kyle.newman@me.com",name: {fname : "Kyle", lname : "Newman"},
      skillList:[22,4,7],tagline:"Kyle tag",data:"dataA",url:"http://www.somewhere.com/",lastLogon:""},
    {_id: "tanner.carden@me.com",name: {fname : "Tanner", lname : "Carden"},
      skillList:[7,23],tagline:"Tanner tag",data:"dataB",url:"http://nesteggbio.com/",lastLogon:""},
    {_id: "jeff.hammock@me.com",name: {fname : "Jeff", lname : "Hammock"},
      skillList:[7,15],tagline:"Jeff tag",data:"dataA",url:"http://mechoptix.com/",lastLogon:""},
    {_id: "larry.mason@alltowntech.com",name: {fname : "Larry", lname : "Mason"},
      skillList:[4,22,21],tagline:"larry tag",data:"dataB",url:"http://www.hungryprogrammer.com",lastLogon:""},
    {_id: "raaj.baskaran@me.com",name: {fname : "Raaj", lname : "Baskaran"},
      skillList:[4,7],tagline:"Raaj tag",data:"dataA",url:"http://www.somewhere.com/",lastLogon:""},
    {_id: "kathleen.bern@me.com",name: {fname : "Kathleen", lname : "Bern"},
      skillList:[24,7,2],tagline:"kate tag",data:"dataB",url:"http://kathleenbernalevents.com/",lastLogon:""}
]) 
// end member insert script*/
/* mongoDB insert script 
db.skills.insert([  
	{ id : 0, type : "all" },
	{ id : 1, type : "business" },
	{ id : 2, type : "community connector" },
	{ id : 3, type : "copywriter" },
	{ id : 4, type : "developer" },
	{ id : 5, type : "education" },
	{ id : 6, type : "engineer" },
	{ id : 7, type : "entrepreneur" },
	{ id : 24, type : "event planner" },
	{ id : 8, type : "fashion design" },
	{ id : 9, type : "finance" },
	{ id : 10, type : "graphic design" },
	{ id : 11, type : "law" },
	{ id : 12, type : "manufacturing" },
	{ id : 13, type : "marketing" },
	{ id : 14, type : "non-profit" },
	{ id : 15, type : "product design" },
	{ id : 16, type : "sales" },
	{ id : 17, type : "seo" },
	{ id : 18, type : "social media" },
	{ id : 19, type : "strategy" },
	{ id : 20, type : "sys admin" },
	{ id : 21, type : "UX design" },
	{ id : 22, type : "web" },
	{ id : 23, type : "writer" }
])
// end skills insert script*/		  
						
							
	