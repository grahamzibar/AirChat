var str2ab=function(str) {
  var buf=new ArrayBuffer(str.length);
  var bufView=new Uint8Array(buf);
  for (var i=0; i<str.length; i++) {
    bufView[i]=str.charCodeAt(i);
  }
  return buf;
}

var ab2str=function(buf) {
  return String.fromCharCode.apply(null, new Uint8Array(buf));
};

function test(){
  s1 = communicator.createSocket('udp', 5554, function(){
    s2 = communicator.createSocket('udp', 5556, function(){
      s1.addEventListener(window.Socket.RECEIVED, function(receivedEvent){console.log(ab2str(receivedEvent.data));});
      s2.send(communicator.getIp(), 5554, str2ab("s2 sends to s1 a :)"))
    })
  });
  
}

var communicator = new window.ChromeCommunicator(test, null);

