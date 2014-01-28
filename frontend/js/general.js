var serverAddr = "https://localhost:8181/",
documentPath = "index.html";
apiPath = "rainbow_coding-web/rc_api/",
rolesPath = apiPath + "roles",
operatorPath = apiPath + "operators",
languagePath = apiPath + "languages",
notePath = apiPath + "notes",
projectPath = apiPath + "projects",
filePath = apiPath + "files",
xmlHeader = "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?>",
xmlContent = "application/xml;";

function showDialogBox(title, content, buttons, hide){
	$("body").append("<div id=\"dialog-box-wrapper\">" + 
		"<div id=\"dialog-box-wrapper-cell\">" +
			"<div id=\"dialog-box\">" +
				"<div id=\"dialog-box-title\">" + title + "</div>" +
				"<div id=\"dialog-box-content\">" + content + "</div>" +				
				"<div id=\"dialog-box-buttons\">" + buttons + "</div>" + 
			"</div>" +
		"</div>" +
	"</div>");
	
	if(hide){
		$("#dialog-box-wrapper").css("background-color", "rgba(255, 255, 255, 1.0)");
	}
	else {
		$("#dialog-box-wrapper").css("background-color", "rgba(255, 255, 255, 0.70)");
	}
}

function showDialogBoxInformation(description){
	$("body").append("<div id=\"dialog-box-wrapper\">" + 
		"<div id=\"dialog-box-wrapper-cell\">" +
			"<div id=\"dialog-box-information\">" +
				"<div id=\"dialog-box-information-content\">" + description + "</div>" + 
			"</div>" +
		"</div>" +
	"</div>");
}

function removeDialogBox(){
	$("#dialog-box-wrapper").detach();
}

function showLoginMenu(){
	var buttonsLayout = "<button id=\"login-button\" class=\"dialog-box-button\">Login</button>"+
		"<button id=\"register-button\" class=\"dialog-box-button\">Register</button>"	
	
	var contentLayout = "<span>Username:</span>"+
		"<input id=\"username-input\" class=\"dialog-box-input\">" +
		"<span>Password:</span>" + 
		"<input id=\"password-input\" class=\"dialog-box-input\" type=\"password\">";
	
	showDialogBox("Welcome",contentLayout, buttonsLayout, true);
	
	$("#login-button").click(function() {
		//removeDialogBox();
		//showDialogBoxInformation("Loading document...");
	});
		
	$("#register-button").click(function() {

	});
}

$.urlParam = function(name){
    var results = new RegExp('[\\?&]' + name + '=([^&#]*)').exec(window.location.href);
    if (results==null){
       return null;
    }
    else{
       return results[1] || 0;
    }
}

function createRequest() {
  var result = null;
  if (window.XMLHttpRequest) {
    // FireFox, Safari, etc.
    result = new XMLHttpRequest();
  }
  else if (window.ActiveXObject) {
    // MSIE
    result = new ActiveXObject("Microsoft.XMLHTTP");
  } 
  else {
    // No known mechanism -- consider aborting the application
  }
  return result;
}