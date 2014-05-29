function AirChat(Communicator) {
	this.inheritFrom = EventDispatcher;
	this.inheritFrom();
	delete this.inheritFrom;
	
	var _communicator;
	
	function onready(e) {
		console.log(e);
	};
	
	function onerror() {
		console.log('Uh oh');
	};
	
	_communicator = new Communicator(onready, onerror);
};
AirChat.CONTACTS_UPDATE = 'contacts_update';
AirChat.MESSAGE_RECEIVED = 'message_received';