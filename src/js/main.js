function onLaunched() {
  chrome.app.window.create('../index.html', {
    'bounds': {
      'width': 400,
      'height': 500
    }
  }, onWindowCreated);
};

// THIS WILL BE CHANGED TO BE IN AirChatView.js... will use my fetch library for
// importing external javascript files. *TODO*

// p.s. we also need a good file importer...
function onWindowCreated(appWindow) {
  var window = appWindow.contentWindow;
  AirChat = window.AirChat;
  AirChatTextView = window.AirChatTextView;
  // The above is such a hack!!
  
  model = new AirChat();
  view = new AirChatTextView();
  // add controller here...
};

// Get'er done!
chrome.app.runtime.onLaunched.addListener(onLaunched);