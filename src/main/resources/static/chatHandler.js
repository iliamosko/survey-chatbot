// global variables to keep track of how many messages are sent
var calls = 0;
var word = [];
var cid;
var stutterSpeed = 1;
var totalStutter = 0;

//Connecting function, waits for a "connect" then continues with code
function connecting() {
    var str = "<b>Please wait for your partner to connect</b>";
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

    calls++;

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
    document.getElementById("inputBox").value = "";

    scrollBottom();

    word += tmp + " ";


    //checks if called more than once to accept multiple messages into API call
    if(calls > 1){
        clearInterval(send);
        watsonCall(word);
    } else {

        watsonCall(tmp);
    }

}

function watsonCall(msg) {
    send = setTimeout(function() {
        $.ajax({
            type: "POST",
            url: "/api/chat",
            data: {msg: msg},
            success: onSuccess,
            dataType: "json"
        });
        calls=0;
        word = [];
    },5000);
}


//this runs after the /api/chat is successful and returns the bots answer
function onSuccess(tmp) {
    var rand = Math.floor((Math.random() * 10) + 1);

    var node = document.createElement("div");
    var textNode = document.createTextNode(tmp.output.text);
    node.appendChild(textNode);
    node.className = "chat-message";

    //this is for the typing dots
    if(!document.getElementsByClassName("container")[0]) {
        var dot = document.getElementById("log").appendChild(waitingDots());
        scrollBottom();

    }

    //randomly stutters the typing dots depending on the random number for a maximum of 3 stutters in total
    if(rand > 7 && totalStutter!=3){
        document.getElementsByClassName("container")[0].style.visibility = "hidden";
        var dot1 =  document.getElementById("log").appendChild(waitingDots());
        scrollBottom();

        setTimeout(function () {
            dot1.remove()
        },2000);

        setTimeout(function () {
            document.getElementsByClassName("container")[0].style.visibility = "visible ";
            scrollBottom();
        }, 5000);

        if(textNode.length < 100 ){
            stutterSpeed = 2;
        } else {
            stutterSpeed = 1.355;
        }
        totalStutter++;

    }

    if(cid == null) {
        cid = tmp.context.conversation_id;
        document.getElementsByClassName("idbutton")[0].removeAttribute("disabled");
    }

    //case for the last message to block the chat box from additional messages
    if(tmp.output.text[0].includes("Alright, It was nice working with you! goodluck on the rest with the survey. im going to leave the convo now")){
        setTimeout(function () {
            document.getElementById("inputBox").disabled = true;
            document.getElementById("inputBox")
                .placeholder = "User has left the conversation";
        },textNode.length*100*stutterSpeed + 3000);

    }


    //wait delay is set depending on how long the bots message is.
    setTimeout(function () {

        document.getElementById("log").appendChild(node);
        dot.remove();
        scrollBottom();
    }, textNode.length*100*stutterSpeed);

    stutterSpeed = 1;
}

//After connecting function is finished, this is executed to display "hello" in the chatlog div
function onStart() {
    var dot = document.getElementById("log").appendChild(waitingDots());
    setTimeout(function () {
        var node = document.createElement("div");
        var textNode = document.createTextNode("Hello");
        node.appendChild(textNode);
        node.className = "chat-message";
        document.getElementById("log").appendChild(node);
        dot.remove();
    }, 2000);
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
//typing dots
function waitingDots(){

    var pNode = document.createElement("div");
    pNode.className = "container";
    var node1 = document.createElement("div");
    node1.className = "block";
    var node2 = document.createElement("div");
    node2.className = "dot";
    var node3 = document.createElement("div");
    node3.className = "dot";
    var node4 = document.createElement("div");
    node4.className = "dot";

    node1.appendChild(node2);
    node1.appendChild(node3);
    node1.appendChild(node4);

    pNode.appendChild(node1);

    return pNode;
}

function scrollBottom() {
    document.querySelector('#log').scrollTop = document.querySelector('#log').scrollHeight;
}

function convoId(){

    if(cid != null){
        cid = cid.substring(0,8);
    }

    var elem = document.getElementsByClassName("idbutton")[0];
    elem.parentNode.removeChild(elem);

    var place = document.getElementsByClassName("convoid")[0];

    var node = document.createElement("p");
    var textNode = document.createTextNode("This is your conversation Id: " + cid);
    node.appendChild(textNode);

    node.setAttribute("style", "font-weight: bold");


    place.appendChild(node);


}
