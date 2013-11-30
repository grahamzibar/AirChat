function getIps(ip){
  
	var ips = [];
	var slicedIp = ip.split(".");
	
	var curBlock = parseInt(slicedIp[3]);
	
	for(var i=1; i<=254; i++){
		
		if(i!=curBlock){
			ips.push(slicedIp[0] + "." + slicedIp[1] + "." + slicedIp[2] + "." + i);
		}
	}
	
	return ips;
	
}

console.log(getIps("192.168.0.186"));
