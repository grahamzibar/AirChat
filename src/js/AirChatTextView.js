function AirChatTextView(_version, _description, _author) {
	
	this.sayHello = function() {
		console.info(
			'+----------------------------------------<\
			 |
			 |	AirChat - v' + _version + '\
			 |	Maticulously constructed by:\
			 |		' + _author + '\
			 |\
			 |	' + _description + '\
			 |
			 +---------------------------------------->\
			'
		);
	};
	
	
};