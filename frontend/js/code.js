// JavaScript Document
var editor;

var fileID;
var projectID;
var pendingRequest = false;
var pendingSendDocumentChangesRequest = false;
var pendingSendProjectChangesRequest = false;
var intervalID;


// Keytimer
var delay = (function(){
  var timer = 0;
  return function(callback, ms){
    clearTimeout (timer);
    timer = setTimeout(callback, ms);
  };
})();



$(document).ready(function($) {
	

	  
	$(".has-sub-top").each(function() {
		var $thisTab = $(this);
        $thisTab.click(function() {
			$thisTab.toggleClass("active");
		});
    });
	
	$(document).mouseup(function() {
		$(".has-sub-top.active").each(function() {
			$(this).toggleClass("active");	
		});
	});
	
	initializeTitleRename();	
	
	editor = CodeMirror.fromTextArea(document.getElementById("code"), {
        lineNumbers: true,
        mode: "text/x-csrc"
    });
	
	editor.setOption("indentWithTabs", true);
	
	editor.on("keyup", function(){
		delay(function(){
      		sendDocumentChanges();
    	}, 200 );
	});
	
	$(".CodeMirror").height($(window).height() - 
		$("#document-title").outerHeight(true) - 
		$("#cssmenu").outerHeight(true) - 
		$("#csstoolbox").outerHeight(true));
	
	
	$( window ).resize(function(){
		$(".CodeMirror").height($(window).height() - 
		$("#document-title").outerHeight(true) - 
		$("#cssmenu").outerHeight(true) - 
		$("#csstoolbox").outerHeight(true))
	});
	
	$("#mode-list").change(function(){
		sendDocumentChanges()
		editor.setOption("mode", $(this).val());
	});
	
	$("#indent-button").click(function(){
		var cursorStart, cursorEnd;
		
		cursorStart = editor.getCursor("start").line;
		cursorEnd = editor.getCursor("end").line;
				
		if(cursorEnd == cursorStart){
			editor.indentLine(cursorStart, editor.getOption("tabSize"));	
		}
		else {
			for(var i = cursorStart; i <= cursorEnd; i++){
				editor.indentLine(i, editor.getOption("tabSize"));
				//console.log(i);	
			}
		}
		
		sendDocumentChanges();
		return false;
	});
	
	$("#de-indent-button").click(function(){
		var cursorStart, cursorEnd;
		
		cursorStart = editor.getCursor("start").line;
		cursorEnd = editor.getCursor("end").line;
		
		if(cursorEnd == cursorStart){
			editor.indentLine(cursorStart, -editor.getOption("tabSize"));
			return false;	
		}
		
		for(var i = cursorStart; i <= cursorEnd; i++){
			editor.indentLine(i, -editor.getOption("tabSize"));	
		}
		sendDocumentChanges();
		return false;
	});
	
	$("#select-all-button").click(function(){
		editor.setSelection({line: 0, ch: 0}, {line: editor.lineCount() - 1});
		return false;
	});
	
	$("#open-file-button").click(function(){
		$("#open-file-input").click();
		return false;
	});
	
	$("#open-file-input").change(function(e){
		// react
	});
	
	$("#comment-button").click(function(){
		var cursorStart = editor.getCursor("start").line;
		var topPositionOfLine;
		editor.addLineClass(cursorStart, "background", "commented-line");
		
		topPositionOfLine = ($("."+editor.lineInfo(cursorStart).bgClass).position().top);
		
		insertCommentPlace(1, topPositionOfLine );
	});
	
	
	// Load document with ID
	if($.urlParam('id') != undefined){
		fileID = $.urlParam('id');
		getDocumentChanges();
		
		intervalID = setInterval(getDocumentChanges, 3000);
	}
	else {
		showDialogBoxInformation("Please set correct document ID");	
	}
	
	// setInterval(sendDocumentChanges);
});


function initializeTitleRename(){
	$("#document-title").click(function(){
		showDialogBox("Rename document", 
		"<span>Insert document name:</span>" +
		"<input id=\"rename-input\" class=\"dialog-box-input\"" +
		"value=\"" + $("#document-title").text() + "\">",
		"<button id=\"rename-ok-button\" class=\"dialog-box-button\">OK</button>"+
		"<button id=\"rename-cancel-button\" class=\"dialog-box-button\">Cancel</button>", false);
		
		$("#rename-cancel-button").click(function() {
			removeDialogBox();
		});
		
		$("#rename-ok-button").click(function() {
			if($(this).attr('class') == "dialog-box-button-disabled")
				return;
			
			$("#document-title").text($("#rename-input").val());
			removeDialogBox();
			sendProjectChanges();
		});
		
		$("#rename-input").keyup(function() {
			if($(this).val() == "")
			{
				$("#rename-ok-button").attr('class', 'dialog-box-button-disabled');
			}
			else{
				$("#rename-ok-button").attr('class', 'dialog-box-button');
			}
		});
	});
}

function insertCommentPlace(line, top){
	$("body").append("<div class=\"comment-box\">Test</div>");
}

function sendDocumentChanges(){
	
	xml = xmlHeader + "<file>"+
		"<id>" + fileID + "</id>"+
		"<content>"+ editor.getValue() + "</content>"+
		"<prev_version></prev_version>"+
		"<language><id>" + ($("#mode-list").get(0).selectedIndex + 1) + "</id></language>"+
		"<project><id>"+ projectID +"</id></project>"+
		"</file>";
	
	$.ajax({
        url: filePath,
        processData: false,
        type: "PUT",
		contentType: xmlContent,
        data: xml,
		timeout: 2000,
        success: function(response){
        	sendDocumentChangesSuccess(response); 		
        },
        error: function(response) {
            sendDocumentChangesError(response);
        }
    });
}

function sendDocumentChangesSuccess(){
	
}

function sendDocumentChangesError(){
	
}

function sendProjectChanges(){
	// check if there are changes
	
	xml = xmlHeader + "<project>"+
		"<id>" + projectID + "</id>"+
		"<name>" + $("#document-title").text() + "</name>"+
		"<description></description>"+
		"</project>";
	
	$.ajax({
        url: projectPath,
        processData: false,
        type: "PUT",
		contentType: xmlContent,
        data: xml,
		timeout: 2000,
        success: function(response){
        	sendProjectChangesSuccess(response); 		
        },
        error: function(response) {
            sendProjectChangesError(response);
        }
    });
}

function sendProjectChangesSuccess(response){
	
}

function sendProjectChangesError(response){
	
}

function getDocumentChanges(){
	
	if(pendingRequest)
		return;
	
	pendingRequest = true;
	$.ajax({
        url: filePath + "/" + fileID,
        processData: false,
        type: "GET",
		timeout: 2000,
        success: function(response){
        	getDocumentChangesSuccess(response); 		
        },
        error: function(response) {
            getDocumentChangesError(response);
        }
    });
}

function getDocumentChangesSuccess(response){
	
	if(response == ""){
		clearInterval(intervalID);
		showDialogBoxInformation("Please set correct document ID");	
		return;	
	}
	
	projectID = $(response).find("project").children("id").text();
	content = $(response).find("content").text();
	projectName = $(response).find("project").children("name").text();
	projectDescription = $(response).find("project").children("description").text();
	languageID = $(response).find("language").children("id").text();
	
	insertDocumentChanges(content, projectName, projectDescription, languageID);
	
	pendingRequest = false;
}

function getDocumentChangesError(response){
	pendingRequest = false;
}


function insertDocumentChanges(content, projectName, projectDescription, languageID){
	if($("#document-title").text() !== projectName){
		$("#document-title").text(projectName);
	}
	
	if($("#mode-list").get(0).selectedIndex !== languageID){
		$("#mode-list").get(0).selectedIndex = languageID - 1;
		editor.setOption("mode", $("#mode-list").val());
	}
	
	var startSelection, stopSelection, wasSelected = false;
	
	// check if something is selected
	if(editor.somethingSelected()){
		wasSelected = true;
		startSelection = {lineHandle: editor.getLineHandle(editor.getCursor("start").line), ch: editor.getCursor("start").ch};
		stopSelection = {lineHandle: editor.getLineHandle(editor.getCursor("end").line), ch: editor.getCursor("end").ch};
	}
	// test
	cursorLine = editor.getCursor("start").line;
	cursorLineHandle = editor.getLineHandle(cursorLine);
	cursorLinePosition = editor.getCursor("start").ch;
	
	
	editor.setValue(content);
	
	if(wasSelected){
		if(editor.getLineNumber(startSelection.lineHandle) !== null && editor.getLineNumber(stopSelection.lineHandle) !== null){
			editor.setSelection({line: editor.getLineNumber(startSelection.lineHandle), ch: startSelection.ch},
								{line: editor.getLineNumber(stopSelection.lineHandle), ch: stopSelection.ch});
		}		
	}	
	else if(editor.getLineNumber(cursorLineHandle) !== null){
		editor.setCursor(editor.getLineNumber(cursorLineHandle), cursorLinePosition);
	}
	else{
		editor.setCursor(cursorLine, cursorLinePosition);	
	}
}