function main() {
	var chrome_view = new AirChatChromeView();
	
	var model = new AirChat(ChromeCommunicator);
	var text_output = new AirChatTextView('0.1.0 - alpha', 'Google Chrome Extension');
	var text_controller = new AirChatTextController(model, text_output);
	
	
	window.AirHub = model;
	window.AirHubView = chrome_view;
	window.AirHubView.test();

	//~ var chrome_view = new AirChatChromeView();
	//~ window.AirHubView = chrome_view;

	var model = new AirChat(ChromeCommunicator);


  setTimeout(function(){
    var text_view = new AirChatTextView('0.1.0 - alpha', 'Google Chrome Extension');
    var text_controller = new AirChatTextController(model, text_view);
    
    //~ window.AirHub = model;
    window.Controller = text_controller;
    
    setTimeout(function(){
      text_controller.scanIps();
    }, 3000);
  
  }, 5000);
};
chrome.app.runtime.onLaunched.addListener(main);
