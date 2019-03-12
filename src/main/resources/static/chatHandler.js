var globVal = 0;




//this runs after the /api/chat is successful and returns the bots answer
function onSuccess(tmp){
    console.log(tmp);

    var node = document.createElement("P");
    var textNode = document.createTextNode(tmp.output.text);
    node.appendChild(textNode);
    node.className = "chat-message";
    document.getElementById("log").appendChild(node);
    //globVal++;
    //console.log(globVal);
    scrollBottom();

}

//at the start of the page, this is executed to display "hello" in the chatlog div
function onStart(){


    setTimeout(function () {
        var node = document.createElement("P");
        var textNode = document.createTextNode("Hello");
        node.appendChild(textNode);
        node.className = "chat-message";
        document.getElementById("log").appendChild(node);
    //    globVal++;
    },2000);
    maxLength(document.getElementById("inputBox"));
}

//when the send button is pressed, this gets executed
function submit(){

    var tmp;
    var element = document.getElementById("inputBox");

    console.log(element);
    if (element != null) {
        tmp = element.value;
    }
    else {
        tmp = null;
    }

     var node = document.createElement("P");
     var textNode = document.createTextNode(tmp);
     node.appendChild(textNode);
     node.className = "chat-messageU";
     document.getElementById("log").appendChild(node);
     //globVal++;

    console.log(tmp);
    document.getElementById("inputBox").value = "";

    scrollBottom();


    //Jquery call to the watson API
    $.ajax({
      type: "POST",
      url: "/api/chat",
      data: {msg:tmp},
      success: onSuccess,
      dataType: "json"
    });

}
//checks when the user presses enter to send a message
function enterPress(e, textarea){
    var code = (e.keyCode ? e.keyCode : e.which);
    if(code == 13) { //Enter keycode
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


//!!!!!!!!!!!! STILL NEEDS WORK
function connecting(){
    var tmp = "you are getting connected with a user";

     var node = document.createElement("span");
     node.className = "waiting-Dots";
     document.getElementById("log").appendChild(node);

     var span = document.getElementByClassName("waiting-Dots");

     var int = setInterval(function() {
         if ((span.innerHTML += '.').length == 4)
             span.innerHTML = '';
         //clearInterval( int ); // at some point, clear the setInterval
     }, 1000);

}

function scrollBottom(){
    document.querySelector('#log').scrollTop = document.querySelector('#log').scrollHeight
}