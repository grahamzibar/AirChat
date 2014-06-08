/*

	Shhh, this class is a controller.  Don't tell anyone.
	It contains the logic for events, loops, etc.
	
	It also provides the interface for communicating with the model and
	displaying messages to the console.

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
		this.bonjour = new Bonjour(ip, _communicator);
	};
	
	function onerror() {
		//
	};
	
	__constructor__();
};
AirChat.CONTACTS_UPDATE = 'contacts_update';
AirChat.MESSAGE_RECEIVED = 'message_received';