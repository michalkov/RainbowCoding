// JavaScript Document

var signInButton = $("#login-sign-in-button"),
registerButton = $("#login-register-button"),
usernameInput = $("#login-username-input"),
passwordInput = $("#login-password-input");

usernameInput.keyup(function() {
	if($(this).val() !== "" && passwordInput.val() !== "")
	{
		signInButton.attr('class', 'login-button');
		registerButton.attr('class', 'login-button');
	}
	else{
		signInButton.attr('class', 'login-disabled-button');
		registerButton.attr('class', 'login-disabled-button');
	}
});

passwordInput.keyup(function() {
	if($(this).val() !== "" && passwordInput.val() !== "")
	{
		signInButton.attr('class', 'login-button');
		registerButton.attr('class', 'login-button');
	}
	else{
		signInButton.attr('class', 'login-disabled-button');
		registerButton.attr('class', 'login-disabled-button');
	}
});