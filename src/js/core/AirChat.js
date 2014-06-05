function AirChat(Communicator) {
	this.inheritFrom = EventDispatcher;
	this.inheritFrom();
	delete this.inheritFrom;
	
	function onready(ip) {
		console.log('here');
		this.bonjour = new Bonjour(ip, _communicator);
	};
	
	function onerror() {
		console.log('Uh oh');
	};
	
	var _communicator = this.communicator = new Communicator(onready.bind(this), onerror);
};
AirChat.CONTACTS_UPDATE = 'contacts_update';
AirChat.MESSAGE_RECEIVED = 'message_received';