(function Communicator(_win, _chrome) {
	var SocketEvent = function SocketEvent(_code) {
		this.code = _code;
	};
	
	var AcceptEvent = function AcceptEvent(_id, _data) {
		this.id = _id;
		this.data = _data;
		this.output = null;
	};
	
	var ReceivedEvent = function(_data) {
		this.data = _data;
	};
	
	var Socket = _win.Socket = function Socket(_myIP, _type, _port, _onready, _onerror) {
		// implements the "Socket Interface"
		this.inheritFrom = utils.EventDispatcher;
		this.inheritFrom();
		delete this.inheritFrom;

		var __self__ = this;
		var _socketId = -1;
		var _acceptId = -1;

		var __constructor__ = function() {
	  		_chrome.socket.create(_type, null, onCreate);
		};

		var onCreate = function(info) {
			_socketId = info.socketId;
			
			if (_type == Socket.TCP) {
				console.log('Creating TCP socket listener:', _myIP);
				_chrome.socket.listen(
					info.socketId,
					_myIP,
					_port,
					onBind
				);
			} else if (_type == Socket.UDP) {
				_chrome.socket.bind(
					info.socketId,
					_myIP,
					_port,
					onBind
				);
			} else if (_onerror)
				_onerror(new SocketEvent(-1));
		};
		
		var onBind = function(code) {
			if (code === 0) {
				setupReceive();
				_onready(new SocketEvent(code));
			} else if (_onerror)
				_onerror(new SocketEvent(code));
		};
		
		var setupReceive = function() {
			console.log('setup receive');
			if (_type == Socket.TCP)
				_chrome.socket.accept(_socketId, onAccept);
			else if (_type == Socket.UDP) {
				_chrome.socket.recvFrom(_socketId, onReceive);
      }
    };
		
		var onAccept = function(info) {
			_acceptId = info.socketId;
			console.log('Connection Accepted...');
			_chrome.socket.read(info.socketId, onRead);
		};
		
		var onReceive = function(info) {
			__self__.dispatchEvent(Socket.RECEIVED, new ReceivedEvent(info.data));
			_chrome.socket.recvFrom(_socketId, onReceive);
		};
		
		var onRead = function(result) {
			console.log('Reading request.');
			var e = new AcceptEvent(_acceptId, result.data);
			__self__.dispatchEvent(Socket.RECEIVED, e);
			_chrome.socket.write(_acceptId, e.output, onWrite);
		};
		
		var onWrite = function(e) {
			console.log('Reply sent');
			_chrome.socket.destroy(_acceptId);
			_chrome.socket.accept(_socketId, onAccept);
		};
		
		var onSend = function(info) {
			// do anything??
		};

		this.send = function(ip, port, data) {
			if (_type == Socket.UDP)
				_chrome.socket.sendTo(_socketId, data, ip, port, onSend);
		};
		
		this.destroy = function() {
			_chrome.socket.destroy(_socketId);
			// ??
		};
	
		__constructor__();
	};
	
	Socket.UDP = 'udp';
	Socket.TCP = 'tcp';
	// EVENTS
	Socket.SENT = 0;
	Socket.RECEIVED = 1;
	
	if (!_win.model)
		_win.model = new Object();
	var ChromeCommunicator = _win.model.ChromeCommunicator =
	function ChromeCommunicator(_onready, _onerror) {
		// implements the "Communicator Interface"
		var __self__ = this;
		var _ip = null;
		
		var onNetworkList = function(data) {
			var size = data.length;
			if (!size) {
				if (_onerror)
					_onerror();
				return;
			}
			for (var i = 0; i < size; i++) {
				if (data[i].address.indexOf('.') !== -1) {
					_ip = data[i].address;
					_onready(_ip);
					return;
				}
			}
			if (_onerror)
				_onerror();
		};
		
		this.getIp = function() {
			return _ip;
		};
		
		this.createSocket = function(type, port, onready) {
			return new Socket('0.0.0.0', type, port, onready);
		};
		
		_chrome.socket.getNetworkList(onNetworkList);
	};
})(window, chrome);
