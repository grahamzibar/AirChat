function AirChatTextController(_model, _view) {
	
  this.scanIps = function(){
    _view.print("Scanning ips...");
    _model.bonjour.sayHello();
  };
  
  //add last "updated" info for that specific id
  this.printActiveIpsList = function(){
    var ipsList = _model.bonjour.getActiveList();

    _view.showUsers(ipsList);
  };
  
  this.sendMessage = function(ip, message){
    
    _model.bonjour.send(ip, message);
    _view.printSentMessage(ip, message, Date.now());
  };
  
  this.sendMultipleRecipientsMessage = function(ips, message){
    
    console.log(ips);
    
    for(var ip in ips){
      this.sendMessage(ips[ip], message);
    }
  };
  
  this.broadcastMessage = function(message){
    _view.print("Broadcasting message...");
    
    var ipsList = _model.bonjour.getActiveList();
    var ips = new Array();
    
    for(var ip in ipsList) {
      ips.push(ip);
    }
    
    this.sendMultipleRecipientsMessage(ips, message);
  };
  
};
