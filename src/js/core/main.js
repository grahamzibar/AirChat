function main() {
	var chrome_view = new view.AirChatChromeView();
	
	var mod = new model.AirChat(model.ChromeCommunicator);
	var text_output = new view.AirChatTextView('0.1.0 - alpha', 'Google Chrome Extension');
	var text_controller = new controller.AirChatTextController(model, text_output);
	
	window.AirHub = mod;
	window.AirHubView = chrome_view;
	window.AirHubView.test();

  setTimeout(function(){
    var text_view = new view.AirChatTextView('0.1.0 - alpha', 'Google Chrome Extension');
    var text_controller = new controller.AirChatTextController(mod, text_view);
    
    window.Controller = text_controller;
    
    setTimeout(function(){
      text_controller.scanIps();
    }, 3000);
  
  }, 5000);
};
chrome.app.runtime.onLaunched.addListener(main);
