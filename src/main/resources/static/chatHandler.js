//Connecting function, waits for a "connect" then continues with code
function connecting() {
   // waitingDots();
    var str = "<b>Please wait, You will be connected Shortly</b>";
    document.getElementById("inputBox").disabled = true;
    document.getElementById("inputBox")
        .placeholder = " ";

    document.getElementById('con').innerHTML = str;
    setTimeout(function () {
        document.getElementById('con').innerHTML = '';
        document.getElementById("inputBox")
            .placeholder = "Type Here";
        document.getElementById("inputBox").disabled = false;
        onStart();
    }, 5000);
}

//when the send button is pressed, this gets executed
function submit() {
    var tmp;
    var element = document.getElementById("inputBox");

    console.log(element);
    if (element != null) {
        tmp = element.value;
    } else {
        tmp = null;
    }

    var node = document.createElement("div");
    var textNode = document.createTextNode(tmp);
    node.appendChild(textNode);
    node.className = "chat-messageU";
    document.getElementById("log").appendChild(node);

    console.log(tmp);
    document.getElementById("inputBox").value = "";

    scrollBottom();

    //Jquery call to the watson API
    $.ajax({
        type: "POST",
        url: "/api/chat",
        data: {msg: tmp},
        success: onSuccess,
        dataType: "json"
    });

}

//this runs after the /api/chat is successful and returns the bots answer
function onSuccess(tmp) {
    console.log(tmp);
    var node = document.createElement("div");
    var textNode = document.createTextNode(tmp.output.text);
    node.appendChild(textNode);
    node.className = "chat-message";

    if (textNode.length > 10) {
        setTimeout(function () {
            document.getElementById("log").appendChild(node);
            scrollBottom();
        }, 3000);
    } else {
        setTimeout(function () {
            document.getElementById("log").appendChild(node);
            scrollBottom();
        }, 1000);
    }
}

//After connecting function is finished, this is executed to display "hello" in the chatlog div
function onStart() {
    setTimeout(function () {
        var node = document.createElement("div");
        var textNode = document.createTextNode("Hello");
        node.appendChild(textNode);
        node.className = "chat-message";
        document.getElementById("log").appendChild(node);
        //    globVal++;
    }, 3000);
    maxLength(document.getElementById("inputBox"));
}

//checks when the user presses enter to send a message
function enterPress(e, textarea) {
    var code = (e.keyCode ? e.keyCode : e.which);
    if (code == 13) { //Enter keycode
        submit();
    }
}

//sets the max length of the textarea
function maxLength(el) {
    if (!('maxLength' in el)) {
        var max = el.attributes.maxLength.value;
        el.onkeypress = function () {
            if (this.value.length >= max) return false;
        };
    }
}
//clear interval could work in anyother function.... just need to put clearn interval
function waitingDots(){
    var dots = window.setInterval( function() {
        var wait = document.getElementById("dots");
        if ( wait.innerHTML.length > 3 )
            wait.innerHTML = "";
        else
            wait.innerHTML += ".";
    }, 1000);

}


function scrollBottom() {
    document.querySelector('#log').scrollTop = document.querySelector('#log').scrollHeight;
}