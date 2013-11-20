(function Communicator(_win, _chrome) {
	var SocketReadyEvent = function SocketReadyEvent(_code) {
		this.code = _code;
	};
	
	var Connection = function Connection(_myIP, _toIP, _port) {
		this.inheritFrom = EventDispatcher;
		this.inheritFrom();
		delete this.inheritFrom;

		var __self__ = this;
		var _socketId = -1;

		var __constructor__ = function() {
	  		_chrome.socket.create('udp', null, onCreate);
		};

		var onCreate = function(createInfo){
			_socketId = createInfo.socketId;
			_chrome.socket.bind(
				_socketId,
				_myIP,
				_port,
				onBind
			);
			_chrome.socket.read(socket, 1024, onRead);
			_chrome.socket.connect(_socketId, _toIP, _port, onConnect);
		};

		var onBind = function(result) {
			__self__.dispatchEvent(Socket.READY, new CReadyEvent(result));
		};

		var onRead = function(readInfo) {
			__self__.dispatchEvent(Socket.RECEIVED, readInfo);
		};
		
		var onConnect = function(result) {
		
		};

		this.send = function(ip) {
		
		};
		
		this.destroy = function() {
		
		};
	
		__constructor__();
	};
	Socket.READY = 0;
	Socket.SENT = 1;
	Socket.RECEIVED = 2;

	var ChromeCommunicator = _win.ChromeCommunicator =
	function ChromeCommunicator() {
		this.inheritFrom = EventDispatcher;
		this.inheritFrom();
		delete this.inheritFrom;

		var __self__ = this;
		var _ip = null;
		
		var onNetworkList = function(data) {
			if (!data[0]) {
				__self__.dispatchEvent(ChromeCommunicator.IP_NOT_FOUND);
				return;
			}
			_ip = data[0].address;
			__self__.dispatchEvent(ChromeCommunicator.READY,{ ip: _ip });
		};
		
		this.start = function() {
			chrome.getNetworkList(onNetworkList);
		};
		
		this.createConnection = function(ip, port) {
			return new Connection(_ip, ip, port);
		};
	};
	ChromeCommunicator.IP_NOT_FOUND = 0;
	ChromeCommunicator.READY = 1;
})(window, chrome);