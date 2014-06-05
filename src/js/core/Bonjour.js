window.Bonjour = function Bonjour(_ip, _communicator) {
	var __self__ = this;
	var TIMEOUT = 60000;
	
	var _ipList = new Array();
	var _activeList = {};
	var _receptionist;
	var _s;
	
	function __constructor__() {
		_ip = new String(_ip);
		calculateIps();
		_receptionist = _communicator.createSocket('udp', 5556, onReceptionistCreated);
		_s = _communicator.createSocket(Socket.UDP, 5554, onBroadcasterCreated);
	};
	
	// HELPERS
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
	
	function getNow() {
		return Date.now();
	};
	
	// API
	function bonjour(to) {
		_s.send(to, 5556, str2ab("Bonjour:" + _ip));
	};
	
	function broadcast() {
		console.log('Broadcasting!!!!!!');
		for (var i = 0; i < _ipList.length; i++)
			bonjour(_ipList[i]);
	};
	
	function keepAlive() {
		var now = getNow();
		for (var ip in _activeList) {
			var time = _activeList[ip];
			if (now - time >= TIMEOUT)
				_ipList.push(receivedIp);
		}
		setTimeout(timeoutCheck, TIMEOUT); 
	};
	
	// HANDLERS
	function onBroadcasterCreated() {
		console.log('Broadcaster Created');
		_s.addEventListener(window.Socket.RECEIVED, onBroadcasterReceived);
	};
	
	function onBroadcasterReceived(receivedEvent) {
    		console.log('Broadcaster Received from ', ab2str(receivedEvent.data));
		if (receivedEvent.data) {
			var receivedIp = ab2str(receivedEvent.data).split("Bonjour:");
			if (receivedIp = receivedIp[1])
				registerIp(receivedIp);
		}
	};
	
	function onReceptionistCreated() {
		console.log('Receptionist created!');
		_receptionist.addEventListener(window.Socket.RECEIVED, onReceptionistReceived);
	};
	
	function onReceptionistReceived(receivedEvent) {
		console.log('Reception Received from ', ab2str(receivedEvent.data));
		if (receivedEvent.data) {
			var receivedIp = ab2str(receivedEvent.data).split("Bonjour:");
			if (receivedIp = receivedIp[1]) {
				registerIp(receivedIp);
				_receptionist.send(receivedIp, 5554, str2ab("Bonjour:" + _ip));
			}
		}
	};
	
	this.broadcast = broadcast.bind(this);
	this.keepAlive = keepAlive.bind(this);
	this.getActiveList = function() {
		return _activeList;
	};
	
	__constructor__();
};
