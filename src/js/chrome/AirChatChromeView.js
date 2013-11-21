function AirChatChromeView() {
	
	var onWindowCreated = function(view) {
		view.contentWindow.console.log('Hello World?');
	};
	
	this.test = function() {
		chrome.app.window.create(
			'../index.html',
			
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