(function() {
       var po = document.createElement('script'); po.type = 'text/javascript'; po.async = true;
       po.src = 'https://apis.google.com/js/client:plusone.js';
       var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(po, s);
     })();
function signinCallback(authResult) {

  if (authResult['status']['signed_in']) {
    $.ajax({
        url: "https://www.googleapis.com/plus/v1/people/me?access_token="+authResult["access_token"],
        type: 'GET',
        dataType: 'json',
        
        success: function(data) {
          console.log(data)
          /**
          //Need Fixing
          var formData = new FormData();

          formData.append("name", data["displayName"]);
          formData.append("id", data["id"]); 
          var request = new XMLHttpRequest();
          request.open("POST", "http://hiren-game.herokuapp.com/");
          request.send(formData);
          console.log("Rest Status: "+request.status);
          console.log("Rest error: "+request.error);
          console.log("Rest responseText: "+request.responseText);
          */
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