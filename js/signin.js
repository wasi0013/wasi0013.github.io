(function() {
  var po = document.createElement('script'); po.type = 'text/javascript'; po.async = true;
  po.src = 'https://apis.google.com/js/client:plusone.js';
  var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(po, s);
  })();

var username=undefined //holds google user name
var userid=undefined   //holds user id
var userpic=undefined  //holds user image url
var highscore=0

function updateScore(score){
  if(userid!=undefined){
    //executes when user is signed in
    var formData = new FormData();
    formData.append("id", userid); 
    formData.append("game","brick");
    formData.append("score",score);
    
    $.ajax({
      //updating scores 
      url: 'http://hiren-game.herokuapp.com/update_score',
      type: 'POST',
      data: formData,
      processData: false,
      contentType: false,
      success: function(data){
        console.log("Score updated")
        
      },
      error: function(e) {
        console.log("Score update failed")
        var ajaira=JSON.parse(e.responseText)
        console.log(ajaira)
      }
    })

  }

}

var type = (function(global) {
  var cache = {};
  return function(obj) {
    var key;
    return obj === null ? 'null' // null
      : obj === global ? 'global' // window in browser or global in nodejs
      : (key = typeof obj) !== 'object' ? key // basic: string, boolean, number, undefined, function
      : obj.nodeType ? 'object' // DOM element
      : cache[key = ({}).toString.call(obj)] // cached. date, regexp, error, object, array, math
      || (cache[key] = key.slice(8, -1).toLowerCase()); // get XXXX from [object XXXX], and cache it
  };
}(this));

function showResult(){
  if(userid!=undefined){
    
    var formData = new FormData();
    formData.append("id", userid); 
    formData.append("game","brick");
    
    $.ajax({
      //result 
      url: 'http://hiren-game.herokuapp.com/result',
      type: 'POST',
      data: formData,
      processData: false,
      contentType: false,
    
      success: function(data){
        console.log("running result:success")
        //console.log(data)
        highscore=data["score"]
        //console.log("Types of data : "+type(data["score"]))

      },
      error: function(e) {
        console.log("running result:fail")
            var ajaira=JSON.parse(e.responseText)
              console.log(ajaira)
            }
    })
       
  }
}

function allResult(){
  var formData = new FormData();
  formData.append("game","brick");
  $.ajax({
    //all result 
    url: 'http://hiren-game.herokuapp.com/all_result',
    type: 'POST',
    data: formData,
    processData: false,
    contentType: false,
    success: function(data){

      console.log("running all_result:success")
      var table='<table class = "table table-bordered"><thead><tr><th>#Rank.</th><th>Players Name</th><th>Score</th></tr></thead><tbody>'
      var rank=1
      for(var key in data){
      table+="<tr>"+"<td>"+rank+'</td><td><a href="https://plus.google.com/u/0/'+data[key]["id"]+'/posts" target="_blank">'+data[key]["name"]+"</a></td>"+"<td>"+data[key]["score"]+"</td>"+"</tr>"  
      rank++
      }
      table+="</tbody></table>"
      document.getElementById('table').innerHTML = table;
    },
    error: function(e) {
      console.log("running result:fail")
          var ajaira=JSON.parse(e.responseText)
            console.log(ajaira)
          }
  })    
}

function createUser(formData){
  $.ajax({
    //login checks for creating new user 
    url: 'http://hiren-game.herokuapp.com/',
    type: 'POST',
    data: formData,
    processData: false,
    contentType: false,
    success: function(data){
      console.log("Creating user: success ")
      //console.log(data)
      formData = new FormData()
      formData.append("game", "brick")
      formData.append("id", userid) 
      createGame(formData)             
    },
    error: function(e) {
            var ajaira=JSON.parse(e.responseText)
            console.log("Registering new users: fails");
            console.log(ajaira.status);
          }
  })
}

function createGame(formData){
  $.ajax({
    url: 'http://hiren-game.herokuapp.com/create_game',
    type: 'POST',
    data: formData,
    processData: false,
    contentType: false,
    success: function(data){
      console.log("creating game entry:success")
     //console.log(data)
      updateScore(0)
    },
    error: function(e) {
            console.log("Creating game entry:fail")
            var ajaira=JSON.parse(e.responseText)
            console.log(ajaira.status);
          }
  })
}

function signinCallback(authResult) {
  if (authResult['status']['signed_in']) {
    $.ajax({
      url: "https://www.googleapis.com/plus/v1/people/me?access_token="+authResult["access_token"],
      type: 'GET',
      dataType: 'json',
      
      success: function(data) {
        //console.log(data)
        username=data["displayName"]
        userid= data["id"]
        userpic=data["image"]["url"]

        document.getElementById('thumb').innerHTML = '<a href="#" class="thumbnail"><img src="'+userpic+'" alt="'+username+'"></a>'
        document.getElementById('name').innerHTML = '<li><a href="'+data["url"]+'">'+username+'</a></li>'
        var formData = new FormData();
        formData.append("name",username );
        formData.append("id", userid);

        createUser(formData)         
        showResult()
        },
    })
    // Hide the sign-in button now that the user is authorized
    document.getElementById('signinButton').setAttribute('style', 'display: none');
    //sign out button
    document.getElementById('signoutButton').setAttribute('style', 'display: inline')
  } else {
    document.getElementById('signinButton').setAttribute('style', 'display: inline')
    document.getElementById('signoutButton').setAttribute('style', 'display: none')
    // Possible error values:
    //   "user_signed_out" - User is signed-out
    //   "access_denied" - User denied access to your app
    //   "immediate_failed" - Could not automatically log in the user
    console.log('Sign-in state: ' + authResult['error']);
  }
}

function signout(){
  $.ajax({
    type: 'GET',
    url: 'https://accounts.google.com/o/oauth2/revoke?token=' + gapi.auth.getToken().access_token,
    async: false,
    contentType: 'application/json',
    dataType: 'jsonp',
    success: function(result) {

      document.getElementById('signinButton').setAttribute('style', 'display: inline')
      document.getElementById('signoutButton').setAttribute('style', 'display: none')
      document.getElementById('thumb').innerHTML ="";
      document.getElementById('name').innerHTML ="";
      userid=username=userpic=undefined

    },
    error: function(e) {
      console.log(e);
    }
  })
}