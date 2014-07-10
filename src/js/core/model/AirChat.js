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
		_s = this.communicator.createSocket(Socket.UDP, PORT, onCreated.bind(this));
	};
	
	function onCreated() {
		// BAM!
		this.bonjour = new Bonjour(this.ip, _s);
    this.bonjour.sayHello();
    
    setTimeout(function(){
      var al = this.AirHub.bonjour.getActiveList();
      this.AirHubView.appendChatBox(al[0]);
    }, 5000);
      
	};
  
  
	
	function onerror() {
		//
	};
	
	
	// API
	
	__constructor__.call(this);
};
AirChat.CONTACTS_UPDATE = 'contacts_update';
AirChat.MESSAGE_RECEIVED = 'message_received';
