window.Bonjour = function Bonjour(_ip) {
	var __self__ = this;
	
	var BROADCAST_DELAY = 10000;
	var TIMEOUT = 60000;
	
	var _ipList = new Array();
	var _activeList = {};
	var _receptionist;
	var _s;
	
	function __constructor__() {
		__self__.getIps();
		_s = communicator.createSocket(Socket.UDP, 5554, onCreate);
	};
	
	function onCreate() {
		_s.addEventListener(window.Socket.RECEIVED, onReceived);
		__self__.broadcast();
	};
	
	function onReceived(receivedEvent) {
		var receivedIp;
		if (receivedEvent.data) {
			receivedIp = receivedEvent.data.split("Bonjour:");
			if (!_activeList[receivedIp]) {
				_ipList.splice(_ipList.indexOf(receivedIp), 1);
				bonjour(receivedIp);
			}
			_activeList[receivedIp] = getNow();
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
	};
	
	function getNow() {
		return Date.now().getTime();
	};
	
	function bonjour(to) {
		_s.send(to, 5556, str2ab("Bonjour:" + _ip));
	};
	
	this.broadcast = function() {
		for (var i = 0; i < _ipList.length; i++)
			bonjour(_ipList[i]);
		setTimeout(__self__.broadcast, BROADCAST_DELAY); // perhaps we need some way to flag this?
	};
	
	this.setReceptionist = function() {
	
	_receptionist = communicator.createSocket('udp', 5556, function(){
	_receptionist.addEventListener(window.Socket.RECEIVED, function(receivedEvent){
	
	if(receivedEvent.data){
	
	receivedIp = receivedEvent.data.split("Bonjour! My ip is:");
	
	if(_ipList.indexOf(receivedIp[1]) == -1){
	send(receivedIp[1], 5554, str2ab("Bonjour:" + _ip));
	}
	}
	});
	});    
	}
	
	this.getIps = function () {
		var slicedIp = ip.split(".");
		
		var curBlock = parseInt(slicedIp[3]);
		
		for(var i=1; i<=254; i++){
		
		if(i!=curBlock){
		_ipList.push(slicedIp[0] + "." + slicedIp[1] + "." + slicedIp[2] + "." + i);
		}
		}
	}
	
	getIps();
	setReceptionist();
	
	
	__constructor__();
};
