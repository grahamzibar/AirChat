function AirChatChromeView() {
  
	var onWindowCreated = function(view) {
		view.contentWindow.console.log('Hello World?');
    
    var onWindowLoaded = function(){
      view.contentWindow.window.document.getElementById("chatbox").innerHTML = view.contentWindow.window.document.getElementById("chatbox").innerHTML + '<br> TRAAAAA';
    }
    
    view.contentWindow.window.onload = onWindowLoaded;
    
    AirChatChromeView.d = view.contentWindow.window.document;
    
	};
  
	
	this.openView = function() {
		
	};
  
  this.appendChatBox = function(s){
    AirChatChromeView.d.getElementById("chatbox").innerHTML = AirChatChromeView.d.getElementById("chatbox").innerHTML + "<br>" + s;
  }
	
	this.test = function() {
		chrome.app.window.create(
			'../../../html/index.html',
			
			{
				'bounds': {
					'width': 400,
					'height': 500
				}
			},
			
			onWindowCreated
		);
	};
};
