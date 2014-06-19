function main() {

  //~ var chrome_view = new AirChatChromeView();
	//~ window.AirHubView = chrome_view;

	var model = new AirChat(ChromeCommunicator);

	var text_view = new AirChatTextView('0.1.0 - alpha', 'Google Chrome Extension');
	var text_controller = new AirChatTextController(model, text_view);
  
	//~ window.AirHub = model;
  window.Controller = text_controller;
  
  setTimeout(function(){
    text_controller.scanIps();
  }, 3000);
  
};
chrome.app.runtime.onLaunched.addListener(main);
