var p1;
var p2;

// From https://developer.chrome.com/trunk/apps/app_hardware.html
var str2ab=function(str) {
  var buf=new ArrayBuffer(str.length);
  var bufView=new Uint8Array(buf);
  for (var i=0; i<str.length; i++) {
    bufView[i]=str.charCodeAt(i);
  }
  return buf;
}

// From https://developer.chrome.com/trunk/apps/app_hardware.html
var ab2str=function(buf) {
  return String.fromCharCode.apply(null, new Uint8Array(buf));
};

// A peer
function setupReceive() {
  chrome.socket.recvFrom(p1, 1024, function(readInfo){ 
      console.log('p1 Client: received response: ' + ab2str(readInfo.data), readInfo);
      setupReceive();
  });
}

chrome.socket.create('udp', null, function(createInfo){
    p1 = createInfo.socketId;

    chrome.socket.bind(p1, '0.0.0.0', 5554, function(result){
        console.log('p1 chrome.socket.bind: result = ' + result.toString());
    });
    
    
    setupReceive();
    
});


function send(){
	chrome.socket.sendTo(p1, str2ab('p1 says: Hello server! ' + new Date()), "0.0.0.0", 5554, function(){});
	setTimeout(send, 100);
}




    
