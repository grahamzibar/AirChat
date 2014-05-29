window.Bonjour = function Bonjour(_ip) {
	var __self__ = this;
	
	var BROADCAST_DELAY = 10000;
	var TIMEOUT = 60000;
	
	var _ipList = new Array();
	var _activeList = {};
	var _receptionist;
	var _s;
	
	function __constructor__() {
		setReceptionist();
		setTimeout(timeoutCheck, TIMEOUT); 
		
		_ip = new String(_ip);
		getIps();
		_s = _communicator.createSocket(Socket.UDP, 5554, onCreate);
	};
	
	function onCreate() {
		_s.addEventListener(window.Socket.RECEIVED, onReceived);
		broadcast();
	};
	
	function onReceived(receivedEvent) {
		var receivedIp;
		if (receivedEvent.data) {
			receivedIp = receivedEvent.data.split("Bonjour:");
			if (receivedIp = receivedIp[1])
				registerIp(receivedIp);
		}
	};
	
	function onReceptionistCreated() {
		_receptionist.addEventListener(window.Socket.RECEIVED, onReceptionistReceived);
	};
	
	function onReceptionistReceived(receivedEvent) {
		if (receivedEvent.data) {
			receivedIp = receivedEvent.data.split("Bonjour:");
			if (receivedIp = receivedIp[1]) {
				registerIp(receivedIp)
				send(receivedIp, 5554, str2ab("Bonjour:" + _ip));
			}
		}
	};
	
	function timeoutCheck() {
		var now = getNow();
		// change to array eventually
		for (var ip in _activeList) {
			var time = _activeList[ip];
			if (now - time >= TIMEOUT)
				_ipList.push(receivedIp);
		}
		setTimeout(timeoutCheck, TIMEOUT); 
	};
	
	function getNow() {
		return Date.now().getTime();
	};
	
	function bonjour(to) {
		_s.send(to, 5556, str2ab("Bonjour:" + _ip));
	};
	
	function registerIp(receivedIp) {
		if (!_activeList[receivedIp])
			_ipList.splice(_ipList.indexOf(receivedIp), 1);
		_activeList[receivedIp] = getNow();
	};
	
	function broadcast() {
		for (var i = 0; i < _ipList.length; i++)
			bonjour(_ipList[i]);
		setTimeout(broadcast, BROADCAST_DELAY); // perhaps we need some way to flag this?
	};
	
	function setReceptionist() {
		_receptionist = _communicator.createSocket('udp', 5556, onReceptionistCreated);
	};
	
	function getIps () {
		var pivot = _ip.lastIndexOf('.') + 1;
		var curBlock = parseInt(_ip.substr(pivot));
		var baseIp = _ip.substring(0, pivot);
		for (var i = 0, ipList = _ipList; i <= 255; i++) {
			if (i != curBlock)
				ipList.push(baseIp + i);
		}
	};
	
	__constructor__();
};
