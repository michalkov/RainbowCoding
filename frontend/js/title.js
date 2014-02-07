// JavaScript Document

var titleRenameOkButton = $("#title-rename-ok-button"),
titleRenameCancelButton = $("#title-rename-cancel-button"),
titleRenameNameInput = $("#title-rename-title-input"),
titleRenameDescriptionInput = $("#title-rename-description-input"),
titleRenameWrapper = $("#title-rename-wrapper");

titleRenameNameInput.val(documentTitleLabel.text()); 

titleRenameNameInput.keyup(function() {
	if($(this).val() !== "" && titleRenameDescriptionInput.val() !== "")
	{
		titleRenameOkButton.attr('class', 'title-rename-button');
	}
	else{
		titleRenameOkButton.attr('class', 'title-rename-disabled-button');
	}
});

titleRenameDescriptionInput.keyup(function() {
	if($(this).val() !== "" && titleRenameNameInput.val() !== "")
	{
		titleRenameOkButton.attr('class', 'title-rename-button');
	}
	else{
		titleRenameOkButton.attr('class', 'title-rename-disabled-button');
	}
});

titleRenameCancelButton.click(function() {
	removeTitleRenameBox();
});
		
titleRenameOkButton.click(function() {
	if($(this).attr('class') == "title-rename-disabled-button")
		return;
	
	sendDocumentNameChange();
	removeTitleRenameBox();
});

function removeTitleRenameBox() {
	titleRenameWrapper.detach();	
}

function sendDocumentNameChange(){
	// check if there are changes
	
	if(titleRenameNameInput.val() == documentTitleLabel.text())
		return;
	
	
	xml = xmlHeader + "<project>"+
		"<id>" + projectID + "</id>"+
		"<name>" + titleRenameNameInput.val() + "</name>"+
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
        	sendDocumentNameChangeSuccess(response); 		
        },
        error: function(response) {
            sendDocumentNameChangeError(response);
        }
    });
}

function sendDocumentNameChangeSuccess(response) {
	documentTitleLabel.text = titleRenameNameInput.val();
}

function sendDocumentNameChangeError(response) {
	// show some problems message
	sendDocumentNameChange();	
}