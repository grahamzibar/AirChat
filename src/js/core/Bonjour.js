window.Bonjour = function Bonjour(_ip, _communicator) {
	var __self__ = this;
	
	var BONJOUR = 0;
	var SALUT = 1;
	var BYE = 2;
	var STILL_HERE = 3;
	
	var PORT = 5554;
	var TIMEOUT = 60000;
	
	var _ipList = new Array();
	var _activeList = {};
	var _s;
	
	function __constructor__() {
		_ip = new String(_ip);
		calculateIps();
		_s = _communicator.createSocket(Socket.UDP, PORT, onCreated);
	};
	
	// HELPERS
	function createMessage(command) {
		command += '|';
		command += _ip;
		return str2ab(command);
	};
	
	function calculateIps() {
		var pivot = _ip.lastIndexOf('.') + 1;
		var curBlock = parseInt(_ip.substr(pivot));
		var baseIp = _ip.substring(0, pivot);
		for (var i = 0, ipList = _ipList; i <= 255; i++) {
			if (i != curBlock)
				ipList.push(baseIp + i);
		}
	};
	
	function registerIp(receivedIp) {
		if (!_activeList[receivedIp])
			_ipList.splice(_ipList.indexOf(receivedIp), 1);
		_activeList[receivedIp] = getNow();
	};
	
	function removeIp(ip) {
		if (_activeList[ip]) {
			delete _activeList[i];
			_ipList.push(ip);
		}
	};
	
	function getNow() {
		return Date.now();
	};
	
	// API
	function bonjour(to) {
		_s.send(to, PORT, createMessage(BONJOUR));
	};
	
	function broadcast() {
		for (var i = 0; i < _ipList.length; i++)
			bonjour(_ipList[i]);
	};
	
	function keepAlive() {
		var now = getNow();
		for (var ip in _activeList) {
			var time = _activeList[ip];
			if (now - time >= TIMEOUT)
				removeIp(ip);
			else
				_s.send(ip, PORT, createMessage(STILL_HERE));
		}
	};
	
	function bye() {
		//_s.removeEventListener();
		for (var ip in _activeList)
			_s.send(ip, PORT, createMessage(BYE));
	};
	
	// HANDLERS
	function onCreated() {
		_s.addEventListener(window.Socket.RECEIVED, onReceived);
	};
	
	function onReceived(receivedEvent) {
		if (receivedEvent.data) {
			var ip = ab2str(receivedEvent.data).split('|');
			var command = Number(ip[0]);
			ip = ip[1];
			
			switch (command) {
				case BONJOUR;
					registerIp(ip);
					_s.send(ip, PORT, createMessage(SALUT));
					break;
				case SALUT:
					registerIp(ip);
					break;
				case STILL_HERE:
					registerIp(ip);
					break;
				case BYE:
					removeIp(ip);
					break;
				default:
					console.log('WTF?');
					break;
			}
		}
	};
	
	this.broadcast = broadcast.bind(this);
	this.keepAlive = keepAlive.bind(this);
	this.bye = bye.bind(this);
	this.getActiveList = function() {
		return _activeList;
	};
	
	__constructor__();
};
