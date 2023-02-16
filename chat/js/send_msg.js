    // The user sends a message.
    function send_msg()
        {
            // Read the message.
            var my_message = document.getElementById("my_message").value;
            var token = user.token
        
            var data = 
            {
                "token" : token,
                "msg" : my_message
            }
            // Send the message to the server.        
                $.ajax({
                    type: "POST",
                    url: "https://chat.v1.prod.online-it-school.com/add2",
                    data: data,
                    success: function(a){
                        console.log(a)
                    },
                    error: function(a, b) {
                        console.log("error")
                    }
                });
            // Empty text input window.
            document.getElementById("my_message").value = null;
        }