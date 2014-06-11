/*

	Shhh, this class is a controller.  Don't tell anyone.
	It contains the logic for events, loops, etc.
	
	This provides the interface for console input.
	How do ya feel?  HOW?!?!?!?!


*/
function AirChat(Communicator) {
	this.inheritFrom = EventDispatcher;
	this.inheritFrom();
	delete this.inheritFrom;
	
	this.model;
	this.bonjour;
	this.communicator;
	
	function __constructor__() {
		this.communicator = new Communicator(onready.bind(this), onerror);
	};
	
	function onready(ip) {
		this.bonjour = new Bonjour(ip, this.communicator);
	};
	
	function onerror() {
		//
	};
	
	
	// API
	
	__constructor__.call(this);
};
AirChat.CONTACTS_UPDATE = 'contacts_update';
AirChat.MESSAGE_RECEIVED = 'message_received';