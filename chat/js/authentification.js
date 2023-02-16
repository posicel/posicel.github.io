// The user sends login and password.
function login()
{
    // Hide the button.
        $("#mail").hide();
        $("#password").hide();
        $("#login").hide();
        $("#e-mail").hide();
        $("#phone").hide();

        // Read login and password.
        var login_email = document.getElementById("mail").value;
        var login_password = document.getElementById("password").value;

        // Hide the message "Authentification failed".
        $("#output").hide();

        var ajax_data = 
        {
            "email" : login_email,
            "password" : login_password
        }

        // Send login and password to api  
        var temp_url = "https://chat.v1.prod.online-it-school.com/get_session_token";
    
        $.ajax
        ({
            type: "POST",
            url: temp_url,
            data: ajax_data,   

            // Get token and user's name.         
            success: function(on_login_response)
            {
                user = JSON.parse(on_login_response);
                if (on_login_response.length < 30)  // При неуспехе (не пришел токен)
                {
                    // show "Authentification FAILED".
                    $("#output").show();
                    document.getElementById("output").innerHTML = "<b>Authentification FAILED. Please try again!</b>";

                    // Show button to login again.
                    $("#mail").show();
                    $("#password").show();
                    $("#login").show();
                    $("#e-mail").show();
                    $("#phone").show();
                }
                else // if the user wuthentified
                {
                    // user's name
                    name = user.obj_user['f_name'];

                    // is shown on the screen.
                    document.getElementById("name").innerHTML = name + ":";

                    // Show chat window. 
                    $("#block").show();
                    $("#all_msg").show();
                    $("#number_msg").show();

                    // Show sending messages.          
                    $("#end_message").show();
                    $("#my_message").show();       
                    $("#b_send_get_msg").show();

                    // Go to messages' downloading.
                    updateMessages();
                }                   
            },
            error: function() 
            {
                document.getElementById("output").innerHTML = "error";
            }
        });        
}; 
