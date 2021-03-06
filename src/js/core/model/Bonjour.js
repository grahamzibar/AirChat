if (!window.model)
	model = new Object();
//model.Bonjour = function Bonjour(_ip, _s) {
//~ BONJOUR NEEDS TO BE AN EVENT DISPATCHER AS WELL TO SEND THE RECEIVED MESSAGES TO THE CONTROLLER FOR EXAMPLE

//~ this.inheritFrom = EventDispatcher;
//~ this.inheritFrom();
//~ delete this.inheritFrom;


//~ AND WHEN CREATING THE CONTROLLER:
//~ _s.addEventListener(window.Socket.RECEIVED, onReceived);

window.Bonjour = function Bonjour(_ip, _s) {
	var __self__ = this;
	
	var BONJOUR = 0;
	var SALUT = 1;
	var BYE = 2;
	var STILL_HERE = 3;
	var DIT = 4;
	
	var PORT = 5554;
	var TIMEOUT = 60000;
	
	var _ipList = new Array();
	var _activeList = {};
	
	function __constructor__() {
		calculateIps(new String(_ip));
		_s.addEventListener(window.Socket.RECEIVED, onReceived);
	};
	
	// HELPERS
	function createMessage(command) {
		command += '|';
		command += _ip;
		return utils.Binary.str2ab(command);
	};
	
	function calculateIps(ip) {
		var pivot = ip.lastIndexOf('.') + 1;
		var curBlock = parseInt(ip.substr(pivot));
		var baseIp = ip.substring(0, pivot);
		for (var i = 0, ipList = _ipList; i <= 255; i++) {
			if (i != curBlock)
				ipList.push(baseIp + i);
		}
	};
	
	function registerIp(ip) {
		if (!_activeList[ip])
			_ipList.splice(_ipList.indexOf(ip), 1);
		_activeList[ip] = Date.now();
	};
	
	function removeIp(ip) {
		if (_activeList[ip]) {
			delete _activeList[i];
			_ipList.push(ip);
		}
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
		var now = Date.now();
		for (var ip in _activeList) {
			var time = _activeList[ip];
			if (now - time >= TIMEOUT) {
				console.log(ip, 'est perdu, donc on va le supprimer.');
				removeIp(ip);
			} else
				_s.send(ip, PORT, createMessage(STILL_HERE));
		}
	};
	
	function bye() {
		for (var ip in _activeList)
			_s.send(ip, PORT, createMessage(BYE));
	};
	
	// HANDLERS
	function onReceived(receivedEvent) {
		if (receivedEvent.data) {
			var ip = utils.Binary.ab2str(receivedEvent.data).split('|');
			var command = Number(ip[0]);
			if (ip.length > 2)
				var message = ip[2];
			ip = ip[1];
			
			switch (command) {
				case BONJOUR:
					console.log(ip, 'a dit <<bonjour>>!');
					registerIp(ip);
					_s.send(ip, PORT, createMessage(SALUT));
					break;
				case SALUT:
					console.log(ip, 'a dit <<salut>>!');
					registerIp(ip);
					break;
				case STILL_HERE:
					//console.log(ip, 'est encore là.');
					registerIp(ip);
					break;
				case BYE:
					console.log(ip, 'est parti d\'ici.');
					removeIp(ip);
					break;
				case DIT:
					console.log(ip, ':', message);
					break;
				default:
					console.log('Quoi? Ce n\'est pas possible. On doit debug ça.');
					break;
			}
		}
	};
	
	
	this.sayHello = broadcast.bind(this);
	this.poke = keepAlive.bind(this);
	this.sayGoodBye = bye.bind(this);
	this.send = function(to, message) {
		command = DIT;
		command += '|';
		command += _ip;
		command += '|';
		command += message;
		_s.send(to, PORT, utils.Binary.str2ab(command));
	};
	this.getActiveList = function() {
		return _activeList;
	};
	
	__constructor__();
};
