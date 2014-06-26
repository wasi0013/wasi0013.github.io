(function() {
       var po = document.createElement('script'); po.type = 'text/javascript'; po.async = true;
       po.src = 'https://apis.google.com/js/client:plusone.js';
       var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(po, s);
     })();
function signinCallback(authResult) {
  if (authResult['status']['signed_in']) {
    alert("Sign in Successful");

    $.ajax({
        url: "https://www.googleapis.com/plus/v1/people/",
        data: {
          userId:"me",
        },

        type: 'GET',
        dataType: 'json',
        success: function(data) {
            alert(data);
        }
    });
    // Update the app to reflect a signed in user
    // Hide the sign-in button now that the user is authorized, for example:
    document.getElementById('signinButton').setAttribute('style', 'display: none');
  } else {
    alert("Sign in failed");
    // Update the app to reflect a signed out user
    // Possible error values:
    //   "user_signed_out" - User is signed-out
    //   "access_denied" - User denied access to your app
    //   "immediate_failed" - Could not automatically log in the user
    console.log('Sign-in state: ' + authResult['error']);
  }
}