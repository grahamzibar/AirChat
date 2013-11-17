/* EventDispatcher */
Function.prototype.EventDispatcher_ID = null;
function EventDispatcher() {
	var _events = {};

	this.addEventListener = function(event, callback) {
		if (typeof callback.EventDispatcher_ID == 'number')
			return;
		var rry = _events[event];
		if (!rry)
			rry = _events[event] = new Array();
		callback.EventDispatcher_ID = rry.length;
		rry[callback.EventDispatcher_ID] = callback;
	};

	this.removeEventListener = function(event, callback) {
		var rry = _events[event];
		var id = callback.EventDispatcher_ID;
		if (!rry || id === null)
			return;
		if (!rry[id])
			return;

		rry.splice(id, 1);
		callback.EventDispatcher_ID = null;

		var length = rry.length;
		if (!length) {
			delete _events[event];
			return;
		}
		for (var i = 0; i < length; i++)
			rry[i].EventDispatcher_ID = i;
	};

	this.dispatchEvent = function(event, data) {
		var rry = _events[event];
		if (!rry)
			return;
		var length = rry.length;
		for (var i = 0; i < length; i++)
			rry[i](data);
	};

	this.removeEventListeners = function(event) {
		if (event)
			delete _events[event];
		else
			_events = {};
	};
};