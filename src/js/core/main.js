function main() {
	var chrome_view = new AirChatChromeView();
	
	var model = new AirChat(ChromeCommunicator);
	var text_output = new AirChatTextView('0.1.0 - alpha', 'Google Chrome Extension');
	var text_controller = new AirChatTextController(model, text_output);
	
	
	window.AirHub = model;
	window.AirHubView = chrome_view;
	window.AirHubView.test();
};
chrome.app.runtime.onLaunched.addListener(main);
