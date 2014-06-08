/*

	http://www.youtube.com/watch?v=WGoi1MSGu64

*/
window.Binary = new (function Binary() {
	this.str2ab = function(str) {
		var buf = new ArrayBuffer(str.length);
		var bufView = new Uint8Array(buf);
		for (var i = 0; i < str.length; i++)
			bufView[i] = str.charCodeAt(i);
		return buf;
	};

	this.ab2str = function(buf) {
		return String.fromCharCode.apply(null, new Uint8Array(buf));
	};
})();