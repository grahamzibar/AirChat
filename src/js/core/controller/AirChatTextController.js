function AirChatTextController(_model, _view) {
	
  this.scanIps = function(){
    _view.print("Scanning ips...");
    _model.bonjour.sayHello();
  };
};
