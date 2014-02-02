window.Bonjour = function Bonjour(ip){
  //sets a listener that answers the ip
  //keeps an array of ips
  //updates the array list
  //remove node after inactivity
  
  var _ipList = [];
  var _receptionist;
  
  this.sayBonjour = function(){
    
    s = communicator.createSocket('udp', 5554, function(){
      
      
      s.addEventListener(window.Socket.RECEIVED, function(receivedEvent){

        var receivedIp;
        
        if(receivedEvent.data){
          
          receivedIp = receivedEvent.data.split("My ip is:");
          
          if(_ipList.indexOf(receivedIp[1]) == -1){
            _ipList.push(receivedIp[1]);
          }
        }
        
      });
      
      for(var i=0; i<_ipList.length; i++){
        s.send(_ipList[i], 5556, str2ab("Bonjour! My ip is:" . ip));
      }
    });
    
  }
  
  this.setReceptionist = function(){
    
    _receptionist = communicator.createSocket('udp', 5556, function(){
      _receptionist.addEventListener(window.Socket.RECEIVED, function(receivedEvent){
        
        if(receivedEvent.data){
          
          receivedIp = receivedEvent.data.split("Bonjour! My ip is:");
          
          if(_ipList.indexOf(receivedIp[1]) == -1){
            send(receivedIp[1], 5554, str2ab("My ip is:". ip));
          }
        }
      });
    });    
  }
  
  this.getIps = function (){
    
    var slicedIp = ip.split(".");
    
    var curBlock = parseInt(slicedIp[3]);
    
    for(var i=1; i<=254; i++){
      
      if(i!=curBlock){
        _ipList.push(slicedIp[0] + "." + slicedIp[1] + "." + slicedIp[2] + "." + i);
      }
    }
  }
  
  getIps();
  setReceptionist();
};
