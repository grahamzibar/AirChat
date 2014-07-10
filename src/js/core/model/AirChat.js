/*

	Shhh, this class is a controller.  Don't tell anyone.
	It contains the logic for events, loops, etc.
	
	This provides the interface for console input.
	How do ya feel?  HOW?!?!?!?!


*/
if (!window.model)
	model = new Object();
model.AirChat = function AirChat(Communicator) {
	this.inheritFrom = EventDispatcher;
	this.inheritFrom();
	delete this.inheritFrom;
	
	var PORT = 5554;
	
	var _s;
	
	this.ip;
	this.model;
	this.bonjour;
	this.communicator;
	
	function __constructor__() {
		this.communicator = new Communicator(oncommunicatorready.bind(this), onerror);
	};
	
	function oncommunicatorready(ip) {
		this.ip = ip;
		_s = this.communicator.createSocket(Socket.UDP, PORT, onSocketCreated.bind(this));
	};
	
	function onSocketCreated() {

		this.bonjour = new Bonjour(this.ip, _s);
	};
  
  
	
	function onerror() {
		//
	};
	
	
	// API
	
	__constructor__.call(this);
};
model.AirChat.CONTACTS_UPDATE = 'contacts_update';
model.AirChat.MESSAGE_RECEIVED = 'message_received';
