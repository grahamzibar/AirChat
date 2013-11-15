function onLaunched() {
  model = new AirChat();
  view = new AirChatChromeView();
  text_output = new AirChatTextView(
    '0.1.0 - alpha',
    'Google Chrome', 
    'An app for communicating and sharing easily over WiFi',
    'Graham Robertson & Thiago Loureiro'
  );
  controller = new AirChatController(model, view);
  
  // TEST
  view.test();
  text_output.sayHello();
};

// Get'er done!
chrome.app.runtime.onLaunched.addListener(onLaunched);