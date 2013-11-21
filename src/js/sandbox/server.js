var socketInfo;

// From https://developer.chrome.com/trunk/apps/app_hardware.html
var str2ab=function(str) {
  var buf=new ArrayBuffer(str.length);
  var bufView=new Uint8Array(buf);
  for (var i=0; i<str.length; i++) {
    bufView[i]=str.charCodeAt(i);
  }
  return buf;
}

var onAccept = function(acceptInfo){

  var acceptId = acceptInfo.socketId;

  var txt = str2ab("HTTP/1.0 200 OK\nContent-length: " + 2 + "\nContent-type:" + "text/plain" + "\n\noi");
  chrome.socket.write(acceptId, txt, function(wr){
    chrome.socket.destroy(acceptId);
    chrome.socket.accept(socketInfo.socketId, onAccept);
  });
};

chrome.socket.create("tcp", {}, function(createInfo) {
  
  socketInfo = createInfo;
  
  var socketId = createInfo.socketId;
  chrome.socket.listen(socketId, "0.0.0.0", 8080, 50, function(result){
    chrome.socket.accept(socketId, onAccept);
  });
});
