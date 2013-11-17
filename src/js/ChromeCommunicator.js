(function CommunicatorModule(_chrome) {
	
	var ReadyEvent = function ReadyEvent() {
		
	};
	
	var SentEvent = function SentEvent() {
		
	};
	
	var ReceivedEvent = function ReceivedEvent() {
		
	};
	
	var ChromeCommunicator = window.ChromeCommunicator =
	function ChromeCommunicator() {
		this.inheritFrom = EventDispatcher;
		this.inheritFrom();
		delete this.inheritFrom;
		
		var __self__ = this;
		
		
		var __constructor__ = function() {
			
		};
		
		this.send = function(ip, data) {
			
		};
		
		this.dispose = function() {
			
		};
		
		__constructor__();
	};
	ChromeCommunicator.READY = 0;
	ChromeCommunicator.SENT = 1;
	ChromeCommunicator.RECEIVED = 2;
	
})(chrome);