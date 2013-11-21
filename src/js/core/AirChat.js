function AirChat(_communicator) {
	this.inheritFrom = EventDispatcher;
	this.inheritFrom();
	delete this.inheritFrom;
	
	
};
AirChat.CONTACTS_UPDATE = 'contacts_update';
AirChat.MESSAGE_RECEIVED = 'message_received';