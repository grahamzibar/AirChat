function main() {
	var model = new AirChat(ChromeCommunicator);
	var text_output = new AirChatTextView('0.1.0 - alpha', 'Google Chrome Extension');
	var text_controller = new AirChatTextController(model, text_output);
	
	// console access, bruh
	window.AirHub = model;
	window.AirHubView = null;
};
chrome.app.runtime.onLaunched.addListener(main);