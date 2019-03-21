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

    //Jquery call to the watson API with a slight delay
    setTimeout(function() {
        $.ajax({
            type: "POST",
            url: "/api/chat",
            data: {msg: tmp},
            success: onSuccess,
            dataType: "json"
        });
    },2000);


}

//this runs after the /api/chat is successful and returns the bots answer
function onSuccess(tmp) {
    console.log(tmp);

    //this is for the typing dots
    if(!document.getElementsByClassName("container")[0]) {
        console.log("If works");
        var dot = document.getElementById("log").appendChild(waitingDots());
        scrollBottom();
    }
    console.log("if doesnt work");

    var node = document.createElement("div");
    var textNode = document.createTextNode(tmp.output.text);
    node.appendChild(textNode);
    node.className = "chat-message";

    if (textNode.length > 10) {
        setTimeout(function () {
            document.getElementById("log").appendChild(node);
            dot.remove();
            scrollBottom();
        }, 5000);
    } else {
        setTimeout(function () {
            document.getElementById("log").appendChild(node);
            dot.remove();
            scrollBottom();
        }, 2000);
    }
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

