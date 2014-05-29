function AirChat(Communicator) {
	this.inheritFrom = EventDispatcher;
	this.inheritFrom();
	delete this.inheritFrom;
	
	function onready(ip) {
		this.bonjour = new Bonjour(ip, _communicator);
	};
	
	function onerror() {
		console.log('Uh oh');
	};
	
	var _communicator = this.communicator = new Communicator(onready, onerror);
	this.bonjour;
};
AirChat.CONTACTS_UPDATE = 'contacts_update';
AirChat.MESSAGE_RECEIVED = 'message_received';