(function ServerModule(_win) {
	
	var PROTOCOL = 'http://';
	var HELLO_PATH = '/hello';
	var DOWNLOAD_PATH = '/download';
	var CONNECT_PATH = '/connect';
	
	var Server = _win.Server =
	function Server(_myIP, _communicator) {
		this.inheritFrom = EventDispatcher;
		this.inheritFrom();
		delete this.inheritFrom;
		
		var __self__ = this;
		var _socket = null;
		var _allowDownload = false;
		var _connectionOpen = false;
		
		var __constructor__ = function() {
			_communicator.createSocket();
		};
		
		var socketReady = function(socket) {
			_socket = socket;
			// What other setup is required?
			__self__.dispatchEvent(Server.READY);
		};
		
		this.sayHello = function(ip, info) {
			info['ip'] = _myIP;
			var request = new _win.XMLHttpRequest();
			request.open('GET', getDownloadUrl(ip), true);
			request.send(JSON.stringify(info));
		};
		
		this.allowDownload = function(bool) {
			_allowDownload = bool;
		};
		
		this.doesAllowDownload = function() {
			return _allowDownload;
		};
		
		var getDownloadUrl = this.getDownloadUrl = function(ip) {
			return PROTOCOL + (ip | _myIP) + DOWNLOAD_PATH;
		};
		
		this.getConnectPath = function() {
			return PROTOCOL + _myIP + CONNECT_PATH;
		};
		
		__constructor__();
	};
	// Event
	Server.READY = 0;
})(window);