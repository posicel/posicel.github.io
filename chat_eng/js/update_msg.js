// Authentification sucseed. 
function updateMessages()
{
    // Find out how many messages there are on the site.
    fetch("https://chat.v1.prod.online-it-school.com/get_latest_msg_id")
        .then((response) => response.json())
        .then((data) => initMessages(data));     
};

function initMessages(data)
// Download previous messages.
{
    last_message = data;

    // Show number of the messages. 
    document.getElementById("report").innerHTML = last_message; 

    // If there are few messages:
    if (last_message <= how_many)
    {
        // download them all
        get_msg(1, last_message + 1);
    };
    // if there are a lot of messages: 
    if (last_message > how_many)
    {
        // show two buttons to download the rest.
        $("#get_rest").show();
        $("#get_more").show();
        
        // download several messages.
        get_msg(last_message - how_many + 1, last_message + 1);
    }
};

// Download messages with id = х, х+1, х+2, ..., y-1
function get_msg(x, y)
{
    // Making empty elements with id = "text + number of the text"

    // If it's the first download,
    if (start == false)
    {
        for (var i = x; i < y; i++) 
        {
            var element = document.createElement("Text");
            element.id = "text" + i;
            block.appendChild(element);
            // insert the new element to the end of the chat block.
            element.innerHTML = "The message number " + i + " is not available" + "<br>";
        };
        start = true;             
        first_downloaded = x;
        last_downloaded = y-1;
    }
    else
    { 
        if (x == last_downloaded + 1)
        // If it's download ot new messages
        {
            for (var i = x; i < y; i++) 
            {
                var element = document.createElement("Text");
                element.id = "text" + i;
                block.appendChild(element);
                // insert the new element to the end of the chat block.
                element.innerHTML = "The message number " + i + " is not available" + "<br>";
            };
            last_downloaded = y-1;
        };
        if (y == first_downloaded)
        // If it's download ot old messages
        {
            for (var i = x; i < y; i++) 
            {
                var element = document.createElement("Text");
                element.id = "text" + i;
                var first_id = "text" + first_downloaded;
                var first_downloaded_msg = document.getElementById(first_id);
                // insert new element before the first downloaded message.
                block.insertBefore(element, first_downloaded_msg);
                element.innerHTML = "The message number " + i + " is not available" + "<br>";
            };
            first_downloaded = x;
            block.scrollTop = block.scrollHeight;
        };
    };  

    // Download messages.
    var url = "https://chat.v1.prod.online-it-school.com/get_msgs_range/asc/" + x + "/" + y+1;

    fetch(url)
        .then((response) => response.json())    
        .then((data) => build_chat(data));           
};

// Show messages in the chat block.
function build_chat(data) 
{
    var nmbrMessage;
    var myMessage;
    var hisMessage;
    for (var i = 0; i < data.length; i++) 
    {
        var k = data.length - i - 1;
        var msg = data[k];

        if (msg["username"] == name) 
        {
            // User's messages in green.                    
            nmbrMessage = msg["id"];
            myMessage = document.getElementById("text" + nmbrMessage);
            myMessage.innerHTML = "<h5>" + msg["username"] + ": " + msg["message"] + "</h5>";
            block.scrollTop = block.scrollHeight; 
        }                  
        else 
        {
            // Other's messages in grey.                   
            nmbrMessage = msg["id"];
            hisMessage = document.getElementById("text" + nmbrMessage);
            hisMessage.innerHTML = "<h6>" + msg["username"] + ": " + msg["message"] + "</h6>";
            block.scrollTop = block.scrollHeight;   
        };
    };
    // Check if there are new messages on server.
    сheckMessages();
};

function сheckMessages()
{ 
    let timerId = setInterval
    (
        function()
        // Find out how many messages there are on the site.
        { 
            fetch("https://chat.v1.prod.online-it-school.com/get_latest_msg_id")
                .then((response) => response.json())
                .then((data) => checkIfNeed(data));
        }
        , how_long
    ); 
};

// Check if we need to do anything.
function checkIfNeed(data)
{
    last_message = data;
    // If there are new messages,
    if (last_message != last_downloaded)
    {
        // show the number of the messages. 
        document.getElementById("report").innerHTML = last_message;                                
        // Загружаем сообщения (от last_downloaded до last_message)
        get_msg(last_downloaded + 1, last_message + 1);
    }      
};

// При нажатии на кнопку Загрузить оставшиеся сообщения
function getRest()
{
    // Загружаем все оставшиеся сообщения
    get_msg(1, first_downloaded);
    // прячем кнопки   
    $("#get_rest").hide();
    $("#get_more").hide();
};

// При нажатии на кнопку Загрузить еще how_many сообщений
function getMore()
{
    // если оставшихся сообщений меньше how_many
    if (first_downloaded <= how_many)
    {
        // загружаем все оставшиеся сообщения.
        get_msg(1, first_downloaded);
        // убираем обе кнопки.
        $("#get_rest").hide();
        $("#get_more").hide();
    }
    else
    {
        // Если после загрузки останется мало сообщений 
        if (first_downloaded <= how_many*2)
        {
            // убираем эту кнопку, оставляем только Загрузить оставшиеся сообщения
            $("#get_more").hide();  
        };
        // Загружаем еще how_many сообщений
        get_msg(first_downloaded - how_many, first_downloaded);   
    };   
};


