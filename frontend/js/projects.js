var lastProjectRequest;

$(document).ready(function($) {
	//showStartMenu();
	
	if(window.location.hash == "")
		window.location.hash = "#my-projects";
	
	if(window.location.hash == "#my-projects"){
		loadProjectList();
		$("#my-projects-option").toggleClass("activeMenuOption");
	}
	else if(window.location.hash == "#shared"){
		$("#shared-option").toggleClass("activeMenuOption");
	}
	
	$("#my-projects-option").click(function() {
		toggleActiveButtons();
		$(this).toggleClass("activeMenuOption");
		loadProjectList();		
	});
	
	$("#shared-option").click(function() {
		toggleActiveButtons();
		$(this).toggleClass("activeMenuOption");
	});
	
	$("#create-project-button").click(function() {
		showCreateNewProjectDialogBox();
	});
	
	/*$.ajax({
        dataType : "html",
        url : "login.html",
        success : function(results) {
     	   $("body").append(results);
		   
		   $.getScript( "js/login.js" )
        }
    });
	*/
});

function showCreateNewProjectDialogBox(){
	var content = "<span>Insert project title:</span>" +
		"<input id=\"project-name-input\" class=\"dialog-box-input\"" +
		"value=\"Document title\">" +
		"<span>Insert project description:</span>" +
		"<input id=\"project-description-input\" class=\"dialog-box-input\"" +
		"value=\"Description\">";
		
	var buttons = "<button id=\"create-project-ok-button\" class=\"dialog-box-button\">OK</button>"+
		"<button id=\"create-project-cancel-button\" class=\"dialog-box-button\">Cancel</button>"
		
	showDialogBox("Create new project",content, buttons, false);
		
		$("#create-project-cancel-button").click(function() {
			removeDialogBox();
		});
		
		$("#create-project-ok-button").click(function() {
			if($(this).attr('class') == "dialog-box-button-disabled")
				return;
			
			sendNewProjectRequest($("#project-name-input").val(), $("#project-description-input").val());
			removeDialogBox();
		});
		
		$("#project-name-input").keyup(function() {
			if($(this).val() == "")
			{
				$("#create-project-ok-button").attr('class', 'dialog-box-button-disabled');
			}
			else{
				$("#create-project-ok-button").attr('class', 'dialog-box-button');
			}
		});
}

function sendNewProjectRequest(name, description){
	//var xml = 
	lastProjectRequest = new ProjectRequest(name, description);
	
	// id na stałe
	
	/*var req = createRequest(); // defined above
		// Create the callback:
		req.onreadystatechange = function() {
  		if (req.readyState != 4) return; // Not there yet
  		if (req.status != 200) {
    	// Handle request failure here...
    	return;
  		}
  		// Request successful, read the response
  		var resp = req.responseText;
  		// ... and use it as needed by your app.
		console.log(req.responseXML);
	}
	
	req.open("GET", projectPath, true);
	req.send();*/
	
	var xml = xmlHeader + "<project>"+
    	"<description>" + lastProjectRequest.description+"</description>"+
    	"<operator><id>1</id></operator>" +
		"<name>" + lastProjectRequest.name + "</name>" +
		"</project>"
		console.log(projectPath);
	$.ajax({
        url: projectPath, 
		crossDomain: true,
        processData: false,
        type: "POST",
		contentType: xmlContent,
        data: xml,
		timeout: 2000,
        success: function(response){
        	sendNewProjectRequestSuccess(response); 		
        },
        error: function(response) {
            sendNewProjectRequestError(response);
        }
    });
}


function sendNewProjectRequestSuccess(response){
	
	var projectID = $(response).find("project").children("id").text();
	
	xml = xmlHeader + "<file>"+
		"<content>Write your code</content>"+
		"<prev_version></prev_version>"+
		"<language><id>1</id></language>"+
		"<project><id>"+ projectID +"</id></project>"+
		"</file>";
		
	$.ajax({
        url: filePath, 
		crossDomain: true,
        processData: false,
        type: "POST",
		contentType: xmlContent,
        data: xml,
		timeout: 2000,
        success: function(response){
        	sendNewFileRequestSuccess(response); 		
        },
        error: function(response) {
            sendNewFileRequestError(response);
        }
    });
}

function sendNewProjectRequestError(response){
	
}

function sendNewFileRequestError(response){
	console.log(response);
}

function sendNewFileRequestSuccess(response){
	var projectID = $(response).find("file").children("id").text();
	
	window.open(documentPath + "?id=" + projectID, '_blank');
}

function loadProjectList(){
	//$("#content").empty();
	//var header = "<div id=\"my-projects-content-header\">TITLE</div>";
	//$("#content").append(header);
	
	$(".project-list-row").each(function() {
		var $thisRow = $(this);
        $thisRow.click(function() {
			toggleActiveProjectRow();
			$thisRow.toggleClass("active");
			$thisRow.unbind("click");
		});
    });
}

function loadSharedProjectList(){
	
}

function toggleActiveButtons(){
	$(".activeMenuOption").each(function() {
		var $thisButton = $(this);
        $thisButton.toggleClass("activeMenuOption");
    });
}

function toggleActiveProjectRow() {
	$(".project-list-row.active").each(function() {
		var $thisRow = $(this);
        $thisRow.toggleClass("active");
		$thisRow.click(function() {
			toggleActiveProjectRow();
			$thisRow.toggleClass("active");
		});
    });
}

function ProjectRequest(name, description){
	this.name = name;
	this.description = description;	
}

