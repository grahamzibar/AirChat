window.Bonjour = function Bonjour(_ip, _communicator) {
	var __self__ = this;
	
	var BROADCAST_DELAY = 10000;
	var TIMEOUT = 60000;
	
	var _ipList = new Array();
	var _activeList = {};
	var _receptionist;
	var _s;
	
	function __constructor__() {
		console.log('constructing');
		setReceptionist();
		setTimeout(timeoutCheck, TIMEOUT); 
		
		_ip = new String(_ip);
		getIps();
		console.log('Creating Broadcaster');
		_s = _communicator.createSocket(Socket.UDP, 5554, onCreate);
	};
	
	function onCreate() {
		console.log('Broadcaster Created');
		_s.addEventListener(window.Socket.RECEIVED, onReceived);
		broadcast();
	};
	
	function onReceived(receivedEvent) {
		console.log('Broadcaster Received');
		var receivedIp;
		if (receivedEvent.data) {
			receivedIp = ab2str(receivedEvent.data).split("Bonjour:");
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
			receivedIp = ab2str(receivedEvent.data).split("Bonjour:");
			if (receivedIp = receivedIp[1]) {
				registerIp(receivedIp)
				_receptionist.send(receivedIp, 5554, str2ab("Bonjour:" + _ip));
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
		return Date.now();
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
		console.log('Broadcasting!!!!!!');
		for (var i = 0; i < _ipList.length; i++)
			bonjour(_ipList[i]);
		setTimeout(broadcast, BROADCAST_DELAY); // perhaps we need some way to flag this?
	};
	
	function setReceptionist() {
		console.log('Creating Receptionist');
		_receptionist = _communicator.createSocket('udp', 5556, onReceptionistCreated);
	};
	
	function getIps() {
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
