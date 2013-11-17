function AirChatTextView(_version, _platform, _description, _author) {
	
	this.sayHello = function() {
		// This should switch to use an actual window... embedded within
		// our AirChatChromeView
		console.log(
'+-----------------------------------------------------------------------------+\n\
\n\
	AirChat - v' + _version + '\n\
	Running on ' + _platform + '\n\
	Maticulously constructed by:\n\
		' + _author + '\n\
\n\
	' + _description + '\n\
\n\
+-----------------------------------------------------------------------------+\n'
		);
	};
	
	
};