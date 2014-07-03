(function() {
       var po = document.createElement('script'); po.type = 'text/javascript'; po.async = true;
       po.src = 'https://apis.google.com/js/client:plusone.js';
       var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(po, s);
     })();

function createCORSRequest(method, url) {
  var xhr = new XMLHttpRequest();
  if ("withCredentials" in xhr) {
    // XHR for Chrome/Firefox/Opera/Safari.
    xhr.open(method, url, true);
  } else if (typeof XDomainRequest != "undefined") {
    // XDomainRequest for IE.
    xhr = new XDomainRequest();
    xhr.open(method, url);
  } else {
    // CORS not supported.
    xhr = null;
  }
  return xhr;
}


var username=undefined
var userid=undefined
var highscore=0

function updateScore(){
    if(userid!=undefined){
    var formData = new FormData();
          formData.append("id", userid); 
          formData.append("game","brick");
          formData.append("score",highscore);
          $.ajax({
            //updating scores 
            url: 'http://hiren-game.herokuapp.com/update_score',
            type: 'POST',
            data: formData,
            processData: false,
            contentType: false,
            success: function(data){
              console.log("Running update score:success")
              console.log(data);
            },
            error: function(e) {
              console.log("Running update score:fail")
                    var ajaira=JSON.parse(e.responseText)
                    console.log(ajaira)
                  }


          })

  }
}

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
              console.log(data)
              highscore=data["score"]
              console.log(data["score"])

            },
            error: function(e) {
              console.log("running result:fail")
                  var ajaira=JSON.parse(e.responseText)
                    console.log(ajaira)
                  }


          })
          
    }
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
              console.log(data)
              
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
             console.log(data)
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
          console.log(data)
          username=data["displayName"]
          userid= data["id"]
          var formData = new FormData();
          formData.append("name",username );
          formData.append("id", userid);

          createUser(formData)

          formData = new FormData();

          formData.append("game", "brick");
          formData.append("id", userid); 
          createGame(formData)
          showResult()
          },
        



    })
    // Update the app to reflect a signed in user
    // Hide the sign-in button now that the user is authorized, for example:
    document.getElementById('signinButton').setAttribute('style', 'display: none');
    document.getElementById('signoutButton').setAttribute('style', 'display: inline')
  } else {
    document.getElementById('signinButton').setAttribute('style', 'display: inline')
    document.getElementById('signoutButton').setAttribute('style', 'display: none')
                 
    
    // Update the app to reflect a signed out user
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
                  },
                  error: function(e) {
                    console.log(e);
                  }
    })



}