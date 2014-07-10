if (!window.view)
	view = new Object();
view.AirChatTextView = function AirChatTextView(_version, _platform) {
	
	this.about = function() {
		var message =
'+-----------------------------------------------------------------------------+\n\
\n\
	 _____ _     _____     _\n\
	|  _  |_|___|  |  |_ _| |_ \n\
	|     | |  _|     | | | . |\n\
	|__|__|_|_| |__|__|___|___|\n\
\n\
\n\
	AirHub - v' + _version + '\n\
	Running on ' + _platform + '\n\
	Maticulously constructed by:\n\
		Graham Robertson & Thiago Loureiro\n\
\n\
	An app for communicating and sharing easily over LAN. Not CounterStrike tho.\n\
\n\
\n\
+-----------------------------------------------------------------------------+\n';
		console.log(message);
	};
	
	this.printReceivedMessage = function(from, message, timestamp) {
		console.log('Received - ' + from + ':', message, '\n@', new Date(timestamp).toLocaleTimeString() );
	};
  
  this.printSentMessage = function(to, message, timestamp) {
		console.log('Sent - ' + to + ':', message, '\n@', new Date(timestamp).toLocaleTimeString() );
	};
	
	this.showUserDiscovered = function(ip) {
		console.log(ip, 'is online :)');
	};
	
	this.showUserOffline = function(ip) {
		console.log(ip, 'is offline :(');
	};
	
	this.showUsers = function(ips) {
		var o = '\nUsers Online:';
		for (var ip in ips) {
			
      var lastPing = new Date(ips[ip]).toLocaleTimeString();
      
      o += '\n*';
			o += ip;
      o += ' ';
      o += lastPing;
		}
		console.log(o);
	};
  
  this.print = function(text) {
    console.log(text);
  }
};
